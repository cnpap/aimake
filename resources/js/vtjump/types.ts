export type VtjumpProtocol =
    | 'cursor'
    | 'windsurf'
    | 'trae'
    | 'vscode'
    | 'idea'
    | 'webstorm'
    | 'phpstorm'
    | 'sublime';

export interface VtjumpClientConfig {
    protocol: VtjumpProtocol;
    workingDir: string;
}
