import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import { useTranslation } from "next-i18next";
const LineChartGraph = ({ props }) => {
  const [data, setData] = useState(props);
  const { i18n } = useTranslation();
  useEffect(() => {
    let filtredData = props?.filter((item) => item.glucose);
    setData(filtredData);
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ left: -27 }} borderRadius>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor="#3AB0FF" stopOpacity={0.8} />
            <stop offset="80%" stopColor="#3AB0FF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" hide />
        <YAxis type="number" tickSize={5} axisLine={false} tickLine={false} ticks={[70, 200, 400]} domain={[0, 400]} />
        <Tooltip
          formatter={(value) => {
            return [value, i18n.language === "ar" ? "كلوجوز الدم" : "Blood Glucose"];
          }}
          labelFormatter={(date) => moment(date).fromNow()}
          contentStyle={{ color: "#323D34", borderRadius: 15 }}
        />
        <CartesianGrid strokeDasharray="0" height={10} horizontalCoordinatesGenerator={() => [125, 205]} verticalCoordinatesGenerator={() => []} horizontalFill={["white", "#44D29F", "white"]} fillOpacity={0.75} />
        <Area type="monotone" dot dataKey="glucose" strokeWidth={2} stroke="#3AB0FF" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
