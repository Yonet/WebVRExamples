var camera, scene, renderer;
var geometry, material, mesh;
var cubes;

init();
addCubeGroup();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function addCubeGroup() {
    cubes = new THREE.Object3D;
    for (var i = 0; i < 10; i++) {
        addBox();
    }
    scene.add(cubes)
}

function addBox() {
    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let material = new THREE.MeshNormalMaterial();
    //new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });

    let cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 4 - 2;
    cube.position.y = Math.random() * 4 - 2;
    cube.position.z = Math.random() * 4 - 2;

    cubes.add(cube);
    console.log('scene ', scene);

}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    cubes.rotation.x += 0.01;
    cubes.rotation.y += 0.02;

    renderer.render(scene, camera);

}