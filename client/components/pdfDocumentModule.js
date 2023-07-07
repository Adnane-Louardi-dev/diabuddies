/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    loading: ({ error, isLoading, pastDelay, retry }) => {
      return <div>{isLoading}</div>;
    },
    ssr: false,
  }
);

const PDF = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <Document>
      <Page size={[80, 60]}>
        <View>
          <Text>Please display</Text>
          <Text>Please display</Text>
        </View>
      </Page>
    </Document>
  );
};
export default function PDFDocumentModule() {
  return (
    <div>
      <PDFViewer width="100%" height="750px">
        <PDF />
      </PDFViewer>
    </div>
  );
}
