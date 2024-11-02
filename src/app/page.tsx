import Image from "next/image";
import Ripple from "@/components/ui/ripple";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Quicksand} from "next/font/google";
import {white} from "next/dist/lib/picocolors";
const quicksand = Quicksand({ subsets: ["latin"] });
export default function Home() {

  return (
      <main className="flex min-h-screen flex-col items-center justify-between" >
        <div className="z-10 w-[100vw] h-[100vh] max-h-[100vh] overflow-hidden flex flex-col items-center justify-center gap-4 text-white text-center">
            <div className={quicksand.className}>
                <h1 className={"text-9xl font-bold text-wrap max-sm:text-6xl"}>eduSync</h1>
                <br/>
                <p className={"text-2xl text-wrap max-sm:text-lg"}> A powerful and easy to use tool to manage classrooms </p>
                <br/>
                <div className="flex gap-4 text-primary justify-center">
                    {/*<button className="btn">Sign in</button>*/}
                    <a href={"/login"} className="btn">
                        <ShimmerButton
                            background={"white"}
                            shimmerColor={"#461993"}
                            className={"text-primary text-xl font-bold max-sm:text-lg"}
                            shimmerSize={"3px"}
                            shimmerDuration={"2s"}
                        >
                            Get Started
                        </ShimmerButton>
                    </a>
                </div>
            </div>

        </div>
          <Ripple/>
      </main>
  );
}
