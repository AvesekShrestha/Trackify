"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import LoginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IUser, loginSchema } from "@/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode"
import { useUser } from "@/context/userContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Login = () => {
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<string | null>(null)

  const navigate = useNavigate();
  const { setUser } = useUser()

  const loginMutation = useMutation({
    mutationFn: async (data: IUser) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data: any) => {
      const user: any = jwtDecode(data.accessToken)
      setUser({ id: user._id, username: user.username, email: user.email })
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response.data.message
      setShowError(message)
      setTimeout(() => {
        setShowError(null)
      }, 3000)
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IUser> = (data) => {
    loginMutation.mutate(data);
    reset()
  };

  return (
    <>
      {
        showError && (
          <Alert variant="destructive" className="fixed">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{showError}</AlertDescription>
          </Alert>
        )
      }
      <div className="flex flex-col min-h-screen items-center justify-center bg-white">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg border bg-white">
          {/* Left Side - Image */}
          <div className="hidden md:flex w-1/2 relative">
            <img
              src={LoginImage}
              alt="Login Illustration"
              className="absolute inset-0 w-full h-full object-cover object-top scale-50"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
            <Card className="w-full max-w-sm border-none shadow-none">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  Login
                </CardTitle>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </CardHeader>

              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@gmail.com"
                            className="pl-10"
                            {...field}
                          />
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type={show ? "text" : "password"}
                            className="pl-10 pr-10"
                            placeholder="********"
                            {...field}
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {show ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={loginMutation.isLoading}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>

                  {/* Footer */}
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

