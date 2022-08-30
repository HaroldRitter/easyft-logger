"use strict";

const EasyFTLogger = require("../EasyFTLogger.class.js");
const Converter = require("../Converter.class.js");

EasyFTLogger.Converter = Converter;

// Adds the converters
EasyFTLogger.addConverter( require("./converters/code.conv.js") )
			.addConverter( require("./converters/rgb.conv.js") );