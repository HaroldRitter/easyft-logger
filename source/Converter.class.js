"use strict";

class Converter
{
// ------> Converter - Constructor

	constructor(name, regExp, convert)
	{
		// name: String
		//	The converter's name.
		this.name = name;

		// regExp: RegExp
		//	The regular expression used to checks if
		//	a code must be treated with this Converter.
		//	All results for each code are passed to the
		//	convert method
		this.regExp = regExp;

		// convert: Function(result[, ... args]): String
		//	Converts the code found in an EasyFTLogger statement.
		this.convert = convert;
	}

// ------> Converter - PUBLIC Methods

	toString()
	{
		return 	"[EasyFTLogger.Converter] " + this.name +
				" (" + this.regExp.source + ")";
	}
}

module.exports = Converter;