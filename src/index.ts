import * as ts from 'typescript';

export const transformerFactory: ts.TransformerFactory<ts.Node> = (context) => (bundle) => {
    // used to keep track if enum is an ambient declaration
    let ambient = false;
    function visitor(node: ts.Node): ts.Node | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
                ambient = (<ts.SourceFile>node).isDeclarationFile;
                // falls through;
            case ts.SyntaxKind.Bundle:
            case ts.SyntaxKind.ModuleBlock:
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.ModuleDeclaration:
                if (!ambient) {
                    const modifierFlags = ts.getCombinedModifierFlags(<ts.ModuleDeclaration>node);
                    if ((modifierFlags & ts.ModifierFlags.Export) === 0 && (node.flags & ts.NodeFlags.NestedNamespace) === 0)
                        return node;
                    ambient = (modifierFlags & ts.ModifierFlags.Ambient) !== 0;
                    node = ts.visitEachChild(node, visitor, context);
                    ambient = false;
                    return node;
                }
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.EnumDeclaration:
                if (ambient || ts.getCombinedModifierFlags(<ts.EnumDeclaration>node) & ts.ModifierFlags.Export)
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
