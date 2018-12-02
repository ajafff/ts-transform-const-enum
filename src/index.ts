import * as ts from 'typescript';

export const transformerFactory: ts.TransformerFactory<ts.Node> = (context) => (bundle) => {
    function visitor(node: ts.Node): ts.Node | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.Bundle:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ModuleBlock:
            case ts.SyntaxKind.EnumDeclaration:
                return ts.visitEachChild(node, visitor, context);
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
