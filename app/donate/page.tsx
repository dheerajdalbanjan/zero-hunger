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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema: any = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  quantity: z.number().positive("Quantity must be a positive number"),
  lastdate: z.string().date() 
});

const Donate = () => {
    const {data:session} = useSession() ;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
     const {title, description, quantity, lastdate} = data ;
     const user= await getSession() ;
     const userId = user?.user?._id ;
     setLoading(true)
     fetch('/api/donation', {method : 'POST', headers:{'content-type': 'application/json'}, body:JSON.stringify({title, description, quantity, user: userId, lastdate})})
     .then(res=>{if(res.ok){alert("successfully added donation.")}})
        .finally(()=>setLoading(false))
  };
  return (
    <div className="min-h-screen bg-[#FFF3CF] px-24 py-5">
      <Card className="md:max-w-3xl !w-full md:p-2 rounded-xl md:mx-auto mx-4 filter bg-opacity-50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Add Donation</CardTitle>
          <CardDescription>your donation counts</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="enter the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="enter the description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input   type="number" placeholder="enter the quantity" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last date to avail the donation</FormLabel>
                    <FormControl>
                      <Input   type="date" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>Donor: {session?.user?.name} ({session?.user?.email})</p>

<CardFooter className="w-full justify-end p-0">
                <Button
                  type="submit"
                  className="mt-5 px-8 bg-amber-900 rounded-full float-right"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Make Donation
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donate;
