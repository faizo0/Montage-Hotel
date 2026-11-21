import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/dashboard/components/AdminSidebar';
import { AdminTopbar } from '@/dashboard/components/AdminTopbar';
import { PageTransition } from '@/components/animations/PageTransition';

export function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F8F3EA] text-[#29232A]">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 p-6 lg:p-10">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
