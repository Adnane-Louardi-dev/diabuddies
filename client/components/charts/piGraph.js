import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 bg-white font-rubik text-lg">
        <p className="label">{`${payload[0].value} log${payload[0].value > 1 ? "s" : ""} ${payload[0].value > 1 ? "are" : "is"} ${payload[0].name}`}</p>
      </div>
    );
  }

  return null;
};
const PiGraph = ({ props }) => {
  const [Data, setData] = useState(props);
  const [fakeData, setFakeData] = useState([]);
  const COLORS = ["#3AB0FF", "#44D29F", "#FFB562", "#F87474"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + 2 + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        {percent ? (
          <text x={x} y={y} fill="white" textAnchor={"middle"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null}
      </>
    );
  };
  useEffect(() => {
    setFakeData([
      { name: "low", value: props?.filter((item) => item.status === "low").length },
      { name: "normal", value: props?.filter((item) => item.status === "normal").length },
      { name: "high", value: props?.filter((item) => item.status === "high").length },
      { name: "veryHigh", value: props?.filter((item) => item.status === "veryHigh").length },
    ]);
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={fakeData} labelLine={false} paddingAngle={3} dataKey="value" nameKey="name" cx="50%" cy="50%" label={renderCustomizedLabel} outerRadius={120} innerRadius={60} fill="#44D29F">
          {fakeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ color: "#323D34", borderRadius: 15 }} content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiGraph;
