'use client';
import Image from "next/image";
import Outline from "./components/outline";
import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <Outline>
      <div className="flex flex-col p-8">
        <h1 className="text-6xl font-bold cursor-default text-emerald-500 hover:animate-pulse">
          <ReactTyped
            strings={["Hello, I'm Sahaj!"]}
            typeSpeed={60}
            backSpeed={20}
            cursorChar="|"
            showCursor={false}
          />
        </h1>
        <p className="mt-4 text-3xl text-gray-300 cursor-default hover:text-emerald-500 hover:animate-pulse transition duration-900 ease-in-out">
          <ReactTyped
            strings={["I'm a cybersecurity student at the University of Georgia :]"]}
            typeSpeed={20}
            backSpeed={20}
            cursorChar="|"
            startDelay={2500}
            showCursor={false}
          />
        </p>
      </div>
    </Outline>
  );
}
