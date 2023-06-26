import { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarGraph = ({ props }) => {
  const [data, setData] = useState(props);
  useEffect(() => {
    setData(props);
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
        <XAxis dataKey="meal" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="carbs" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="fastActingInsulinUnits" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
