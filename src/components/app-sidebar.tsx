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
} from '@/components/ui/sidebar';
import { Clock, FileText, Home } from 'lucide-react';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'ホーム',
    url: '/',
    icon: Home,
  },
  {
    title: '過去の取り組み',
    url: '/medical_cares',
    icon: Clock,
  },
  {
    title: 'テンプレート',
    url: '/medical_care_templates',
    icon: FileText,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg my-8 font-bold">
            医療シミュレーション
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-4">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className="size-8" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
