import Image from "next/image";
import Header from "../components/Header";

export default function Search() {
  const buttonLabels = [
    "Restaurant",
    "Stores",
    "Convenience store",
    "Cafe",
    "Coffee Shops",
    "Book Store",
    "Library",
    "Assassin",
  ];

  return (
    <div className="w-screen p-12 flex flex-col items-center justify-start h-screen bg-gray-900 text-white ">
      <Header />
      <div className="border rounded-3xl w-full mb-8 px-5 py-3 border-slate-600 text-slate-400 flex items-center justify-between">
        <span>Search here...</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div className=" ">
        {buttonLabels.map((label, index) => (
          <button
            key={index}
            className="whitespace-nowrap rounded-3xl text-sm mr-3 mb-3 border border-slate-600 px-6 py-2 transition-transform transform hover:scale-105 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
