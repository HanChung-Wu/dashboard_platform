import { Link } from "react-router-dom";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import type { TocItem } from "../../types";

interface props {
  tocItems: TocItem[];
  isExpandable?: boolean;
  expandedLevel?: number;
}
export const TocList: React.FC<props> = ({
  tocItems,
  isExpandable = true,
  expandedLevel = 3,
}: props) => {
  console.log("tocItems", tocItems);

  const renderItems = (items: TocItem[], level: number): React.ReactNode => {
    return items.map((item) => (
      <Box key={item.path} sx={{ pl: level == 1 ? 2 : level }}>
        <ListItemButton component={Link} to={item.path}>
          <ListItemText primary={item.label} />
        </ListItemButton>
        {isExpandable &&
          item.children &&
          expandedLevel > level &&
          renderItems(item.children, level + 1)}
      </Box>
    ));
  };

  return <List>{renderItems(tocItems, 0)}</List>;
};
