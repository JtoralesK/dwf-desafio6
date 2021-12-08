// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jnNYs":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "b826f800c8450ebe";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1mazX":[function(require,module,exports) {
var _router = require("./router");
var _state = require("./state");
var _button = require("./components/button/button");
var _text = require("./components/text/text");
var _tijera = require("./components/manos/tijera");
var _papel = require("./components/manos/papel");
var _piedra = require("./components/manos/piedra");
(function() {
    _state.state.init();
    const container = document.querySelector(".main-container");
    _router.initRouter(container);
    _button.elButton();
    _text.initText();
    _tijera.initTijera();
    _papel.initPapel();
    _piedra.initPiedra();
})();

},{"./router":"km3vf","./state":"8yenE","./components/button/button":"aSwMc","./components/text/text":"1zcpL","./components/manos/tijera":"2EcJM","./components/manos/papel":"dk7tI","./components/manos/piedra":"lW0rk"}],"km3vf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRouter", ()=>initRouter
);
var _home = require("./pages/home/home");
var _instru = require("./pages/instrucciones/instru");
var _play = require("./pages/play/play");
var _move = require("./pages/move/move");
var _results = require("./pages/results/results");
const routes = [
    {
        path: /\/desafio-final-dwf-5/,
        page: _home.home
    },
    {
        path: /\/desafio-final-dwf-5\/instrucciones/,
        page: _instru.instru
    },
    {
        path: /\/desafio-final-dwf-5\/play/,
        page: _play.play
    },
    {
        path: /\/desafio-final-dwf-5\/move/,
        page: _move.move
    },
    {
        path: /\/desafio-final-dwf-5\/results/,
        page: _results.results
    }
];
function initRouter(container) {
    function goTo(path) {
        history.pushState({
        }, "", path);
        handleRoute(path);
    }
    function handleRoute(route) {
        for (const itera of routes)if (itera.path.test(route)) {
            const el = itera.page({
                goTo: goTo
            });
            if (container.firstChild) container.firstChild.remove();
            container.appendChild(el);
        }
    }
    if (location.host.includes("github.io")) {
        goTo("/desafio-final-dwf-5");
        console.log("hola");
    }
    if (location.pathname == "/") {
        goTo("/desafio-final-dwf-5");
        console.log("hola");
    } else handleRoute(location.pathname);
    window.onpopstate = function() {
        handleRoute(location.pathname);
    };
}

},{"./pages/home/home":"9SRtj","./pages/instrucciones/instru":"aDbaM","./pages/play/play":"gDFwN","./pages/move/move":"ayOLG","./pages/results/results":"9ZLsh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9SRtj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "home", ()=>home
);
var _homeCss = require("./home.css");
function home(params) {
    const div = document.createElement("div");
    div.classList.add("page-home");
    div.innerHTML = `
    <div class="container__home">
    <div class="container__content__home">
    <h1 class="title__home">Piedra Papel o Tijera</h1>
   <div class="div__home">
   <button-el class="button__home">Empezar</button-el>
   </div>
    <div class="container__manos">
    <tijera-el class="tijera__home manos" ></tijera-el>
    <piedra-el class="piedra__home manos" ></piedra-el>
    <papel-el class="papel__home manos"></papel-el>
    </div>
    </div>  
    </div>
   
    `;
    const button = div.querySelector(".button__home");
    button.addEventListener("click", ()=>{
        params.goTo("/desafio-final-dwf-5/instrucciones");
    });
    return div;
}

},{"./home.css":"iMP4B","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iMP4B":[function() {},{}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aDbaM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "instru", ()=>instru
);
function instru(params) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="container__home">
      <div class="container__content__home">
      <text-component class="text" >Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-component>
      <button-el class="button__jugar">Jugar</button-el>
      <div class="container__manos">
      <tijera-el class="manos buttonTijera" ></tijera-el>
      <piedra-el class="manos buttonPiedra"></piedra-el>
      <papel-el class="manos buttonPapel"></papel-el>
     </div>
      </div>  
     </div>
    `;
    const button = div.querySelector(".button__jugar");
    button.addEventListener("click", (ev)=>{
        params.goTo("/desafio-final-dwf-5/play");
    });
    return div;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gDFwN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "play", ()=>play
);
var _tempo = require("../../components/temporizador/tempo");
var _state = require("../../state");
function play(parametros) {
    const div = document.createElement("div");
    var reloj = _tempo.cargarSegundo({
        seConcretaJugada: seConcretaJugada
    });
    div.innerHTML = `
    <div class="container__home">
      <div class="container__content__home">
      <div class="container__manos container__play">
      <div class="hijo">
      <tijera-el variante="movimiento" class="manos buttonTijera" ></tijera-el>
      <piedra-el variante="movimiento" class="manos buttonPiedra"></piedra-el>
      <papel-el variante="movimiento" class="manos buttonPapel"></papel-el>
      <tijera-el  variante="ultimaJugada"  class="p" ></tijera-el>
      <piedra-el variante="ultimaJugada" class="o"></piedra-el>
      <papel-el variante="ultimaJugada" class="i "></papel-el></div>
      </div>
     </div>
      </div>  
     </div>
    `;
    const container = div.querySelector(".container__content__home");
    container.appendChild(reloj);
    const tijera = div.querySelector(".buttonTijera");
    const piedra = div.querySelector(".buttonPiedra");
    const papel = div.querySelector(".buttonPapel");
    const tijeraa = div.querySelector(".p");
    const piedraa = div.querySelector(".o");
    const papeel = div.querySelector(".i");
    tijeraa.style.display = "none";
    papeel.style.display = "none";
    piedraa.style.display = "none";
    const jugadas = [
        tijera,
        papel,
        piedra
    ];
    const l = jugadas.map((jugada)=>{
        jugada.addEventListener("click", (e)=>{
            let evento = e;
            let click = evento.path[2];
            let moveCpu = [];
            if (click == tijera) {
                tijeraa.style.display = "initial";
                piedra.style.display = "none";
                papel.style.display = "none";
                tijera.style.display = "none";
                moveCpu.push("tijera");
            }
            if (click == papel) {
                papeel.style.display = "initial";
                piedra.style.display = "none";
                papel.style.display = "none";
                tijera.style.display = "none";
                moveCpu.push("papel");
            }
            if (click == piedra) {
                piedraa.style.display = "initial";
                piedra.style.display = "none";
                papel.style.display = "none";
                tijera.style.display = "none";
                moveCpu.push("piedra");
            }
            _state.state.setMove("userMove", moveCpu[0]);
        });
    });
    function seConcretaJugada(params) {
        if (params == 1) {
            const container = div.querySelector(".hijo");
            setTimeout(()=>{
                parametros.goTo("/desafio-final-dwf-5/move");
            }, 1000);
        }
    }
    return div;
}

},{"../../components/temporizador/tempo":"g12GX","../../state":"8yenE","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g12GX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cargarSegundo", ()=>cargarSegundo
);
var _tempoCss = require("./tempo.css");
const div = document.createElement("div");
div.innerHTML = `
    <div class="cont__temporizador">
    <div class="bloque">
        <div class="segundos-div">
        <h1 class="segundos"></h1>
        </div>
    </div>
    </div>`;
const divt = div.querySelector(".segundos");
var nInte;
function cargarSegundo(paramrs) {
    cargarSegundoo();
    function cargarSegundoo() {
        nInte = setInterval(pasaSegundo, 1000);
        divt.innerHTML = `3`;
    }
    let segundos = 2;
    function pasaSegundo() {
        divt.innerHTML = `${segundos}`;
        segundos--;
        if (segundos == 0) {
            clearInterval(nInte);
            paramrs.seConcretaJugada(1);
        }
    }
    return div;
}

},{"./tempo.css":"lbRcL","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lbRcL":[function() {},{}],"8yenE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state
);
const state = {
    data: {
        currentGame: {
            computerMove: "none",
            userMove: "none"
        },
        history: {
            userWins: 0,
            computerWins: 0,
            empate: 0,
            ultimajugada: "none"
        }
    },
    listeners: [],
    getState () {
        return this.data;
    },
    setState (newState) {
        this.data = newState;
        for (const cb of this.listeners)cb();
        localStorage.setItem("game", JSON.stringify(newState));
    },
    init () {
        let data = this.getState();
        console.log(data, localStorage.game);
        if (!localStorage.game) this.setState(data);
        else {
            const localData = JSON.parse(localStorage.getItem("game"));
            this.setState({
                ...data,
                localData
            });
        }
    },
    subscribe (cb) {
        this.listeners.push(cb);
    },
    restartGame () {
        const currentState = this.getState();
        currentState.currentGame.computerMove = "none";
        currentState.currentGame.userMove = "none";
        this.setState(currentState);
    },
    setMove (player, move) {
        const currentState = this.getState();
        currentState["currentGame"][player] = move;
        this.setState(currentState);
    },
    whoWins (computerMove, userMove) {
        const data = this.getState();
        const computerWins = [
            computerMove === "piedra" && userMove === "tijera",
            computerMove === "papel" && userMove === "piedra",
            computerMove === "tijera" && userMove === "papel"
        ].includes(true);
        const userWins = [
            userMove === "piedra" && computerMove === "tijera",
            userMove === "papel" && computerMove === "piedra",
            userMove === "tijera" && computerMove === "papel"
        ].includes(true);
        const empate = [
            userMove === "piedra" && computerMove === "piedra",
            userMove === "papel" && computerMove === "papel",
            userMove === "tijera" && computerMove === "tijera"
        ].includes(true);
        if (computerWins) return "gano la compu";
        if (userWins) return "gano el usuario";
        if (empate) return "empate";
        this.setState(data);
    },
    pushWins (who) {
        let data = this.getState();
        if (who == "gano la compu") {
            data.history.computerWins += 1;
            data.history.ultimajugada = "gano la compu";
        }
        if (who == "gano el usuario") {
            data.history.userWins += 1;
            data.history.ultimajugada = "gano el usuario";
        }
        if (who == "empate") {
            data.history.empate += 1;
            data.history.ultimajugada = "empate";
        }
        this.setState(data);
    },
    getCurrentGame () {
        const currentState = this.getState();
        return currentState.currentGame;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ayOLG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "move", ()=>move
);
var _state = require("../../state");
function move(parametros) {
    const div = document.createElement("div");
    function render() {
        _state.state.subscribe(()=>{
            let data = _state.state.getState().currentGame;
        });
    }
    render();
    div.innerHTML = `
    <div class="container__home">
      <div class="container__content__home">
      <div class="pc">
      <tijera-el  variante="variantePc"  class="p" ></tijera-el>
      <piedra-el variante="variantePc" class="o"></piedra-el>
      <papel-el variante="variantePc" class="i "></papel-el></div>
      <div class="container__manos >
      <div class="hijo">
      <tijera-el  variante="elegida"  class="manos buttonTijera" ></tijera-el>
      <piedra-el variante="elegida" class="manos buttonPiedra"></piedra-el>
      <papel-el variante="elegida" class="manos buttonPapel"></papel-el>
      </div>
     </div>
      </div>  
     </div>
    `;
    const pc = div.querySelector(".pc");
    const tijera = div.querySelector(".buttonTijera");
    const piedra = div.querySelector(".buttonPiedra");
    const papel = div.querySelector(".buttonPapel");
    tijera.style.display = "none";
    papel.style.display = "none";
    piedra.style.display = "none";
    const tijeraa = div.querySelector(".p");
    const piedraa = div.querySelector(".o");
    const papeel = div.querySelector(".i");
    tijeraa.style.display = "none";
    papeel.style.display = "none";
    piedraa.style.display = "none";
    function cpu() {
        const selectRandomMove = Math.ceil(Math.random() * 3);
        let moveCpu = [];
        if (selectRandomMove == 1) {
            tijeraa.style.display = "initial";
            moveCpu.push("tijera");
        }
        if (selectRandomMove == 2) {
            papeel.style.display = "initial";
            moveCpu.push("papel");
        }
        if (selectRandomMove == 3) {
            piedraa.style.display = "initial";
            moveCpu.push("piedra");
        }
        _state.state.setMove("computerMove", moveCpu[0]);
    }
    function random() {
        const selectRandomMove = Math.ceil(Math.random() * 3);
        if (selectRandomMove == 1) {
            tijera.style.display = "initial";
            return "tijera";
        }
        if (selectRandomMove == 2) {
            papel.style.display = "initial";
            return "papel";
        }
        if (selectRandomMove == 3) {
            piedra.style.display = "initial";
            return "piedra";
        }
    }
    function elige() {
        const container = div.querySelector(".hijo");
        const data = _state.state.getCurrentGame().userMove;
        let moveCpu = [];
        if ("tijera" == data) {
            tijera.style.display = "initial";
            moveCpu.push("tijera");
        }
        if ("papel" == data) {
            papel.style.display = "initial";
            moveCpu.push("papel");
        }
        if ("piedra" == data) {
            piedra.style.display = "initial";
            moveCpu.push("piedra");
        } else if ("none" == data) moveCpu.push(random());
        _state.state.setMove("userMove", moveCpu[0]);
        setTimeout(()=>{
            parametros.goTo("/desafio-final-dwf-5/results");
        }, 2000);
        cpu();
    }
    elige();
    return div;
}

},{"../../state":"8yenE","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9ZLsh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "results", ()=>results
);
var _state = require("../../state");
function results(parametros) {
    const div = document.createElement("div");
    const empate = require("url:../../../img/estrella amarilla.png");
    const perdiste = require("url:../../../img/estrella roja.png");
    const ganaste = require("url:../../../img/estrella verde.png");
    const data = _state.state.getCurrentGame();
    const dataEntera = _state.state.getState();
    let juego = _state.state.whoWins(data.computerMove, data.userMove);
    console.log(juego);
    _state.state.pushWins(juego);
    let user = dataEntera.history.userWins;
    let computer = dataEntera.history.computerWins;
    let empatejugada = dataEntera.history.empate;
    //console.log(juego,data);
    let tipoImg;
    let tipoColor;
    if (juego == "gano la compu") {
        tipoImg = perdiste;
        tipoColor = "page-results-perdistee";
    }
    if (juego == "gano el usuario") {
        tipoImg = ganaste;
        tipoColor = "page-results-ganaste";
    }
    if (juego == "empate") {
        tipoImg = empate;
        tipoColor = "page-results-empate";
    }
    //console.log(tipoColor);
    _state.state.restartGame();
    div.innerHTML = `
    <div class="${tipoColor}">
    <div class="container__results">
      <div class="img-results">
       <img src="${tipoImg}" >
      </div>
      <div class="results-jugadas">
      <h2 class="score">Score</h2>
      <h4 class="puntajeVos">${user}</h4>
      <h4 class="puntajeMaquina">${computer}</h4>
      <h4 class="puntajeEmpate">${empatejugada}</h4>
      </div>
      <button-el class="button">Volver a jugar</button-el>
      </div>
     
   </div>
  </div>
    `;
    div.addEventListener("click", (r)=>{
        parametros.goTo("/desafio-final-dwf-5/instrucciones");
    });
    return div;
}

},{"../../state":"8yenE","url:../../../img/estrella amarilla.png":"59J5P","url:../../../img/estrella roja.png":"kLJNU","url:../../../img/estrella verde.png":"jsVlG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"59J5P":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "estrella amarilla.72558153.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"chiK4":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"kLJNU":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "estrella roja.8b5e96ac.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"jsVlG":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "estrella verde.b353c1b2.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"aSwMc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "elButton", ()=>elButton
);
function elButton() {
    class Button extends HTMLElement {
        constructor(parameters){
            super();
            this.shadow = this.attachShadow({
                mode: 'open'
            });
            this.render();
        }
        render() {
            const button = document.createElement("button");
            const style = document.createElement("style");
            button.classList.add("button__home");
            button.textContent = this.textContent;
            style.innerHTML = `
            .button__home{
               margin-top:40px;
               width: 100%;
                height:87px;
                background-color:#006CFC;
                border:solid 10px #043472;
                color:white;
                font-size:45px;
                border-radius: 10px;
                font-family: 'Odibee Sans', cursive;
              }
            `;
            this.shadow.appendChild(button);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("button-el", Button);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1zcpL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initText", ()=>initText
);
function initText() {
    customElements.define("text-component", class extends HTMLElement {
        constructor(parameters){
            super();
            this.shadow = this.attachShadow({
                mode: 'open'
            });
        }
        connectedCallback() {
            this.render();
        }
        render() {
            const h1 = document.createElement("h1");
            const title = this.getAttribute("title") || "negro";
            h1.className = title;
            const style = document.createElement("style");
            style.innerHTML = `
            .verde{
                margin:0;
                text-align:left;
                margin-top:80px;
                font-size:80px;
                color:#009048;
                padding-right:0px;
                font-family: 'Arvo', serif;
              }
              .negro{
                margin:0;
                text-align:center;
                margin-top:40px;
                font-size:40px;
                color:black;
                padding-right:0px;
                font-family: 'Oswald', sans-serif;
              }
            `;
            h1.textContent = this.textContent;
            this.shadow.appendChild(h1);
            this.shadow.appendChild(style);
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2EcJM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initTijera", ()=>initTijera
);
function initTijera() {
    class Button extends HTMLElement {
        constructor(){
            super();
            this.shadow = this.attachShadow({
                mode: 'open'
            });
            this.render();
        }
        render() {
            const tijera = require("url:../../../img/tijeras.png");
            const style = document.createElement("style");
            const variante = this.getAttribute("variante") || "jugada";
            const img = document.createElement("img");
            img.setAttribute("src", tijera);
            img.className = variante;
            if (this.shadow.firstChild) this.shadow.firstChild.remove();
            style.innerHTML = `
          .jugada{
            width:56px;
            height:100px;
            
          }
          .movimiento {
            width: 72px;
            height: 216px;
            opacity: 0.5;
          }
          .movimiento:hover {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          .ultimaJugada {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          
          @media (min-width: 678px) {
           .jugada{
            height:180px;
            width:80px;
           }
          }
          .elegida{
            width:170px;
            height:325px;
            opacity: 1;
            
          }
          .variantePc{
            width:170px;
            height:325px;
            opacity: 1;
            transform: rotate(180deg);
          }
          .button{
              border:0px;
              background-color: transparent;
              margin:0 15px 0;
          }
          
           `;
            this.shadow.appendChild(img);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("tijera-el", Button);
}

},{"url:../../../img/tijeras.png":"tKkFX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"tKkFX":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "tijeras.38d092de.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"dk7tI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initPapel", ()=>initPapel
);
function initPapel() {
    class Button extends HTMLElement {
        constructor(){
            super();
            this.shadow = this.attachShadow({
                mode: 'open'
            });
            this.render();
        }
        render() {
            const papel = require("url:../../../img/papel.png");
            const variante = this.getAttribute("variante") || "jugada";
            const img = document.createElement("img");
            img.setAttribute("src", papel);
            img.className = variante;
            const style = document.createElement("style");
            style.innerHTML = `
          .jugada{
            width:56px;
            height:100px;
         
          }
          @media (min-width: 678px) {
            .jugada{
             height:180px;
             width:80px;
            }
           }
          .movimiento {
            width: 72px;
            height: 216px;
            opacity: 0.5;
          }
          .movimiento:hover {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          .ultimaJugada {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          
           .elegida{
            width:170px;
            height:325px;
            opacity: 1;
          }
          .variantePc{
            width:170px;
            height:325px;
            opacity: 1;
            transform: rotate(180deg);
          }
          .button{
              border:0px;
              background-color: transparent;
              margin:0 15px 0;
          }
           `;
            img.innerHTML = `
            <button  class="button  "><img class="jugada" src="${papel}"</button>  
            `;
            const button = img.querySelector(".button");
            this.shadow.appendChild(img);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("papel-el", Button);
}

},{"url:../../../img/papel.png":"8acFV","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8acFV":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "papel.0914428f.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"lW0rk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initPiedra", ()=>initPiedra
);
function initPiedra() {
    class Button extends HTMLElement {
        constructor(){
            super();
            this.shadow = this.attachShadow({
                mode: 'open'
            });
            this.render();
        }
        render() {
            const piedra = require("url:../../../img/piedra.png");
            const style = document.createElement("style");
            const variante = this.getAttribute("variante") || "jugada";
            const img = document.createElement("img");
            img.setAttribute("src", piedra);
            img.className = variante;
            if (this.shadow.firstChild) this.shadow.firstChild.remove();
            style.innerHTML = `
          .jugada{
            width:56px;
            height:100px;
         
          }
          .ultimaJugada {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          .movimiento {
            width: 72px;
            height: 216px;
            opacity: 0.5;
          }
          .movimiento:hover {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          @media (min-width: 678px) {
            .jugada{
             height:180px;
             width:80px;
            }
           }
           .elegida{
            width:170px;
            height:325px;
            opacity: 1;
           }
           .variantePc{
            width:170px;
            height:325px;
            opacity: 1;
            transform: rotate(180deg);
          }
          .button{
              border:0px;
              background-color: transparent;
              margin:0 15px 0;
          }
          
           `;
            this.shadow.appendChild(img);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("piedra-el", Button);
}

},{"url:../../../img/piedra.png":"jx9bw","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jx9bw":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('fOeKH') + "piedra.b4d55536.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}]},["jnNYs","1mazX"], "1mazX", "parcelRequire2e9a")

//# sourceMappingURL=index.c8450ebe.js.map
