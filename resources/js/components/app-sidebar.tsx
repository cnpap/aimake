import { AppSwitcher } from '@/components/app-switcher';
import { NavUser } from '@/components/nav-user';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import {
    Bot,
    Brain,
    ChevronRight,
    Command,
    Database,
    Frame,
    GitFork,
    LayoutDashboard,
    LayoutTemplate,
    LifeBuoy,
    ListTodo,
    Map as MapIcon,
    PieChart,
    Send,
    Server,
    Settings2,
    SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

// 导航菜单项类型定义
type NavItem = {
    title: string;
    url: string;
    icon?: React.ElementType;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
        icon?: React.ElementType;
    }[];
};

// 导航数据配置
const data: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    apps: {
        name: string;
        logo: React.ElementType;
        plan: string;
    }[];
    navMain: NavItem[];
    navSecondary: NavItem[];
} = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    apps: [
        {
            name: 'DataX AI',
            logo: Command,
            plan: '企业版',
        },
        {
            name: 'Acme Inc',
            logo: SquareTerminal,
            plan: '初创版',
        },
    ],
    navMain: [
        {
            title: '智能平台',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: '概览',
                    url: dashboard.url(),
                    icon: LayoutDashboard,
                },
                {
                    title: '代理人',
                    url: '/agents',
                    icon: Bot,
                },
                {
                    title: '任务',
                    url: '/tasks',
                    icon: ListTodo,
                },
                {
                    title: '训练',
                    url: '/training',
                    icon: Brain,
                },
                {
                    title: 'MCP 服务',
                    url: '/mcp',
                    icon: Server,
                },
            ],
        },
        {
            title: '数据工程',
            url: '#',
            icon: Database,
            items: [
                {
                    title: '数据源',
                    url: '/data-sources',
                    icon: Database,
                },
                {
                    title: '数据建模',
                    url: '/data-modeling',
                    icon: Frame,
                },
                {
                    title: '维度建模',
                    url: '/dimensional-modeling',
                    icon: LayoutTemplate,
                },
                {
                    title: '血缘分析',
                    url: '/lineage',
                    icon: GitFork,
                },
            ],
        },
        {
            title: '设置',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: '常规',
                    url: '#',
                    icon: Settings2,
                },
                {
                    title: '团队',
                    url: '#',
                    icon: PieChart,
                },
                {
                    title: '计费',
                    url: '#',
                    icon: MapIcon,
                },
                {
                    title: '限额',
                    url: '#',
                    icon: Frame,
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: '支持',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: '反馈',
            url: '#',
            icon: Send,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <AppSwitcher apps={data.apps} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>平台</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => {
                            // 检查子项是否有当前激活的路由
                            const hasActiveChild = item.items?.some(
                                (subItem) =>
                                    url === subItem.url ||
                                    (subItem.url !== dashboard.url() &&
                                        url.startsWith(subItem.url)),
                            );
                            const Icon = item.icon;

                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={
                                        item.isActive || hasActiveChild
                                    }
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {Icon && <Icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => {
                                                    const isChildActive =
                                                        url === subItem.url ||
                                                        (subItem.url !==
                                                            dashboard.url() &&
                                                            url.startsWith(
                                                                subItem.url,
                                                            ));
                                                    const SubIcon =
                                                        subItem.icon;
                                                    return (
                                                        <SidebarMenuSubItem
                                                            key={subItem.title}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={
                                                                    isChildActive
                                                                }
                                                            >
                                                                <Link
                                                                    href={
                                                                        subItem.url
                                                                    }
                                                                >
                                                                    {SubIcon && (
                                                                        <SubIcon className="mr-2 size-4" />
                                                                    )}
                                                                    <span>
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>帮助</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navSecondary.map((item) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="sm">
                                        <Link href={item.url}>
                                            {Icon && <Icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
