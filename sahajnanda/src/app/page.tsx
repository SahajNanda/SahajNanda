import Image from "next/image";
import Outline from "./components/outline";

export default function Home() {
  return (
    <Outline>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold">
          Hello, I'm Sahaj!
        </h1>
      </div>
    </Outline>
  );
}
