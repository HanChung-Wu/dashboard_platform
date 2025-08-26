import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useChartStore } from "../store/chartStore";
import { ChartTypeSelector } from "./ChartTypeSelector";
import { DataSourceSelector } from "./DataSourceSelector";
import { StyleConfigurator } from "./StyleConfigurator";
import { type DataSource } from "../types";
import { ChartPreview } from "./ChartPreview";

interface Props {
  chartId: string;
  dataSources: DataSource[];
}

export const ChartConfigPanel: React.FC<Props> = ({ chartId, dataSources }) => {
  const chart = useChartStore((s) =>
    s.charts.find((c) => c.id === chartId)
  );
  const updateChart = useChartStore((s) => s.updateChart);

  if (!chart) return null;

  const dataSource = dataSources.find((d) => d.id === chart.dataSourceId);

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

        {/* 即時預覽 */}
        <ChartPreview config={chart} dataSource={dataSource} />
      </CardContent>
    </Card>
  );
};
