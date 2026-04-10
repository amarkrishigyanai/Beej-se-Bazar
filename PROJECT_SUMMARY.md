# Kisan Parivar - FPO Admin Management System

## 📋 Project Overview

**Kisan Parivar** (Marjeevi Pragatisheel FPO) is a comprehensive **Farmer Producer Organization (FPO) Admin Control Center** built with React. It's designed to manage farmer listings, procurement, inventory, orders, members, and reports for agricultural cooperatives.

---

## 🏗️ Tech Stack

### Frontend

- **React 18.3.1** - UI Library
- **Vite 5.4.2** - Build Tool & Dev Server
- **React Router DOM 7.12.0** - Client-side Routing
- **Redux Toolkit 2.11.2** - State Management
- **Tailwind CSS 3.4.1** - Styling
- **Recharts 3.6.0** - Data Visualization
- **Lucide React 0.344.0** - Icons
- **Axios 1.13.2** - HTTP Client
- **React DatePicker 9.1.0** - Date Selection

### Backend API

- **Base URL**: `https://marjeevi-fpo-backend.onrender.com/api`
- JWT Token-based Authentication

### Deployment

- **Vercel** - Configured for SPA routing

---

## 📁 Project Structure

```
Kisan Parivar/
├── src/
│   ├── components/
│   │   ├── Layout.jsx              # Main layout with sidebar & header
│   │   └── ProtectedRoute.jsx      # Auth guard for routes
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Admin login page
│   │   ├── Register.jsx            # FPO registration
│   │   ├── Dashboard.jsx           # Overview with stats & graphs
│   │   ├── Listing.jsx             # Farmer listing approvals
│   │   ├── Procurement.jsx         # Purchase order management
│   │   ├── Inventory.jsx           # Stock tracking (inward/outward)
│   │   ├── Buy.jsx                 # Buyer order management
│   │   ├── Members.jsx             # FPO member management
│   │   ├── Reports.jsx             # Analytics & document downloads
│   │   └── Settings.jsx            # Profile settings
│   │
│   ├── store/
│   │   ├── slices/                 # Redux state slices
│   │   ├── thunks/                 # Async API calls
│   │   └── store.js                # Redux store configuration
│   │
│   ├── lib/
│   │   └── api.js                  # Axios instance with interceptors
│   │
│   ├── App.jsx                     # Main app with routing
│   └── main.jsx                    # Entry point
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

---

## 🔐 Authentication System

### Login Flow

- **File**: `src/pages/Login.jsx`
- Supports login via **Email OR Phone**
- JWT token stored in `localStorage`
- Auto-redirect to dashboard on success
- Protected routes via `ProtectedRoute.jsx`

### Registration

- **File**: `src/pages/Register.jsx`
- FPO-specific registration form
- Fields: Name, Email, Phone, Gender, Password, Shop Name, GST, Address
- Success → Auto-redirect to login

### Token Management

- **File**: `src/lib/api.js`
- Axios interceptor automatically attaches JWT token to all requests
- Token stored in `localStorage` as `token`

---

## 📊 Core Features & Pages

### 1. Dashboard (`/dashboard`)

**Purpose**: Overview of FPO operations

**Key Metrics**:

- Pending Approvals
- Approved Listings
- Ongoing Orders
- Total Orders

**Visualizations**:

- **Line Chart**: Daily listings submitted (dotted line)
- **Bar Chart**: Crop-wise procurement trends

**Recent Activity**:

- Shows farmer listing submissions with status
- Pagination (4 items per page)
- Quick action buttons (Review Listings, Manage Members)

**Data Source**: `dashboardThunk.js` → `getDashboardData()`

---

### 2. Listing Approvals (`/listing`)

**Purpose**: Review and approve farmer crop listings

**Features**:

- Search by crop name, farmer name, or ID
- Filter by crop type dropdown
- Status badges: Approved, Rejected, Pending
- Pagination (9 items per page)
- Edit/Delete actions (handlers defined but not implemented)

**Table Columns**:

- Farmer Name
- Crop & Variety
- Quantity (qtl)
- Expected Price (₹/qtl)
- Submission Date
- Status
- Actions

**Data Source**: `productsThunk.js` → `fetchProducts()`

---

### 3. Procurement Management (`/procurement`)

**Purpose**: Create and manage purchase orders from farmers

**Features**:

- Create Purchase Order modal with:
  - Farmer selection (dropdown from existing farmers)
  - Crop name
  - Quantity (qtl)
  - Price (₹/qtl)
  - Pickup location
  - Pickup date (DatePicker)
  - Additional notes
- View all purchase orders with PO IDs (PO-001, PO-002, etc.)
- Pagination (9 items per page)
- Edit/Delete actions (handlers referenced but not implemented)

**Table Columns**:

- PO ID
- Farmer Name
- Crop
- Quantity
- Price
- Purchase Date
- Actions

**Data Source**: `procurementThunk.js` → `fetchOrders()`, `createOrder()`

---

### 4. Inventory Management (`/inventory`)

**Purpose**: Track monthly stock movements

**Features**:

- **Unit Filter**: Filter by product unit (kg, qtl, etc.) or "All Units"
- **Bar Chart**: Monthly inward vs outward stock
  - Green bars = Inward
  - Orange bars = Outward
- **Custom Tooltip**: Shows product-wise breakdown on hover
  - Scrollable list of products
  - Displays inward/outward per product

**Data Processing**:

- Aggregates transactions by month
- Sorts by month order (Jan-Dec)
- Filters by selected unit

**Data Source**: `inventoryThunk.js` → `fetchInventory()`, `fetchProducts()`

---

### 5. Buyer Order Management (`/buy`)

**Purpose**: Manage orders from buyers and procurement agencies

**Features**:

- View all buyer orders
- Order ID format: ORD-001, ORD-002, etc.
- Pagination (9 items per page)
- Edit/Delete actions (handlers referenced but not implemented)

**Table Columns**:

- Order ID
- Buyer Name (Brand)
- Crop (Product Name)
- Quantity & Unit
- Price (MRP)
- Purchase Date
- Expiry Date
- Actions

**Data Source**: `purchasesThunk.js` → `fetchPurchases()`

---

### 6. Member Management (`/members`)

**Purpose**: Manage FPO members and their profiles

**Features**:

- View all registered members
- Member ID format: FPO-1, FPO-2, etc.
- Status badges: Active (default)
- KYC Status badges: Approved, Pending (default)
- Pagination (9 items per page)
- Edit/Delete actions (handlers referenced but not implemented)

**Table Columns**:

- Member ID
- Name
- Phone (+91 prefix)
- Role (badge)
- Status (badge)
- KYC Status (badge)
- Actions

**Data Source**: `membersThunk.js` → `fetchMembers()`

---

### 7. Reports & Analytics (`/reports`)

**Purpose**: View insights and download farmer documents

**Features**:

- **Top Farmers Chart**: Horizontal bar chart showing top 5 farmers by procurement volume
  - Custom tooltip shows crops procured
- **Document Downloads**: Per-farmer document cards
  - Soil Health Card
  - Lab Report
  - Govt Scheme Docs
  - Click to fetch and download PDFs

**Data Source**:

- `reportsThunk.js` → `fetchReports()`, `fetchFarmers()`, `fetchPrivateFiles()`

---

### 8. Settings (`/settings`)

**Purpose**: Manage admin profile

**Features**:

- View/Edit profile information
- Fields: Full Name, Email, Phone, Role
- Only **Phone** is editable
- Save Changes button (centered)
- Success message on update

**Data Source**: `settingsThunk.js` → `fetchProfile()`, `updateProfile()`

---

## 🔄 State Management (Redux)

### Store Structure (`store.js`)

```javascript
{
  auth: authReducer,           // Login, logout, token
  products: productsReducer,   // Farmer listings
  procurement: procurementReducer, // Purchase orders
  purchases: purchasesReducer, // Buyer orders
  inventory: inventoryReducer, // Stock tracking
  members: membersReducer,     // FPO members
  reports: reportsReducer,     // Analytics & docs
  dashboard: dashboardReducer, // Dashboard data
  layout: layoutReducer,       // User profile (me)
  settings: settingsReducer,   // Settings page
  register: registerReducer    // Registration
}
```

### Key Slices

#### authSlice.js

- Manages authentication state
- Actions: `logout`, `clearAuthState`
- Thunks: `loginUser`, `registerUser`
- Stores: `token`, `user`, `profile`, `isAuthenticated`

#### layoutSlice.js

- Fetches current user profile (`me`)
- Used in sidebar and header

---

## 🎨 UI/UX Features

### Layout Components

- **Sidebar**: Green theme, collapsible on mobile
- **Header**: Search bar, notifications (badge: 5), user dropdown
- **Responsive**: Mobile-friendly with hamburger menu

### Common Patterns

- **Loading States**: Spinning green loader
- **Pagination**: Prev/Next buttons with page counter
- **Status Badges**: Color-coded (green, orange, red, blue)
- **Modals**: Centered overlay with form inputs
- **Tables**: Hover effects, responsive overflow

### Color Scheme

- Primary: Green (`#16a34a`, `#22c55e`)
- Success: brand-100/700
- Warning: Orange/Yellow
- Error: Red
- Neutral: Gray scale

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔧 Current Issues & TODOs

