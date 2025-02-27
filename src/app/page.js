import Image from "next/image";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen">
      <Header />
    </div>
  );
}
