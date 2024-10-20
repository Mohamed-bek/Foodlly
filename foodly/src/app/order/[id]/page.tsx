"use client";
import { IOrder, useAuthStore } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page({ params }: { params: any }) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    !isLoggedIn ? router.push("/login") : null;
  }, []);
  const [order, setorder] = useState<IOrder>();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/order/" + params.id,
          { withCredentials: true }
        );
        setorder(res.data.order);
      } catch (error) {}
    };
    getOrder();
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-70px)] overflow-y-visible py-10 ">
      {" "}
      <h1 className="text-[2rem] font-medium md:text-[3rem] mb-5 text-center">
        {" "}
        Order Of {order?.name}{" "}
      </h1>
      <div className="w-[90%] mx-auto flex justify-center flex-wrap items-center gap-5">
        {order?.order.map((item) => (
          <div className="w-[250px] pt-1 h-[340px] rounded-xl shadow-md border border-secondary border-solid text-primary bg-secondary">
            <div className="w-full h-1/2">
              <img
                className="w-4/5 mx-auto"
                src={item.plat.image?.url}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center h-1/2">
              <div className="w-full h-fit">
                <p className="flex-1 text-[1.8rem] font-medium text-center">
                  {" "}
                  {item.plat.name + " " + item.plat.subName}{" "}
                </p>
                <p className="text-[1.1rem] text-center mx-2">
                  {" "}
                  Quanity : <span className="font-bold">
                    {item.quantity}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
