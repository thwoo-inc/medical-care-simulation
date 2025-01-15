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
import { BriefcaseMedical, ClipboardList, Hospital } from 'lucide-react';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'ホーム',
    url: '/',
    icon: Hospital,
  },
  {
    title: '過去の取り組み',
    url: '/medical_cares',
    icon: BriefcaseMedical,
  },
  {
    title: 'テンプレート',
    url: '/medical_care_templates',
    icon: ClipboardList,
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
