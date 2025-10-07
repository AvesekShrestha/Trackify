import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const token = document.cookie.includes("accessToken")

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.data;
    },
    retry: false,
    enabled : token 
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser({ id: data._id, username: data.username, email: data.email });
    }
    if (!isLoading) {
      setLoading(false);
    }
  }, [isSuccess, data, isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

