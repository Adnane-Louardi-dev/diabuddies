import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Button } from "@mui/material";
const CompleteYourProfile = () => {
  const { t, i18n } = useTranslation("index");
  return (
    <>
      <div className="relative p-4 my-4 bg-white rounded-xl shadow-lg">
        <Image src={"/complete_profile.png"} alt="complete your profile" layout="fill" objectFit="cover" className="absolute top-0 left-0 bottom-0 right-0 rounded-2xl ring-1 ring-diaGray" />
        <div className="flex justify-between items-center">
          <h3 className="relative font-inter font-bold text-xl text-diaDarkBlue">Complete your profile</h3>
          <Link href={"/app/setup"}>
            <Button variant="filled" className="flex text-white text-lg font-rubik bg-diaDarkBlue px-8 py-2 rounded-3xl shadow-md">
              Go
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompleteYourProfile;
