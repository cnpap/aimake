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
import { Switch } from '@/components/ui/switch';
import { useFormContext } from 'react-hook-form';
import { ScenarioFormValues, modelOptions } from './scenario-form-schema';

export function ScenarioPlanning() {
    const { control, watch } = useFormContext<ScenarioFormValues>();
    const planningValue = watch('planning');

    return (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            <FormField
                control={control}
                name="planning"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                任务规划 (Planning)
                            </FormLabel>
                            <FormDescription>
                                在执行前先生成计划步骤。
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            {planningValue && (
                <FormField
                    control={control}
                    name="planning_llm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>规划模型 (Planning LLM)</FormLabel>
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
                                用于生成初始计划的模型。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    );
}
