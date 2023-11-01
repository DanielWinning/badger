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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArgumentHandler = void 0;\nvar CommandOption_1 = __webpack_require__(/*! ./CommandOption */ \"./src/CommandOption.ts\");\nvar Messages_1 = __webpack_require__(/*! ./Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar ArgumentHandler = /** @class */ (function () {\n    function ArgumentHandler(args) {\n        this.commandOptions = [];\n        this.flags = [];\n        this.setupCommandOptions();\n        this.parseArguments(args);\n    }\n    /**\n     * @returns {void}\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.setupCommandOptions = function () {\n        this.commandOptions.push(new CommandOption_1.CommandOption('json', true, true));\n        this.commandOptions.push(new CommandOption_1.CommandOption('jest', false, false));\n    };\n    ArgumentHandler.prototype.parseArguments = function (args) {\n        var _this = this;\n        args.splice(0, 2);\n        var _loop_1 = function (i) {\n            if (args[i].startsWith('--')) {\n                var flag_1 = args[i].slice(2);\n                var commandOption = this_1.commandOptions.find(function (commandOption) { return commandOption.getName() === flag_1; });\n                if (!commandOption) {\n                    throw new Error(Messages_1.Messages.ERROR_UNKNOWN_FLAG.replace('%s', flag_1));\n                }\n                if (commandOption.requiresValue()) {\n                    if ((i + 1) < args.length && !args[i + 1].startsWith('--')) {\n                        this_1.addFlag(flag_1, args[i + 1], commandOption);\n                        return \"continue\";\n                    }\n                    else {\n                        throw new Error(Messages_1.Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', flag_1));\n                    }\n                }\n                this_1.addFlag(flag_1, null, commandOption);\n                this_1.commandOptions.forEach(function (option) {\n                    if (option.isOptionRequired() && !_this.flags.find(function (flag) { return flag.name === option.getName(); })) {\n                        throw new Error(Messages_1.Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));\n                    }\n                });\n            }\n        };\n        var this_1 = this;\n        for (var i = 0; i < args.length; i++) {\n            _loop_1(i);\n        }\n    };\n    /**\n     * @param {string} name\n     * @param {string|null} value\n     * @param {CommandOption} commandOption\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.addFlag = function (name, value, commandOption) {\n        this.flags.push({\n            name: name,\n            value: value,\n            commandOption: commandOption\n        });\n    };\n    ArgumentHandler.prototype.getFlags = function () {\n        return this.flags;\n    };\n    return ArgumentHandler;\n}());\nexports.ArgumentHandler = ArgumentHandler;\n\n\n//# sourceURL=webpack://badger/./src/ArgumentHandler.ts?");

/***/ }),

