"use strict";

// ----- Gets the namespace ----- //

const EasyFTLogger = require("./source/EasyFTLogger.class.js");

// ----- Extensions ----- //

require("./source/extensions/special-characters.ext.js");
require("./source/extensions/text-styles.ext.js");
require("./source/extensions/defined-colors.ext.js");

// ----- Exports EasyFTLogger ----- //

module.exports = EasyFTLogger;