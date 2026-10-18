import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import axios from "axios";

type Role = "user" | "rider" | "seller";

const roleOptions: Array<{ value: Role; title: string; description: string; icon: string }> = [
    { value: "user", title: "Customer", description: "Order what you need and track every delivery.", icon: "🛍" },
    { value: "rider", title: "Rider", description: "Deliver orders and earn on your own schedule.", icon: "🚴" },
    { value: "seller", title: "Seller", description: "List your products and grow your business.", icon: "🏪" },
];

const SelectRole = () => {
    const { user, setUser } = useApp();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const addRole = async () => {
        if (!selectedRole) return;

        setIsSubmitting(true);
        setErrorMessage("");
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_AUTH_SERVER_URL}/api/auth/add/role`,
                { role: selectedRole },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
            );
            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/");
        } catch (error) {
            console.error("Failed to save role:", error);
            setErrorMessage("We couldn't save your choice. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
            <section className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/40 sm:p-10">
                <div className="mx-auto max-w-xl text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/25">Z</div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">One last step</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How will you use ZeDelivery?</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                        {user?.name ? `Welcome, ${user.name}. ` : ""}Choose the option that best describes you.
                    </p>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {roleOptions.map((role) => {
                        const isSelected = selectedRole === role.value;
                        return (
                            <button
                                key={role.value}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setSelectedRole(role.value)}
                                className={`rounded-2xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSelected ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"}`}
                            >
                                <span className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">{role.icon}</span>
                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isSelected ? "border-blue-600 bg-blue-600 text-xs text-white" : "border-slate-300"}`} aria-hidden="true">
                                        {isSelected ? "✓" : ""}
                                    </span>
                                </span>
                                <span className="mt-5 block text-lg font-bold text-slate-900">{role.title}</span>
                                <span className="mt-2 block text-sm leading-5 text-slate-500">{role.description}</span>
                            </button>
                        );
                    })}
                </div>

                {errorMessage && <p role="alert" className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">{errorMessage}</p>}
                <button type="button" onClick={addRole} disabled={!selectedRole || isSubmitting} className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
                    {isSubmitting ? "Saving your choice..." : "Continue"}
                </button>
            </section>
        </main>
    );
};

export default SelectRole;
