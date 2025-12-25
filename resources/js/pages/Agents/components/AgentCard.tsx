import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, Sparkles } from 'lucide-react';

export interface Agent {
    id: number;
    name: string;
    role: string;
    goal: string;
    description: string;
    type: string;
    model: string;
    status: string;
    tools: string[];
    lastRun: string;
}

interface AgentCardProps {
    agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
    return (
        <Card className="group relative flex h-full flex-col overflow-hidden border bg-card/50 py-0 text-card-foreground transition-all hover:border-primary/50 hover:bg-card hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-0">
                <div className="space-y-1">
                    <CardTitle className="text-base leading-none font-semibold tracking-tight">
                        {agent.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        {agent.role}
                    </p>
                </div>
                <Badge
                    variant="outline"
                    className={`rounded-sm border-0 px-2 py-0.5 text-[10px] font-medium shadow-none ${
                        agent.status === 'active'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : agent.status === 'maintenance'
                              ? 'bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    {agent.status === 'active'
                        ? '活跃'
                        : agent.status === 'maintenance'
                          ? '维护中'
                          : '空闲'}
                </Badge>
            </CardHeader>

            <CardContent className="flex-1 p-5 pt-4">
                <p className="line-clamp-2 h-10 text-sm leading-relaxed text-muted-foreground">
                    {agent.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                        variant="secondary"
                        className="rounded-sm border text-xs font-normal"
                    >
                        <BrainCircuit className="mr-1 h-3 w-3" />
                        {agent.type}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="rounded-sm border text-xs font-normal"
                    >
                        <Sparkles className="mr-1 h-3 w-3" />
                        {agent.model}
                    </Badge>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                            {agent.tools.length}
                        </span>{' '}
                        个已启用工具
                    </div>
                    <div className="flex gap-1">
                        {agent.tools.slice(0, 3).map((tool, i) => (
                            <div
                                key={i}
                                className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                                {tool}
                            </div>
                        ))}
                        {agent.tools.length > 3 && (
                            <div className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                +{agent.tools.length - 3}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-muted/10 p-4">
                <div className="text-xs font-medium text-muted-foreground">
                    上次运行: {agent.lastRun}
                </div>

                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                    >
                        配置
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="h-7 px-3 text-xs"
                    >
                        运行
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
