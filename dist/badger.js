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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArgumentHandler = void 0;\nvar CommandOption_1 = __webpack_require__(/*! ./CommandOption */ \"./src/CommandOption.ts\");\nvar Messages_1 = __webpack_require__(/*! ./Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar ArgumentHandler = /** @class */ (function () {\n    function ArgumentHandler(args, additionalCommandOptions) {\n        var _this = this;\n        this.commandOptions = [];\n        this.flags = [];\n        if (ArgumentHandler.argumentHandler !== undefined) {\n            throw new Error('Only a single instance of ArgumentHandler is expected.');\n        }\n        if (additionalCommandOptions) {\n            additionalCommandOptions.forEach(function (commandOption) {\n                _this.commandOptions.push(commandOption);\n            });\n        }\n        this.setupCommandOptions();\n        this.parseArguments(args);\n        var readmeCommand = this.flags.find(function (flag) {\n            return flag.commandOption.getName() === 'readme';\n        });\n        if (readmeCommand !== undefined) {\n            this.readmePath = readmeCommand.value;\n        }\n        ArgumentHandler.argumentHandler = this;\n    }\n    /**\n     * @returns {void}\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.setupCommandOptions = function () {\n        this.commandOptions.push(new CommandOption_1.CommandOption('jest', false, true));\n        this.commandOptions.push(new CommandOption_1.CommandOption('readme', false, true));\n        this.commandOptions.push(new CommandOption_1.CommandOption('version', false, true));\n    };\n    /**\n     * @param {Array<string>} args\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.parseArguments = function (args) {\n        var _this = this;\n        args.splice(0, 2);\n        var _loop_1 = function (i) {\n            if (args[i].startsWith('--')) {\n                var flag_1 = args[i].slice(2);\n                var commandOption = this_1.commandOptions.find(function (commandOption) {\n                    return commandOption.getName() === flag_1;\n                });\n                if (!commandOption) {\n                    throw new Error(Messages_1.Messages.ERROR_UNKNOWN_FLAG.replace('%s', flag_1));\n                }\n                if (commandOption.requiresValue()) {\n                    if ((i + 1) < args.length && !args[i + 1].startsWith('--')) {\n                        this_1.addFlag(flag_1, args[i + 1], commandOption);\n                        return \"continue\";\n                    }\n                    else {\n                        throw new Error(Messages_1.Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', flag_1));\n                    }\n                }\n                this_1.addFlag(flag_1, null, commandOption);\n            }\n        };\n        var this_1 = this;\n        for (var i = 0; i < args.length; i++) {\n            _loop_1(i);\n        }\n        this.commandOptions.forEach(function (option) {\n            if (option.isOptionRequired() && !_this.flags.find(function (flag) { return flag.name === option.getName(); })) {\n                throw new Error(Messages_1.Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));\n            }\n        });\n    };\n    /**\n     * @param {string} name\n     * @param {string|null} value\n     * @param {CommandOption} commandOption\n     *\n     * @private\n     */\n    ArgumentHandler.prototype.addFlag = function (name, value, commandOption) {\n        this.flags.push({\n            name: name,\n            value: value,\n            commandOption: commandOption\n        });\n    };\n    /**\n     * @returns {Array<IFlag>}\n     */\n    ArgumentHandler.prototype.getFlags = function () {\n        return this.flags;\n    };\n    return ArgumentHandler;\n}());\nexports.ArgumentHandler = ArgumentHandler;\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/ArgumentHandler.ts?");

/***/ }),

