var THREE = require("../node_modules/three/three.js");

const SceneType = {
    SPACE: 0,
    STATION: 1,
    MENU: 2
};

var scene = function (sceneType) {
    this.sceneType = sceneType
    this.sceneData = getScene(sceneType);
};

var draw = function (scenePack) {
    function render() {
        requestAnimationFrame(render);
        scenePack.renderer.render(scenePack.scene, scenePack.camera);
    }
    render();
}

function getScene(sceneType) {
    var ret = {
        scene: null,
        renderer: null,
        camera: null,
        entities: {}
    }
    var fieldOfView = 75;
    var aspectRatio = window.innerWidth / window.innerHeight;
    var nearClipPlane = 0.1;
    var farClipPlane = 1000;
    var renderer = new THREE.WebGLRenderer();
    var localScene = new THREE.Scene();
    var camera = null;

    if (sceneType === SceneType.SPACE) {
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClipPlane, farClipPlane);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.SphereGeometry(3, 50, 50);
        var material = new THREE.MeshNormalMaterial();
        var sphere = new THREE.Mesh(geometry, material);
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set(0, 0, 0);
        sphere.position.set(0, 0, -10);
        camera.position.set(0, 0, 10);
        localScene.add(light);
        localScene.add(sphere);

    } else if (this.sceneType == SceneType.STATION) {
        document.write("station scene selected");
    } else if (this.sceneType == SceneType.MENU) {
        document.write("menu scene selected");
    }

    ret.renderer = renderer;
    ret.scene = localScene;
    ret.camera = camera;
    ret.entities.planet = sphere;
    /* return ret and render elsewhere
    function render() {
        requestAnimationFrame(render);
        renderer.render(localScene, camera);
    }
    render();
    */
    return ret;
}

exports.draw = draw
exports.scene = scene
exports.SceneType = SceneType
