"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==_typeof(define.amd)?define(t):this[e]=t()}("qoob",function(){var e=function(){function e(t){return _classCallCheck(this,e),"string"==typeof t?this.selector=document.querySelectorAll(t):this.selector=t}return _createClass(e,[{key:"first",value:function(){return"array"==typeof this.selector?new e(this.selector[0]):this}},{key:"on",value:function(e,t){return"array"==typeof this.selector?this._forEach(this.selector,function(n,o){return this._addEventListener(n,e,t)}):this._addEventListener(this.selector,e,t)}},{key:"_addEventListener",value:function(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent("on"+t,function(){n.call(e)})}},{key:"_forEach",value:function(e,t){for(var n=0;n<e.length;n++)t(e[n],n)}}]),e}();return function(t){return new e(t)}});