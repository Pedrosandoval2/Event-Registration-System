/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGoogle
} from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserForApi } from "@/hooks/useCreateUserForApi";
import { signIn, signOut, useSession } from "next-auth/react";

type Inputs = {
  username: string,
  lastname: string,
  email: string,
  phonenumber: number
}

enum AuthState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export function SignupFormDemo() {

  const { addUsers } = useCreateUserForApi();
  const { data: session } = useSession();

  // Estados
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setAuthState(AuthState.LOADING);

    try {
      const isSuccess = await addUsers({
        ...data,
        authStrategy: 'SignUp'
      });

      if (isSuccess) {
        setAuthState(AuthState.SUCCESS);
        reset();
      } else {
        setAuthState(AuthState.ERROR);
      }
    } catch (error) {
      setAuthState(AuthState.ERROR);
    }
  };

  // Función para login con Google
  const handleGoogleSignIn = useCallback(async () => {
    try {
      setAuthState(AuthState.LOADING);
      await signIn("google", { redirect: false });
    } catch (error) {
      console.error('Error during Google sign in:', error);
      setAuthState(AuthState.ERROR);
    }
  }, [
    setAuthState, signIn
  ]);

  const processGoogleUser = useCallback(async () => {

    if (!session?.user || isProcessingGoogle) {
      return;
    }
    try {
      const isSuccess = await addUsers({
        email: session.user.email,
        username: session.user.name,
        lastname: '',
        authStrategy: 'Google'
      });

      if (isSuccess) {
        setAuthState(AuthState.SUCCESS);
      } else {
        setAuthState(AuthState.ERROR);
      }
    } catch (error) {
      console.error('Error processing Google user:', error);
      setAuthState(AuthState.ERROR);
    } finally {
      setIsProcessingGoogle(false);
      await signOut({ redirect: false });
    }


  }, [session?.user, isProcessingGoogle]);

  useEffect(() => {
    if (session?.user && authState !== AuthState.SUCCESS) {
      processGoogleUser();
    }
  }, [session, processGoogleUser]);



  if (authState === AuthState.SUCCESS) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <h2 className="text-green-600 text-2xl font-bold mb-2">
          User Created Successfully
        </h2>
        <p className="text-green-600 text-sm ">
          You can now log in with your new account.
        </p>
      </div>
    );
  }


  return (
    <div className="max-w-md w-full mt-28  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">First name</Label>
            <Input id="username" placeholder="Tyler" type="text" {...register("username", { required: true })} />
            {errors.username && <span className="text-red-500">This field is required</span>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" {...register("lastname", { required: true })} />
            {errors.lastname && <span className="text-red-500">This field is required</span>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email"  {...register("email", { required: true })} />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="phonenumber">Your Phone Number </Label>
          <Input
            id="phonenumber"
            placeholder="987654321"
            type="phonenumber"
            {...register("phonenumber", { required: true })}
          />
          {errors.phonenumber && <span className="text-red-500">This field is required</span>}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
