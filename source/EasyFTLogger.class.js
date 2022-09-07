"use strict";

const logUtil = require("./utils/log.func.js");

// ------- PUBLIC Class EasyFTLogger ------- //

var EasyFTLogger = function(name)
{
	this.name = name || "EasyFTLogger #" + (EasyFTLogger.loggers.length+1);
	
	this.specials = Object.assign({}, EasyFTLogger.specials);
	this.styles = Object.assign({}, EasyFTLogger.styles);

	Object.defineProperty(this, "_converters", 
						{value: EasyFTLogger._converters.slice()});

	EasyFTLogger.loggers.push(this);
};

// ------- EasyFTLogger - PUBLIC Static Properties ------- //

Object.assign(EasyFTLogger,
{
	// The list of all loggers
	loggers: [],

	// Special characters
	// The names of the special chars must use lower cases
	specials:
	{
	},

	// The ANSI escape code styles
	styles:
	{
	}
});

// ------- EasyFTLogger - PUBLIC Static Methods ------- //

Object.assign(EasyFTLogger,
{
	/*
		Gets the ANSI color code from the given color.

			color: interger|integer[3]
				The color code in the 256 color palette, or the RGB color.
			isBg: boolean=false
				Determines whether or not the color is for the background.
			
			returns String
				The ANSI color code
	*/
	ansiCode: function(color, isBg)
	{
		if(typeof(color) == "object")
		{
			return (isBg ? "48" : "38") + ";2;" + color.join(";");
		}
		return (isBg ? "48" : "38") + ";5;" + color;
	},

	/*
		See EasyFTLogger.prototype.addColor

		This function add the color to the class and to
		to each instances in loggers.

		It returns the EasyFTLogger class.
	*/
	addColor: function(name, light, normal, dark)
	{
		// Adds the color to the class
		EasyFTLogger.prototype.addColor.call(EasyFTLogger,
									name, light, normal, dark);
		
		// Adds the color to all existing instances
		EasyFTLogger.loggers.forEach(function(logger)
		{
			try{logger.addColor(name, light, normal, dark);}
			catch(e){}
		});
		
		return EasyFTLogger;
	},
	
	/*
		See EasyFTLogger.prototype.printColors
		
		This function prints the color to the class.

		It returns the EasyFTLogger class.
	*/
	printColors: function(bg)
	{
		EasyFTLogger.orphanLogger().printColors(bg);
		return EasyFTLogger;
	},

	/*
		See EasyFTLogger.prototype.addConverter

		This function add the converter to the class and to
		to each instances in loggers.

		It returns the EasyFTLogger class.
	*/
	addConverter: function(name, regExp, convert)
	{
		// Adds the converter to the class
		EasyFTLogger.prototype.addConverter.call(EasyFTLogger,
											name, regExp, convert);
		
		// Adds the converter to all existing instances
		EasyFTLogger.loggers.forEach(function(logger)
		{
			try{logger.addConverter(name, regExp, convert);}
			catch(e){}
		});

		return EasyFTLogger;
	},

	/*
		Creates an EasyFTLogger and removes it from
		the list of loggers (i.e. the loggers static attribute)

		returns EasyFTLogger
	*/
	orphanLogger: function()
	{
		new EasyFTLogger();
		return EasyFTLogger.loggers.pop();
	}
});

// ------- EasyFTLogger - PRIVATE Static Properties ------- //

Object.defineProperties(EasyFTLogger,
{
	// The list of all converters
	_converters: {value: []}
});

// ------- EasyFTLogger - PUBLIC Instance Methods ------- //

