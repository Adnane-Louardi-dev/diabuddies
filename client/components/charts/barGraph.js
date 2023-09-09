import { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import {useTranslation} from "next-i18next";
const BarGraph = ({ props }) => {
  const [data, setData] = useState(undefined);
  const {t} = useTranslation()
  //group and calculate the avg
  function getGroupedData(data, whitelist) {
    // Calculate the sums and group data (while tracking count)
    const reduced = data.reduce(function (m, d) {
      if (!m[d.meal]) {
        m[d.meal] = { ...d, count: 1 };
        return m;
      }
      whitelist.forEach(function (key) {
        m[d.meal][key] += d[key];
      });
      m[d.meal].count += 1;
      return m;
    }, {});

    // Create new array from grouped data and compute the average
    return Object.keys(reduced).map(function (k) {
      const item = reduced[k];
      const itemAverage = whitelist.reduce(function (m, key) {
        m[key] = item[key] / item.count;
        return m;
      }, {});
      return {
        ...item, // Preserve any non white-listed keys
        ...itemAverage, // Add computed averege for whitelisted keys
      };
    });
  }
  useEffect(() => {
    let filtredData = props?.filter((item) => (item.carbs || item.bolus) && item.meal);
    let groupedData = getGroupedData(filtredData, ["carbs", "bolus"]);
    setData(groupedData);
  }, [props]);
  // console.log(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="meal"
          style={{
            fontSize: "1rem",
          }}
        />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip contentStyle={{ color: "#323D34", borderRadius: 15 }} />
        <Legend />
        <Bar yAxisId="left" dataKey="carbs" name={t("carbs")} fill="#8884d8" />
        <Bar yAxisId="right" dataKey="bolus" name={t("bolus")} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
