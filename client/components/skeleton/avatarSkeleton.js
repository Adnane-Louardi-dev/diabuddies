import * as React from "react";


export const AvatarSkeleton = ({size=12}) => <div role={"status"} className={`w-${size} h-${size} animate-pulse bg-gray-300 rounded-full dark:bg-gray-700`} />