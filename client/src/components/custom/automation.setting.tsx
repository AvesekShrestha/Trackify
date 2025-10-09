import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";

export default function AutomationSetting() {
  const [isEnabled, setIsEnabled] = useState(false);
  const triggeredRef = useRef(false);

  const settings = [
    {
      id: 1,
      title: "Automate Tracking",
      description: "Automatically tracks your income/expenses through Gmail",
    },
  ];

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("automation_enabled");
    if (savedState !== null) {
      setIsEnabled(savedState === "true");
    }
  }, []);

  const { data: url, refetch, isFetching } = useQuery({
    queryKey: ["url"],
    queryFn: async () => {
      const response = await api.get("/oauth/");
      return response?.data?.url || "";
    },
    enabled: false,
  });

  useEffect(() => {
    if (triggeredRef.current && url) {
      window.open(url, "_blank");
      triggeredRef.current = false;
    }
  }, [url]);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    localStorage.setItem("automation_enabled", checked.toString()); // save state
    if (checked) {
      triggeredRef.current = true;
      refetch();
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6 bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Automation Settings</h2>

      {settings.map((setting) => (
        <div
          key={setting.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
        >
          <div>
            <h3 className="text-lg font-medium">{setting.title}</h3>
            <p className="text-gray-500 text-sm">{setting.description}</p>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={isFetching} // optional: disable while fetching
          />
        </div>
      ))}
    </div>
  );
}