Object.assign(EasyFTLogger.prototype,
{
	/*
		Adds a color to the EasyFTLogger instance styles.
		The method will add the text (without prefix and with the "c:" prefix)
		and the background (with the "bg:" prefix) colors.

			name: String
				The unique name of the color.
			light: interger|integer[3]
				The light version of the color.
				It is a color code in the 256 color palette, or the RGB color.
			normal: interger|integer[3]
				The normal version of the color.
				It is a color code in the 256 color palette, or the RGB color.
			dark: interger|integer[3]
				The dark version of the color.
				It is a color code in the 256 color palette, or the RGB color.
			
			returns Function
				The EasyFTLogger class
	*/
	addColor: function(name, light, normal, dark)
	{
		var self = this;

		// Many names (does not manage feedback loops)
		if(name instanceof Array)
		{
			name.forEach(function(name)
			{
				self.addColor(name, light, normal, dark);
			});
			return this;
		}

		var styles = this.styles;

		// Checks the arguments
		if(normal === undefined || normal === null)
		{
			if(dark === undefined || dark === null)
			{
				normal = light;
				light = null;
			}
			else
			{
				throw new Error("The normal argument is missing in EasyFTLogger.addColor");
			}
		}

		// Checks the name validity
		name = name.toLowerCase();
		if(!/^[a-z]+[0-9]*$/.test(name))
		{
			throw new Error("Invalid style name '" + name +
						"': must be letters followed by one or more ciffers.");
		}

		// Creates the color and the background color
		[["", false], ["c:", false], ["bg:", true]].forEach(function(data)
		{
			var s = data[0], bg = data[1];
			if(light !== undefined && light !== null)
			{
				styles[s + "light" + name] = EasyFTLogger.ansiCode(light, bg);
			}
			styles[s + name] = EasyFTLogger.ansiCode(normal, bg);
			if(dark !== undefined && dark !== null)
			{
				styles[s + "dark" + name] = EasyFTLogger.ansiCode(dark, bg);
			}
		});
		
		return this;
	},

	/*
		Prints all the available colors.

			bg: boolean
				Specifies whether or not the colors are printed in the background.
			
			returns EasyFTLogger
				This instance
	*/
	printColors: function(bg)
	{
		var slen = 26, prefix = bg ? "bg:" : "c:",
			id = prefix.length, styles = this.styles,
			self = this,
			names = Object.getOwnPropertyNames(styles);
			
		// Fixes the max length
		names.forEach(function(style)
		{
			if(style.indexOf(prefix) === 0)
			{
				var l = style.length - id + 2;
				if(l > slen)
				{
					slen = l;
				}
			}
		});
		
		// Prints the colors
		names.forEach(function(style)
		{
			if(style.indexOf(prefix) === 0)
			{
				var styleStr = style.substr(id);
				if(/^(light|dark)?(gray|pink)$/.test(styleStr))
				{
					return;
				}
				styleStr = styleStr.replace(/^(light|dark)?(grey|magenta)/,
						function(all, type, color)
						{
							var c2  = color == "grey" ? "gray" : "pink";
							type = type || "";
							return type + color + " | " + type + c2;
						});
						self.log("%{" + style + "}%s%{0}%s%s",
							styleStr,
							" ".repeat(slen - styleStr.length),
							styles[style]);
			}
		});

		return this;
	},

	preformat: function()
	{
		var str = arguments[0] || "", output = "", self = this,
			args = Array.prototype.slice.call(arguments, 1);
		
		output = str.replace(/%\{(.*?)\}/g,
				function(all, code)
				{
					// In order: special, style name, converters

					// Case insensitive
					code = code.toLowerCase();
					
					// Special
					var spec = self.specials[code];
					if(spec !== undefined)
					{
						return spec;
					}

					// Styles
					var out = "";
					code = code.split(/\s*;\s*/g);
					code.forEach(function(code)
					{
						code = code === "" ? "0" : code;

						// Style name
						var style = self.styles[code];
						if(style)
						{
							out += (out ? ";" : "") + style;
						}
						// Converters
						else
						{
							var result,conv;
							conv = self._converters.find(function(conv)
							{
								conv.regExp.lastIndex = 0;
								result = conv.regExp.exec(code);
								return result ? true : false;
							});
							if(conv)
							{
								result = conv.convert.apply(conv, result);
								out += (out ? ";" : "") + result;
							}
						}
					});
					return out ? "\x1b[" + out + "m" : "";
				});
		
		return {message: output,
				arguments: args,
				messageAndArguments: [output].concat(args)};
	},

	$preformat: function(args)
	{
		return this.preformat.apply(this, args);
	},

	// (name: string, regExp: RegExp, convert: Function(regRes, arg1, ...))
	// OR (converter: EasyFTLogger.Converter)
	/*
		Adds the converter.

			name: string
				The new converter's name.
			regExp: RegExp
				The regular expression used to checks if
				a code must be treated with this Converter.
				All results for each code are passed to the
				convert method.
			convert: Function(regRes, arg1, ...): String
				Converts the code found in an EasyFTLogger statement.
			
			OR

			converter: EasyFTLogger.Converter
				The converter to add
			
			returns EasyFTLogger
				This instance
	*/
	addConverter: function(name, regExp, convert)
	{
		var conv = name instanceof EasyFTLogger.Converter ?
						name : new EasyFTLogger.Converter(name, regExp, convert);
		
		this._converters.push(conv);
	
		return this;
	},

// ----> The log functions

	// A substitute to the console.log function with the same arguments
	log: 	logUtil.logFunction("log"),
	// A substitute to the console.log function with all arguments in a single array
	$log: 	logUtil.$logFunction("log"),
	
	// A substitute to the console.info function with the same arguments
	info: 	logUtil.logFunction("info"),
	// A substitute to the console.info function with all arguments in a single array
	$info: 	logUtil.$logFunction("info"),
	
	// A substitute to the console.warn function with the same arguments
	warn: 	logUtil.logFunction("warn"),
	// A substitute to the console.warn function with all arguments in a single array
	$warn: 	logUtil.$logFunction("warn"),
	
	// A substitute to the console.error function with the same arguments
	error: 	logUtil.logFunction("error"),
	// A substitute to the console.error function with all arguments in a single array
	$error: logUtil.$logFunction("error"),
});

// ------------ (\_) EXPORTS THE MODULE (_/) ------------ //

module.exports = EasyFTLogger;