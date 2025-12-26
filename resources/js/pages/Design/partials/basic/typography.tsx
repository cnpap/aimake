import { DesignSection, SectionHeader } from '../../components/layout';

export default function Typography() {
    return (
        <section>
            <SectionHeader
                title="字体排印 (Typography)"
                description="Inter 字体家族，强调数字与代码的易读性。"
            />

            <DesignSection title="标题" description="标题的字号与字重。">
                <div className="space-y-8">
                    <div className="space-y-1">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            H1 / 4xl / Bold
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight">
                            敏捷的棕色狐狸
                        </h1>
                    </div>
                    <div className="space-y-1">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            H2 / 3xl / Semibold
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            跳过懒惰的狗
                        </h2>
                    </div>
                    <div className="space-y-1">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            H3 / 2xl / Semibold
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight">
                            数据可视化与调试
                        </h3>
                    </div>
                </div>
            </DesignSection>

            <DesignSection title="正文与 UI" description="内容的标准文本样式。">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            Body / Regular
                        </p>
                        <p className="max-w-lg leading-7">
                            有效的数据管理需要像监控代码一样精确的工具。 DataX
                            为您的 AI 工作流提供无缝接口。
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            Small / Medium (Muted)
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                            最后更新于 2 分钟前 • 只读模式
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                            Code / Mono
                        </p>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                            npm install @datax/sdk
                        </code>
                    </div>
                </div>
            </DesignSection>
        </section>
    );
}
