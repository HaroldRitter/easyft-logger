"use strict";

const Converter = require("../../Converter.class.js");

module.exports = new Converter
(
	// Name
	"code",

	// Regular Expression
	/^[0-9]+(\s*;[0-9]+\s*)*$/,
	
	// Converter function
	function(code)
	{
		return code.replace(/\s*/g, "");
	}
);