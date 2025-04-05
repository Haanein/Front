import React from "react";
import Link from "next/link";

export default function PlaceCard({
  name,
  desc,
  categories,
  img,
  oc,
  rating,
  id,
}) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFD54B"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#FFD54B"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="size-4 text-[#FFD54B]"
        >
          <path d="M12 17.75l-5.263 3.44 1.509-6.32-4.876-4.237 6.456-.522L12 4l2.174 6.111 6.456.522-4.876 4.237 1.509 6.32L12 17.75zM12 15l3.197 2.087-.831-3.47 2.675-2.325-3.542-.287L12 8.5V15z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link href={`/${id}`} passHref>
      <div className="z-10 w-full h-28 border border-[#33436A] border-separate border-spacing-2 rounded-xl flex items-center justify-around relative overflow-hidden">
        <div
          className="z-10 bg-center bg-cover rounded-xl w-[28%] h-24"
          style={{ backgroundImage: `url(${img})` }} // Fix the backgroundImage syntax
        ></div>
        <div className="w-[62%] flex flex-col justify-around items-around gap-1">
          <div className="absolute top-2 right-2">
            <div className="bg-[#121B2C] w-14 h-5 flex items-center justify-center rounded-xl gap-1">
              <div className="text-[#00D26A] text-sm">Open</div>
              <div className="bg-[#00D26A] w-2 h-2 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-white font-bold">{name}</h1>

          <div className="flex">
            {categories.map((el, index) => (
              <div key={index} className="w-auto p-2 h-4 text-sm bg-[#121B2C] rounded-2xl flex items-center justify-center text-white">
                {el}
              </div>
            ))}
          </div>
          <h2 className="text-gray-400 text-sm ">{desc}</h2>
          <div className="flex">
            <div className="flex">{renderStars(rating)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
