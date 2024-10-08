import Header from "./_components/Header";

import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvidor } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  // weight: should include it if it's not provided by default.
});

// somehting for  SEO : Search engine optimization
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  description:
    "Luxrious cabin hotel located in the heart of Italian Dolnites, surrounded by beautiful mountian and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} 
        
        flex flex-col
        bg-primary-950 min-h-screen text-primary-100`}
      >
        <Header />

        <div className=" flex-1 px-8 py-12 grid">
          <main className=" max-w-7xl w-full  mx-auto">
            {/* Here the children are still server component they didn't turn into client component becasue we put it inside the context API, becasue the children would habe been rendered on the server first and then passed down to the context providor. (Section: Client & server interactions  Video number 8, in the 14mins mark.)  */}
            <ReservationProvidor>{children}</ReservationProvidor>
          </main>
        </div>
      </body>
    </html>
  );
}
