import React from "react";
import { Page, Text, View, Document } from "react-pdf";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//     height: "100%",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// Create Document Component
export default function PDFDocumentModule() {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Heading #1</Text>
        </View>
        <View>
          <Text>Heading #2</Text>
        </View>
      </Page>
    </Document>
  );
}
