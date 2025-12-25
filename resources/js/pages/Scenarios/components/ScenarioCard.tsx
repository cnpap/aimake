import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export interface Scenario {
    id: number;
    name: string;
    description: string;
    tags: string[];
    process: string;
    planning: boolean;
    manager_llm: string | null;
    agents_count: number;
    tasks_count: number;
    last_run: string;
    status: string;
    version: string;
}

interface ScenarioCardProps {
    scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
    return (
        <Card className="group relative flex h-full flex-col overflow-hidden border bg-card/50 py-0 text-card-foreground transition-all hover:border-primary/50 hover:bg-card hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-0">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-base leading-none font-semibold tracking-tight">
                            {scenario.name}
                        </CardTitle>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground/60">
                        {scenario.version}
                    </p>
                </div>
                <Badge
                    variant={
                        scenario.status === '活跃' ? 'default' : 'secondary'
                    }
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        scenario.status === '活跃'
                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    {scenario.status}
                </Badge>
            </CardHeader>

            <CardContent className="flex-1 p-5 pt-2">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {scenario.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {scenario.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-muted/10 p-4">
                <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary/40" />
                        {scenario.agents_count} Agents
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary/40" />
                        {scenario.tasks_count} 任务
                    </div>
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
