var THREE = require("../node_modules/three/three.js");

const SceneType = {
    SPACE: 0,
    STATION: 1,
    MENU: 2
};

const PlanetType = {
    GAS: 0, 
    WATER: 1,
    LAND: 2,
    WATER_AND_LAND: 3
};

const PlanetTrait = {
    VOLCANIC: 0,
    COLD: 1,
    HOT: 2,
    WINDY: 3,
    STORM: 4,
    LOW_GRAVITY: 5,
    HIGH_GRAVITY: 6,
    ZERO_GRAVITY: 7,
    LIFE: 8
};

var scene = function (sceneType) {
    var config = {
        fieldOfView: 75,
        nearClip: 0.1,
        farClip: 1000,
        planetSize: 5
    }
    this.sceneData = getScene(sceneType, config);
};

var draw = function (scenePack, drawConfig) {
    function render() {
        requestAnimationFrame(render);
        scenePack.renderer.render(scenePack.scene, scenePack.camera);
    }
    render();
};

function getScene(sceneType, sceneConfig) {
    var ret = {
        scene: null,
        renderer: null,
        camera: null,
        entities: {}
    }
    var aspectRatio = window.innerWidth / window.innerHeight;
    var renderer = new THREE.WebGLRenderer();
    var localScene = new THREE.Scene();
    var camera = null;

    if (sceneType === SceneType.SPACE) {
        // space scene setup
        // TODO
        //  * = parameterized
        //  add stars *
        //  add planet rotation *
        //  add support for orbiting objects *
        //  lighting *

        camera = new THREE.PerspectiveCamera(
            sceneConfig.fieldOfView,
            aspectRatio,
            sceneConfig.nearClip,
            sceneConfig.farClip);

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.SphereGeometry(sceneConfig.planetSize, 50, 50);
        var material = new THREE.MeshNormalMaterial();
        var sphere = new THREE.Mesh(geometry, material);
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set(0, 0, 0);
        sphere.position.set(0, 0, -10);
        camera.position.set(0, 0, 10);
        localScene.add(light);
        localScene.add(sphere);
        ret.entities.planet = sphere;

    } else if (this.sceneType == SceneType.STATION) {
        // station scene
        // possibly used for macro decisions / meta gaming view
        document.write("station scene selected");
    } else if (this.sceneType == SceneType.MENU) {
        // menu scene that will drive trades, etc
        document.write("menu scene selected");
    }

    ret.renderer = renderer;
    ret.scene = localScene;
    ret.camera = camera;
    return ret;
};

exports.draw = draw;
exports.scene = scene;
exports.SceneType = SceneType;
