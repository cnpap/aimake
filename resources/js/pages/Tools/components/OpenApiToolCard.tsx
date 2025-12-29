import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Clock4,
    Code,
    Globe2,
    PlugZap,
    ShieldCheck,
    Users,
} from 'lucide-react';

export type ToolStatus = 'active' | 'draft' | 'deprecated';

export interface Tool {
    id: number;
    name: string;
    version: string;
    description: string;
    baseUrl?: string;
    operations: number;
    owner: string;
    status: ToolStatus;
    lastSync: string;
    boundAgents: string[];
    tokenConfigured: boolean;
    tags: string[];
    openapiUrl?: string;
}

interface ToolCardProps {
    tool: Tool;
    onViewDocs?: (tool: Tool) => void;
    onEdit?: (tool: Tool) => void;
}

const statusStyleMap: Record<ToolStatus, string> = {
    active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    draft: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    deprecated:
        'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

export function ToolCard({ tool, onViewDocs, onEdit }: ToolCardProps) {
    return (
        <Card className="group relative flex h-full flex-col overflow-hidden border bg-card/50 py-0 text-card-foreground transition-all hover:border-primary/50 hover:bg-card hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-0">
                <div className="space-y-1">
                    <CardTitle className="text-base leading-none font-semibold tracking-tight">
                        {tool.name}
                    </CardTitle>
                    <p className="font-mono text-xs text-muted-foreground/60">
                        {tool.owner}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <Badge
                        variant="outline"
                        className="rounded-sm border px-2 py-0.5 text-[10px] font-medium shadow-none"
                    >
                        {tool.version}
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`rounded-sm border-0 px-2 py-0.5 text-[10px] font-medium shadow-none ${statusStyleMap[tool.status]}`}
                    >
                        {tool.status === 'active'
                            ? '已发布'
                            : tool.status === 'draft'
                              ? '草稿'
                              : '已下线'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-5 pt-2">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-2">
                        <PlugZap className="h-3.5 w-3.5 text-primary/70" />
                        <div>
                            <div className="text-xs font-medium text-foreground">
                                {tool.operations} 个接口
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                        <div>
                            <div className="text-xs font-medium text-foreground">
                                {tool.tokenConfigured
                                    ? '已配置密钥'
                                    : '未配置密钥'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-2">
                        <Users className="h-3.5 w-3.5 text-primary/70" />
                        <div>
                            <div className="text-xs font-medium text-foreground">
                                {tool.boundAgents.length} 个 Agent
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-2">
                        <Clock4 className="h-3.5 w-3.5 text-primary/70" />
                        <div>
                            <div className="text-xs font-medium text-foreground">
                                {tool.lastSync}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tool.baseUrl && (
                        <Badge
                            variant="outline"
                            className="rounded border bg-muted/50 px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground"
                        >
                            <Globe2 className="mr-1 h-3 w-3" />
                            {tool.baseUrl}
                        </Badge>
                    )}
                    <Badge
                        variant="outline"
                        className="rounded border bg-muted/50 px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground"
                    >
                        <Code className="mr-1 h-3 w-3" />
                        OpenAPI
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-muted/10 p-4">
                <div className="text-xs font-medium text-muted-foreground">
                    <span className="opacity-70">授权给：</span>
                    {tool.boundAgents.length > 0
                        ? tool.boundAgents.join('、')
                        : '暂无'}
                </div>
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => onViewDocs?.(tool)}
                    >
                        查看文档
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => onEdit?.(tool)}
                    >
                        编辑
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
