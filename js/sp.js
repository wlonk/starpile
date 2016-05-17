// Starpile 
// Copyright (c) 2016 m1001

var player = require("../js/player.js");
var engine = require("../js/engine.js");
var sceneType = engine.SceneType;
var spaceScene = new engine.scene(sceneType.SPACE);
var config = {};
engine.draw(spaceScene.sceneData, config);
