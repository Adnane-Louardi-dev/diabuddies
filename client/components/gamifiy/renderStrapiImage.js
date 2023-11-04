import Image from "next/image";
import React from "react";


export const RenderStrapiImage = ({image, className=""}) => {
    const {attributes} = image.data ?? {attributes: {url: "", name: ""}};

    return ( <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.url}`}
                    layout="fill"
                    objectFit="cover"
                    className={`rounded-2xl ${className}`}
                    alt={attributes.name} />
    )
}