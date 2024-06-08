import Image from "next/image";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Target from "./_components/target";

export default function Home() {
  return (
    <div className="min-h-screen m-0 p-0 bg-[#FFF3CF]">
      
      <Hero />
      <Target />
    </div>
  );
}
