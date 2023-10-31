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
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArgumentHandler = void 0;\nvar ArgumentHandler = /** @class */ (function () {\n    function ArgumentHandler(args) {\n        this.REQUIRED_FLAGS = [\n            'json',\n        ];\n        console.log(args);\n        this.parseOptions(args);\n        console.log(args);\n    }\n    ArgumentHandler.prototype.parseOptions = function (args) {\n        var _this = this;\n        args.splice(0, 2);\n        var errors = [];\n        this.flags = args.filter(function (arg) {\n            return arg.startsWith('--');\n        });\n        this.flags = this.flags.map(function (flag) {\n            return flag.replace('--', '');\n        });\n        this.REQUIRED_FLAGS.forEach(function (requiredFlag) {\n            if (!_this.flags.includes(requiredFlag)) {\n                errors.push(\"Error: please provided the required --\".concat(requiredFlag, \" flag\"));\n            }\n        });\n        if (errors.length) {\n            throw new Error(errors.join(' | '));\n        }\n    };\n    return ArgumentHandler;\n}());\nexports.ArgumentHandler = ArgumentHandler;\n\n\n//# sourceURL=webpack://badger/./src/ArgumentHandler.ts?");

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