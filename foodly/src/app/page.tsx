import Header from "@/components/Headers/Header";
import BestSelles from "@/components/BestSelles";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <div className="w-full h-full">
      <Hero />
      <BestSelles />
    </div>
  );
}
