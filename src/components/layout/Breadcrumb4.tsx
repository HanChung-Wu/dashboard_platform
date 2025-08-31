// src/components/layout/Breadcrumb.tsx
import React, { useState } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useLayoutStore } from "../../stores/layoutStore";
import type { BreadcrumbItem } from "../../types";

export const Breadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const breadcrumbItems: BreadcrumbItem[] = useLayoutStore(
    (state) => state.breadcrumbItems
  );

  const getBreadcrumbPath = (index: number) =>
    "/" +
    breadcrumbItems
      .slice(0, index + 1)
      .map((item) => item.path.replace(/^\//, ""))
      .join("/");

  const handleNavigate = (index: number) => {
    navigate(getBreadcrumbPath(index));
    setAnchorEl(null);
  };

  const visibleItems =
    breadcrumbItems.length > 3
      ? breadcrumbItems.slice(-2) // 只顯示最後兩個
      : breadcrumbItems;

  return (
    <>
      {/* 折疊選單 */}
      {breadcrumbItems.length > 3 && (
        <Menu
          id="breadcrumb-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {breadcrumbItems.slice(0, -2).map((item, index) => (
            <MenuItem key={index} onClick={() => handleNavigate(index)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumbs"
      >
        {/* 折疊按鈕 */}
        {breadcrumbItems.length > 3 && (
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ p: 0.5 }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        )}

        {/* 直接顯示的項目 */}
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const actualIndex =
            breadcrumbItems.length > 3
              ? breadcrumbItems.length - 2 + index
              : index;

          return isLast ? (
            <Typography
              key={item.path}
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              {item.label}
            </Typography>
          ) : (
            <Link
              key={item.path}
              color="inherit"
              underline="hover"
              component="button"
              onClick={() => handleNavigate(actualIndex)}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
