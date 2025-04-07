import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const dashLinks: NavLinkI[] = [
    { title: "Overview", href: "/dashboard" },
    { title: "Products", href: "/dashboard/products" },
    { title: "Customers", href: "/dashboard/users" },
    { title: "Admins", href: "/dashboard/admins" },
    { title: "Orders", href: "/dashboard/orders" },
    { title: "Settings", href: "/dashboard/settings" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    if (!session) return redirect("/auth/login");
    if (session.role !== "admin") return redirect("/");

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <DashNavbar />
                <div className="flex-grow p-4 min-h-screen bg-base-content text-base-100">
                    {children}
                </div>
            </div>
            <Sidebar links={dashLinks} />
        </div>
    );
}
