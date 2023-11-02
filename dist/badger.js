(()=>{"use strict";var e={947:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ArgumentHandler=void 0;var n=r(774),o=r(103),a=r(698),i=function(){function e(t){if(this.commandOptions=[],this.flags=[],this.setupCommandOptions(),this.parseArguments(t),void 0!==e.argumentHandler)throw new Error("Only a single instance of ArgumentHandler is expected.");var r=this.flags.find((function(e){return"readme"===e.commandOption.getName()}));void 0!==r&&(this.readmePath=r.value),e.argumentHandler=this}return e.prototype.setupCommandOptions=function(){this.commandOptions.push(new n.CommandOption("jest",new o.JestCoverageGenerator,!1,!0)),this.commandOptions.push(new n.CommandOption("readme",null,!1,!0))},e.prototype.parseArguments=function(e){var t=this;e.splice(0,2);for(var r=function(r){if(e[r].startsWith("--")){var o=e[r].slice(2),i=n.commandOptions.find((function(e){return e.getName()===o}));if(!i)throw new Error(a.Messages.ERROR_UNKNOWN_FLAG.replace("%s",o));if(i.requiresValue()){if(r+1<e.length&&!e[r+1].startsWith("--"))return n.addFlag(o,e[r+1],i),"continue";throw new Error(a.Messages.ERROR_MISSING_ARGUMENT_VALUE.replace("%s",o))}n.addFlag(o,null,i),n.commandOptions.forEach((function(e){if(e.isOptionRequired()&&!t.flags.find((function(t){return t.name===e.getName()})))throw new Error(a.Messages.ERROR_MISSING_REQUIRED_FLAG.replace("%s",e.getName()))}))}},n=this,o=0;o<e.length;o++)r(o)},e.prototype.addFlag=function(e,t,r){this.flags.push({name:e,value:t,commandOption:r})},e.prototype.getFlags=function(){return this.flags},e}();t.ArgumentHandler=i},520:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BadgeGenerator=void 0;var i=a(r(147)),s=r(947),u=function(){function e(){}return e.prototype.setupData=function(e,t,r,n){if(void 0===r&&(r=!1),this.commandOption=t,this.commandOption.requiresValue()&&!n)throw new Error("The --".concat(this.commandOption.getName()," requires an argument."));this.configPath=n,this.data=this.getJsonDataFromFilepath(this.configPath),this.name=e,this.isPercentage=r},e.prototype.generateBadgeURL=function(e,t){return"https://img.shields.io/badge/".concat(this.name,"-").concat(e).concat(this.isPercentage?"%25":"","-").concat(t)},e.prototype.generateHTMLBadge=function(e,t){var r=this.generateBadgeURL(e,t);return'<img src="'.concat(r,'" alt="').concat(this.name," ").concat(e).concat(this.isPercentage?"%":"",'">')},e.prototype.getJsonDataFromFilepath=function(e){try{return JSON.parse(i.readFileSync(e,"utf-8"))}catch(e){throw new Error("Error reading the config file.")}},e.prototype.updateReadmeWithBadge=function(e){var t=this,r=void 0!==s.ArgumentHandler.argumentHandler.readmePath?s.ArgumentHandler.argumentHandler.readmePath:"./README.md";i.readFile(r,"utf8",(function(n,o){if(n)throw new Error("Error reading file ".concat(n));var a=new RegExp("\x3c!-- ".concat(t.name," Badge --\x3e\\s*<img [^>]*>"));if(a.test(o)){var i=o.replace(a,"\x3c!-- ".concat(t.name," Badge --\x3e\n").concat(e));t.updateReadmeFile(r,i)}else i=o.replace("\x3c!-- ".concat(t.name," Badge --\x3e"),"\x3c!-- ".concat(t.name," Badge --\x3e\n").concat(e)),t.updateReadmeFile(r,i)})),console.log("".concat(this.name," Badge added to README."))},e.prototype.updateReadmeFile=function(e,t){i.writeFile(e,t,"utf8",(function(e){if(e)throw new Error("Error writing to README file: ".concat(e))}))},e}();t.BadgeGenerator=u},774:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CommandOption=void 0;var r=function(){function e(e,t,r,n){void 0===t&&(t=null),void 0===r&&(r=!1),void 0===n&&(n=!1),this.valueRequired=!1,this.isRequired=!1,this.name=e,this.badgeGenerator=t,this.isRequired=r,this.valueRequired=n}return e.prototype.hasGenerator=function(){return null!==this.badgeGenerator},e.prototype.runGenerator=function(e){this.badgeGenerator.generate(this,e)},e.prototype.getName=function(){return this.name},e.prototype.isOptionRequired=function(){return this.isRequired},e.prototype.requiresValue=function(){return this.valueRequired},e}();t.CommandOption=r},698:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.Messages=void 0,function(e){e.ERROR_MISSING_REQUIRED_FLAG="Please provide the %s flag",e.ERROR_MISSING_ARGUMENT_VALUE="The %s flag requires a value",e.ERROR_UNKNOWN_FLAG="Unknown flag: --%s"}(r||(t.Messages=r={}))},103:function(e,t,r){var n,o=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0}),t.JestCoverageGenerator=void 0;var a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.generate=function(e,t){this.setupData("Coverage",e,!0,t);var r=this.getFileCoveragePercentages(),n=this.getTotalCoverage(r),o=this.getCoverageStatus(n),a=this.generateHTMLBadge(n,o);this.updateReadmeWithBadge(a)},t.prototype.getFileCoveragePercentages=function(){var e=[];for(var t in this.data){var r=this.data[t];e.push(this.calculateCoverageMetric(r.s)),e.push(this.calculateCoverageMetric(r.f))}return e},t.prototype.calculateCoverageMetric=function(e){var t=Object.keys(e).length;return(Object.values(e).filter((function(e){return e>0})).length/t*100).toFixed(2)},t.prototype.getTotalCoverage=function(e){var t=e.length,r=e.reduce((function(e,t){return(Number(e)+Number(t)).toString()}));return(Number(r)/t).toFixed(2)},t.prototype.getCoverageStatus=function(e){var t=parseFloat(e);return t>=90?"green":t>=80?"yellow":"red"},t}(r(520).BadgeGenerator);t.JestCoverageGenerator=a},147:e=>{e.exports=require("fs")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0});var t=r(947);new t.ArgumentHandler(process.argv),t.ArgumentHandler.argumentHandler.getFlags().forEach((function(e){e.commandOption.hasGenerator()&&e.commandOption.runGenerator(e.value)}))})(),module.exports=n})();