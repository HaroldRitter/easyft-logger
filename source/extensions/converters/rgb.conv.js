"use strict";

const Converter = require("../../Converter.class.js");

module.exports = new Converter
(
	// Name
	"rgb",

	// Regular Expression
	/^(?:(c|bg):)?rgb\s*\(\s*([0-9]*(?:\s*,\s*[0-9]*)*)\s*\)$/,

	// Converter function
	function(code, prefix, rgb)
	{
		code = prefix == "bg" ? "48" : "38";
		rgb = rgb.split(/\s*,\s*/);
		rgb = [	parseInt(rgb[0]) || 0,
				parseInt(rgb[1]) || 0,
				parseInt(rgb[2]) || 0];
		return code + ";2;" + rgb.join(";");
	}
);