import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { useChartStore } from "../store/chartStore";
import { ChartTypeSelector } from "./ChartTypeSelector";
import { DataSourceSelector } from "./DataSourceSelector";
import { StyleConfigurator } from "./StyleConfigurator";
import { FieldSelector } from "./FieldSelector";
import { type DataSource } from "../types";
import { ChartPreview } from "./ChartPreview";
import { useDataStore } from "../store/dataStore";

interface Props {
  chartId: string;
  dataSources: DataSource[];
}

export const ChartConfigPanel: React.FC<Props> = ({ chartId, dataSources }) => {
  const chart = useChartStore((s) =>
    s.charts.find((c) => c.id === chartId)
  );
  const updateChart = useChartStore((s) => s.updateChart);
  const dataCache = useDataStore((s) => s.dataCache);

  if (!chart) return null;

  const dataSource = dataSources.find((d) => d.id === chart.dataSourceId);
  const rawData = dataSource ? dataCache[dataSource.id] : [];
  const availableFields = rawData && rawData.length > 0
    ? Object.keys(rawData[0]).filter((k) => k !== "name") // 排除 X 軸
    : [];

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          圖表設定
        </Typography>

        <ChartTypeSelector
          value={chart.type}
          onChange={(type) => updateChart(chartId, { type })}
        />

        <DataSourceSelector
          value={chart.dataSourceId}
          dataSources={dataSources}
          onChange={(ds) => updateChart(chartId, { dataSourceId: ds })}
        />

        <StyleConfigurator
          style={chart.style}
          onChange={(style) => updateChart(chartId, { style })}
        />

        {/* 新增欄位選擇器 */}
        <FieldSelector
          availableFields={availableFields}
          selectedFields={chart.fields ?? []}
          onChange={(fields) => updateChart(chartId, { fields })}
        />

        {/* 刷新間隔 */}
        <TextField
          label="刷新間隔 (秒)"
          type="number"
          fullWidth
          margin="normal"
          slotProps={{ htmlInput: { step: 10 } }}
          value={(chart.refreshInterval ?? 0) / 1000}
          onChange={(e) => {
            const seconds = parseInt(e.target.value, 10);
            updateChart(chartId, {
              refreshInterval: seconds >= 10 ? seconds * 1000 : undefined,
            });
          }}
        />

        {/* 即時預覽 */}
        <ChartPreview config={chart} dataSource={dataSource} />
      </CardContent>
    </Card>
  );
};
