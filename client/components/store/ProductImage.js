import React from "react";


export const ProductImage = (props) => {
    return <div {...props} style={{backgroundImage: `url(${encodeURI(props.src)})`}} />
}