import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { ChartConfig, DataSource } from "../types";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useDataStore } from "../store/dataStore";

interface Props {
  config: ChartConfig;
  dataSource: DataSource | undefined;
}

export const ChartPreview: React.FC<Props> = ({ config, dataSource }) => {
  const { dataCache, loading, error, fetchData } = useDataStore();

  useEffect(() => {
    if (dataSource) {
      fetchData({ ...dataSource, refreshInterval: config.refreshInterval });
    }
  }, [dataSource?.id, config.refreshInterval]);


  if (!dataSource) {
    return <Typography>⚠️ 尚未選擇資料來源</Typography>;
  }

  const data = dataCache[dataSource.id];
  const isLoading = loading[dataSource.id];
  const err = error[dataSource.id];

  if (isLoading) return <CircularProgress />;
  if (err) return <Typography color="error">❌ 載入失敗: {err}</Typography>;
  if (!data) return <Typography>等待載入資料...</Typography>;

  const { type, style, fields } = config;

  const colors = {
    default: ["#8884d8", "#82ca9d"],
    dark: ["#333", "#666"],
    pastel: ["#ffb6b9", "#fae3d9"],
  };
  const colorSet = colors[style.colorScheme] || colors.default;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          預覽：{type.toUpperCase()} ({dataSource.label})
        </Typography>

        {type === "line" && (
          <LineChart width={400} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {style.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {style.showLegend && <Legend />}
            {(fields ?? []).map((f, i) => (
              <Line key={f} type="monotone" dataKey={f} stroke={colorSet[i]} />
            ))}
          </LineChart>
        )}

        {type === "bar" && (
          <BarChart width={400} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {style.showLegend && <Legend />}
            {(fields ?? []).map((f, i) => (
              <Bar key={f} dataKey={f} fill={colorSet[i]} />
            ))}
          </BarChart>
        )}


        {type === "pie" && (
          <PieChart width={400} height={250}>
            <Tooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_: any, i: number) => (
                <Cell key={i} fill={colorSet[i % colorSet.length]} />
              ))}
            </Pie>
          </PieChart>
        )}

        {type === "scatter" && (
          <ScatterChart width={400} height={250}>
            {style.showGrid && <CartesianGrid />}
            <XAxis dataKey="value" />
            <YAxis dataKey="users" />
            <Tooltip />
            {style.showLegend && <Legend />}
            <Scatter data={data} fill={colorSet[0]} />
          </ScatterChart>
        )}
      </CardContent>
    </Card>
  );
};