/***/ "./src/BadgeGenerator.ts":
/*!*******************************!*\
  !*** ./src/BadgeGenerator.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BadgeGenerator = void 0;\nvar fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nvar ArgumentHandler_1 = __webpack_require__(/*! ./ArgumentHandler */ \"./src/ArgumentHandler.ts\");\nvar Messages_1 = __webpack_require__(/*! ./Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar BadgeGenerator = /** @class */ (function () {\n    function BadgeGenerator() {\n    }\n    /**\n     * @param {string} name\n     * @param {CommandOption} commandOption\n     * @param {boolean} isPercentage\n     * @param {string?} arg\n     *\n     * @returns {boolean}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.setupData = function (name, commandOption, isPercentage, arg) {\n        if (isPercentage === void 0) { isPercentage = false; }\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                return [2 /*return*/, new Promise(function (resolve, reject) {\n                        _this.commandOption = commandOption;\n                        if (_this.commandOption.requiresValue() && !arg) {\n                            reject(Messages_1.Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', _this.commandOption.getName()));\n                        }\n                        _this.configPath = arg;\n                        _this.data = _this.getJsonDataFromFilepath(_this.configPath);\n                        _this.name = name;\n                        _this.isPercentage = isPercentage;\n                        resolve(true);\n                    })];\n            });\n        });\n    };\n    /**\n     * @param {string} value\n     * @param {string} color\n     *\n     * @returns {string}\n     *\n     * @protected\n     */\n    BadgeGenerator.prototype.generateBadgeURL = function (value, color) {\n        return \"https://img.shields.io/badge/\".concat(this.name, \"-\").concat(value).concat(this.isPercentage ? '%25' : '', \"-\").concat(color);\n    };\n    /**\n     * @param {string} value\n     * @param {string} color\n     *\n     * @returns {string}\n     *\n     * @protected\n     */\n    BadgeGenerator.prototype.generateHTMLBadge = function (value, color) {\n        var badgeURL = this.generateBadgeURL(value, color);\n        return \"<img src=\\\"\".concat(badgeURL, \"\\\" alt=\\\"\").concat(this.name, \" \").concat(value).concat(this.isPercentage ? '%' : '', \"\\\">\");\n    };\n    /**\n     * @param {string} filepath\n     *\n     * @returns {Record<string, any>}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.getJsonDataFromFilepath = function (filepath) {\n        try {\n            return JSON.parse(fs.readFileSync(filepath, 'utf-8'));\n        }\n        catch (error) {\n            throw new Error(Messages_1.Messages.ERROR_READING_FROM_FILEPATH.replace('%s', filepath));\n        }\n    };\n    /**\n     * @param {string} badgeHTML\n     *\n     * @protected\n     */\n    BadgeGenerator.prototype.updateReadmeWithBadge = function (badgeHTML) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                return [2 /*return*/, new Promise(function (resolve, reject) {\n                        var _a;\n                        var readmePath = ((_a = ArgumentHandler_1.ArgumentHandler.argumentHandler) === null || _a === void 0 ? void 0 : _a.readmePath) !== undefined\n                            ? ArgumentHandler_1.ArgumentHandler.argumentHandler.readmePath\n                            : './README.md';\n                        fs.readFile(readmePath, 'utf8', function (err, data) {\n                            if (err) {\n                                reject(err);\n                            }\n                            else {\n                                var badgeRegex = new RegExp(\"<!-- \".concat(_this.name, \" Badge -->\\\\s*<img [^>]*>\"));\n                                if (badgeRegex.test(data)) {\n                                    var updatedReadme = data.replace(badgeRegex, \"<!-- \".concat(_this.name, \" Badge -->\\n\").concat(badgeHTML));\n                                    _this.updateReadmeFile(readmePath, updatedReadme);\n                                    resolve(\"\".concat(_this.name, \" Badge added to README.\"));\n                                }\n                                else {\n                                    var updatedReadme = data.replace(\"<!-- \".concat(_this.name, \" Badge -->\"), \"<!-- \".concat(_this.name, \" Badge -->\\n\").concat(badgeHTML));\n                                    _this.updateReadmeFile(readmePath, updatedReadme);\n                                    resolve(\"\".concat(_this.name, \" Badge added to README.\"));\n                                }\n                            }\n                        });\n                    })];\n            });\n        });\n    };\n    /**\n     * @param {string} readmePath\n     * @param {string} updatedReadme\n     *\n     * @returns {void}\n     *\n     * @private\n     */\n    BadgeGenerator.prototype.updateReadmeFile = function (readmePath, updatedReadme) {\n        fs.writeFile(readmePath, updatedReadme, 'utf8', function (err) {\n            if (err) {\n                throw new Error(\"Error writing to README file: \".concat(err));\n            }\n        });\n    };\n    return BadgeGenerator;\n}());\nexports.BadgeGenerator = BadgeGenerator;\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/BadgeGenerator.ts?");

