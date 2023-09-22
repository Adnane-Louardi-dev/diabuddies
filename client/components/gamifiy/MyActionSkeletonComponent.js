import {Icon} from "@iconify/react";
import React from "react";


export const MyActionSkeletonComponent = ({parentClass=""}) =>  <div role="status" className={`animate-pulse grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-diaDarkBlue bg-white cursor-pointer ${parentClass}`}>
    <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
        <div className={"mx-auto bg-gray-300 rounded-full dark:bg-gray-700 text-white h-8 w-8"} />
    </div>
    <div className="grid gap-2 col-span-5">
        <div className="flex justify-between items-center">
            <div className={"w-[calc(100%-250px)]"}>
                <div className={"h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full max-w-[640px] mb-2.5 mx-2"} />
                <div className={"h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-[calc(100%-100px)] max-w-[640px] mb-2.5 mx-2"} />
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center p-1 w-[200px] text-white rounded-lg bg-diaDarkBlue">
                    <div className={"mx-auto bg-gray-300 rounded-full dark:bg-gray-700 text-white h-5 w-5"} />
                    <div className={"bg-gray-300 rounded-full dark:bg-gray-700 w-[120px] h-2 mx-auto"} />
                    <div className={"bg-gray-300 rounded-full dark:bg-gray-700 w-3 h-5"} />
                </div>
            </div>
        </div>
    </div>
    <span className="sr-only">Loading...</span>
</div>