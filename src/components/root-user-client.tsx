'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootUserClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col min-h-screen w-full p-4 relative">
          <SidebarTrigger className="fixed" />
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
