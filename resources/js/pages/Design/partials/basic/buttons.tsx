import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Palette, Settings2 } from 'lucide-react';
import { DesignSection, SectionHeader } from '../../components/layout';

export default function Buttons() {
    return (
        <section>
            <SectionHeader
                title="按钮 (Buttons)"
                description="核心交互元素，包含多种变体以适应不同层级的操作。"
            />
            <DesignSection
                title="按钮变体"
                description={
                    <ul className="mt-4 list-none space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="w-24 shrink-0 font-medium text-foreground">
                                主要操作
                            </span>
                            <span className="text-muted-foreground">
                                页面中最主要的操作，通常只有一个。
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-24 shrink-0 font-medium text-foreground">
                                次要操作
                            </span>
                            <span className="text-muted-foreground">
                                次要操作，如“取消”或辅助功能。
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-24 shrink-0 font-medium text-foreground">
                                幽灵按钮
                            </span>
                            <span className="text-muted-foreground">
                                用于工具栏或列表中的操作图标。
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-24 shrink-0 font-medium text-foreground">
                                破坏性操作
                            </span>
                            <span className="text-muted-foreground">
                                仅用于不可逆的删除或危险操作。
                            </span>
                        </li>
                    </ul>
                }
            >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <Button>主要操作</Button>
                        <Button variant="secondary">次要操作</Button>
                        <Button variant="outline">轮廓按钮</Button>
                        <Button variant="ghost">幽灵按钮</Button>
                        <Button variant="destructive">破坏性操作</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap items-end gap-4">
                        <Button size="sm">小</Button>
                        <Button size="default">默认</Button>
                        <Button size="lg">大</Button>
                        <div className="px-4"></div>
                        <Button size="icon" variant="outline">
                            <Palette className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DesignSection>
        </section>
    );
}
