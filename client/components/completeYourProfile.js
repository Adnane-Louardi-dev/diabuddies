import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
const CompleteYourProfile = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4 my-4 bg-white rounded-xl shadow-md">
        <div className="relative grid col-span-2 bg-diaLightBlue h-full rounded-lg items-center justify-center">
          <Link href="/setup" passHref>
            <Image src={"/profile_illust.png"} style={{ objectFit: "cover" }} fill sizes="(max-width: 200px), (max-width: 130px)" alt="profile illustration" />
          </Link>
        </div>
        <div className="col-span-3">
          <div className="flex justify-between">
            <div>
              <h4 className="text-2xl font-medium font-poppins">Complete Your Profile</h4>
            </div>
            <div className="pt-1 self-start">
              <Link href="/setup" passHref>
                <Icon icon="ep:arrow-right-bold" className="text-diaGray bg-gray-200 rounded-full p-1.5 h-7 w-7" />
              </Link>
            </div>
          </div>
          <p className="text-md p-1">for better diabetes management provide us your vitals</p>
          {/* <div>
            <LinearProgress variant="determinate" value={30} />
          </div> */}
          {/* <div className="flex justify-end">
            <Button className="bg-diaBlue text-white rounded-md">Do it</Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CompleteYourProfile;
