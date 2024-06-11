"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Mydonations = () => {
    const [loading, setLoading] = useState(true) ;
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
      fetch('api/mydonations', {method: "GET"})
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
        <h1 className='text-3xl font-bold my-3 antialiased'>My Donations</h1>
        {data &&  data.map((e: any, i: number)=>
        
          <Card key={i} className='mb-3 rounded-lg shadow-lg'>
              <CardHeader>
                <CardTitle>{e.title}</CardTitle>
                <CardDescription>{e.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-lg'>Quantity: {e.quantity}</p>
              </CardContent>
          </Card>
          )}
    </div>
  )
}

export default Mydonations