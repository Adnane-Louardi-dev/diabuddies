import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, linearGradient, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import {useTranslation} from "next-i18next";
const LineChartGraph = ({ props }) => {
  const [data, setData] = useState(props);
  const {i18n} = useTranslation()
  useEffect(() => {
    setData(props);
    // console.log("line chart", data);
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ left: -10 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor="#3AB0FF" stopOpacity={0.8} />
            <stop offset="80%" stopColor="#3AB0FF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" hide />
        <YAxis type="number" tickSize={10} axisLine={false} tickLine={false} ticks={[50, 70, 180, 250, 400]} domain={[0, 400]} />
        <Tooltip
          formatter={(value) => {
            return [value, i18n.language === "ar" ? "كلوجوز الدم" :"Blood Glucose"];
          }}
          labelFormatter={(date) => moment(date).format("DD/MM/YYYY HH:mm:ss")}
          contentStyle={{ color: "#323D34", borderRadius: 15 }}
        />
        <CartesianGrid strokeDasharray="5" horizontalFill={["white", "white", "#44D29F", "white"]} fillOpacity={0.5} />
        <Area type="monotone" dot dataKey="glucose" strokeWidth={2} stroke="#3AB0FF" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
