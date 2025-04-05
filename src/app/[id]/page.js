"use client";

import Head from "next/head";
import Link from "next/link";
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
          <Link href="/">
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
          </Link>
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
        <div className="w-full h-full bg-gray-900 flex justify-start items-center flex-col text-white p-4 gap-6 bg-[url('https://l1ydo07ih8.ufs.sh/f/tRac1gz0giWLaIKiEn9qiQ0EBTv3ClzpZdUWNnI4ew1uH2MS')] bg-contain bg-bottom bg-no-repeat">
          <div className="w-14 h-[4px] bg-[#E2E2E2]"></div>
          <div className="w-full h-20 border border-[1px] border-[#33436A] rounded-2xl flex justify-start items-center p-4 gap-4">
            <div
              style={{
                backgroundImage: `url(${place.image})`,
              }}
              className="w-[56px] h-[56px] rounded-full bg-cover bg-center bg-no-repeat"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="text-xl font-bold">{place.name}</p>
              <p className="text-xs opacity-65">{place.Description}</p>
            </div>
          </div>
          <div className="w-full min-h-40 h-60 border border-[1px] border-[#33436A] rounded-2xl flex flex-col justify-center items-start p-4 gap-4">
            <div className="w-full h-1/5 flex justify-start items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>

              <p className="text-sm inline">{place.Location}</p>
            </div>
            <div className="w-full h-1/5 flex justify-start items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <p className="text-sm inline">+976 {place.PhoneNumber}</p>
            </div>
            <div className="w-full h-1/5 flex justify-start items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <p className="text-sm inline">
                {/* {place.WorkingHours} */}
                Not Added Yet
              </p>
            </div>
            <div className="w-full h-1/5 flex justify-start items-center gap-4">
              <svg viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                <path d="M14.8748 2.06356C16.0342 2.06703 17.1451 2.52911 17.9648 3.34889C18.7846 4.16867 19.2467 5.27954 19.2502 6.43888V15.1886C19.2467 16.3479 18.7846 17.4588 17.9648 18.2786C17.1451 19.0983 16.0342 19.5604 14.8748 19.5639H6.12516C4.96582 19.5604 3.85495 19.0983 3.03517 18.2786C2.21539 17.4588 1.75331 16.3479 1.74984 15.1886V6.43888C1.75331 5.27954 2.21539 4.16867 3.03517 3.34889C3.85495 2.52911 4.96582 2.06703 6.12516 2.06356H14.8748ZM14.8748 0.313721H6.12516C2.75625 0.313721 0 3.06997 0 6.43888V15.1886C0 18.5575 2.75625 21.3137 6.12516 21.3137H14.8748C18.2437 21.3137 21 18.5575 21 15.1886V6.43888C21 3.06997 18.2437 0.313721 14.8748 0.313721Z" fill="#D8D8D8" />
                <path d="M16.1873 6.43888C15.9278 6.43888 15.674 6.3619 15.4582 6.21768C15.2423 6.07346 15.0741 5.86848 14.9748 5.62865C14.8754 5.38882 14.8494 5.12492 14.9001 4.87032C14.9507 4.61572 15.0757 4.38186 15.2593 4.1983C15.4428 4.01474 15.6767 3.88974 15.9313 3.8391C16.1859 3.78845 16.4498 3.81445 16.6896 3.91379C16.9294 4.01313 17.1344 4.18135 17.2786 4.39719C17.4229 4.61303 17.4998 4.86679 17.4998 5.12638C17.5002 5.29884 17.4665 5.46968 17.4007 5.62909C17.3349 5.78849 17.2382 5.93333 17.1162 6.05528C16.9943 6.17723 16.8495 6.2739 16.6901 6.33972C16.5306 6.40555 16.3598 6.43925 16.1873 6.43888Z" fill="#D8D8D8" />
                <path d="M10.5 7.31356C11.1923 7.31356 11.869 7.51885 12.4446 7.90345C13.0202 8.28805 13.4688 8.8347 13.7337 9.47427C13.9986 10.1138 14.068 10.8176 13.9329 11.4966C13.7978 12.1755 13.4645 12.7992 12.975 13.2887C12.4855 13.7782 11.8618 14.1116 11.1828 14.2466C10.5039 14.3817 9.80012 14.3124 9.16055 14.0474C8.52098 13.7825 7.97433 13.3339 7.58973 12.7583C7.20512 12.1827 6.99984 11.506 6.99984 10.8137C7.00084 9.88573 7.36992 8.99602 8.02611 8.33983C8.6823 7.68364 9.57201 7.31456 10.5 7.31356ZM10.5 5.56372C9.46165 5.56372 8.44662 5.87163 7.58326 6.4485C6.7199 7.02538 6.04699 7.84532 5.64963 8.80463C5.25227 9.76394 5.14831 10.8195 5.35088 11.8379C5.55345 12.8563 6.05346 13.7918 6.78769 14.526C7.52192 15.2603 8.45738 15.7603 9.47578 15.9628C10.4942 16.1654 11.5498 16.0614 12.5091 15.6641C13.4684 15.2667 14.2883 14.5938 14.8652 13.7305C15.4421 12.8671 15.75 11.8521 15.75 10.8137C15.75 9.42133 15.1969 8.08598 14.2123 7.10141C13.2277 6.11684 11.8924 5.56372 10.5 5.56372Z" fill="#D8D8D8" />
              </svg>
              <p className="text-sm inline">
                {/* {place.WorkingHours} */}
                Not Added Yet
              </p>
            </div>
            <div className="w-full h-1/5 flex justify-start items-center gap-4">
              <svg viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                <path fillRule="evenodd" clipRule="evenodd" d="M21 10.8137C21 5.01528 16.2984 0.313721 10.5 0.313721C4.70156 0.313721 0 5.01528 0 10.8137C0 16.0543 3.83906 20.3983 8.85938 21.1867V13.8498H6.19266V10.8137H8.85938V8.50044C8.85938 5.86935 10.4273 4.41481 12.8255 4.41481C13.9744 4.41481 15.1763 4.62013 15.1763 4.62013V7.20435H13.8516C12.548 7.20435 12.1402 8.01341 12.1402 8.84497V10.8137H15.052L14.587 13.8498H12.1406V21.1876C17.1609 20.3997 21 16.0558 21 10.8137Z" fill="#D8D8D8" />
              </svg>

              <p className="text-sm inline">
                {/* {place.WorkingHours} */}
                Not Added Yet
              </p>
            </div>
          </div>
          
          <div className="w-full min-h-10 h-10 border border-[1px] border-[#33436A] rounded-2xl flex justify-start items-center p-4 gap-4">
           {place.Categories.map((el, index) => (
              <div key={index} className="w-auto p-3 h-6 text-sm bg-[#121B2C] rounded-2xl flex items-center justify-center text-white">
                {el}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full h-full bg-gray-900 flex justify-start items-center flex-col text-white p-4 gap-6">
          
        </div> */}
      </div>
    </div>
  );
}
