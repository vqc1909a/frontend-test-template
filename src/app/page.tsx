import {redirect} from "next/navigation";

export default async function Home() {
  redirect ("/catalog");

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 font-bold text-4xl text-blue-600'>
      Hello, world!
    </main>
  )
}
