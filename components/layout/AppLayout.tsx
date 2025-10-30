'use client';

import * as React from 'react';
import { SidebarRail } from '@/components/ui/sidebar-rail';
import { MessageSquare, Compass, Users, Settings } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Sidebar - Fixed */}
      <SidebarRail
        fixed={true}
        sections={{
          primary: [
            {
              label: 'Chat',
              path: '/',
              icon: MessageSquare,
            },
            {
              label: 'Discover',
              path: '/discover',
              icon: Compass,
            },
            {
              label: 'Community',
              path: '/community',
              icon: Users,
              subItems: [
                { label: 'Feed', path: '/community/feed' },
                { label: 'QnA', path: '/community/qna' },
                { label: '홍보', path: '/community/promotion' },
              ]
            },
          ],
          utilities: [
            { label: 'Settings', path: '/settings', icon: Settings },
          ],
          account: {
            name: 'User',
            fallback: 'U',
            path: '/profile',
          },
        }}
      />

      {/* Main Content - With left padding for sidebar */}
      <main className="pl-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
