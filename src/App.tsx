import { Button, Container, Typography } from "@mui/material";
import { useChartStore } from "./store/chartStore";
import { ChartConfigPanel } from "./components/ChartConfigPanel";
import { v4 as uuidv4 } from "uuid";

const mockDataSources = [
  { id: "1", label: "Sales Data", url: "/data/sales.json", refreshInterval: 30000 },
  { id: "2", label: "User Growth", url: "/data/users.json", refreshInterval: 10000 },
];

function App() {
  const charts = useChartStore((s) => s.charts);
  const addChart = useChartStore((s) => s.addChart);

  const handleAddChart = () => {
    addChart({
      id: uuidv4(),
      type: "line",
      dataSourceId: mockDataSources[0].id,
      style: { colorScheme: "default", showLegend: true, showGrid: true },
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        動態圖表設定面板
      </Typography>

      <Button variant="contained" onClick={handleAddChart} sx={{ mb: 2 }}>
        新增圖表
      </Button>

      {charts.map((chart) => (
        <ChartConfigPanel
          key={chart.id}
          chartId={chart.id}
          dataSources={mockDataSources}
        />
      ))}
    </Container>
  );
}

export default App;
