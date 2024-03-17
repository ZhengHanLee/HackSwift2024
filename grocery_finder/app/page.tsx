import GoogleMaps from "@/components/GoogleMaps";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
   <div className="py-8">
    <div className="flex justify-center items-center text-[24px] text-rose-600">
      Grocery Finder
    </div>
    <GoogleMaps/>
   </div>
   </>
  );
}
