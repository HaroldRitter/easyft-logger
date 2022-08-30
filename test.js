"use strict";

// Gets the namespace
const EasyFTLogger = require("./index.js");

// Instanciate a logger
const logger = new EasyFTLogger();

// Logs something simple
logger.log("%{bold}Today%{} is a %{italic; orange}sunny%{} day");