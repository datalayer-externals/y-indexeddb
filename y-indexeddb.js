/**
 * y-indexeddb - IndexedDB database adapter for Yjs
 * @version v9.0.0-2
 * @license MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.extendYIndexedDBPersistence=e()}(this,function(){"use strict";function t(t){return new Promise(function(e,r){t.onerror=function(t){r(new Error(t.target.error))},t.onblocked=function(){location.reload()},t.onsuccess=function(t){e(t.target.result)}})}function e(t){return new Promise(function(e,r){var n=indexedDB.open(t);window.r1=n,n.onupgradeneeded=function(t){var e=t.target.result;e.objectStoreNames.contains("model")&&(e.deleteObjectStore("updates"),e.deleteObjectStore("model"),e.deleteObjectStore("custom")),e.createObjectStore("updates",{autoIncrement:!0}),e.createObjectStore("model"),e.createObjectStore("custom")},n.onerror=function(t){r(new Error(t.target.error))},n.onblocked=function(){location.reload()},n.onsuccess=function(t){var r=t.target.result;r.onversionchange=function(){r.close()},e(r)}})}function r(r){var l=function(l){function f(t){n(this,f);var e=u(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,t));return window.addEventListener("unload",function(){e.ys.forEach(function(t,e){null!==t.db?t.db.close():t._db.then(function(t){return t.close()})})}),e}return c(f,l),o(f,[{key:"init",value:function(t){var n=this.ys.get(t),o=t.room;n.db=null;var i=e(o);i.then(function(t){n.db=t}),n.channel=new BroadcastChannel("__yjs__"+o),n.channel.addEventListener("message",function(e){n.mutualExcluse(function(){t.transact(function(){r.utils.integrateRemoteStructs(t,new r.utils.BinaryDecoder(e.data))})})});var c=!0;return n.mutualExcluse=function(t){if(c){c=!1;try{t()}catch(t){throw c=!0,new Error(t)}c=!0}},i}},{key:"deinit",value:function(t){this.ys.get(t).db.close(),i(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"deinit",this).call(this,t)}},{key:"set",value:function(e,r,n){return t(this.ys.get(e).db.transaction(["custom"],"readwrite").objectStore("custom").put(n,r))}},{key:"get",value:function(e,r){return t(this.ys.get(e).db.transaction(["custom"],"readwrite").objectStore("custom").get(r))}},{key:"removePersistedData",value:function(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return i(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"removePersistedData",this).call(this,e,r),t(indexedDB.deleteDatabase(e))}},{key:"saveUpdate",value:function(e,r){var n=this,o=this.ys.get(e);o.channel.postMessage(r);var i=o.db.transaction(["updates"],"readwrite"),c=i.objectStore("updates");c.put(r),t(c.count()).then(function(t){t>=s&&n.persist(e)})}},{key:"saveStruct",value:function(t,e){var r=this;this.ys.get(t).mutualExcluse(function(){i(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"saveStruct",r).call(r,t,e)})}},{key:"retrieve",value:function(e){var r=this,n=this.ys.get(e),o=n.db.transaction(["updates","model"],"readonly"),c=o.objectStore("model"),u=o.objectStore("updates");return Promise.all([t(c.get(0)),t(u.getAll())]).then(function(t){var o=a(t,2),c=o[0],u=o[1];n.mutualExcluse(function(){i(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"retrieve",r).call(r,e,c,u)})})}},{key:"persist",value:function(e){var n=this,o=this.ys.get(e),i=o.db,c=i.transaction(["updates","model"],"readwrite"),u=c.objectStore("updates");return t(u.getAll()).then(function(t){r.AbstractPersistence.prototype.retrieve.call(n,e,null,t);var o=r.AbstractPersistence.prototype.persist.call(n,e);if(t.length>0){c.objectStore("model").put(o,0),u.clear()}})}}]),f}(r.AbstractPersistence);return r.IndexedDB=l,l}var n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=function t(e,r,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,r);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,r,n)}if("value"in o)return o.value;var c=o.get;if(void 0!==c)return c.call(n)},c=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},u=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},a=function(){function t(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var c,u=t[Symbol.iterator]();!(n=(c=u.next()).done)&&(r.push(c.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=500;return"undefined"!=typeof Y&&r(Y),r});
//# sourceMappingURL=y-indexeddb.js.map