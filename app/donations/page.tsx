"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
  email: z.string().email() , 
  reason: z.string().min(5, {message: "Input should be of minimum 5 characters."})
})

const Mydonations = () => {
    const [loading, setLoading] = useState(true) ;
    const [data, setData] = useState<any>(null)
    const [open, setOpen] = useState(false) ;
    const [success, setSuccess] = useState(false) ;
    const {data: session} = useSession() ;
    const [donation, setDonation] = useState<any>(null)
    const form = useForm<z.infer<typeof formSchema >>({resolver: zodResolver(formSchema)})


    const submit = async (data: z.infer<typeof formSchema>)=>{
      setOpen(false)
      const body = {
        nemail: data.email ,
        reason: data.reason ,
        donorEmail: donation?.user.email , 
        title: donation?._doc?.title ,
        description: donation._doc?.description, 
        _id : donation?._doc._id ,
        name:session? session?.user?.name: 'Non logged In user'  
      } ;

      const res = await fetch('api/receive', {method:'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(body) })
      const d = await res.json() ;
      if (res.ok) {
        setSuccess(true);
      } else {
        // Handle error scenario
        console.error('API request failed with status:', res.status);
        setSuccess(false);
        // Optionally, set an error message state
      }
      console.log(body)
    }

    useEffect(()=>{
      fetch('api/donation', {method: "GET"})
      .then(res=> {if(res.ok) return res.json();})
        .then(data => {console.log(data) ;setData(data.data)})
      .finally(()=>setLoading(false))
    },[])

   
  return (
    <div className='max-w-7xl mx-auto pt-5 min-h-screen'>
      {/* {loading && (
        <div className="fixed inset-0 w-full h-full  bg-opacity-50 backdrop-blur-xl z-50 flex items-center justify-center ">
          <LoaderIcon className="animate-spin" />
        </div>
      )} */}
        <h1 className='text-3xl font-bold my-3 antialiased'>Donations</h1>

        {loading && <div className='flex flex-col space-y-8 py-5'>
          <div className='w-full flex flex-col space-y-3 '>
            <Skeleton className='w-full rounded-lg h-20 '/>
            <Skeleton className='w-full rounded-lg h-10 '/>
            <div className='flex items-center justify-between space-x-3'>

            <Skeleton className='w-full rounded-lg h-10 '/>
            <Skeleton className='w-28 h-10 rounded-lg' />
            </div>

          </div>
          <div className='w-full flex flex-col space-y-3 '>
            <Skeleton className='w-full rounded-lg h-20 '/>
            <Skeleton className='w-full rounded-lg h-10 '/>
            <div className='flex items-center justify-between space-x-3'>

            <Skeleton className='w-full rounded-lg h-10 '/>
            <Skeleton className='w-28 h-10 rounded-lg' />
            </div>

          </div>
          <div className='w-full flex flex-col space-y-3 '>
            <Skeleton className='w-full rounded-lg h-20 '/>
            <Skeleton className='w-full rounded-lg h-10 '/>
            <div className='flex items-center justify-between space-x-3'>

            <Skeleton className='w-full rounded-lg h-10 '/>
            <Skeleton className='w-28 h-10 rounded-lg' />
            </div>

          </div>
        </div>}

        {data &&  data.map((e: any, i: number)=>
        
          <Card key={i} className='my-5 rounded-lg shadow-lg'>
              <CardHeader className=' rounded-lg bg-amber-100'>
                <CardTitle>{e._doc.title}</CardTitle>
                <CardDescription>{e._doc.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex justify-between items-center py-4'>
                <div className='flex flex-col space-y-2'>
                    <h4 className='text-xl font-semibold antialiased'>Donor Details</h4>
                    <p className='text-lg'>Name: {e.user.name}</p>
                    <p className='text-lg'>Email: {e.user.email}</p>
                </div>
                <p className='text-lg'>Quantity: {e._doc.quantity}</p>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <Button onClick={()=> {setOpen(true); setDonation(e)}}>Receive</Button>
              </CardFooter>
          </Card>
          )}


          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                Receive the donation
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your reason" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type='submit'  className='mt-5 float-right'>Receive donation</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={success} onOpenChange={setSuccess}>
            
            <DialogContent className="bg-emerald-700 border-none text-neutral-50">
            <DialogHeader>
                <DialogTitle>Success</DialogTitle>
                <DialogDescription className="text-neutral-100">successfully informed the Donor about your need</DialogDescription>
            </DialogHeader>
            <Check className="w-36 mx-auto  h-36 border-emerald-200 text-emerald-300 border-4 my-3 rounded-full font-bold" />
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default Mydonations