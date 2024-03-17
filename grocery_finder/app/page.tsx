import GoogleMaps from "@/components/GoogleMaps";
import Image from "next/image";
import groceryImage from "./grocery.png";


export default function Home() {
  return (
    <>
   <div className="py-5">
   
    <div className="flex justify-center text-[24px] text-black-600 mb-5">
    <Image src={groceryImage} alt="grocery icon" width={32} height={32} className="mr-2"/>
      Grocery Finder
    </div>
    <GoogleMaps/>
   </div>
   </>
  );
}
