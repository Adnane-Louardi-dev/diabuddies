import {useEffect, useRef, useState} from "react";

export const useElementOnScreen = (options) => {
  const continerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

    const callbackFunction = (entries) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    }
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction,options)
        if(continerRef.current){
            observer.observe(continerRef.current)
        }
        return () => {
            if(continerRef.current){
                observer.unobserve(continerRef.current)
            }
        }
    }, [continerRef, options]);

  return [continerRef, isVisible]
}