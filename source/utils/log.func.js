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
			var output = this.preformat(...arguments);
			console[funcName](...output.messageAndArguments);
			return this;
		};
	},

	// [Deprecated]
	$logFunction: function(funcName)
	{
		return function(args)
		{
			var output = this.preformat(...args);
			console[funcName](...output.messageAndArguments);
			return this;
		};
	}
}