### Known Issues

1. **Edit/Delete Handlers**: Referenced in multiple pages but not implemented
   - `Listing.jsx` - handleEdit, handleDelete
   - `Procurement.jsx` - handleEdit, handleDelete
   - `Buy.jsx` - handleEdit, handleDelete
   - `Members.jsx` - handleEdit, handleDelete

2. **Incomplete Features**:
   - "More Filters" button in Listing page (no functionality)
   - Notification dropdown (shows badge but no click handler)
   - User dropdown in header (no menu)

3. **Unused Files**:
   - `Documents.jsx` - Commented out in routes
   - `App.tsx`, `main.tsx` - TypeScript versions not used

### Suggested Next Steps

1. ✅ Implement Edit/Delete functionality for all CRUD operations
2. ✅ Add confirmation dialogs for delete actions
3. ✅ Implement notification system
4. ✅ Add user dropdown menu in header
5. ✅ Complete "More Filters" functionality
6. ✅ Add form validation
7. ✅ Implement error boundaries
8. ✅ Add toast notifications for success/error messages
9. ✅ Optimize API calls (avoid redundant fetches)
10. ✅ Add unit tests

---

## 📡 API Integration

### Base Configuration

```javascript
// src/lib/api.js
baseURL: "https://marjeevi-fpo-backend.onrender.com/api";
```

