import { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import {useTranslation} from "next-i18next";

// function to group the data by date and calculate the sum of keys (basal,bolus)
function getGroupedData(data) {
  //group the data
  const reduced = data.reduce(function (r, a) {
    r[moment(a.time).format("L")] = r[moment(a.time).format("L")] || [];
    r[moment(a.time).format("L")].push(a);
    return r;
  }, {});
  //calculate the sum of basal and bolus
  return Object.keys(reduced).map((item) => {
    let currentDate = reduced[item];
    const reducedCurrentDateArrayValue = currentDate.reduce(
      (acc, current) => {
        acc.time = current.time;
        if (current.bolus) {
          acc.bolus += current.bolus;
        }
        if (current.basal) {
          acc.basal += current.basal;
        }
        return acc;
      },
      { time: null, bolus: 0, basal: 0 }
    );
    return reducedCurrentDateArrayValue;
  });
}

const InsulinDailyTotalsChart = ({ props }) => {
  const {t} = useTranslation()
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
        <YAxis />
        <Tooltip labelFormatter={(date) => moment(date).format("LL")} contentStyle={{ color: "#323D34", borderRadius: 15 }} />
        <Legend />
        <Bar dataKey="basal" stackId="a" name={t("basal")} fill="#8884d8" />
        <Bar dataKey="bolus" stackId="a" name={t("bolus")} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InsulinDailyTotalsChart;
