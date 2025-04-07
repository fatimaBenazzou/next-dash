import { getUserById } from "@/action/server/user";
import ProfileForm from "@/components/ProfileForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getSession();

    if (!session) {
        return redirect("/auth/login");
    }
    const user = (await getUserById(session._id)) || ({} as UserI);

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
            <div className="w-full max-w-lg card bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Mon Profil</h2>
                <ProfileForm user={user} />
            </div>
        </div>
    );
}
