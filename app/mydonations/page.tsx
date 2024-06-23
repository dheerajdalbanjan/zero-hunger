"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Mydonations = () => {
    const [loading, setLoading] = useState(true) ;
    const [bloading, setBloading] = useState<number>(100) ;
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
      fetch('api/mydonations', {method: "GET"})
      .then(res=> {if(res.ok) return res.json();})
        .then(data => {console.log(data) ;setData(data.data)})
      .finally(()=>setLoading(false))
    },[]) ;


    const handleDelete = async (id: any)=>{
      const res= await fetch('api/donation' , {method: 'DELETE', headers: {'Content-type': 'application/json'}, body: JSON.stringify({_id : id})}) ;
      const data = await res.json() ; 
      if(res.ok){
        window.location.reload() ;
      }
    }
  return (
    <div className='max-w-7xl mx-auto pt-5 min-h-screen'>
      {/* {loading && (
        <div className="fixed inset-0 w-full h-full  bg-opacity-50 backdrop-blur-xl z-50 flex items-center justify-center ">
          <LoaderIcon className="animate-spin" />
        </div>
      )} */}
        <h1 className='text-3xl font-bold my-3 antialiased'>My Donations</h1>
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
        </div>}
        {data &&  data.map((e: any, i: number)=>
        
          <Card key={i} className='mb-3 rounded-lg shadow-lg bg-amber-50'>
              <CardHeader>
                <CardTitle>{e.title}</CardTitle>
                <CardDescription>{e.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <p className='text-lg'>Quantity: {e.quantity}</p>
                <div className='flex space-x-2'>
                <a href={`/editDonation/${e._id}`}><Button variant={'outline'} >Edit</Button></a>
                <Button  onClick={()=>{handleDelete(e._id); setBloading(i)}} variant={'destructive'}>{bloading == i && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
                </div>
              </CardContent>
          </Card>
          )}
    </div>
  )
}

export default Mydonations