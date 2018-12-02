export declare enum Foo {
    Foo = 1
}
export declare const foo = Foo.Foo;
export declare namespace ns.nested {
    enum C {
        Foo = 2
    }
    const c = C.Foo;
    enum E {
        Foo = 3
    }
    const e = E.Foo;
    enum NamespaceLocal {
        Foo = 4
    }
    const namespaceLocal = NamespaceLocal.Foo;
}
export declare function fn(): number;
declare enum ModuleLocal {
    Foo = 6
}
export declare const moduleLocal = ModuleLocal.Foo;
declare namespace localNamespace {
    enum Exported {
        Foo = 7
    }
}
export declare const localNamespaceExport = localNamespace.Exported.Foo;
export {};
