import { MultiSelect } from '@/components/ui/multi-select';
import { Cat, Dog, Fish, Rabbit, Search, Turtle } from 'lucide-react';
import { useState } from 'react';
import { DesignSection, SectionHeader } from '../../components/layout';

const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember' },
];

const runtimes = [
    { value: 'node', label: 'Node.js' },
    { value: 'deno', label: 'Deno' },
    { value: 'bun', label: 'Bun' },
    { value: 'nuxt', label: 'Nuxt' },
];

const animals = [
    { value: 'cat', label: 'Cat', icon: Cat },
    { value: 'dog', label: 'Dog', icon: Dog },
    { value: 'rabbit', label: 'Rabbit', icon: Rabbit },
    { value: 'fish', label: 'Fish', icon: Fish },
    { value: 'turtle', label: 'Turtle', icon: Turtle },
];

const groupedTechOptions = [
    {
        heading: '前端框架',
        options: frameworks,
    },
    {
        heading: '运行时与工具链',
        options: runtimes,
    },
];

const duplicatedDataStores = [
    { value: 'redis', label: 'Redis' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'redis', label: 'Redis（副本）' },
    { value: 'postgres', label: 'PostgreSQL' },
];

export default function MultiSelectDemo() {
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
        'react',
        'angular',
    ]);
    const [selectedAnimals, setSelectedAnimals] = useState<string[]>(['cat']);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([
        'react',
        'node',
    ]);
    const [quickPick, setQuickPick] = useState<string[]>(['bun']);
    const [dedupSelected, setDedupSelected] = useState<string[]>(['redis']);

    return (
        <section>
            <SectionHeader
                title="多选框 (MultiSelect)"
                description="基于 Command 和 Popover 构建的高级多选组件，支持搜索、动画和自定义样式。"
            />

            <DesignSection
                title="基本用法"
                description="基础的多选功能，包含搜索过滤、全选/全不选以及已选标签展示。"
            >
                <div className="w-full max-w-sm space-y-4">
                    <MultiSelect
                        options={frameworks}
                        onValueChange={setSelectedFrameworks}
                        defaultValue={selectedFrameworks}
                        placeholder="选择框架..."
                        variant="default"
                        animation={2}
                        maxCount={1}
                    />
                    <div className="text-sm text-muted-foreground">
                        已选值: {selectedFrameworks.join(', ')}
                    </div>
                </div>
            </DesignSection>

            <DesignSection
                title="变体与图标"
                description="支持不同的视觉变体（Secondary, Destructive）以及在选项中显示图标。"
            >
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="space-y-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            Secondary Variant (带图标)
                        </span>
                        <MultiSelect
                            options={animals}
                            onValueChange={setSelectedAnimals}
                            defaultValue={selectedAnimals}
                            placeholder="选择宠物..."
                            variant="secondary"
                            animation={2}
                            maxCount={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            Destructive Variant (反色/强调)
                        </span>
                        <MultiSelect
                            options={frameworks}
                            onValueChange={() => {}}
                            defaultValue={['vue']}
                            placeholder="选择..."
                            variant="destructive"
                            animation={2}
                        />
                    </div>
                </div>
            </DesignSection>

            <DesignSection
                title="分组与空状态"
                description="多级数据结构与友好的搜索空状态展示。"
            >
                <div className="w-full max-w-xl space-y-4">
                    <MultiSelect
                        options={groupedTechOptions}
                        onValueChange={setSelectedGroups}
                        defaultValue={selectedGroups}
                        placeholder="选择技术栈..."
                        maxCount={4}
                        animation={2}
                        emptyIndicator={
                            <div className="flex flex-col items-center gap-1 py-6 text-xs text-muted-foreground">
                                <Search className="h-5 w-5" />
                                <span>没有匹配项</span>
                                <span className="text-[10px]">
                                    尝试更换关键词
                                </span>
                            </div>
                        }
                    />
                    <div className="text-sm text-muted-foreground">
                        已选值: {selectedGroups.join(', ')}
                    </div>
                </div>
            </DesignSection>

            <DesignSection
                title="交互行为与去重"
                description="覆盖关闭弹层、禁用全选、去重及无搜索等常见交互场景。"
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            快速选择（closeOnSelect + 禁用全选）
                        </span>
                        <MultiSelect
                            options={animals}
                            onValueChange={setQuickPick}
                            defaultValue={quickPick}
                            placeholder="点击即收起..."
                            closeOnSelect
                            hideSelectAll
                            maxCount={2}
                            responsive
                            animation={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            去重与简洁展示
                        </span>
                        <MultiSelect
                            options={duplicatedDataStores}
                            onValueChange={setDedupSelected}
                            defaultValue={dedupSelected}
                            placeholder="数据源去重示例"
                            deduplicateOptions
                            searchable={false}
                            hideSelectAll
                            singleLine
                            autoSize
                            maxCount={2}
                        />
                    </div>
                </div>
            </DesignSection>
        </section>
    );
}
