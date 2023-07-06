import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import PDFDocumentModule from "../components/pdfDocumentModule";
import LoadingCircle from "../components/loadingCircle";
const PDFDocumentModule = dynamic(() => import("../components/pdfDocumentModule"), {
  ssr: false,
});

export default function pdf() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <PDFDocumentModule />
      ) : (
        <div className="grid h-screen justify-center content-center">
          <LoadingCircle />
        </div>
      )}
    </>
  );
}
