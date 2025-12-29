import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type { JSXOpeningElement } from '@babel/types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizePath, type Plugin } from 'vite';

import type { VtjumpProtocol } from './types';
export interface VtjumpReact19Options {
    protocol?: VtjumpProtocol;
    workingDir?: string;
}

const virtualId = 'virtual:vtjump-react19-client';
const resolvedVirtualId = `\0${virtualId}`;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const clientModuleId = `/@fs/${normalizePath(
    path.resolve(currentDir, 'react19-client.tsx'),
)}`;

export const vtjumpReact19Babel = ({
    types: t,
}: {
    types: typeof import('@babel/types');
}): PluginObj<PluginPass> => ({
    name: 'vtjump-react19-babel',
    visitor: {
        JSXOpeningElement(
            openingPath: NodePath<JSXOpeningElement>,
            state: PluginPass & { filename?: string },
        ) {
            const filename: string | undefined =
                state.filename || state.file?.opts?.filename || undefined;
            if (!filename || !/\.(j|t)sx$/.test(filename)) {
                return;
            }

            const name = openingPath.node.name;
            if (!(t.isJSXIdentifier(name) && /^[a-z]/.test(name.name))) {
                return;
            }

            const hasVtjump =
                openingPath.node.attributes &&
                openingPath.node.attributes.some(
                    (attr) =>
                        t.isJSXAttribute(attr) &&
                        t.isJSXIdentifier(attr.name) &&
                        attr.name.name.startsWith('data-vtjump'),
                );
            if (hasVtjump) {
                return;
            }

            const loc = openingPath.node.loc ?? openingPath.parent?.loc;
            if (!loc) {
                return;
            }

            const absoluteFile = path.isAbsolute(filename)
                ? filename
                : path.resolve(process.cwd(), filename);
            const line = loc.start.line;

            openingPath.node.attributes.push(
                t.jsxAttribute(
                    t.jsxIdentifier('data-vtjump'),
                    t.stringLiteral(`${absoluteFile}:${line}`),
                ),
                t.jsxAttribute(
                    t.jsxIdentifier('data-vtjump-line'),
                    t.stringLiteral(String(line)),
                ),
                t.jsxAttribute(
                    t.jsxIdentifier('data-vtjump-file'),
                    t.stringLiteral(absoluteFile),
                ),
            );
        },
    },
});

const createClientEntry = (protocol: VtjumpProtocol, workingDir: string) => `
import { initVtjumpReact19 } from '${clientModuleId}';

initVtjumpReact19(${JSON.stringify({ protocol, workingDir })});
`;

export const vtjumpReact19 = (options: VtjumpReact19Options = {}): Plugin => {
    const protocol: VtjumpProtocol = options.protocol || 'cursor';
    const workingDir = options.workingDir || process.cwd();
    const clientEntry = createClientEntry(protocol, workingDir);

    return {
        name: 'vite:vtjump-react19',
        apply: 'serve',
        resolveId(id) {
            if (id === virtualId) {
                return resolvedVirtualId;
            }
            return null;
        },
        load(id) {
            if (id === resolvedVirtualId) {
                return clientEntry;
            }
            return null;
        },
        transformIndexHtml(html) {
            const injection = `<script type="module">import '${virtualId}';</script>`;
            const bodyCloseIndex = html.lastIndexOf('</body>');
            if (bodyCloseIndex !== -1) {
                return (
                    html.slice(0, bodyCloseIndex) +
                    injection +
                    html.slice(bodyCloseIndex)
                );
            }
            return `${html}${injection}`;
        },
    };
};
