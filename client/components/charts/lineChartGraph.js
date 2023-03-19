import { useState, useEffect } from "react";
import moment from "moment";
import { ResponsiveContainer, AreaChart, CartesianGrid, Area, XAxis, YAxis, linearGradient, Tooltip } from "recharts";
const LineChartGraph = ({ props }) => {
  const [data, setData] = useState(props);
  useEffect(() => {
    //reverse the graph to show the recent egvs from RTL
    [...data].reverse();
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ left: -10 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3AB0FF" stopOpacity={1} />
            <stop offset="95%" stopColor="#3AB0FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" axisLine={false} tick={false} />
        <YAxis type="number" tickSize={10} axisLine={false} tickLine={false} ticks={[50, 70, 180, 250, 400]} domain={[0, 400]} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" horizontalFill={["#F87474", "#FFB562", "#44D29F", "#3AB0FF"]} fillOpacity={0.6} tickMargin={10} />
        <Area type="monotone" dataKey="egv" strokeWidth={2} stroke="#3AB0FF" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
