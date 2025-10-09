"use client";

import { useState } from "react";
import { User, Bell, Lock } from "lucide-react";
import ProfileSetting from "@/components/custom/profile.setting";
import PasswordSetting from "@/components/custom/password.setting";
import AutomationSetting from "@/components/custom/automation.setting";

export default function Setting() {
    const [activeTab, setActiveTab] = useState<"profile" | "automation" | "password">("profile");

    return (
        <div className="bg-gray-50 text-gray-900 flex flex-col gap-3 p-6">
            <h1 className="text-3xl font-semibold mb-2">Account Settings</h1>

            <div className="flex items-center gap-6 border-b border-gray-200 pb-3">
                <NavItem
                    icon={<User size={18} />}
                    label="Profile"
                    active={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                />
                <NavItem
                    icon={<Bell size={18} />}
                    label="Automation"
                    active={activeTab === "automation"}
                    onClick={() => setActiveTab("automation")}
                />
                <NavItem
                    icon={<Lock size={18} />}
                    label="Password"
                    active={activeTab === "password"}
                    onClick={() => setActiveTab("password")}
                />
            </div>

            <div className="">
                {activeTab === "profile" && <ProfileSetting />}
                {activeTab === "automation" && <AutomationSetting />}
                {activeTab === "password" && <PasswordSetting/>}
            </div>
        </div>
    );
}

// Reusable top nav item
function NavItem({
    icon,
    label,
    active = false,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${active
                ? "text-yellow-600 border-yellow-500"
                : "text-gray-600 border-transparent hover:text-yellow-600 hover:border-yellow-300"
                }`}
        >
            {icon}
            <span className="hidden sm:block">{label}</span>
        </button>
    );
}

