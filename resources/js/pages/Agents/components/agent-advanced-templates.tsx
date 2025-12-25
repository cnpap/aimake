import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { AgentFormValues } from './agent-form-schema';

export function AgentAdvancedTemplates() {
    const { control } = useFormContext<AgentFormValues>();

    return (
        <div className="space-y-6">
            <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
                <div className="flex items-center gap-2 pb-2 font-semibold">
                    <Info className="h-4 w-4" />
                    提示：
                </div>
                自定义模板将覆盖 CrewAI 的默认 Prompt
                逻辑，请确保包含必要的占位符（如 {'{goal}'}, {'{tools}'} 等）。
            </div>

            <FormField
                control={control}
                name="system_template"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>系统提示词模版 (System Template)</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="自定义系统提示词模板..."
                                className="min-h-[120px] font-mono text-xs"
                                {...field}
                                value={field.value || ''}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="prompt_template"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            用户任务模版 (User Prompt Template)
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="自定义用户任务提示词模板..."
                                className="min-h-[120px] font-mono text-xs"
                                {...field}
                                value={field.value || ''}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="response_template"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>响应结果模版 (Response Template)</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="自定义响应格式模板..."
                                className="min-h-[120px] font-mono text-xs"
                                {...field}
                                value={field.value || ''}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
