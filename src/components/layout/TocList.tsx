// src/components/layout/TocList.tsx
import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import type { TocItem } from "../../types";

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
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggleOpen = (path: string) => {
    setOpenMap((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderItems = (items: TocItem[], level: number): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpandedItem =
        hasChildren && isExpandable && expandedLevel > level;
      const isOpen = openMap[item.path] ?? false;

      return (
        <Box key={item.path} sx={{ pl: level * indentPerLevel }}>
          <ListItemButton
            component={isExpandedItem ? "div" : Link}
            to={isExpandedItem ? undefined : item.path}
            onClick={isExpandedItem ? () => toggleOpen(item.path) : undefined}
          >
            {item.icon && <Box sx={{ mr: 1 }}>{item.icon}</Box>}
            <ListItemText primary={item.label} />
            {isExpandedItem &&
              (isOpen ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              ))}
          </ListItemButton>

          {isExpandedItem && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              {renderItems(item.children!, level + 1)}
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return <List>{renderItems(tocItems, 0)}</List>;
};
