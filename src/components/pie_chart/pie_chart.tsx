import style from "./pie_chart.module.scss";
import { PieChart, Pie, Cell, Tooltip } from "recharts";



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const colorCell = ["#3F0071", ""]
    return (
        <text
            x={x}
            y={y}
            fill="#EEEEEE"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function PieChartDrawing(dataPieChart: any) {

    const data: any[] = [

    ];
    const dataPie = dataPieChart.dataInput;
    let objectType: string[] = [];

    let countTypes: any[] = [];

    dataPie?.forEach((el: any, index: any) => {
        objectType.push(el[1]);

        if ((objectType.filter((item: any) => item === el[1]).length <= 1) && index !== 0) {

            countTypes.push(dataPie.filter((object: any) => object[1] === el[1]));
            data.push({ name: objectType[index], value: countTypes[index - 1]?.length })

        }
    })


    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className={style.custom_tooltip}>
                    <p className={style.custom_tooltip_label}>{`${payload[0].name}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={style.pichart}>
            <PieChart width={200} height={200}>
                <Pie
                    dataKey="value"
                    data={data}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} tabIndex={index} fill={"#3F0071"} />
                    ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
            </PieChart>
        </div>
    );
}
