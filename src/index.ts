import * as ts from 'typescript';

export const transformerFactory: ts.TransformerFactory<ts.Node> = (context) => (bundle) => {
    // used to keep track if enum is an ambient declaration
    let ambient = false;
    let global = false;
    function visitor(node: ts.Node): ts.Node | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
                ambient = (<ts.SourceFile>node).isDeclarationFile;
                global = !ts.isExternalModule(<ts.SourceFile>node);
                // falls through;
            case ts.SyntaxKind.Bundle:
            case ts.SyntaxKind.ModuleBlock:
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.ModuleDeclaration:
                const savedGlobal = global;
                const savedAmbient = ambient;
                if (!ambient) {
                    const modifierFlags = ts.getCombinedModifierFlags(<ts.ModuleDeclaration>node);
                    if (!global && (modifierFlags & ts.ModifierFlags.Export) === 0 && (node.flags & ts.NodeFlags.NestedNamespace) === 0)
                        return node;
                    ambient = (modifierFlags & ts.ModifierFlags.Ambient) !== 0;
                }
                global = false;
                node = ts.visitEachChild(node, visitor, context);
                global = savedGlobal;
                ambient = savedAmbient;
                return node;
            case ts.SyntaxKind.EnumDeclaration:
                if (ambient || global || ts.getCombinedModifierFlags(<ts.EnumDeclaration>node) & ts.ModifierFlags.Export)
                    return ts.visitEachChild(node, visitor, context);
                return node; // local const enums don't need to be modified
            case ts.SyntaxKind.ConstKeyword:
                return;
            default:
                return node;
        }
    }
    return ts.visitNode(bundle, visitor);
};

export default function(context: ts.TransformationContext): ts.Transformer<ts.Node>;
export default function(program: ts.Program, config?: Record<string, unknown>): ts.TransformerFactory<ts.Node>;
export default function(programOrContext: ts.Program | ts.TransformationContext) {
    if ('readEmitHelpers' in programOrContext)
        return transformerFactory(programOrContext);
    return transformerFactory;
}
