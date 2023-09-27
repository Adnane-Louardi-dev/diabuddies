import React, {useState} from "react";
import Image from "next/image";

export const ProductImage = ({src, ...props}) => {
    if(src) {
        return <div {...props} style={{
            backgroundImage: `url(${encodeURI(process.env.STRAPI_URL+src.attributes?.url)})`
        }}/>
    }
    return null
}
export const ProductImageGallery = ({gallery}) => {
    const [currentImage, setCurrentImage] = useState(gallery[0])
    return (
        <div className={"w-full md:w-1/2 lg:w-2/5 my-10"}>
            <div className="relative rounded-lg shadow-lg overflow-hidden max-h-[400px] md:h-[400px]">
               <Image src={currentImage.src} alt={currentImage.alt} width={currentImage.width} height={currentImage.height}  />
            </div>
            <div className={"flex gap-2 mt-5"}>
                {gallery.map(image => {
                    const handleChangeImage = ()=>{
                        setCurrentImage(image)
                    }
                    return <div className={"cursor-pointer"}
                                onClick={handleChangeImage}
                                onMouseEnter={handleChangeImage}>
                        <Image
                            className={"rounded-md border-solid border-2 border-transparent hover:border-diaDarkBlue"}
                            src={image.src} alt={image.alt} width={60} height={60}/>
                    </div>
                })}
            </div>
        </div>
    );
}