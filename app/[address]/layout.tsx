// app/[address]/layout.tsx
import Sidebar from "@/app/components/layout/Sidebar";
import { styles } from "@/app/styles/utils";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  return (
    <div className={styles.layout.root}>
      <Sidebar params={params} />
      <main className={styles.layout.main}>{children}</main>
    </div>
  );
}
