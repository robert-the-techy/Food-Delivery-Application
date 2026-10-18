import { useEffect, useState } from "react";
import "../../../CSS/style.css"
import { useTokenContext } from "../../Contexts/TokenContext";
import { formatINR } from "../FormatCurrency/formatINR";

function WeeklyRevenueChart()
{
  const {accessToken} = useTokenContext();
  const [data,setData] = useState([]);

  useEffect(()=>
  {
    if(!accessToken) return;   // wait for the token, same as the dashboard cards

    const getWeeklyRevenue = async ()=>
    {
      try
      {
        const response = await fetch("http://localhost:8080/weekly-revenue",
          {
            method:"POST",
            headers:
            {
              "Authorization" : `Bearer ${accessToken}`,
              "Content-Type" : "application/json"
            }
          }
        );

        if(response.ok)
        {
          const revenueData = await response.json();
          setData(revenueData);
        }
        else
        {
          console.error("Weekly revenue request failed:", response.status);
        }
      }
      catch(err)
      {
        console.error("Weekly revenue request error:", err);
      }
    }

    getWeeklyRevenue();
  },[accessToken])

  const width = 700;
  const height = 350;
  const padding = 45;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // normalise values so strings/null never produce NaN
  const values = data.map((item) => Number(item.revenue) || 0);
  const maxRevenue = Math.max(...values, 1);   // never 0

  const getX = (index) =>
    data.length > 1 ? padding + (index * chartWidth) / (data.length - 1) : padding + chartWidth / 2;

  const getY = (value) => padding + chartHeight - (value / maxRevenue) * chartHeight;

  const points = values.map((value, index) => `${getX(index)},${getY(value)}`).join(" ");

  return (
    <div className="revenue-chart">
      <p className="font-medium text-sm">Weekly revenue</p>

      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#94a3b8"
        />

        <polyline
          points={points}
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((item, index) => {
          const x = getX(index);
          const y = getY(values[index]);

          return (
            <g key={item.day}>
              <circle cx={x} cy={y} r="5" fill="#16a34a" />
              <text x={x} y={height - 18} textAnchor="middle" fontSize="14">
                {item.day}
              </text>
              <text x={x} y={y - 12} textAnchor="middle" fontSize="12">
                {formatINR(values[index])}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WeeklyRevenueChart;