import { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { useTranslation } from "next-i18next";
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 bg-white font-rubik text-lg">
        <p className="text-center text-diaDarkBlue font-semibold">{`The ${payload[0].payload.meal} meal`}</p>
        <p className="label text-center">{`Avg. Insulin is ${payload[0].payload?.bolus}UI`}</p>
        <p className="label text-center">{`Avg. Carbs is ${payload[0].payload?.carbs}g`}</p>
      </div>
    );
  }

  return null;
};
const BarGraph = ({ props }) => {
  const [data, setData] = useState(undefined);
  const { t } = useTranslation();
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
        ...item,
        ...itemAverage,
      };
    });
  }
  useEffect(() => {
    let filtredData = props?.filter((item) => (item.carbs || item.bolus) && item.meal);
    let groupedData = getGroupedData(filtredData, ["carbs", "bolus"]);
    setData(groupedData);
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: -30,
          left: -30,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="meal"
          style={{
            fontSize: "1rem",
          }}
        />
        <YAxis yAxisId="left" tickCount={1} orientation="left" stroke="#3AB0FF" hide axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" tickCount={1} orientation="right" stroke="#FFB562" hide axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ color: "#323D34", borderRadius: 15 }} content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="carbs" name={t("carbs")} fill="#3AB0FF" />
        <Bar yAxisId="right" dataKey="bolus" name={t("bolus")} fill="#FFB562" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