/***/ }),

/***/ "./src/CommandOption.ts":
/*!******************************!*\
  !*** ./src/CommandOption.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommandOption = void 0;\nvar CommandOption = /** @class */ (function () {\n    function CommandOption(name, isRequired, valueRequired) {\n        if (isRequired === void 0) { isRequired = false; }\n        if (valueRequired === void 0) { valueRequired = false; }\n        this.valueRequired = false;\n        this.isRequired = false;\n        this.name = name;\n        this.isRequired = isRequired;\n        this.valueRequired = valueRequired;\n    }\n    /**\n     * @returns {string}\n     */\n    CommandOption.prototype.getName = function () {\n        return this.name;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.isOptionRequired = function () {\n        return this.isRequired;\n    };\n    /**\n     * @returns {boolean}\n     */\n    CommandOption.prototype.requiresValue = function () {\n        return this.valueRequired;\n    };\n    return CommandOption;\n}());\nexports.CommandOption = CommandOption;\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/CommandOption.ts?");

/***/ }),

/***/ "./src/Enum/Messages.ts":
/*!******************************!*\
  !*** ./src/Enum/Messages.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Messages = void 0;\nvar Messages;\n(function (Messages) {\n    Messages[\"ERROR_MISSING_REQUIRED_FLAG\"] = \"Please provide the --%s flag\";\n    Messages[\"ERROR_MISSING_ARGUMENT_VALUE\"] = \"The --%s flag requires a value\";\n    Messages[\"ERROR_UNKNOWN_FLAG\"] = \"Unknown flag: --%s\";\n    Messages[\"ERROR_READING_FROM_FILEPATH\"] = \"Error reading from the specified file %s\";\n    Messages[\"ERROR_READING_README\"] = \"Error reading README file.\";\n})(Messages || (exports.Messages = Messages = {}));\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/Enum/Messages.ts?");

/***/ }),

/***/ "./src/Generators/JestCoverageGenerator.ts":
/*!*************************************************!*\
  !*** ./src/Generators/JestCoverageGenerator.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.JestCoverageGenerator = void 0;\nvar BadgeGenerator_1 = __webpack_require__(/*! ../BadgeGenerator */ \"./src/BadgeGenerator.ts\");\nvar Messages_1 = __webpack_require__(/*! ../Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar JestCoverageGenerator = /** @class */ (function (_super) {\n    __extends(JestCoverageGenerator, _super);\n    function JestCoverageGenerator() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    JestCoverageGenerator.prototype.getName = function () {\n        return 'Coverage';\n    };\n    /**\n     * @param {CommandOption} commandOption\n     * @param {string?} arg\n     *\n     * @returns {Promise<any>}\n     */\n    JestCoverageGenerator.prototype.generate = function (commandOption, arg) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                return [2 /*return*/, new Promise(function (resolve, reject) {\n                        _this.setupData(_this.getName(), commandOption, true, arg)\n                            .then(function () {\n                            var filePercentages = _this.getFileCoveragePercentages();\n                            var totalCoveragePercentage = _this.getTotalCoverage(filePercentages);\n                            var coverageStatus = _this.getCoverageStatus(totalCoveragePercentage);\n                            var badge = _this.generateHTMLBadge(totalCoveragePercentage, coverageStatus);\n                            _this.updateReadmeWithBadge(badge)\n                                .then(function (data) {\n                                resolve(data);\n                            })\n                                .catch(function () {\n                                reject(Messages_1.Messages.ERROR_READING_README);\n                            });\n                        })\n                            .catch(function (err) { return reject(err); });\n                    })];\n            });\n        });\n    };\n    /**\n     * @returns {Array<string>}\n     *\n     * @private\n     */\n    JestCoverageGenerator.prototype.getFileCoveragePercentages = function () {\n        var coveragePercentages = [];\n        for (var filepath in this.data) {\n            var fileData = this.data[filepath];\n            coveragePercentages.push(this.calculateCoverageMetric(fileData.s));\n            coveragePercentages.push(this.calculateCoverageMetric(fileData.f));\n        }\n        return coveragePercentages;\n    };\n    /**\n     * @param {Record<string, any>} data\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    JestCoverageGenerator.prototype.calculateCoverageMetric = function (data) {\n        var total = Object.keys(data).length, covered = Object.values(data).filter(function (count) { return count > 0; }).length;\n        return ((covered / total) * 100).toFixed(2);\n    };\n    /**\n     * @param {Array<string>} coveragePercentages\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    JestCoverageGenerator.prototype.getTotalCoverage = function (coveragePercentages) {\n        var count = coveragePercentages.length, sum = coveragePercentages.reduce(function (runningTotal, percentage) {\n            return (Number(runningTotal) + Number(percentage)).toString();\n        });\n        return (Number(sum) / count).toFixed(2);\n    };\n    /**\n     * @param {string} totalPercentage\n     *\n     * @returns {string}\n     *\n     * @private\n     */\n    JestCoverageGenerator.prototype.getCoverageStatus = function (totalPercentage) {\n        var coverage = parseFloat(totalPercentage);\n        if (coverage >= 90) {\n            return 'green';\n        }\n        else if (coverage >= 80) {\n            return 'yellow';\n        }\n        else {\n            return 'red';\n        }\n    };\n    return JestCoverageGenerator;\n}(BadgeGenerator_1.BadgeGenerator));\nexports.JestCoverageGenerator = JestCoverageGenerator;\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/Generators/JestCoverageGenerator.ts?");

