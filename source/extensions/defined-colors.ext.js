"use strict";

/*

	Defines all the default special characters of 

*/

const EasyFTLogger = require("../EasyFTLogger.class.js");

EasyFTLogger
.addColor("white", 
		[255, 255, 255],
		[255, 255, 255],
		[213, 213, 213])
.addColor(["grey", "gray"], 
		[169, 169, 169],
		[127, 127, 127],
		[85, 85, 85])
.addColor("black", 
		[42, 42, 42],
		[0, 0, 0],
		[0, 0, 0])
.addColor("red", 
		[255, 150, 150],
		[255, 0, 0],
		[127, 30, 30])
.addColor("orange", 
		[255, 180, 120],
		[255, 127, 0],
		[127, 64, 15])
.addColor("yellow", 
		[255, 255, 150],
		[255, 255, 0],
		[127, 127, 10])
.addColor("greenyellow", 
		[180, 255, 120],
		[127, 255, 0],
		[64, 127, 15])
.addColor("green", 
		[150, 255, 150],
		[0, 255, 0],
		[30, 127, 30])
.addColor("aquamarine", 
		[120, 255, 180],
		[0, 255, 127],
		[30, 127, 64])
.addColor("cyan", 
		[150, 255, 255],
		[0, 255, 255],
		[10, 127, 127])
.addColor("azure", 
		[120, 180, 255],
		[0, 127, 255],
		[10, 64, 127])
.addColor("blue", 
		[150, 150, 255],
		[0, 0, 255],
		[30, 30, 127])
.addColor("violet", 
		[180, 120, 255],
		[127, 0, 255],
		[64, 10, 127])
.addColor(["magenta", "pink"], 
		[255, 150, 255],
		[255, 0, 255],
		[127, 10, 127])
.addColor("violetred", 
		[],
		[255, 0, 127],
		[127, 10, 64]);