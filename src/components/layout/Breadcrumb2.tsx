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
  const breadcrumb: BreadcrumbItem[] = useLayoutStore(
    (state) => state.breadcrumbItems
  );

  // 最大顯示項目數 (不包括省略號)
  const maxItems = 3;
  const itemsBeforeCollapse = 0; // 折疊前顯示的項目數
  const itemsAfterCollapse = 1; // 折疊後顯示的項目數
  const shouldShowCollapsedMenu = breadcrumb.length > maxItems;

  const getBreadcrumbPath = (index: number) => {
    if (index < 0 || index >= breadcrumb.length) return "/";
    return (
      "/" +
      breadcrumb
        .slice(0, index + 1)
        .map((item) => item.path.replace(/^\//, ""))
        .join("/")
    );
  };

  const handleBreadcrumbClick = (index: number) => {
    navigate(getBreadcrumbPath(index));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 處理折疊菜單中的項目點擊
  const handleMenuItemClick = (index: number) => {
    handleBreadcrumbClick(index);
    handleMenuClose();
  };

  // 計算要在菜單中顯示的項目
  const getCollapsedItems = () => {
    if (!shouldShowCollapsedMenu) return [];

    // 計算要在菜單中顯示的項目範圍
    const start = itemsBeforeCollapse;
    const end = breadcrumb.length - itemsAfterCollapse;
    return breadcrumb.slice(start, end);
  };

  // 計算要直接顯示的項目
  const getVisibleItems = () => {
    if (!shouldShowCollapsedMenu) return breadcrumb;

    const firstItems =
      itemsBeforeCollapse > 0 ? breadcrumb.slice(0, itemsBeforeCollapse) : [];

    const lastItems = breadcrumb.slice(breadcrumb.length - itemsAfterCollapse);

    return [...firstItems, ...lastItems];
  };

  const collapsedItems = getCollapsedItems();
  const visibleItems = getVisibleItems();

  return (
    <>
      <Menu
        id="breadcrumb-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {collapsedItems.map((item, index) => {
          // 計算實際索引，考慮前面已顯示的項目
          const actualIndex = index + itemsBeforeCollapse;
          return (
            <MenuItem
              key={`collapsed-${index}`}
              onClick={() => handleMenuItemClick(actualIndex)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* 顯示直接可見的項目 */}
        {shouldShowCollapsedMenu &&
          itemsBeforeCollapse > 0 &&
          visibleItems.slice(0, itemsBeforeCollapse).map((item, index) => (
            <Link
              key={`visible-start-${index}`}
              color="inherit"
              component="button"
              onClick={() => handleBreadcrumbClick(index)}
              underline="hover"
            >
              {item.label}
            </Link>
          ))}

        {/* 折疊菜單 */}
        {shouldShowCollapsedMenu && (
          <IconButton
            size="small"
            aria-label="more"
            aria-controls="breadcrumb-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ padding: 0.5 }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        )}

        {/* 顯示最後的項目 */}
        {shouldShowCollapsedMenu ? (
          // 最後一個項目 (當前頁面)
          <Typography color="text.primary" sx={{ fontWeight: "bold" }}>
            {breadcrumb[breadcrumb.length - 1].label}
          </Typography>
        ) : (
          // 如果項目數不多，直接顯示所有項目
          breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return isLast ? (
              <Typography
                key={`full-${index}`}
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                key={`full-${index}`}
                color="inherit"
                component="button"
                onClick={() => handleBreadcrumbClick(index)}
                underline="hover"
              >
                {item.label}
              </Link>
            );
          })
        )}
      </Breadcrumbs>
    </>
  );
};
