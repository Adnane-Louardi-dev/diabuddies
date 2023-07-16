import {StyleSheet} from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    imgBg:{
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
    },
    primaryColor: {
        color: "#00b8a9",
        fontWeight: "extrabold"
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footer: {
        bottom: 0,
        width: "100%",
        height: 60,
        maxHeight: 100,
        position: "absolute"
    },
    textCenter: {
        width: "100%",
        textAlign: "center"
    },
    sijilFlex: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "auto",
    },
    boldGreenText: {
        paddingBottom: 3,
        fontSize: 14,
        fontWeight: 800,
        color: "#00b8a9"
    },
    page: {
        fontSize: 11,
        lineHeight: 1.5,
        paddingHorizontal: 20
    },
    containerPadding:{
        margin: "0 30 0 90",
        border: "2px solid #000",
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        marginBottom: 60
    },
    container: {
        flexDirection: 'row',
        color: "#fff",
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 800,
        flexGrow: 1,
    },
    tableheader: {
        height: 24
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        color: "#333"
    },
    description: {
        width: '85%',
        textAlign: 'right',
        paddingRight: 8
    },
    cell: {
        paddingRight: 8,
        textAlign: "center"
    },
    firstCell: {
        paddingLeft: 8,
        textAlign: "center",
        width: "50%"
    },
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    },
    bigText: {
        fontSize: 36,
        color: "#00b8a9",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "right"
    },
    mr10: {
        marginRight: 10
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    fullHeight: {
        height: "100%"
    }
});
