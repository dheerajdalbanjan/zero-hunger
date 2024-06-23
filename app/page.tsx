import Image from "next/image";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Target from "./_components/target";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen m-0 p-0 bg-[#FFF3CF]">
      <Head>
      <meta name="google-site-verification" content="mFHiGK3tw60HlCR5QUjObbB54ogOYBb5eHj0STh9WaE" />
      </Head>
      
      <Hero />
      <Target />
    </div>
  );
}
