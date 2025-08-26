import React from "react";
import {
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import { type ChartStyle } from "../types";

interface Props {
  style: ChartStyle;
  onChange: (style: ChartStyle) => void;
}

export const StyleConfigurator: React.FC<Props> = ({ style, onChange }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="subtitle1">樣式設定</Typography>

      <FormControlLabel
        control={
          <Switch
            checked={style.showLegend}
            onChange={(e) =>
              onChange({ ...style, showLegend: e.target.checked })
            }
          />
        }
        label="顯示圖例"
      />

      <FormControlLabel
        control={
          <Switch
            checked={style.showGrid}
            onChange={(e) =>
              onChange({ ...style, showGrid: e.target.checked })
            }
          />
        }
        label="顯示格線"
      />

      <Typography variant="body2" sx={{ mt: 1 }}>
        色彩主題
      </Typography>
      <RadioGroup
        row
        value={style.colorScheme}
        onChange={(e) => onChange({ ...style, colorScheme: e.target.value })}
      >
        <FormControlLabel value="default" control={<Radio />} label="預設" />
        <FormControlLabel value="dark" control={<Radio />} label="深色" />
        <FormControlLabel value="pastel" control={<Radio />} label="柔和" />
      </RadioGroup>
    </div>
  );
};
