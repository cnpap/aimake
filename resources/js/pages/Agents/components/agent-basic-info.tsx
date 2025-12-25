import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { AgentFormValues } from './agent-form-schema';

export function AgentBasicInfo() {
    const { control } = useFormContext<AgentFormValues>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>代理名称</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="例如：data_analyst_01"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                用于系统内部引用的唯一标识符
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>角色</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="例如：高级数据分析师"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                定义代理的职能与专长
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="goal"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>目标</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="例如：分析数据趋势并生成综合报告..."
                                className="h-24 resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            指导代理决策的具体目标
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="backstory"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>背景故事</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="例如：你是一位拥有 10 年经验的专家，擅长从复杂数据中挖掘价值..."
                                className="h-40 resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            为代理提供上下文、个性及行为准则
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
