import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  analytic: ReactNode;
  setting: ReactNode;
}
export default function DashboardLayout({
  analytic,
  setting,
}: Readonly<DashboardLayoutProps>) {
  return (
    <div>
      <aside>{setting}</aside>
      <main>{analytic}</main>
    </div>
  );
}
