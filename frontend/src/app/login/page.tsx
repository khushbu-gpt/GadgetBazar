"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "@/validation/authValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LoginRequest } from "@/redux/slice/auth.slice";
import { LoginPayload } from "@/types/auth.types";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginPayload) => {
    dispatch(LoginRequest(data));
    router.push("/cart");
    reset();
  };

  return (
    <>
  <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center bg-white px-6 py-12 sm:px-10 sm:py-20 rounded  border  shadow-md  justify-center  w-96 
     ">
        <div>
          <Image
            src="/images/Logo.webp"
            height={100}
            width={140}
            alt="Pickbazar logo"
          />{" "}
          <em className="text-gray-600 mt-2 mb-4">Login to dashboard</em>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-700 py-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full mb-1">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-700 py-2">
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="w-full text-right mb-4">
            <Link
              href="/forgot-password"
              className="text-sm text-teal-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium mb-6 cursor-pointer">
            Login
          </Button>

          <div className="flex items-center w-full mb-4">
            <Separator className="flex-1" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="text-sm text-center">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-teal-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
      </div>
    </>
  );
}
