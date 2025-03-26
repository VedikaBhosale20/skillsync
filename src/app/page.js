'use client'
import RootLayout from "./layout";
import { useSelector } from "react-redux";


export default function Home() {
  const count = useSelector((state) => state.counter.value);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div>
      Hello skillsync
    </div>
      </main>
        
    </div>
  );
}
Home.layout = RootLayout
//landing page 
//use next router 