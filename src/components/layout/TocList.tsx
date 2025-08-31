// src/components/layout/TocList.tsx
import { List } from "@mui/material";
import type { TocItem } from "../../types";
import { TocListItem } from "./TocListItem"; // 從這裡導入新元件

interface Props {
  tocItems: TocItem[];
  isExpandable?: boolean;
  expandedLevel?: number;
  indentPerLevel?: number;
}

export const TocList: React.FC<Props> = ({
  tocItems,
  isExpandable = true,
  expandedLevel = 3,
  indentPerLevel = 2,
}) => {
  return (
    <List>
      {tocItems.map((item) => (
        <TocListItem
          key={item.path}
          item={item}
          level={0}
          isExpandable={isExpandable}
          expandedLevel={expandedLevel}
          indentPerLevel={indentPerLevel}
        />
      ))}
    </List>
  );
};
