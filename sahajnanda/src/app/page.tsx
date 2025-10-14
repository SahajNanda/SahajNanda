'use client';
import Image from "next/image";
import Outline from "./components/outline";
import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <Outline>
      <div className="flex flex-col p-8">
        <h1 className="text-6xl font-bold">
          <ReactTyped
            strings={["Hello, I'm Sahaj!"]}
            typeSpeed={80}
            backSpeed={20}
            cursorChar="|"
            showCursor={false}
          />
        </h1>
        <p className="mt-4 text-3xl">
          <ReactTyped
            strings={["I'm a Cybersecurity Graduate Student at the University of Georgia"]}
            typeSpeed={40}
            backSpeed={20}
            cursorChar="|"
            startDelay={3000}
            showCursor={false}
          />
        </p>
      </div>
    </Outline>
  );
}
