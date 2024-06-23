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
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema: any = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  quantity: z.number().positive("Quantity must be a positive number"),
});

const Donate = ({ params }: { params: { slug: string } }) => {
    const [success, setSuccess] = useState(false)
    const {data:session} = useSession() ;
    const [data, setData] = useState({title: '', description: '', quantity: 0})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {data}
  });


  useEffect(() => {
    fetch(`/api/donation/${params.slug}`)
    .then(res=>{return res.json() }) 
    .then(data=>{const {title, description, quantity} = data.data ; form.setValue('title', title);form.setValue('description', description);form.setValue('quantity', quantity); setSuccess(true)})
  }, [])
  

  const [loading, setLoading] = useState(false) ;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
     const {title, description, quantity} = data ;
     const blogId = params.slug ;
     setLoading(true)
     fetch('/api/donation', {method : 'PUT', headers:{'content-type': 'application/json'}, body:JSON.stringify({title, description, quantity, id: blogId})})
     .then(res=>{if(res.ok){alert("successfully updated donation.")}})
        .finally(()=>setLoading(false))
  };
  return (
    <div className="min-h-screen bg-[#FFF3CF] px-24 py-5">
      <Card className="md:max-w-3xl !w-full md:p-2 rounded-xl md:mx-auto mx-4 filter bg-opacity-50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Edit Donation</CardTitle>
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
                        
                      {success ?<Input placeholder="enter the title" {...field} />: <Skeleton className="h-10 w-full rounded-lg"/>}
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
                      {success?<Input placeholder="enter the description" {...field} />: <Skeleton className="h-10 w-full rounded-lg"/>}
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
                      {success?<Input   type="number" placeholder="enter the quantity" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>: <Skeleton className="h-10 w-full rounded-lg"/>}
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
                  Update Donation
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
