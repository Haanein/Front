import HomePage from "../components/HomePage";
import PlaceCard from "../components/PlaceCard";
export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen">
      <div className="w-[90%] h-[85%] flex flex-col justify-start items-start gap-10">
        <h1 className="text-2xl font-bold">Hi Wassup User!</h1>
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
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
          <PlaceCard />
        </div>
        <div></div>
      </div>
    </div>
  );
}
