declare enum Global {
    Foo = 1
}
declare var globalVariable: Global;
declare namespace globalNamespace {
    enum C {
        Foo = 2
    }
    const c = C.Foo;
    enum E {
        Foo = 3
    }
    const e = E.Foo;
}