/***/ "./src/BadgeGenerator.ts":
/*!*******************************!*\
  !*** ./src/BadgeGenerator.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BadgeGenerator = void 0;\nvar fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nvar BadgeGenerator = /** @class */ (function () {\n    function BadgeGenerator(flags) {\n        this.flags = flags;\n        var configFlag = this.flags.find(function (flag) { return flag.name === 'json'; });\n        if (configFlag === undefined) {\n            throw new Error('You must provide the --json flag with a path to the coverage JSON you wish to parse.');\n        }\n        this.configPath = configFlag.value;\n        this.data = this.getJsonDataFromFilepath(this.configPath);\n        this.run();\n    }\n    BadgeGenerator.prototype.run = function () {\n        var passedFlags = this.flatFlags();\n        if (passedFlags.includes('jest')) {\n            var fileCoverage = this.getJestCoveragePercentagesForFiles();\n            var totalCoverage = this.getTotalJestCoverage(fileCoverage);\n            var coverageStatus = this.getCoverageStatus(totalCoverage);\n            var badge = this.generateHTMLBadge(totalCoverage, coverageStatus);\n            this.updateReadmeWithBadge(badge);\n        }\n    };\n    /**\n     * @returns {Array<string>}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.flatFlags = function () {\n        return this.flags.map(function (flag) { return flag.name; });\n    };\n    /**\n     * @returns {Array<string>}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.getJestCoveragePercentagesForFiles = function () {\n        var coveragePercentages = [];\n        for (var filepath in this.data) {\n            var fileData = this.data[filepath];\n            coveragePercentages.push(this.calculateCoverageFromJestData(fileData.s));\n            coveragePercentages.push(this.calculateCoverageFromJestData(fileData.f));\n        }\n        return coveragePercentages;\n    };\n    /**\n     * @param {Record<string, any>} coveragePercentages\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.getTotalJestCoverage = function (coveragePercentages) {\n        var count = coveragePercentages.length, sum = coveragePercentages.reduce(function (runningTotal, percentage) {\n            return (Number(runningTotal) + Number(percentage)).toString();\n        });\n        return (Number(sum) / count).toFixed(2);\n    };\n    /**\n     * @param {string} totalPercentage\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.getCoverageStatus = function (totalPercentage) {\n        var coverage = parseFloat(totalPercentage);\n        if (coverage >= 90) {\n            return 'green';\n        }\n        else if (coverage >= 80) {\n            return 'yellow';\n        }\n        else {\n            return 'red';\n        }\n    };\n    /**\n     * @param {string} totalCoverage\n     * @param {string} coverageStatus\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.generateHTMLBadge = function (totalCoverage, coverageStatus) {\n        var badgeURL = this.generateBadgeURL(totalCoverage, coverageStatus);\n        return \"<img src=\\\"\".concat(badgeURL, \"\\\" alt=\\\"Coverage \").concat(totalCoverage, \"%\\\">\");\n    };\n    /**\n     * @param {string} totalCoverage\n     * @param {string} coverageStatus\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.generateBadgeURL = function (totalCoverage, coverageStatus) {\n        return \"https://img.shields.io/badge/Coverage-\".concat(totalCoverage, \"%25-\").concat(coverageStatus, \".svg\");\n    };\n    BadgeGenerator.prototype.updateReadmeWithBadge = function (badgeHTML) {\n        var _this = this;\n        var readmePath = './README.md';\n        fs_1.default.readFile(readmePath, 'utf8', function (err, data) {\n            if (err) {\n                console.error(\"Error reading file \".concat(err));\n                return;\n            }\n            var badgeRegex = /<!-- Coverage Badge -->\\n(<img[^>]*>)/;\n            if (badgeRegex.test(data)) {\n                var updatedReadme = data.replace(badgeRegex, \"<!-- Coverage Badge -->\\n\".concat(badgeHTML));\n                _this.updateReadmeFile(readmePath, updatedReadme);\n            }\n            else {\n                var updatedReadme = data.replace(/(<!-- Coverage Badge -->)/, \"$1\\n\".concat(badgeHTML));\n                _this.updateReadmeFile(readmePath, updatedReadme);\n            }\n        });\n    };\n    /**\n     * @param {string} readmePath\n     * @param {string} updatedReadme\n     *\n     * @returns {void}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.updateReadmeFile = function (readmePath, updatedReadme) {\n        fs_1.default.writeFile(readmePath, updatedReadme, 'utf8', function (err) {\n            if (err) {\n                console.error(\"Error writing to README file: \".concat(err));\n            }\n            else {\n                console.log('Badge added to README');\n            }\n        });\n    };\n    /**\n     * @param {Record<string, any>} data\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.calculateCoverageFromJestData = function (data) {\n        var total = Object.keys(data).length, covered = Object.values(data).filter(function (count) { return count > 0; }).length;\n        return ((covered / total) * 100).toFixed(2);\n    };\n    /**\n     * @param {string} filepath\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.getJsonDataFromFilepath = function (filepath) {\n        try {\n            return JSON.parse(fs_1.default.readFileSync(filepath, 'utf-8'));\n        }\n        catch (error) {\n            throw new Error('Error reading the config file.');\n        }\n    };\n    return BadgeGenerator;\n}());\nexports.BadgeGenerator = BadgeGenerator;\n\n\n//# sourceURL=webpack://badger/./src/BadgeGenerator.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Messages = void 0;\nvar Messages;\n(function (Messages) {\n    Messages[\"ERROR_MISSING_REQUIRED_FLAG\"] = \"Please provide the %s flag\";\n    Messages[\"ERROR_MISSING_ARGUMENT_VALUE\"] = \"The %s flag requires a value\";\n    Messages[\"ERROR_UNKNOWN_FLAG\"] = \"Unknown flag: --%s\";\n})(Messages || (exports.Messages = Messages = {}));\n\n\n//# sourceURL=webpack://badger/./src/Enum/Messages.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar ArgumentHandler_1 = __webpack_require__(/*! ./ArgumentHandler */ \"./src/ArgumentHandler.ts\");\nvar BadgeGenerator_1 = __webpack_require__(/*! ./BadgeGenerator */ \"./src/BadgeGenerator.ts\");\nvar argumentHandler = new ArgumentHandler_1.ArgumentHandler(process.argv);\nnew BadgeGenerator_1.BadgeGenerator(argumentHandler.getFlags());\n\n\n//# sourceURL=webpack://badger/./src/index.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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