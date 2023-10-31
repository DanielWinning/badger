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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArgumentHandler = void 0;\nvar CommandOption_1 = __webpack_require__(/*! ./CommandOption */ \"./src/CommandOption.ts\");\nvar ArgumentHandler = /** @class */ (function () {\n    function ArgumentHandler(args) {\n        this.commandOptions = [];\n        this.flags = [];\n        this.setupCommandOptions();\n        this.parseArguments(args);\n    }\n    /**\n     * @returns {void}\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.setupCommandOptions = function () {\n        this.commandOptions.push(new CommandOption_1.CommandOption('json', true, true));\n    };\n    /**\n     * @param {Array<string>} args\n     *\n     * @returns {void}\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.parseArguments = function (args) {\n        var _this = this;\n        args.splice(0, 2);\n        var errors = [];\n        this.commandOptions.forEach(function (commandOption) {\n            var optionValue = args[args.indexOf(\"--\".concat(commandOption.getName())) + 1];\n            if (commandOption.isOptionRequired()) {\n                if (!args.includes(\"--\".concat(commandOption.getName()))) {\n                    errors.push(\"Please provide the \".concat(commandOption.getName(), \" flag\"));\n                }\n            }\n            if (commandOption.isOptionValueRequired()) {\n                if (optionValue === undefined || optionValue.startsWith('--')) {\n                    errors.push(\"The \".concat(commandOption.getName(), \" flag requires a value input\"));\n                }\n            }\n            if (errors.length) {\n                throw new Error(errors.join(', '));\n            }\n            _this.flags.push({\n                name: commandOption.getName(),\n                value: optionValue,\n            });\n        });\n    };\n    return ArgumentHandler;\n}());\nexports.ArgumentHandler = ArgumentHandler;\n\n\n//# sourceURL=webpack://badger/./src/ArgumentHandler.ts?");

/***/ }),

/***/ "./src/CommandOption.ts":
/*!******************************!*\
  !*** ./src/CommandOption.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommandOption = void 0;\nvar CommandOption = /** @class */ (function () {\n    function CommandOption(name, isRequired, valueRequired) {\n        if (isRequired === void 0) { isRequired = false; }\n        if (valueRequired === void 0) { valueRequired = false; }\n        this.valueRequired = false;\n        this.isRequired = false;\n        this.name = name;\n        this.isRequired = isRequired;\n        this.valueRequired = valueRequired;\n    }\n    /**\n     * @returns {string}\n     */\n    CommandOption.prototype.getName = function () {\n        return this.name;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.isOptionRequired = function () {\n        return this.isRequired;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.isOptionValueRequired = function () {\n        return this.valueRequired;\n    };\n    return CommandOption;\n}());\nexports.CommandOption = CommandOption;\n\n\n//# sourceURL=webpack://badger/./src/CommandOption.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar ArgumentHandler_1 = __webpack_require__(/*! ./ArgumentHandler */ \"./src/ArgumentHandler.ts\");\nnew ArgumentHandler_1.ArgumentHandler(process.argv);\n\n\n//# sourceURL=webpack://badger/./src/index.ts?");

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