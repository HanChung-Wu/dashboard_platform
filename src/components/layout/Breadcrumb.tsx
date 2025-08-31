// src/components/layout/Breadcrumb.tsx
import React, { useState } from "react";
import {
  Breadcrumbs,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLayoutStore } from "../../stores/layoutStore";
import type { BreadcrumbItem } from "../../types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Breadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const breadcrumbItems: BreadcrumbItem[] = useLayoutStore(
    (state) => state.breadcrumbItems
  );

  const getBreadcrumbPath = (index: number) => {
    return (
      "/" +
      breadcrumbItems
        .slice(0, index + 1)
        .map((item) => item.path.replace(/^\//, ""))
        .join("/")
    );
  };

  const handleBreadcrumbClick = (index: number) => {
    navigate(getBreadcrumbPath(index));
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const getBreadcrumbViewItem = (key: number | string, label: string, link: string, isLast = false) => {
    const fontWeight = isLast ? 'bold' : 'normal';
    const color = isLast ? 'primary.main' : 'inherit';
    return <Link
      key={key}
      underline="hover"
      href={link}
      sx={{
        fontWeight: fontWeight,
        color: color
      }}
    >
      {label}
    </Link>
  }

  const getBreadCrumbs = () => {

    return breadcrumbItems.length <= 3
      ? breadcrumbItems.map(({ label }, i) => (
        getBreadcrumbViewItem(i, label, getBreadcrumbPath(i), i === breadcrumbItems.length - 1)
      ))
      : [
        <IconButton size="small" onClick={handleMoreClick}>
          <Typography fontSize={12}>...</Typography>
        </IconButton>,
        getBreadcrumbViewItem(breadcrumbItems.length - 2, breadcrumbItems[breadcrumbItems.length - 2].label, getBreadcrumbPath(breadcrumbItems.length - 2), false),
        getBreadcrumbViewItem(breadcrumbItems.length - 1, breadcrumbItems[breadcrumbItems.length - 1].label, getBreadcrumbPath(breadcrumbItems.length - 1), true),
      ];
  };

  const breadcrumbs = getBreadCrumbs();

  return (<>
    {/* More Menu */}
    {breadcrumbItems.length > 3
      && <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
      >
        {breadcrumbItems
          .slice(0, breadcrumbItems.length - 2)
          .map(({ label }, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                handleBreadcrumbClick(i);
                handleMoreClose();
              }}
            >
              {label}
            </MenuItem>
          ))}
      </Menu>
    }
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumbs"
    >
      {breadcrumbs}
    </Breadcrumbs>
  </>

  );
};
