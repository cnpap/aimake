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
import { ScenarioFormValues } from './scenario-form-schema';

export function ScenarioBasicInfo() {
    const { control } = useFormContext<ScenarioFormValues>();

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                基础信息
            </h3>
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>场景名称</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="例如：市场调研助手 V1"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>描述</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="简要描述该场景的目标和功能..."
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>标签</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="调研, 分析, 报告 (使用逗号分隔)"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>用于分类和检索场景。</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
