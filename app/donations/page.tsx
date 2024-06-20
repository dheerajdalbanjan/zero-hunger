"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Mydonations = () => {
    const [loading, setLoading] = useState(true) ;
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
      fetch('api/donation', {method: "GET"})
      .then(res=> {if(res.ok) return res.json();})
        .then(data => {console.log(data) ;setData(data.data)})
      .finally(()=>setLoading(false))
    },[])
  return (
    <div className='max-w-7xl mx-auto pt-5 min-h-screen'>
      {loading && (
        <div className="fixed inset-0 w-full h-full  bg-opacity-50 backdrop-blur-xl z-50 flex items-center justify-center ">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
        <h1 className='text-3xl font-bold my-3 antialiased'>Donations</h1>
        {data &&  data.reverse().map((e: any, i: number)=>
        
          <Card key={i} className='my-5 rounded-lg shadow-lg'>
              <CardHeader className='rounded-xl bg-emerald-100'>
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
                <Button>Receive</Button>
              </CardFooter>
          </Card>
          )}
    </div>
  )
}

export default Mydonations