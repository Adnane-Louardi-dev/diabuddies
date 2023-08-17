import React from "react";


export const ProductImage = ({src, ...props}) => {
    if(src) {
        return <div {...props} style={{
            backgroundImage: `url(${encodeURI("http://localhost:1337"+src.attributes?.url)})`
        }}/>
    }
    return null
}