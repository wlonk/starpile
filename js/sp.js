// Starpile 
// Copyright (c) 2016 m1001

var engine = require("../js/engine.js");
var sceneType = engine.SceneType.SPACE;
var sceneConfig = {
    fieldOfView: 75,
    nearClip: 0.1,
    farClip: 1000,
    textColor: 0x00FFFF,
    planetSize: 5,
    planetTexture: "ice_1.png",
    planetName: "Matthoth",
    lightingColor: 0xADDFFF,
}
var spaceScene = new engine.scene(sceneType, sceneConfig);
spaceScene.sceneData.then(function (drawData) {
  var drawConfig = {};
  engine.draw(drawData, drawConfig);
})