### Authentication Header

```javascript
Authorization: `Bearer ${token}`;
```

### Key Endpoints (Inferred)

- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /me` - Get current user
- `GET /products` - Fetch listings
- `GET /procurement` - Fetch purchase orders
- `POST /procurement` - Create purchase order
- `GET /purchases` - Fetch buyer orders
- `GET /inventory` - Fetch inventory
- `GET /members` - Fetch members
- `GET /dashboard` - Dashboard data
- `GET /reports` - Reports data
- `GET /farmers` - Farmers list
- `GET /files/:farmerId/:type` - Private files

---

## 🎯 Business Logic

### Farmer Listing Workflow

1. Farmer submits crop listing (via mobile app?)
2. Admin reviews in **Listing Approvals** page
3. Admin approves/rejects listing
4. Approved listings appear in procurement

### Procurement Workflow

1. Admin creates purchase order from approved listings
2. Selects farmer, crop, quantity, price, location, date
3. Order saved with unique PO ID
4. Tracks procurement in **Procurement** page

### Inventory Workflow

1. Stock movements tracked monthly
2. Inward: Stock received from farmers
3. Outward: Stock sold to buyers
4. Visualized in bar chart by month

### Buyer Order Workflow

1. Buyers place orders (external system?)
2. Orders appear in **Buyer Orders** page
3. Admin tracks order fulfillment
4. Includes purchase and expiry dates

---

## 📝 Code Quality Notes

### Strengths

✅ Clean component structure
✅ Consistent naming conventions
✅ Redux Toolkit for state management
✅ Reusable API configuration
✅ Responsive design
✅ Loading states handled
✅ Error handling in auth

### Areas for Improvement

⚠️ Missing PropTypes/TypeScript
⚠️ No error boundaries
⚠️ Hardcoded strings (no i18n)
⚠️ Limited form validation
⚠️ No unit tests
⚠️ Console.logs in production code
⚠️ Incomplete CRUD operations

---

## 🔒 Security Considerations

### Current Implementation

✅ JWT token authentication
✅ Protected routes
✅ Token stored in localStorage
✅ Axios interceptors for auth headers

### Recommendations

⚠️ Add token expiry handling
⚠️ Implement refresh token mechanism
⚠️ Add CSRF protection
⚠️ Sanitize user inputs
⚠️ Add rate limiting on API calls
⚠️ Implement role-based access control (RBAC)

---

## 📞 Support & Contact

**FPO Name**: Marjeevi Pragatisheel FPO  
**System**: Admin Control Center  
**Role**: Super Admin

---

## 📄 License

Private project for FPO management.

---

**Last Updated**: January 2025  
**Version**: 0.0.0  
**Status**: Active Development