/***/ }),

/***/ "./src/Generators/VersionGenerator.ts":
/*!********************************************!*\
  !*** ./src/Generators/VersionGenerator.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.VersionGenerator = void 0;\nvar BadgeGenerator_1 = __webpack_require__(/*! ../BadgeGenerator */ \"./src/BadgeGenerator.ts\");\nvar Messages_1 = __webpack_require__(/*! ../Enum/Messages */ \"./src/Enum/Messages.ts\");\nvar VersionGenerator = /** @class */ (function (_super) {\n    __extends(VersionGenerator, _super);\n    function VersionGenerator() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    /**\n     * @returns {string}\n     */\n    VersionGenerator.prototype.getName = function () {\n        return 'Version';\n    };\n    VersionGenerator.prototype.generate = function (commandOption, arg) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                return [2 /*return*/, new Promise(function (resolve, reject) {\n                        var _a;\n                        if (_this.setupData(_this.getName(), commandOption, false, arg)) {\n                            _this.updateReadmeWithBadge(_this.generateHTMLBadge((_a = _this.data.version) !== null && _a !== void 0 ? _a : 'N/A', 'blue')).then(function (data) {\n                                resolve(data);\n                            }).catch(function () {\n                                reject(Messages_1.Messages.ERROR_READING_README);\n                            });\n                        }\n                    })];\n            });\n        });\n    };\n    return VersionGenerator;\n}(BadgeGenerator_1.BadgeGenerator));\nexports.VersionGenerator = VersionGenerator;\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/Generators/VersionGenerator.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar ArgumentHandler_1 = __webpack_require__(/*! ./ArgumentHandler */ \"./src/ArgumentHandler.ts\");\nvar JestCoverageGenerator_1 = __webpack_require__(/*! ./Generators/JestCoverageGenerator */ \"./src/Generators/JestCoverageGenerator.ts\");\nvar VersionGenerator_1 = __webpack_require__(/*! ./Generators/VersionGenerator */ \"./src/Generators/VersionGenerator.ts\");\nnew ArgumentHandler_1.ArgumentHandler(process.argv);\nvar badgeGenerators = {\n    jest: new JestCoverageGenerator_1.JestCoverageGenerator(),\n    version: new VersionGenerator_1.VersionGenerator(),\n};\nArgumentHandler_1.ArgumentHandler.argumentHandler.getFlags().forEach(function (flag) { return __awaiter(void 0, void 0, void 0, function () {\n    var generator;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                generator = badgeGenerators[flag.name];\n                if (!generator) {\n                    return [2 /*return*/];\n                }\n                return [4 /*yield*/, generator.generate(flag.commandOption, flag.value)\n                        .then(function (response) {\n                        console.log(response);\n                    }).catch(function (error) {\n                        console.error(error);\n                    })];\n            case 1:\n                _a.sent();\n                return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack://@dannyxcii/badger/./src/index.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;