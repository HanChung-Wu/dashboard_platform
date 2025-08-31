// src/components/layout/Breadcrumb.tsx
import React, { useState } from "react";
import { Breadcrumbs, IconButton, Menu, MenuItem, Link } from "@mui/material";
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

  // 計算麵包屑路徑
  const getBreadcrumbPath = (index: number) => {
    return (
      "/" +
      breadcrumbItems
        .slice(0, index + 1)
        .map((item) => item.path.replace(/^\//, ""))
        .join("/")
    );
  };

  // 處理麵包屑點擊
  const handleBreadcrumbClick = (index: number) => {
    navigate(getBreadcrumbPath(index));
  };

  // 處理更多按鈕點擊
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 處理更多菜單關閉
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  // 創建麵包屑項目
  const renderBreadcrumbItem = (
    key: number | string,
    label: string,
    index: number,
    isLast = false
  ) => {
    const path = getBreadcrumbPath(index);
    const fontWeight = isLast ? "bold" : "normal";
    const color = isLast ? "primary.main" : "inherit";

    return (
      <Link
        key={key}
        underline="hover"
        href={path}
        sx={{
          fontWeight,
          color,
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
      >
        {label}
      </Link>
    );
  };

  // 獲取要顯示的麵包屑項目
  const getBreadCrumbs = () => {
    if (breadcrumbItems.length <= 3) {
      // 如果項目少於或等於3個，顯示所有項目
      return breadcrumbItems.map((item, index) =>
        renderBreadcrumbItem(
          index,
          item.label,
          index,
          index === breadcrumbItems.length - 1
        )
      );
    } else {
      // 如果項目多於3個，顯示省略號和最後兩個項目
      const lastTwoItems = [
        // 倒數第二個項目
        renderBreadcrumbItem(
          "second-last",
          breadcrumbItems[breadcrumbItems.length - 2].label,
          breadcrumbItems.length - 2
        ),
        // 最後一個項目
        renderBreadcrumbItem(
          "last",
          breadcrumbItems[breadcrumbItems.length - 1].label,
          breadcrumbItems.length - 1,
          true
        ),
      ];

      // 添加省略號按鈕
      return [
        <IconButton
          key="more"
          size="small"
          onClick={handleMoreClick}
          aria-label="more breadcrumbs"
          aria-haspopup="true"
        >
          <span style={{ fontSize: 12 }}>...</span>
        </IconButton>,
        ...lastTwoItems,
      ];
    }
  };

  return (
    <>
      {/* 更多菜單 */}
      {breadcrumbItems.length > 3 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMoreClose}
          id="breadcrumb-menu"
        >
          {breadcrumbItems
            .slice(0, breadcrumbItems.length - 2)
            .map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleBreadcrumbClick(index);
                  handleMoreClose();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
        </Menu>
      )}

      {/* 麵包屑導航 */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumbs"
      >
        {getBreadCrumbs()}
      </Breadcrumbs>
    </>
  );
};
