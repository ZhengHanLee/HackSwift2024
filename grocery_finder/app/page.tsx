import GoogleMaps from "@/components/GoogleMaps";

export default function Home() {
  return (
   <div className="py-8">
    <div className="flex justify-center items-center text-[24px] text-rose-600">
      Grocery Finder
    </div>
    <GoogleMaps/>
   </div>
  );
}
