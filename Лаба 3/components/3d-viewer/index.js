import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ThreeDViewer {
    constructor(container, modelUrl) {
        this.container = container;
        this.modelUrl = modelUrl;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        this.fallbackGroup = null;
        this.animateFallback = false;
    }

    init() {
        this.container.innerHTML = '';

        const width = this.container.clientWidth;
        const height = 400;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.FogExp2(0x1a1a2e, 0.008);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(5, 3, 5);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x1a1a2e, 1);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.5;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.zoomSpeed = 0.8;

        this.addLights();

        const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
        gridHelper.position.y = -1;
        this.scene.add(gridHelper);

        // Пытаемся загрузить пользовательскую модель
        this.loadModel();

        // Запасная модель (если загрузка не удалась)
        this.createFallbackModel();

        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.receiveShadow = true;
        this.scene.add(mainLight);

        const fillLight = new THREE.PointLight(0x4466cc, 0.3);
        fillLight.position.set(0, -2, 0);
        this.scene.add(fillLight);

        const rimLight = new THREE.PointLight(0xffaa66, 0.5);
        rimLight.position.set(-3, 2, -4);
        this.scene.add(rimLight);

        const leftFill = new THREE.PointLight(0x88aaff, 0.3);
        leftFill.position.set(-4, 2, 2);
        this.scene.add(leftFill);

        const rightFill = new THREE.PointLight(0xffaa88, 0.3);
        rightFill.position.set(4, 2, 2);
        this.scene.add(rightFill);
    }

    createFallbackModel() {
        this.fallbackGroup = new THREE.Group();

        // Тело
        const bodyGeo = new THREE.SphereGeometry(0.8, 32, 32);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x44aa44, roughness: 0.3 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.scale.set(1.5, 0.8, 0.9);
        body.position.y = 0.2;
        this.fallbackGroup.add(body);

        // Голова
        const headGeo = new THREE.SphereGeometry(0.6, 32, 32);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x55bb55 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.set(1.1, 0.3, 0);
        this.fallbackGroup.add(head);

        // Глаза
        const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), eyeMat);
        leftEye.position.set(1.45, 0.55, 0.4);
        this.fallbackGroup.add(leftEye);

        const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), eyeMat);
        rightEye.position.set(1.45, 0.55, -0.4);
        this.fallbackGroup.add(rightEye);

        // Зрачки
        const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.07, 32, 32), pupilMat);
        leftPupil.position.set(1.5, 0.52, 0.45);
        this.fallbackGroup.add(leftPupil);

        const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.07, 32, 32), pupilMat);
        rightPupil.position.set(1.5, 0.52, -0.45);
        this.fallbackGroup.add(rightPupil);

        // Ноги
        const legMat = new THREE.MeshStandardMaterial({ color: 0x44aa44 });
        const legPositions = [
            [-0.5, -0.3, 0.6], [-0.5, -0.3, -0.6],
            [0.2, -0.3, 0.7], [0.2, -0.3, -0.7]
        ];
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.55, 8), legMat);
            leg.position.set(pos[0], pos[1], pos[2]);
            this.fallbackGroup.add(leg);
        });

        // Хвост
        const tailGeo = new THREE.ConeGeometry(0.2, 0.8, 8);
        const tailMat = new THREE.MeshStandardMaterial({ color: 0x44aa44 });
        const tail = new THREE.Mesh(tailGeo, tailMat);
        tail.position.set(-1.1, 0.1, 0);
        tail.rotation.x = 0.2;
        this.fallbackGroup.add(tail);

        this.fallbackGroup.position.y = 0.5;
        this.scene.add(this.fallbackGroup);
        this.animateFallback = true;
    }

    loadModel() {
        if (!this.modelUrl) return;

        const loader = new GLTFLoader();
        loader.load(this.modelUrl,
            (gltf) => {
                // Убираем fallback модель
                if (this.fallbackGroup) {
                    this.scene.remove(this.fallbackGroup);
                    this.animateFallback = false;
                }

                this.model = gltf.scene;

                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());

                this.model.position.x = -center.x;
                this.model.position.z = -center.z;
                this.model.position.y = -box.min.y;

                this.scene.add(this.model);

                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const distance = maxDim * 0.6;
                this.camera.position.set(distance * 0.8, distance * 0.6, distance);
                this.controls.target.set(0, size.y / 2, 0);
                this.controls.update();

                if (gltf.animations && gltf.animations.length) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    gltf.animations.forEach((clip) => {
                        this.mixer.clipAction(clip).play();
                    });
                }
            },
            (xhr) => {
                console.log('Loading model:', Math.round(xhr.loaded / xhr.total * 100) + '%');
            },
            (error) => {
                console.log('Model not found, using fallback');
            }
        );
    }

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = 400;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
        }

        if (this.animateFallback && this.fallbackGroup) {
            this.fallbackGroup.rotation.y += 0.005;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        window.removeEventListener('resize', () => this.onWindowResize());
    }
}
