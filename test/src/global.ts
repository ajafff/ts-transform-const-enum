enum Global {
    Foo = 1,
}
var globalVariable = Global.Foo;

namespace globalNamespace {
    export const enum C {
        Foo = 2,
    }
    export const c = C.Foo;

    const enum E {
        Foo = 3,
    }
    export const e = E.Foo;
}
