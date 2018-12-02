export const enum Foo {
    Foo = 1,
}
export const foo = Foo.Foo;

export namespace ns.nested {
    export const enum C {
        Foo = 2,
    }
    export const c = C.Foo;
    export enum E {
        Foo = 3,
    }
    export const e = E.Foo;

    const enum NamespaceLocal {
        Foo = 4,
    }
    export const namespaceLocal = NamespaceLocal.Foo;
}

export function fn() {
    const enum Local {
        Foo = 5,
    }
    return Local.Foo + 1;
}

const enum ModuleLocal {
    Foo = 6,
}
export const moduleLocal = ModuleLocal.Foo;

namespace localNamespace {
    export const enum Exported {
        Foo = 7,
    }
}
export const localNamespaceExport = localNamespace.Exported.Foo;
