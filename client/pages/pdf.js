import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import PDFDocumentModule from "../components/pdfDocumentModule";
// const PDFViewer = dynamic(
//   import("@react-pdf/renderer").then((module) => module.PDFViewer),
//   {
//     loading: ({ error, isLoading, pastDelay, retry }) => {
//       return <div>{isLoading}</div>;
//     },
//     ssr: false,
//   }
// );
// const PDFDocumentModule = dynamic(() => import("../components/pdfDocumentModule"), {
//   ssr: false,
// });

function Pdf() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <PDFDocumentModule />
    </>
  );
}

export default Pdf;
