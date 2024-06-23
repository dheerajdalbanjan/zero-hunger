"use client"


import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowDownNarrowWide, ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session?.user)


  return (
    <div className='px-4 bg-[#FFF3CF]'>
    <div className='py-4 max-w-7xl mx-auto flex items-center justify-between  '>
      <a href='/' className='relative text-neutral-700 '>
        <p className='text-4xl font-semibold'>0</p>
        <p className='absolute left-6 text-xl  top-2'>Hunger</p>
      </a>
      <div className='md:flex items-center  hidden'>
        <a className='  px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/">Home</a>
        <a className='text-base px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/about">About</a>
        <a className='text-base px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/donate">Donate</a>
        

        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center space-x-4 px-4 outline-none border-none active:scale-90 transition-all duration-300 rounded-lg py-2 hover:bg-amber-600/20'>Tools <ChevronDown className='ml-1 text-neutral-700 w-5' /></DropdownMenuTrigger>
          <DropdownMenuContent className='bg-opacity-50 filter backdrop-blur-xl'>
            <DropdownMenuGroup>
              <DropdownMenuItem ><a href={'bmi'}>bmi calculator</a></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <a className='text-base px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/donations">All donations</a>

        {!session && <a className='text-base px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/registration">Registration</a>}
        {!session && <a className='text-base px-4 active:scale-90 transition-all rounded-lg py-2 hover:bg-amber-600/20 duration-300' href="/login">Log in</a>}
        {session && <DropdownMenu>
          
            <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
            <AvatarFallback>
              {session.user?.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-opacity-80 filter backdrop-blur-xl'>
              <DropdownMenuGroup>
                <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
                <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
                <a href="/mydonations"><DropdownMenuItem>My donations</DropdownMenuItem></a>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut()}>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          
          </DropdownMenu>}
      </div>
    </div>
    </div>
  )
}

export default Navbar