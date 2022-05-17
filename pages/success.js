import React, { useState, useEffect } from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { CheckIcon } from "@heroicons/react/solid";
import { runFireworks } from "../lib/utils";

const Success = () => {
  useEffect(() => {
    localStorage.clear();
    runFireworks();
  }, []);
  return (
    <div className="mx-auto justify-center text-center m-8">
      <runFireworks />
      <div className="pt-20">
        <CheckIcon class="mx-auto justify-center w-20 h-20 mb-10 stroke-white fill-white bg-green-500 rounded-full px-2 py-3" />
        <h2 className="text-2xl font-semibold mb-3">
          Herzlichen Dank für Ihre Bestellung!
        </h2>
        <p className="email-msg">
          Sie erhalten Ihre Rechnung in Kürze via E-Mail
        </p>
        <p className="description">
          Wenn Sie Fragen haben, kontakieren Sie uns gerne
          <a className="pl-1" href="mailto:order@example.com">
            bestellung@company.at
          </a>
        </p>
        <Link href="/">
          <button
            type="button"
            width="300px"
            className="bg-black text-white py-2 px-4 rounded-full mt-10"
          >
            Einkauf fortfahren
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
