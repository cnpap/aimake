import { cn } from '@/lib/utils';
import { DesignSection, SectionHeader } from '../../components/layout';

export default function Colors() {
    return (
        <section>
            <SectionHeader
                title="配色方案 (Colors)"
                description="基于系统级变量的主题色板，支持自动暗色模式切换。"
            />
            <DesignSection
                title="系统颜色"
                description="基于 Shadcn UI 变量的核心主题色。"
                mode="full"
            >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {[
                        {
                            name: 'Primary',
                            class: 'bg-primary',
                            text: 'text-primary-foreground',
                        },
                        {
                            name: 'Secondary',
                            class: 'bg-secondary',
                            text: 'text-secondary-foreground',
                        },
                        {
                            name: 'Destructive',
                            class: 'bg-destructive',
                            text: 'text-destructive-foreground',
                        },
                        {
                            name: 'Muted',
                            class: 'bg-muted',
                            text: 'text-muted-foreground',
                        },
                        {
                            name: 'Accent',
                            class: 'bg-accent',
                            text: 'text-accent-foreground',
                        },
                        {
                            name: 'Card',
                            class: 'bg-card',
                            text: 'text-card-foreground',
                        },
                    ].map((color) => (
                        <div
                            key={color.name}
                            className="group flex flex-col gap-2"
                        >
                            <div
                                className={cn(
                                    'relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md',
                                    color.class,
                                )}
                            ></div>
                            <div className="flex flex-col px-1">
                                <span className="text-sm font-semibold">
                                    {color.name}
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground opacity-60">
                                    var(--
                                    {color.name.toLowerCase()})
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </DesignSection>
        </section>
    );
}
