// "use client";
// import React, { useState } from "react";
// import { IPlate } from "./Hero";

// const BestSelles: React.FC = () => {
//   const [plates] = useState<IPlate[]>([
//     {
//       _id: "1",
//       name: "Btl Burger",
//       subName: "Classic beef burger",
//       image: "/images/menu1.jpg",
//       description:
//         "A delicious beef burger served with crispy golden fries and fresh vegetables, all in a toasted bun.",
//     },
//     {
//       _id: "2",
//       name: "Strawberry Pancakes",
//       subName: "Fluffy pancakes",
//       image: "/images/menu2.jpg",
//       description:
//         "Light and fluffy pancakes stacked high, topped with fresh strawberries and whipped cream, drizzled with maple syrup.",
//     },
//     {
//       _id: "3",
//       name: "Margherita Pizza",
//       subName: "Classic Italian pizza",
//       image: "/images/menu3.jpg",
//       description:
//         "A traditional Italian pizza topped with fresh tomatoes, mozzarella cheese, basil, and a drizzle of olive oil.",
//     },
//     {
//       _id: "4",
//       name: "Caesar Salad",
//       subName: "Crispy romaine salad",
//       image: "/images/menu4.jpg",
//       description:
//         "Crispy romaine lettuce tossed in a creamy Caesar dressing, topped with croutons, parmesan cheese, and anchovies.",
//     },
//     {
//       _id: "5",
//       name: "Beef Tacos",
//       subName: "Spicy beef tacos",
//       image: "/images/menu5.jpg",
//       description:
//         "Soft corn tortillas filled with seasoned beef, topped with fresh salsa, guacamole, and sour cream.",
//     },
//     {
//       _id: "6",
//       name: "Grilled Salmon",
//       subName: "Herb-marinated salmon",
//       image: "/images/menu6.jpg",
//       description:
//         "Juicy salmon fillet grilled to perfection and served with a side of garlic mashed potatoes and steamed vegetables.",
//     },
//     {
//       _id: "7",
//       name: "Pasta Primavera",
//       subName: "Vegetable pasta",
//       image: "/images/menu7.jpg",
//       description:
//         "Pasta tossed with seasonal vegetables, garlic, and olive oil, topped with parmesan cheese.",
//     },
//     {
//       _id: "8",
//       name: "Chocolate Lava Cake",
//       subName: "Warm chocolate cake",
//       image: "/images/menu8.jpg",
//       description:
//         "A rich chocolate cake with a molten chocolate center, served with vanilla ice cream and fresh berries.",
//     },
//     {
//       _id: "9",
//       name: "Chicken Alfredo",
//       subName: "Creamy chicken pasta",
//       image: "/images/menu9.jpg",
//       description:
//         "Fettuccine pasta tossed in a creamy Alfredo sauce with grilled chicken, garnished with parsley.",
//     },
//     {
//       _id: "10",
//       name: "Caprese Salad",
//       subName: "Fresh mozzarella salad",
//       image: "/images/menu10.jpg",
//       description:
//         "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze, served as a refreshing salad.",
//     },
//   ]);

//   return (
//     <div className="w-[80%] py-5 mx-auto">
//       {plates.map((plate) => (
//         <div
//           key={plate._id}
//           className="group duration-500  hover:h-[400px] h-[110px] relative flex mb-5 px-3 py-6 cursor-pointer rounded-xl items-stretch w-full bg-primary border border-secondary border-solid overflow-hidden"
//         >
//           {/* Content Section */}
//           <div className="w-full bg-primary flex justify-between items-center transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
//             <h2 className="text-[2rem] hoverh2 font-bold w-fit flex items-center px-2">
//               {plate.name + " " + plate.subName}
//             </h2>
//             <div>
//               <button className="text-[1.2rem] font-bold py-2 bg-secondary text-primary px-3 mr-5 rounded-lg transition duration-300 ease-in-out hover:bg-primary hover:text-secondary">
//                 Details
//               </button>
//               <button className="text-[1.2rem] font-bold py-2 bg-secondary text-primary px-3 rounded-lg transition duration-300 ease-in-out hover:bg-primary hover:text-secondary">
//                 Order
//               </button>
//             </div>
//           </div>

//           {/* Hover Image Reveal */}
//           <div
//             className={`absolute w-0 h-full group-hover:w-full opacity-0 group-hover:opacity-100 overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[900000000] transition-all duration-500 ease-in-out`}
//           >
//             <img
//               className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
//               src={plate.image}
//               alt={plate.name}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BestSelles;
// "use client";
// import React, { useState } from "react";
// import { IPlate } from "./Hero";

