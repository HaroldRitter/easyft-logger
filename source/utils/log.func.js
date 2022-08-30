"use strict";

/*
	Creates the EasyFTLogger log functions.
*/

module.exports =
{
	logFunction: function(funcName)
	{
		return function()
		{
			var output = this.$preformat(arguments);
			console[funcName].apply(console, output.messageAndArguments);
			return this;
		};
	},

	$logFunction: function(funcName)
	{
		return function(args)
		{
			var output = this.$preformat(args);
			console[funcName].apply(console, output.messageAndArguments);
			return this;
		};
	}
}