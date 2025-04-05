"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PlaceDetailPage() {
  const router = useRouter();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // Get ID from URL
        const id = window.location.pathname.split("/")[1];

        const res = await fetch(`http://localhost:4200/api/places/${id}`);

        if (!res.ok) {
          console.error(`API error: ${res.status}`);
          setPlace(null);
          return;
        }

        const response = await res.json();
        setPlace(response?.data?.place || null);
      } catch (error) {
        console.error("Error fetching place:", error);
        setPlace(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case when data couldn't be fetched
  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">Place Not Found</h1>
        <p className="mb-6">
          The place you're looking for doesn't exist or couldn't be loaded.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white h-screen">
      <Head>
        <title>{place.name || "Place Details"}</title>
        <meta property="og:title" content={place.name} />
        <meta property="og:description" content={place.Description} />
        <meta property="og:image" content={place.image} />
      </Head>

      <div
        className="w-full h-2/5 flex justify-between items-start bg-center bg-cover bg-no-repeat p-6 fixed top-0 left-0"
        style={{ backgroundImage: `url(${place.image})` }}
      >
        <div>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="18"
              fill="#1E2636"
              fillOpacity="0.8"
            />
            <path
              d="M21.488 10.5176C21.5717 10.4318 21.6371 10.3307 21.6805 10.2204C21.724 10.11 21.7446 9.99236 21.7411 9.87426C21.7377 9.75615 21.7103 9.63986 21.6605 9.53203C21.6107 9.4242 21.5394 9.32693 21.4509 9.24578C21.3623 9.16463 21.2581 9.10119 21.1443 9.05908C21.0304 9.01697 20.9091 8.99702 20.7873 9.00036C20.6655 9.0037 20.5456 9.03027 20.4343 9.07855C20.3231 9.12684 20.2228 9.19589 20.1391 9.28176L12.2536 17.377C12.0907 17.544 12 17.7651 12 17.9949C12 18.2248 12.0907 18.4459 12.2536 18.6129L20.1391 26.709C20.2222 26.7968 20.3225 26.8676 20.4342 26.9175C20.5458 26.9674 20.6665 26.9952 20.7894 26.9994C20.9122 27.0037 21.0346 26.9842 21.1496 26.9421C21.2646 26.9001 21.3699 26.8363 21.4592 26.7545C21.5486 26.6727 21.6203 26.5745 21.6702 26.4656C21.72 26.3567 21.7471 26.2392 21.7498 26.1201C21.7525 26.001 21.7307 25.8825 21.6857 25.7716C21.6408 25.6607 21.5736 25.5596 21.488 25.4741L14.2036 17.9949L21.488 10.5176Z"
              fill="#CDCDCD"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="18"
              fill="#1E2636"
              fillOpacity="0.8"
            />
            <path
              d="M18 27.35L16.55 26.03C11.4 21.36 8 18.27 8 14.5C8 11.41 10.42 9 13.5 9C15.24 9 16.91 9.81 18 11.08C19.09 9.81 20.76 9 22.5 9C25.58 9 28 11.41 28 14.5C28 18.27 24.6 21.36 19.45 26.03L18 27.35Z"
              fill="#CDCDCD"
            />
          </svg>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="18"
              fill="#1E2636"
              fillOpacity="0.8"
            />
            <path
              d="M18 11V19.5M21 13L18 10L15 13M11 18V23C11 23.5304 11.2107 24.0391 11.5858 24.4142C11.9609 24.7893 12.4696 25 13 25H23C23.5304 25 24.0391 24.7893 24.4142 24.4142C24.7893 24.0391 25 23.5304 25 23V18"
              stroke="#CDCDCD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="z-20 translate-y-36 max-w-screen mx-auto min-h-full h-full flex bg-darkblue justify-center items-center flex-col rounded-t-2xl">
        <div className="w-full h-full bg-gray-900 flex justify-start items-center flex-col text-white p-4 gap-6">
          <div className="w-14 h-[4px] bg-[#E2E2E2]"></div>
          <div className="w-full h-20 border border-[1px] border-[#33436A] rounded-2xl flex justify-start items-center p-4 gap-4">
            <div
              style={{
                backgroundImage: `url(${place.image})`,
              }}
              className="w-[80px] h-[60px] rounded-full"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="text-xl font-bold">{place.name}</p>
              <p className="text-xs opacity-65">{place.Description}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-gray-900 flex justify-start items-center flex-col text-white p-4 gap-6">
          a
        </div>
      </div>
    </div>
  );
}
