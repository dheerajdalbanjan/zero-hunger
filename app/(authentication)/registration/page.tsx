"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Name should contain minimum of 5 characters" })
      .max(50, { message: "Name should contain maximum of 50 characters." }),
    phone: z
      .string()
      .length(10, { message: "Phone No. must be of exactly 10 digits" }),
    email: z.string().email(),
    role: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be of minimum 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => 
    data.password === data.confirmPassword ,{
      message: "Confirm password and password do not match",
      path:['confirmPassword']
    }
  );

const Page = () => {
  const router = useRouter() ;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false) ;

  const onSubmitt = (data: z.infer<typeof formSchema>) => {
    setLoading(true) ;
    fetch('/api/register', {method:'POST', headers:{"Content-Type": "application/json",} , body: JSON.stringify(data)} )
    .then(res => {if(res.ok){alert('successfully signed up')}})
    .finally(()=>{setLoading(false); router.push('/login')})
  };
  return (
    <div className="min-h-screen w-full bg-[#FFF3CF] px-24 py-5">
      <Card className="md:max-w-3xl !w-full md:p-2 rounded-xl md:mx-auto mx-4 filter bg-opacity-50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
          <CardDescription>Welcome to 0Hunger</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitt)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your phone no." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Register as</FormLabel>
                    <FormControl>
                      <Select onValueChange={(e) => form.setValue("role", e)}>
                        <SelectTrigger>
                          <SelectValue placeholder="select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGO">NGO</SelectItem>
                          <SelectItem value="Needy">Needy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Reenter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="w-full justify-end p-0">
                <Button
                  type="submit"
                  className="mt-5 px-8 bg-amber-900 rounded-full float-right"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Register
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
