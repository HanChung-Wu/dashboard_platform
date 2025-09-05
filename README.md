# 資料管理與視覺化平台

> **⚠️ 注意：此倉庫仍處於開發階段，尚未完成完整的功能或正式發布。**

---

## 專案簡介
本專案旨在建立一個模組化且可擴展的資料管理與視覺化平台，適用於中小型資料分析團隊、教育用途或內部 BI 工具開發。平台主要功能包括：
- 📊 **資料表管理**：支援匯入、編輯、顯示及操作 CSV/JSON 資料。
- 📈 **儀表板管理**：提供多層次的圖表編輯與視覺化功能。
- 🧭 **導航與佈局**：清晰的導航結構（側邊欄、頂部導航、麵包屑等）。
- ⚙️ **狀態管理**：採用 Zustand 和 React Context 提升效能。
- 🖥 **響應式 UI**：整合 Material-UI，提供現代化的使用者介面。

---

## 功能特性

### 1. 資料表管理
- 支援拖曳與多檔案上傳，並提供「純資料」與「含資訊」兩種模式。
- 動態解析 CSV/JSON 檔案並預覽內容。
- 支援表格命名、確認儲存與操作選單（瀏覽、編輯、下載、刪除）。
- 視圖模式切換：列表與卡片視圖。

### 2. 儀表板管理（初步實作中）
- 已建立儀表板主頁與右側設定面板。
- 預計支援圖表組合與互動式設定。

### 3. 導航與佈局
- 麵包屑：響應式設計，根據螢幕大小動態顯示。
- 側邊欄：嵌套、可折疊的導航結構，支援圖示顯示。
- 頂部導航：整合搜尋框與頁面標題顯示。

### 4. 狀態管理
- 採用 Zustand + React Context 實現集中式狀態管理。
- 支援右側面板開關與麵包屑更新。

### 5. UI 整合與響應式設計（初步實作中）
- 使用 Material-UI 元件（如 Table、Grid）提升視覺一致性。
- 預期支援多螢幕尺寸，提供最佳化的使用者體驗。

### 6. 開發工作流與 CI/CD
- GitHub Actions：配置 lint、型別檢查、測試與安全性審核流程。
- 依賴性審查與 CodeQL 安全性分析。

---

## 專案架構

```bash
├── src
│   ├── assets            # 靜態資源（圖片、範例資料）
│   ├── components        # UI 元件（含 layout、common、DataTablesPage 等）
│   ├── context           # React Context 與 Provider
│   ├── pages             # 各功能頁面
│   ├── stores            # Zustand 狀態管理
│   ├── theme             # MUI 主題設定
│   ├── types.tsx         # 型別定義
│   └── utils.tsx         # 工具函式（如資料解析）
├── public                # 公共資源
├── tests                 # 測試文件（尚未實作）
└── .github               # GitHub Actions 配置
```

---

## 技術棧
- 前端框架：React + Vite
- UI 庫：Material-UI
- 路由管理：React Router
- 狀態管理：Zustand + React Context
- 型別檢查：TypeScript
- 資料解析：PapaParse（CSV）、JSON 原生解析
- 測試框架：Jest + React Testing Library
- CI/CD：GitHub Actions

---

## 開發指南

### 環境需求
- Node.js 版本：`>=16.0.0`
- npm 或 yarn

### 安裝
```bash
# Clone 此倉庫
git clone https://github.com/ohayowu314/dashboard_platform.git

# 安裝依賴
npm install
```

### 啟動開發伺服器（使用 Vite）
```bash
npm run dev
```

### 執行測試
```bash
npm test
```

---

## 進度與待辦事項

### ✅ 已完成
- 資料表上傳、預覽與編輯流程。
- 基礎佈局與導航元件。

### 🛠 待辦
- 儀表板互動式圖表整合。
- 資料表匯出與 API 儲存。
- 優化 UI/UX 設計。
- 單元測試與 E2E 測試。
- 撰寫完整的使用者文件。

---

## 貢獻指南
歡迎任何形式的貢獻！請遵循以下步驟：
1. Fork 此倉庫。
2. 創建分支進行修改（`git checkout -b feature/your-feature`）。
3. 提交 PR（Pull Request）。

---

## 版權聲明
此專案採用 [MIT License](LICENSE)。請自由使用、修改與分發。

---

如有任何問題或建議，請開 Issue 或聯繫我們！🎉
