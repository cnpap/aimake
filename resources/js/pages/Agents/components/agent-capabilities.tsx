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
import { AgentFormValues } from './agent-form-schema';

export function AgentCapabilities() {
    const { control, watch } = useFormContext<AgentFormValues>();
    const allowCodeExecution = watch('allow_code_execution');

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
                control={control}
                name="memory"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">记忆</FormLabel>
                            <FormDescription>
                                是否保留交互历史上下文。
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

            <FormField
                control={control}
                name="verbose"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                详细日志
                            </FormLabel>
                            <FormDescription>
                                输出详细的思考和执行过程。
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

            <FormField
                control={control}
                name="allow_delegation"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                允许委派
                            </FormLabel>
                            <FormDescription>
                                允许将任务委派给其他 Agent。
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

            <FormField
                control={control}
                name="reasoning"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                推理模式
                            </FormLabel>
                            <FormDescription>
                                强制 Agent 在行动前进行规划。
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

            <FormField
                control={control}
                name="respect_context_window"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                上下文窗口保护
                            </FormLabel>
                            <FormDescription>
                                超长时自动摘要以防溢出。
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

            <FormField
                control={control}
                name="cache"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                工具缓存
                            </FormLabel>
                            <FormDescription>
                                缓存相同参数的工具调用结果。
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

            <FormField
                control={control}
                name="allow_code_execution"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                代码执行
                            </FormLabel>
                            <FormDescription>
                                允许 Agent 编写并运行代码。
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

            {/* Conditionally show Code Execution Mode if enabled */}
            {allowCodeExecution && (
                <FormField
                    control={control}
                    name="code_execution_mode"
                    render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                            <FormLabel>代码执行模式</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="safe">
                                        安全模式 (Docker/Sandbox)
                                    </SelectItem>
                                    <SelectItem value="unsafe">
                                        非安全模式 (本地执行)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                生产环境强烈建议使用安全模式。
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    );
}
