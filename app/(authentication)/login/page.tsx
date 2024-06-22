"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {signIn} from 'next-auth/react'



const formSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(8, {message: "Password must be of minimum of 8 characters"})
})


const Page = () => {

  const [loading , setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const query = useSearchParams() ;
  const callback = query.get('callbackUrl')
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('') ;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { email, password } = value;
    try {
      setLoading(true)
      const res = await signIn("credentials", {email, password,redirect:false})
      console.log(res?.status)
      if (res?.error) {
        console.log(res.error)
        setError(res?.error);
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
      
      
      router.replace(callback? callback:'/')
      console.log('success')
    } catch (error) {
      console.log('error')
    }
  }


  return (
    <div className='min-h-screen bg-[#FFF3CF] px-24 py-5'>
        <Card className="md:max-w-3xl !w-full md:p-2 rounded-xl md:mx-auto mx-4 filter bg-opacity-50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your email" {...field} />
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

<CardFooter className="w-full justify-end p-0">
                <Button
                  type="submit"
                  className="mt-5 px-8 bg-amber-900 rounded-full float-right"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
    </div>
  )
}

export default Page