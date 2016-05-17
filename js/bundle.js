/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// Starpile
	// Copyright (c) 2016 m1001

	var player = __webpack_require__(2);
	var engine = __webpack_require__(3);
	var sceneType = engine.SceneType.SPACE;
	var sceneConfig = {
	    fieldOfView: 75,
	    nearClip: 0.1,
	    farClip: 1000,
	    textColor: 0x00FFFF,
	    planetSize: 5,
	    planetTexture: "ice_1.png",
	    planetName: "Matthoth",
	    lightingColor: 0xADDFFF
	};
	var spaceScene = new engine.scene(sceneType, sceneConfig);
	var drawData = spaceScene.sceneData;
	var drawConfig = {};
	engine.draw(drawData, drawConfig);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var name = "m1001";
	var startingPlanets = 1;
	var startingCredits = 1; // in millions

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var SceneType = {
	    SPACE: 0,
	    STATION: 1,
	    MENU: 2
	};

	var PlanetType = {
	    // dictates textures
	    GAS: 0,
	    WATER: 1,
	    LAND: 2,
	    WATER_AND_LAND: 3
	};

	var PlanetTrait = {
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

	var scene = function scene(sceneType, sceneConfig) {
	    this.sceneData = getScene(sceneType, sceneConfig);
	};

	var draw = function draw(scenePack, drawConfig) {
	    scenePack.renderer.setSize(window.innerWidth, window.innerHeight);
	    document.body.appendChild(scenePack.renderer.domElement);
	    // TODO: do something smarter about rotation
	    //  separate function for rendering planets?
	    function render() {
	        requestAnimationFrame(render);
	        if (scenePack.entities.planet != undefined) {
	            scenePack.entities.planet.rotation.y += 0.0015;
	        }
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
	    };
	    var aspectRatio = window.innerWidth / window.innerHeight;
	    var renderer = new THREE.WebGLRenderer();
	    var localScene = new THREE.Scene();
	    var camera = null;

	    if (sceneType === SceneType.SPACE) {
	        // space scene setup
	        // TODO
	        //  * = parameterized
	        //  add support for orbiting objects *
	        // stars
	        // add method to deal with adding text to a scene
	        // addText(text, scene)
	        // add in support for planet types
	        renderer.setClearColor(0x000000);
	        var stars = new THREE.Geometry();
	        for (var i = 0; i < 5000; i++) {
	            stars.vertices.push(new THREE.Vector3(1e3 * Math.random() - 5e2, 1e3 * Math.random() - 5e2, -1e2));
	        }
	        var starStuff = new THREE.PointsMaterial({ color: 0x99FFFF, size: 0.5 });
	        var starSystem = new THREE.Points(stars, starStuff);

	        camera = new THREE.PerspectiveCamera(sceneConfig.fieldOfView, aspectRatio, sceneConfig.nearClip, sceneConfig.farClip);
	        // planet
	        var geometry = new THREE.SphereGeometry(sceneConfig.planetSize, 50, 50);
	        var textureFile = "img/" + sceneConfig.planetTexture;
	        var textureLoader = new THREE.TextureLoader();
	        textureLoader.load(textureFile, function (texture) {
	            var material = new THREE.MeshLambertMaterial({ map: texture });
	            var sphere = new THREE.Mesh(geometry, material);
	            sphere.position.set(0, 0, -10);
	            localScene.add(sphere);
	            ret.entities.planet = sphere;
	        });
	        //});
	        // light
	        // -- planet
	        var light = new THREE.PointLight(sceneConfig.lightingColor, 3, 50, 1);
	        // text
	        // -- planet title
	        var textLoader = new THREE.FontLoader();
	        var textX = window.innerWidth - window.innerWidth - window.innerWidth / 100;
	        textLoader.load('../js/optimer_regular.typeface.js', function (font) {
	            var textGeometry = new THREE.TextGeometry(sceneConfig.planetName.toLowerCase(), { font: font, size: 1.5, height: 0 });
	            var textMaterial = new THREE.MeshPhongMaterial({ color: sceneConfig.textColor });
	            var textMesh = new THREE.Mesh(textGeometry, textMaterial);
	            textMesh.position.set(textX, 10, -10);
	            localScene.add(textMesh);
	            ret.entities.planetTitle = textMesh;
	        });
	        light.position.set(-10, 0, 20);
	        camera.position.set(0, 0, 10);
	        localScene.add(light);
	        localScene.add(starSystem);
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

/***/ }
/******/ ]);