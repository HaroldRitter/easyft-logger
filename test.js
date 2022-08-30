"use strict";

// Gets the namespace
const EasyFTLogger = require("./index.js");

// Instanciate a logger
const logger = new EasyFTLogger();

// Logs something simple
logger.log("%{bold}Today%{} is a %{italic; orange}sunny%{} day");

// Uses the code syntax
logger.log("%{1;32}1;32%{}");

// Uses the rgb syntax
logger.log("%{rgb(50, 212, 126)}rgb(50, 212, 126)%{}");