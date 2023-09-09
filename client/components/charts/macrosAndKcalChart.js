import { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import {useTranslation} from "next-i18next";
// function to group the data by date and calculate the sum of keys (macros)
function getGroupedData(data) {
  //group the data
  const reduced = data.reduce(function (r, a) {
    r[moment(a.time).format("L")] = r[moment(a.time).format("L")] || [];
    r[moment(a.time).format("L")].push(a);
    return r;
  }, {});
  //calculate the sum of macros
  return Object.keys(reduced).map((item) => {
    let currentDate = reduced[item];
    const reducedCurrentDateArrayValue = currentDate.reduce(
      (acc, current) => {
        acc.time = current.time;
        if (current.kcal) {
          acc.kcal += current.kcal;
        }
        if (current.protein) {
          acc.protein += current.protein;
        }
        if (current.carbs) {
          acc.carbs += current.carbs;
        }
        if (current.fat) {
          acc.fat += current.fat;
        }
        return acc;
      },
      { time: null, kcal: 0, protein: 0, fat: 0, carbs: 0 }
    );
    return reducedCurrentDateArrayValue;
  });
}
const MacrosAndKcalChart = ({ props, dailyCaloriesNeeds }) => {
  const {t} = useTranslation("common")
  const [Data, setData] = useState(null);
  useEffect(() => {
    let groupedData = getGroupedData(props);
    setData(groupedData);
    return () => {
      setData(null);
    };
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={Data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={(date) => moment(date).format("DD/MM")} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, dailyCaloriesNeeds]} />
        <Tooltip labelFormatter={(date) => moment(date).format("LL")} contentStyle={{ color: "#323D34", borderRadius: 15 }} />
        <Legend />
        <Bar yAxisId="left" stackId={"a"} dataKey="carbs" name={t("carbs")} fill="#666666" />
        <Bar yAxisId="left" stackId={"a"} dataKey="protein" name={t("protein")} fill="#FFD7AA" />
        <Bar yAxisId="left" stackId={"a"} dataKey="fat" name={t("fat")} fill="#F87474" />
        <Bar yAxisId="right" dataKey="kcal" name={t("kcal")} fill="#82ca9d" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MacrosAndKcalChart;