// function BestSelles() {
//   const [plates] = useState<IPlate[]>([
//     {
//       _id: "1",
//       name: "Kofta",
//       subName: "with Salad",
//       image: "/images/best1.png",
//       description:
//         "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
//     },
//     {
//       _id: "2",
//       name: "Grilled Meat",
//       subName: "with Roasted Potatoes",
//       image: "/images/best2.png",
//       description:
//         "This dish features succulent pieces of meat beef marinated with aromatic spices, garlic, and olive oil, then grilled over charcoal for a smoky, charred flavor. The grilling over open flames gives the meat a crispy exterior while keeping it juicy and tender inside. This hearty and satisfying meal is often enjoyed with a side of fresh salad, garlic sauce, or warm bread.",
//     },
//     {
//       _id: "3",
//       name: "Fried Meat",
//       subName: "with Sweet Potatoes",
//       image: "/images/best3.png",
//       description:
//         "combines tender pieces of beef fried to golden perfection with sweet potatoes. The meat is often seasoned with spices, garlic, and herbs to enhance its flavor and cooked until it develops a crisp exterior while remaining juicy inside. can be served with a side of dipping sauce, fresh salad, or a sprinkle of herbs like thyme or parsley for added freshness.",
//     },
//     {
//       _id: "4",
//       name: "Ceramic Bowl ",
//       subName: "with Pasta Bolognese",
//       image: "/images/best6.png",
//       description:
//         "This elegant round white ceramic bowl is filled with a hearty serving of Pasta Bolognese. The dish features al dente spaghetti or tagliatelle, generously topped with a rich, savory Bolognese sauce made from ground beef, aromatic vegetables onions, carrots, and celery and a blend of tomatoes, herbs, and spices. ",
//     },
//     {
//       _id: "5",
//       name: "Greek salad ",
//       subName: "Caesar",
//       image: "/images/best7.png",
//       description:
//         "A classic salad featuring crisp romaine lettuce tossed with creamy Caesar dressing, grated Parmesan cheese, and crunchy croutons. The dressing is made with ingredients like garlic, lemon juice, olive oil, egg, and anchovies, giving it a rich and tangy taste. It can also include grilled chicken, bacon, or soft-boiled eggs for added protein.",
//     },
//   ]);
//   return (
//     <div className="w-[80%] mx-auto py-3">
//       {plates.map((plate, i) => (
//         <div className="w-full flex items-center  justify-between">
//           <div className="w-[45%] text-secondary">
//             <h1 className="text-[3rem] font-semibold">
//               {" "}
//               {plate?.name + " " + plate?.subName}{" "}
//             </h1>
//             <p> {plate?.description} </p>
//             <div>
//               {" "}
//               <button> Check More </button> <button> Order </button>{" "}
//             </div>
//           </div>
//           <div className={`w-[45%] ${i % 2 == 0 ? "-order-1" : ""}`}>
//             <img className="w-full" src={plate?.image} alt="" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default BestSelles;
"use client";
import { useOrderStore } from "@/context/context";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IPlate } from "./Hero";

function BestSelles() {
  const [plates, setPlates] = useState<IPlate[]>([]);
  const { addQuantity } = useOrderStore();
  useEffect(() => {
    const GetMainsPlats = async () => {
      try {
        const res = await axios.get(
          "https://foodlly-ozos.vercel.app/best-selles-plats"
        );
        setPlates(res.data.bestSellesPlats);
      } catch (error) {
        console.log(error);
      }
    };
    GetMainsPlats();
  }, []);
  const plateRefs = useRef<(HTMLDivElement | null)[]>(
    Array(plates.length).fill(null)
  );

  const [shownPlates, setShownPlates] = useState<boolean[]>(
    Array(plates.length).fill(false)
  );

  const isElementInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const handleScroll = () => {
    plateRefs.current.forEach((ref, index) => {
      if (ref && isElementInViewport(ref) && !shownPlates[index]) {
        setShownPlates((prev) => {
          const newShownPlates = [...prev];
          newShownPlates[index] = true;
          return newShownPlates;
        });
      }
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full p-5 bg-white mx-auto pb-7">
      {plates.length > 0 &&
        plates.map((plate, i) => (
          <div
            key={plate._id}
            className="w-full gap-10 bg-primary px-2 md:px-5 py-3 rounded-2xl overflow-hidden flex items-center justify-between mb-5 flex-wrap"
          >
            <div className="w-[100%] text-center md:text-left md:flex-1 text-secondary">
              <h1 className="text-[1.8rem]  md:text-[3rem] font-semibold mb-4">
                {plate?.name + " " + plate?.subName}
              </h1>
              <p className="text-[1.2rem] font-normal mb-5">
                {plate?.description}
              </p>
              <div className="w-full flex gap-5 justify-center items-center">
                <button className="bg-primary px-5 py-2 text-[1.2rem] text-secondary rounded-xl border border-secondary border-solid">
                  <Link href={"/menu"}> More </Link>
                </button>{" "}
                <button
                  onClick={() => addQuantity(plate)}
                  className="bg-secondary px-5 py-2 text-[1.2rem] text-primary rounded-xl"
                >
                  {plate?.price} DA
                </button>
              </div>
            </div>
            <div
              ref={(el) => {
                plateRefs.current[i] = el;
              }}
              className={`w-full -order-1 md:w-[45%] max-w-[580px] plate ${
                shownPlates[i] ? "show" : ""
              } ${i % 2 == 0 ? "md:-order-1 plate1" : "md:order-3 plate2"}`}
            >
              <img
                className="mx-auto w-full"
                src={plate?.image?.url}
                alt={plate?.name}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default BestSelles;
