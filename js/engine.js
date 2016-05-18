const SceneType = {
  SPACE: 0,
  STATION: 1,
  MENU: 2
};

const PlanetType = {
  // dictates textures
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

function scene (sceneType, sceneConfig) {
  this.sceneData = getScene(sceneType, sceneConfig);
}

function draw (scenePack) {
  scenePack.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(scenePack.renderer.domElement);
  var api = require("../js/api.js");
  api.apiCall('/users/', 'test', 'testing123');

  function render() {
    scenePack.entities.planet.rotation.y += 0.0015;
    scenePack.renderer.render(scenePack.scene, scenePack.camera);
    requestAnimationFrame(render);
  }

  render();
}

function getScene (sceneType, sceneConfig) {
  return new Promise(function (resolve, reject) {
    var data = {
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
      //  add support for orbiting objects *
      // stars
      // add method to deal with adding text to a scene
      // addText(text, scene)
      // add in support for planet types
      renderer.setClearColor(0x000000);
      var stars = new THREE.Geometry();
      for (var i=0; i<5000; i++) {
        stars.vertices.push(new THREE.Vector3(
          1e3 * Math.random() - 5e2,
          1e3 * Math.random() - 5e2,
            -1e2));
      }
      var starStuff = new THREE.PointsMaterial({color: 0x99FFFF, size: 0.5});
      var starSystem = new THREE.Points(stars, starStuff);

      camera = new THREE.PerspectiveCamera(
        sceneConfig.fieldOfView,
        aspectRatio,
        sceneConfig.nearClip,
        sceneConfig.farClip);
      // planet
      var geometry = new THREE.SphereGeometry(sceneConfig.planetSize, 50, 50);
      var textureFile = `/assets/img/${sceneConfig.planetTexture}`;
      var textureLoader = new THREE.TextureLoader();
      textureLoader.load(textureFile, function(texture) {
        var material = new THREE.MeshLambertMaterial({map: texture});
        var sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, -10);
        localScene.add(sphere);
        data.entities.planet = sphere;
        resolve(data);
      });
      //});
      // light
      // -- planet
      var light = new THREE.PointLight(sceneConfig.lightingColor, 3, 50, 1);
      // text
      // -- planet title
      var textLoader = new THREE.FontLoader();
      var textX = (window.innerWidth - window.innerWidth) - (window.innerWidth / 100)
      textLoader.load('/assets/js/helvetiker_regular.typeface.js', function(font) {
        var textGeometry = new THREE.TextGeometry(sceneConfig.planetName.toLowerCase(),
                                                  {font: font, size: 1.5, height: 0});
        var textMaterial = new THREE.MeshPhongMaterial({color: sceneConfig.textColor,
                                                        specular: sceneConfig.textColor});
        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(textX, 10, -10);
        localScene.add(textMesh);
        data.entities.planetTitle = textMesh;
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

    data.renderer = renderer;
    data.scene = localScene;
    data.camera = camera;
  });
};

exports.draw = draw;
exports.scene = scene;
exports.SceneType = SceneType;
