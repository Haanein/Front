import React from "react";

export default function Header() {
  return (
    <div className="w-screen lg:w-1/2 xl:1/2 h-20 flex justify-around items-center rounded-full fixed bottom-2 left-center bg-[#182338]">
      <img
        src="https://media-hosting.imagekit.io//e96ac2fefee24fb2/screenshot_1740614481519.png?Expires=1835222484&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=iL-A2ZZDKzV52h-gNxvhBDqcpKqyo~RmaHMDht021SZb-TdR8oeI1l74Feq~jly2-CB48u6QH70S-YxgRjmCVY6xGwG2sQrPc5lrWVOKTmLWA8z00-bLmx3EfpZVvg2PjXP81qS~QFH~kQHqfwbIKyZrFXOmgTQGRnAdtkKNMtdfiJQ3RxNS4gxq9BjKB90izZHO~dHKl1WiL7jcpx0TnQ5q9K0DXUoNRL6m2QUk2p3KajpU2OROfgpqTsbUVmftVbIzJCmSVrR3gwpFO7r1BAIBFJn3rZYHXUxv3GABv6WcPkjxomTYU2r~bjScd~uqvcAavK5LyY1QniCmUK2zkQ__"
        className="h-4/5 w-auto"
      ></img>

      <div className="text-md lg:text-lg xl:text-xl  font-bold">
        <text className="hidden xl:block">Home</text>
        <div
          data-svg-wrapper
          style={{ position: "relative" }}
          className="block xl:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
              stroke="#F5F5F5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="text-md lg:text-lg xl:text-xl  font-bold">App</div>
      <div className="text-md lg:text-lg xl:text-xl  font-bold">Reviews</div>
      <div className="text-md lg:text-lg xl:text-xl  font-bold">About</div>
    </div>
  );
}
