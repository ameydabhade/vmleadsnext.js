

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to get started with our service
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
              <p className="text-xs text-slate-500">
                Password must be at least 8 characters long and include a number and special character
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Create account</Button>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-slate-500">Already have an account?</span>
              <a href="login" className="text-sm text-blue-600 hover:underline">
                Sign in
              </a>
    
            </div>
          </CardFooter>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="currentColor" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.365 1.43c0 1.143-.558 2.25-1.415 3.107-.957.78-1.992 1.235-3.107 1.16-.167-1.143.39-2.36 1.27-3.092.957-.78 2.068-1.235 3.252-1.175zm2.925 5.09c-1.5-.088-2.763.63-3.45.63-.718 0-1.785-.6-2.955-.585-1.52.015-2.928.885-3.705 2.235-1.575 2.745-.4 6.825 1.14 9.06.75 1.095 1.652 2.31 2.835 2.27 1.14-.046 1.558-.736 2.925-.736 1.365 0 1.757.736 2.94.713 1.233-.015 2.02-1.095 2.775-2.185.87-1.275 1.23-2.505 1.245-2.565-.03-.015-2.385-.915-2.4-3.66-.015-2.295 1.845-3.375 1.93-3.435-1.065-1.56-2.7-1.725-3.285-1.76l.005-.002z" fill="currentColor" />
            </svg>
            Apple
          </Button>
        </div>

        <p className="text-center text-xs text-slate-500">
          By creating an account, you agree to our{' '}
          <a href="#" className="underline hover:text-slate-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-slate-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
