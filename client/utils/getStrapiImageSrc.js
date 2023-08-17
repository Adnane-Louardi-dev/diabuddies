


export const getStrapiImageSrc = (image,type) => {
    if(type){
        return {
            alt: image.attributes.alternativeText ?? image.attributes.name,
            width: image.attributes[type].width,
            height: image.attributes[type].height,
            src: "http://localhost:1337" + image.attributes[type].url,
        }
    }
    return {
        alt: image.attributes.alternativeText ?? image.attributes.name,
        width: image.attributes.width,
        height: image.attributes.height,
        src: "http://localhost:1337" + image.attributes.url,
    }
}