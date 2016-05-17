// Starpile 
// Copyright (c) 2016 m1001

var player = require("../js/player.js");
var engine = require("../js/engine.js");
var sceneType = engine.SceneType;
var sceneConfig = {
    fieldOfView: 75,
    nearClip: 0.1,
    farClip: 1000,
    planetSize: 5,
    lightingColor: 0xffffff,
    planetTexture: "ice_1.png"
}
var spaceScene = new engine.scene(sceneType.SPACE, sceneConfig);
var drawConfig = {};
engine.draw(spaceScene.sceneData, drawConfig);
