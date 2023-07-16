import {Document, Image, Page, Text, View} from "@react-pdf/renderer";
import {useMemo} from "react";
import {BasicTable} from "./BasicTable";
import {styles} from "./pdf-utils";
import moment from "moment/moment";

export const UserPDF = ({user,data}) => {

    const cols = useMemo(()=>{
        return [
            {
                title: "Date",
                width: "15%",
                styles: {paddingLeft: 2},
                dataIndex: "time",
                render: (date) => <Text>{moment(date).format("DD/MM/YYYY")}</Text>
            },
            {
                title: "meal",
                width: "20%",
                styles: {},
                dataIndex: "meal"
            },
            {
                title: "glucose",
                width: "15%",
                styles: {},
                dataIndex: "glucose",
                render: (glucose,record) => <Text
                    style={{color: glucose <= 70 ? "#1E5162" : glucose >= 180 ? (glucose >= 250 ? "red" : "tomato") : "green"}}
                >
                    {glucose} {record.unit}
                </Text>
            },
            {
                title: "carbs",
                width: "10%",
                styles: {},
                dataIndex: "carbs"
            },
            {
                title: "protein",
                width: "10%",
                styles: {},
                dataIndex: "protein"
            },
            {
                title: "basal",
                width: "10%",
                styles: {},
                dataIndex: "basal"
            },
            {
                title: "bolus",
                width: "10%",
                styles: {},
                dataIndex: "bolus"
            },
            {
                title: "kcal",
                width: "10%",
                styles: {},
                dataIndex: "kcal"
            },
            {
                title: "height",
                width: "8%",
                styles: {},
                dataIndex: "height",
                render: (height) => <Text>{height?.value} {height?.unit}</Text>
            },
            {
                title: "weight",
                width: "8%",
                styles: {},
                dataIndex: "weight",
                render: (weight) => <Text>{weight?.value} {weight?.unit}</Text>
            },

        ]
    },[user])


    return (
        <Document title={`${user.givenName}-${user.familyName.replace(" ","-")}-${moment().format("DD-MM-YYYY")}`}>
            <Page size={"A4"} style={styles.page}>
                <View>
                    <View style={{display: "flex", flexDirection: "row",justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{width: "30%"}}>
                            <Image src={"/diabuddies_logo.png"} />
                        </View>
                        <View style={{width: "50%"}}>
                            <Text>{user.givenName} {user.familyName}</Text>
                            <Text>{user.email}</Text>
                            <Text>{user.homeAddress}</Text>
                            <Text>age: {user.age}
                                {user.gender !== "" ? " | gender:" + user.gender: ""}
                                {user.diabetesType ? " | diabetes "  + user.diabetesType : ""}</Text>
                        </View>
                    </View>
                    <BasicTable
                        cols={cols}
                        data={data.logs}
                        tableHeaderStyles={{border: "1px solid #000", paddingVertical: 2}}
                        oddRowsStyles={{backgroundColor: "#ddd"}}
                        tableRowsStyles={{border: "1px solid #000", borderTop: "none", paddingVertical: 2}} />
                </View>
            </Page>
        </Document>
    );
};