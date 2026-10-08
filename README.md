# Enterprise Analytics Dashboard - Shadcn UI

A responsive, high-performance static analytics dashboard built with **React**, **TypeScript**, **Tailwind CSS**, **Shadcn UI component architecture**, **Lucide Icons**, and **Recharts**.

---

## 🌟 Features Implemented

### 1. 🧭 Sidebar Navigation
- **Fixed & Collapsible**: Seamless toggle between full width (256px) and compact icon mode (80px).
- **Multi-View Routing**: Direct navigation to **Overview**, **Analytics**, **Customers**, **Reports**, **Notifications**, and **Settings**.
- **Badge Indicators**: Unread notification counter badges integrated in navigation buttons.
- **User Profile Area**: User avatar with fallback initials, email, and quick settings trigger.

### 2. 🔝 Top Navigation Bar
- **Header Title & Context**: Dynamic page title and description matching the active view.
- **Global Search**: Search bar with keyboard shortcut hint (`⌘K`).
- **Notifications Popover**: Interactive notifications menu with unread badges, timestamp, and *"Mark all read"* action.
- **Theme Toggler**: 1-click toggle between **Light Mode** and **Dark Mode** with persistent theme preferences in `localStorage`.
- **User Dropdown Menu**: Profile details, billing link, preferences, and logout trigger.

### 3. 📱 Responsive Layout & Mobile Drawer
- **Independent Scrolling**: Sidebar remains fixed while the main dashboard content area scrolls smoothly.
- **Mobile Responsive Drawer**: Off-canvas slide-out sheet menu for mobile and tablet screen sizes.
- **Adaptive Grid**: 1-column layout on mobile, 2-column on tablets, 3-to-4 column on desktop screens.

### 4. 💳 Summary Metric Cards (KPIs)
- **4 Primary Metric Cards**:
  - 💵 **Total Revenue**: `$45,231.89` (+20.1% vs last month)
  - 👥 **Subscriptions**: `+2,350` (+180.1% vs last month)
  - 💳 **Sales Count**: `+12,234` (+19.0% vs last month)
  - ⚡ **Active Now**: `+573` (+201 since last hour)
- High-contrast visual indicators, trend badges, and Lucide icons.

### 5. 📊 Interactive Graphs & Charts (Recharts)
- **Monthly Revenue Bar Chart**: Monthly revenue distribution comparing Subscriptions vs Direct Sales with customized dark/light mode tooltips.
- **Visitor Growth Area Chart**: Daily unique visitors and page impressions trend with gradient area fills.
- **Traffic Channels Donut Chart**: Visual traffic distribution (Direct, Organic Search, Social Media, Referral) with legend and percentages.

### 6. 📋 Advanced Data Table
- **Recent Transactions & Billing Records**:
  - **Live Search**: Filter by customer name, email, or transaction reference ID.
  - **Status Filter**: Quick dropdown filter for Paid, Pending, Failed, and Refunded.
  - **Sortable Columns**: Interactive sorting by Customer Name, Amount, Status, and Date.
  - **Pagination**: Configurable page navigation with previous/next controls and results count.
  - **Interactive Details Modal**: Click any transaction to view full invoice breakdown in a modal dialog.
  - **Row Action Menu**: Copy transaction ID, view details, or download receipts.

### 7. 📑 Tabs & Action Controls
- **Sub-navigation Tabs**: Switch between Overview, Performance, and Sales Reports tabs.
- **Date Range Picker**: Filter metrics by Today, Last 7 Days, Last 30 Days, Q1 2026, or Year-to-Date.
- **Live Action Buttons**: *Refresh Data* (with spin animation) and *Download Report*.
- **Interactive Toast Notifications**: Toast popups providing real-time feedback for all user actions.

---

## 🏗️ Folder Structure

```text
shadcn-static-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable Shadcn UI Primitives
│   │   │   ├── avatar.tsx         # User Avatar with fallback
│   │   │   ├── badge.tsx          # Status Badges
│   │   │   ├── button.tsx         # Button variants (default, outline, ghost, destructive)
│   │   │   ├── card.tsx           # Card, CardHeader, CardTitle, CardContent
│   │   │   ├── dialog.tsx         # Modal Dialog
│   │   │   ├── dropdown-menu.tsx  # Popover Dropdown Menus
│   │   │   ├── input.tsx          # Text Inputs
│   │   │   ├── table.tsx          # Data Table components
│   │   │   ├── tabs.tsx           # Tabs navigation
│   │   │   └── toast.tsx          # Toast notification alerts
│   │   ├── layout/                # Shell & Navigation Layout
│   │   │   ├── Header.tsx         # Top navigation bar
│   │   │   ├── Sidebar.tsx        # Collapsible fixed sidebar
│   │   │   └── MobileNav.tsx      # Mobile slide-out drawer
│   │   ├── dashboard/             # Dashboard Widgets
│   │   │   ├── DateRangeSelector.tsx # Date filtering & action buttons
│   │   │   ├── MetricCard.tsx     # Summary KPI cards
│   │   │   ├── RevenueBarChart.tsx # Monthly revenue chart
│   │   │   ├── TrafficPieChart.tsx # Traffic source breakdown
│   │   │   ├── TransactionsTable.tsx # Searchable, sortable data table
│   │   │   └── UserGrowthAreaChart.tsx # Daily visitors trend chart
│   │   └── views/                 # Full Page Views
│   │       ├── AnalyticsView.tsx  # Performance analytics page
│   │       ├── CustomersView.tsx  # Customer directory page
│   │       ├── NotificationsView.tsx # Notifications center
│   │       ├── OverviewView.tsx   # Main dashboard overview
│   │       ├── ReportsView.tsx    # Exportable audit reports
│   │       └── SettingsView.tsx   # Workspace preferences
│   ├── context/
│   │   └── ThemeContext.tsx       # Dark/Light mode theme provider
│   ├── data/
│   │   └── mockData.ts            # Realistic mock datasets
│   ├── lib/
│   │   └── utils.ts               # cn helper (clsx + twMerge) & formatters
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── App.tsx                    # Main App Shell
│   ├── main.tsx                   # React Entrypoint
│   └── index.css                  # Tailwind CSS + Shadcn HSL Design Tokens
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
