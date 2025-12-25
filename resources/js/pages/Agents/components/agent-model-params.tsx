import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFormContext } from 'react-hook-form';
import { AgentFormValues, modelOptions } from './agent-form-schema';

export function AgentModelParams() {
    const { control } = useFormContext<AgentFormValues>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={control}
                    name="llm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>主推理模型</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
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
                                用于主要思考和生成的模型
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="function_calling_llm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>工具调用模型</FormLabel>
                            <Select
                                onValueChange={(value) =>
                                    field.onChange(
                                        value === '__default__'
                                            ? undefined
                                            : value,
                                    )
                                }
                                value={field.value || '__default__'}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="与主模型保持一致 (默认)" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="__default__">
                                        与主模型一致
                                    </SelectItem>
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
                                工具调用的更快速或低成本模型
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="max_iter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>最大迭代次数</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="25"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                防止无限循环的最大步骤数
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="max_retry_limit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>最大重试次数</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="2"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                出错或解析失败时的重试限制
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="max_rpm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>最大 RPM</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="无限制"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>每分钟请求数限制</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="max_execution_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>超时时间 (秒)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="无限制"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                单次执行的最大时长
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
