import {Cell, Pie, PieChart} from "recharts";


const NutritionValue = ({label, value,unit, color}) => <div>
    <p className={`text-${color} px-5 relative before:w-3 before:h-3 before:bg-${color} before:content-[''] before:absolute before:left-0 before:top-[50%] before:-translate-y-[50%]`}>
        {label}
    </p>
    <p className={`text-sm text-diaGray mx-5`}>
        {value} {unit}
    </p>
</div>

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}
export const RecipeNutritionDistribution = ({nutritionData}) => {
    const chartData = nutritionData.filter(entry => !["Kcal", "Bolus"].some((label) => label === entry.label))
    return <div className={"grid grid-cols-2 gap-5"}>
        <div className={"mt-2 grid grid-cols-2 gap-3"}>
            {nutritionData.map((nutrition) => (
                <NutritionValue key={nutrition.label} {...nutrition} />
            ))}
        </div>
        <div>
            <PieChart width={200} height={200}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.hexColor} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    </div>
}