"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import PlaceCard from "./components/PlaceCard";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:4200/api/places");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Debugging output

        // Ensure data.places exists and is an array
        setPlaces(data?.data?.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]); // Ensure places is always an array
      }
    };

    fetchPlaces();
  }, []);

  if (!isSignedIn) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100 text-white">
        <div className="w-full max-w-md p-8 shadow-xl rounded-2xl border border-gray-300 bg-white text-center transition-transform transform scale-105">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-600 mt-3 mb-6 text-sm">
            You must be signed in to view this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="z-10 w-screen flex flex-col items-center justify-center h-screen text-white relative">
      <div className="w-[90%] h-[85%] flex flex-col justify-start items-start gap-10">
        <div className="w-full h-20 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sup, {user.firstName}!</h1>
          <UserButton />
        </div>

        <div className="w-full h-auto flex flex-col justify-center items-around gap-4">
          <h2 className=" text-xl font-bold">Special :</h2>
          <div className="w-full h-36 border border-[#33436A] border-separate border-spacing-2 rounded-xl flex items-center justify-center">
            <div className="bg-[url(https://marketplace.canva.com/EAE1xXM6j0I/1/0/1600w/canva-white-and-brown-modern-minimalist-cafe-promotion-poster-%28landscape%29-fPxyXC8gNs8.jpg)] bg-center bg-cover rounded-xl w-[95%] h-32 "></div>
          </div>

          <h3 className=" text-xl font-bold">Places :</h3>
          <div className="flex w-full overflow-x-scroll whitespace-nowrap space-x-4 scrollbar-hide">
            <div className="min-w-[100px] h-8 border border-[#33436A] rounded-2xl flex items-center justify-center text-[#D8D8D8] font-semibold">
              Stores
            </div>
            <div className="min-w-[140px] h-8 border border-[#33436A] rounded-2xl flex items-center justify-center text-[#D8D8D8] font-semibold">
              Restaurant
            </div>
            <div className="min-w-[100px] h-8 border border-[#33436A] rounded-2xl flex items-center justify-center text-[#D8D8D8] font-semibold">
              Cafe
            </div>
            <div className="min-w-[180px] h-8 border border-[#33436A] rounded-2xl flex items-center justify-center text-[#D8D8D8] font-semibold">
              Convenience store
            </div>
            <div className="min-w-[100px] h-8 border border-[#33436A] rounded-2xl flex items-center justify-center text-[#D8D8D8] font-semibold">
              Market
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {places.map((place) => (
              <a href={`/${place._id}`} key={place._id}>
                <PlaceCard
                  name={place.name}
                  img={place.image}
                  desc={place.Description}
                  rating={place.Rating}
                  location={place.Location}
                  categories={place.Categories}
                  phone={place.PhoneNumber}
                  link={place.PlaceLocationLink}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Move Header here so it stays at the bottom */}
      <Header />
    </div>
  );
}
