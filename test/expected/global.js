var Global;
(function (Global) {
    Global[Global["Foo"] = 1] = "Foo";
})(Global || (Global = {}));
var globalVariable = Global.Foo;
var globalNamespace;
(function (globalNamespace) {
    var C;
    (function (C) {
        C[C["Foo"] = 2] = "Foo";
    })(C = globalNamespace.C || (globalNamespace.C = {}));
    globalNamespace.c = 2 /* Foo */;
    globalNamespace.e = 3 /* Foo */;
})(globalNamespace || (globalNamespace = {}));
