'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="grid grid-cols-6 gap-8 h-1/4 items-center justify-center pt-8">
        <button 
          className="bg-red-700 aspect-square text-center p-4 rounded-full border-4 border-red-900 hover:bg-red-900 transition duration-300"
          onClick={() => router.push('/education')}
        >
          <h3>Education</h3>
        </button>
        <button className="bg-orange-700 aspect-square text-center p-4 rounded-full border-4 border-orange-900 hover:bg-orange-900 transition duration-300">
          <h3>Experience</h3>
        </button>
        <button className="bg-yellow-600 aspect-square text-center p-4 rounded-full border-4 border-yellow-800 hover:bg-yellow-800 transition duration-300">
          <h3>Projects</h3>
        </button>
        <button className="bg-green-700 aspect-square text-center p-4 rounded-full border-4 border-green-900 hover:bg-green-900 transition duration-300">
          <h3>Skills</h3>
        </button>
        <button className="bg-blue-700 aspect-square text-center p-4 rounded-full border-4 border-blue-900 hover:bg-blue-900 transition duration-300">
          <h3>About</h3>
        </button>
        <button className="bg-purple-700 aspect-square text-center p-4 rounded-full border-4 border-purple-900 hover:bg-purple-900 transition duration-300">
          <h3>Contact</h3>
        </button>
      </div>
    </div>
  );
}
