// THREE.JS VIEWER
// import * as THREE from 'three';
const WIDTH = viewer.offsetWidth;
const HEIGHT = viewer.offsetHeight;

const camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.01, 100);
camera.position.set(5, 3, 5);
camera.lookAt(0, 1.5, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

scene.add(new THREE.GridHelper(10, 10));

const ambient = new THREE.HemisphereLight(0xbbbbff, 0x886666, 0.75);
ambient.position.set(-0.5, 0.75, -1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 0.75);
light.position.set(1, 0.75, 0.5);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
viewer.appendChild(renderer.domElement);

function animate() {

    const time = performance.now() / 5000;

    camera.position.x = Math.sin(time) * 5;
    camera.position.z = Math.cos(time) * 5;
    camera.lookAt(0, 1.5, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);

// POLY REST API

const API_KEY = config.apiKey;

function loadAsset(id) {

    var url = `https://poly.googleapis.com/v1/assets/${id}/?key=${API_KEY}`;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', function (event) {

        var asset = JSON.parse(event.target.response);

        asset_name.textContent = asset.displayName;
        asset_author.textContent = asset.authorName;

        var format = asset.formats.find(format => { return format.formatType === 'OBJ'; });

        if (format !== undefined) {

            var obj = format.root;
            var mtl = format.resources.find(resource => { return resource.url.endsWith('mtl') });

            var path = obj.url.slice(0, obj.url.indexOf(obj.relativePath));

            var loader = new THREE.MTLLoader();
            loader.setCrossOrigin(true);
            loader.setMaterialOptions({ ignoreZeroRGBs: true });
            loader.setTexturePath(path);
            loader.load(mtl.url, function (materials) {

                var loader = new THREE.OBJLoader();
                loader.setMaterials(materials);
                loader.load(obj.url, function (object) {

                    var box = new THREE.Box3();
                    box.setFromObject(object);

                    // re-center

                    var center = box.getCenter();
                    center.y = box.min.y;
                    object.position.sub(center);

                    // scale

                    var scaler = new THREE.Group();
                    scaler.add(object);
                    scaler.scale.setScalar(6 / box.getSize().length());
                    scene.add(scaler);

                });

            });

        }

    });
    request.send(null);

}

if (API_KEY.startsWith('**')) {

    alert('Sample incorrectly set up. Please enter your API Key for the Poly API in the API_KEY variable.');

}

loadAsset('5vbJ5vildOq');