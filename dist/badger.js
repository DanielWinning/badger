/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ArgumentHandler.ts":
/*!********************************!*\
  !*** ./src/ArgumentHandler.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArgumentHandler = void 0;\nvar CommandOption_1 = __webpack_require__(/*! ./CommandOption */ \"./src/CommandOption.ts\");\nvar Messages_1 = __webpack_require__(/*! ./Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar ArgumentHandler = /** @class */ (function () {\n    function ArgumentHandler(args) {\n        this.commandOptions = [];\n        this.flags = [];\n        this.setupCommandOptions();\n        this.parseArguments(args);\n    }\n    /**\n     * @returns {void}\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.setupCommandOptions = function () {\n        this.commandOptions.push(new CommandOption_1.CommandOption('json', true, true));\n        this.commandOptions.push(new CommandOption_1.CommandOption('jest', false, false));\n    };\n    ArgumentHandler.prototype.parseArguments = function (args) {\n        var _this = this;\n        var _loop_1 = function (i) {\n            if (args[i].startsWith('--')) {\n                var flag_1 = args[i].slice(2);\n                var commandOption = this_1.commandOptions.find(function (commandOption) { return commandOption.getName() === flag_1; });\n                if (!commandOption) {\n                    throw new Error(\"Unknown flag: --\".concat(flag_1));\n                }\n                if (commandOption.requiresValue()) {\n                    if ((i + 1) < args.length && !args[i + 1].startsWith('--')) {\n                        this_1.flags.push({\n                            name: flag_1,\n                            value: args[i + 1],\n                            commandOption: commandOption\n                        });\n                        return \"continue\";\n                    }\n                    else {\n                        throw new Error(\"Flag --\".concat(flag_1, \" requires a value.\"));\n                    }\n                }\n                this_1.flags.push({\n                    name: flag_1,\n                    value: null,\n                    commandOption: commandOption\n                });\n                this_1.commandOptions.forEach(function (option) {\n                    if (option.isOptionRequired() && !_this.flags.find(function (flag) { return flag.name === option.getName(); })) {\n                        throw new Error(Messages_1.Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));\n                    }\n                });\n            }\n        };\n        var this_1 = this;\n        for (var i = 0; i < args.length; i++) {\n            _loop_1(i);\n        }\n    };\n    ArgumentHandler.prototype.getFlags = function () {\n        return this.flags;\n    };\n    return ArgumentHandler;\n}());\nexports.ArgumentHandler = ArgumentHandler;\n\n\n//# sourceURL=webpack://badger/./src/ArgumentHandler.ts?");

/***/ }),

/***/ "./src/CommandOption.ts":
/*!******************************!*\
  !*** ./src/CommandOption.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommandOption = void 0;\nvar CommandOption = /** @class */ (function () {\n    function CommandOption(name, isRequired, valueRequired) {\n        if (isRequired === void 0) { isRequired = false; }\n        if (valueRequired === void 0) { valueRequired = false; }\n        this.valueRequired = false;\n        this.isRequired = false;\n        this.name = name;\n        this.isRequired = isRequired;\n        this.valueRequired = valueRequired;\n    }\n    /**\n     * @returns {string}\n     */\n    CommandOption.prototype.getName = function () {\n        return this.name;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.isOptionRequired = function () {\n        return this.isRequired;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.requiresValue = function () {\n        return this.valueRequired;\n    };\n    return CommandOption;\n}());\nexports.CommandOption = CommandOption;\n\n\n//# sourceURL=webpack://badger/./src/CommandOption.ts?");

/***/ }),

/***/ "./src/Enum/Messages.ts":
/*!******************************!*\
  !*** ./src/Enum/Messages.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Messages = void 0;\nvar Messages;\n(function (Messages) {\n    Messages[\"ERROR_MISSING_REQUIRED_FLAG\"] = \"Please provide the %s flag\";\n    Messages[\"ERROR_MISSING_ARGUMENT_VALUE\"] = \"The %s flag requires a value input\";\n    Messages[\"ERROR_INVALID_FLAG_PASSED\"] = \"You have passed an invalid flag: --%s\";\n})(Messages || (exports.Messages = Messages = {}));\n\n\n//# sourceURL=webpack://badger/./src/Enum/Messages.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar ArgumentHandler_1 = __webpack_require__(/*! ./ArgumentHandler */ \"./src/ArgumentHandler.ts\");\nvar argumentHandler = new ArgumentHandler_1.ArgumentHandler(process.argv);\nconsole.log(argumentHandler.getFlags());\n\n\n//# sourceURL=webpack://badger/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;