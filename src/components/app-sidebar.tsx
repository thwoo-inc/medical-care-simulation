import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      <SidebarHeader className="p-4">
        <p className="text-lg my-4 font-bold">医療シミュレーション</p>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="px-4 py-2 rounded bg-white">
                  <item.icon className="24" />
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
