"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import {useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerSchema } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SignUpRequest } from "@/redux/slice/auth.slice";
import { SignUpPayload } from "@/types/auth.types";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpPayload>({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = (data:SignUpPayload) => {
      dispatch(SignUpRequest(data))
      router.push("/login")
      reset()
  };
  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center bg-white px-6 py-12 rounded shadow-md w-[400px] mx-5 md:w-[500px] md:mx-10">
        <Image
          src="/images/Logo.webp"
          height={100}
          width={140}
          alt="Pickbazar logo"
        />
        <em className="text-gray-600 mt-2 mb-4">Register new account</em>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:px-4"
        >
          <div className="w-full mb-4">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              type="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-700 pt-2">{errors.name.message}</p>
            )}
          </div>
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
              <p className="text-sm text-red-700 pt-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full mb-6">
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
                <p className="text-sm text-red-700 pt-2">
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium mb-6 cursor-pointer"
          >
            Register
          </Button>
        </form>
        <div className="flex items-center w-full mb-4">
          <Separator className="flex-1" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <Separator className="flex-1" />
        </div>

        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
