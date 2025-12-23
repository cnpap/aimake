import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Database,
    FileText,
    GitBranch,
    Layers,
    MoreHorizontal,
} from 'lucide-react';

export type AssetType = 'dataset' | 'model' | 'lineage';

interface RecentAsset {
    id: number;
    name: string;
    type: AssetType;
    owner: string;
    status: 'active' | 'archived' | 'draft';
    lastUpdated: string;
}

const TypeIcon = ({ type }: { type: AssetType }) => {
    switch (type) {
        case 'dataset':
            return <Database className="h-3.5 w-3.5 text-blue-500" />;
        case 'model':
            return <Layers className="h-3.5 w-3.5 text-purple-500" />;
        case 'lineage':
            return <GitBranch className="h-3.5 w-3.5 text-orange-500" />;
        default:
            return <FileText className="h-3.5 w-3.5" />;
    }
};

const statusMap: Record<string, string> = {
    active: '活跃',
    draft: '草稿',
    archived: '归档',
};

const StatusBadge = ({ status }: { status: string }) => {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                status === 'active' &&
                    'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400',
                status === 'draft' &&
                    'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400',
                status === 'archived' &&
                    'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400',
            )}
        >
            <span
                className={cn(
                    'mr-1.5 h-1.5 w-1.5 rounded-full',
                    status === 'active' && 'bg-green-500',
                    status === 'draft' && 'bg-yellow-500',
                    status === 'archived' && 'bg-gray-500',
                )}
            ></span>
            <span className="capitalize">{statusMap[status] || status}</span>
        </div>
    );
};

export function RecentAssetsTable({ assets }: { assets: RecentAsset[] }) {
    return (
        <div className="rounded-md border bg-card shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead className="w-[300px] text-xs font-medium tracking-wider text-muted-foreground uppercase">
                            资产名称
                        </TableHead>
                        <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                            类型
                        </TableHead>
                        <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                            负责人
                        </TableHead>
                        <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                            状态
                        </TableHead>
                        <TableHead className="text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">
                            最后更新
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assets.map((asset) => (
                        <TableRow
                            key={asset.id}
                            className="group transition-colors hover:bg-muted/40"
                        >
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background shadow-sm">
                                        <TypeIcon type={asset.type} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="cursor-pointer text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                                            {asset.name}
                                        </span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            ID-
                                            {asset.id
                                                .toString()
                                                .padStart(4, '0')}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground capitalize">
                                {asset.type}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                                            {asset.owner.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-foreground/80">
                                        {asset.owner}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={asset.status} />
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs text-muted-foreground">
                                {asset.lastUpdated}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-[160px]"
                                    >
                                        <DropdownMenuLabel>
                                            操作
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">
                                            查看详情
                                            <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            查看血缘
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-destructive">
                                            删除资产
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
