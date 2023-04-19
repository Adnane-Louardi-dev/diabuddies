import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

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
    // setData(result);
    setFakeData([
      { name: "low", value: props.filter((item) => item.status === "low").length },
      { name: "normal", value: props.filter((item) => item.status === "normal").length },
      { name: "high", value: props.filter((item) => item.status === "high").length },
      { name: "veryHigh", value: props.filter((item) => item.status === "veryHigh").length },
    ]);
    // console.log("piChart", fakeData);
  }, [props]);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={fakeData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          innerRadius={45}
          fill="#44D29F"
        >
          {fakeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiGraph;
