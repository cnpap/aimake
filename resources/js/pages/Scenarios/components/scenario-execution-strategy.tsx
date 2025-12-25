import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { ScenarioFormValues, modelOptions } from './scenario-form-schema';

export function ScenarioExecutionStrategy() {
    const { control, watch } = useFormContext<ScenarioFormValues>();
    const processValue = watch('process');

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                执行策略
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={control}
                    name="process"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>执行流程 (Process)</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="选择流程" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="sequential">
                                        顺序执行 (Sequential)
                                    </SelectItem>
                                    <SelectItem value="hierarchical">
                                        层级执行 (Hierarchical)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                {field.value === 'sequential'
                                    ? '任务按预定顺序依次执行。'
                                    : '由 Manager Agent 动态分配任务。'}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {processValue === 'hierarchical' && (
                    <FormField
                        control={control}
                        name="manager_llm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>管理模型 (Manager LLM)</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value || undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择模型" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {modelOptions.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    用于分配和管理任务的高级模型。
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
        </div>
    );
}
