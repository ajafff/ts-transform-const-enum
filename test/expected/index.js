"use strict";
exports.__esModule = true;
var Foo;
(function (Foo) {
    Foo[Foo["Foo"] = 1] = "Foo";
})(Foo = exports.Foo || (exports.Foo = {}));
exports.foo = 1 /* Foo */;
var ns;
(function (ns) {
    var nested;
    (function (nested) {
        var C;
        (function (C) {
            C[C["Foo"] = 2] = "Foo";
        })(C = nested.C || (nested.C = {}));
        nested.c = 2 /* Foo */;
        var E;
        (function (E) {
            E[E["Foo"] = 3] = "Foo";
        })(E = nested.E || (nested.E = {}));
        nested.e = E.Foo;
        nested.namespaceLocal = 4 /* Foo */;
    })(nested = ns.nested || (ns.nested = {}));
})(ns = exports.ns || (exports.ns = {}));
function fn() {
    return 5 /* Foo */ + 1;
}
exports.fn = fn;
exports.moduleLocal = 6 /* Foo */;
exports.localNamespaceExport = 7 /* Foo */;
