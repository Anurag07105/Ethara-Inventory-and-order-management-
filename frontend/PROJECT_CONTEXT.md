# Frontend Project Context - Ethara Inventory & Order Management

## Project Overview

A modern, production-grade SaaS frontend for Inventory & Order Management System built with React, Vite, and Material UI.

**Design Philosophy:** Clean, minimal, professional, premium - styled after modern SaaS platforms (Stripe, Linear, Vercel, Notion).

## Technology Stack

- **Framework:** React 18.2
- **Build Tool:** Vite 5
- **Routing:** React Router 6
- **HTTP Client:** Axios
- **State Management:** TanStack React Query 5
- **UI Library:** Material UI (MUI) 5
- **Styling:** MUI Theme + Emotion

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client and endpoint definitions
│   │   ├── client.js     # Axios instance with interceptors
│   │   ├── products.js   # Product API calls
│   │   ├── customers.js  # Customer API calls
│   │   ├── orders.js     # Order API calls
│   │   └── dashboard.js  # Dashboard API calls
│   │
│   ├── hooks/            # Custom React hooks for data fetching
│   │   ├── useProducts.js
│   │   ├── useCustomers.js
│   │   ├── useOrders.js
│   │   └── useDashboard.js
│   │
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── ProductTable.jsx
│   │   ├── CustomerTable.jsx
│   │   ├── OrderTable.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── EmptyState.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Customers.jsx
│   │   └── Orders.jsx
│   │
│   ├── routes/           # Route definitions
│   │   └── AppRoutes.jsx
│   │
│   ├── constants/        # Constants and configuration
│   │   ├── apiRoutes.js
│   │   └── queryKeys.js
│   │
│   ├── theme/            # Theme configuration
│   │   └── theme.js
│   │
│   ├── App.jsx           # Main app component
│   └── main.jsx          # React entry point with providers
│
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── Dockerfile            # Docker configuration
├── nginx.conf            # Nginx configuration for production
├── .env                  # Environment variables (local)
├── .env.example          # Environment variables template
└── .gitignore            # Git ignore rules

```

## API Integration

**Base URL:** Configurable via `VITE_API_BASE_URL` environment variable

**Current:** `http://127.0.0.1:8000`

**Endpoints:**
- `/api/v1/products` - Product management
- `/api/v1/customers` - Customer management
- `/api/v1/orders` - Order management
- `/api/v1/dashboard/overview` - Dashboard statistics

**API Response Format:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 0,
    "page": 1,
    "page_size": 10
  },
  "message": "Success"
}
```

## Design System

### Colors
- **Primary:** #4F46E5 (Indigo)
- **Secondary:** #7C3AED (Purple)
- **Success:** #10B981 (Green)
- **Warning:** #F59E0B (Amber)
- **Error:** #EF4444 (Red)
- **Background:** #F8FAFC (Light Blue-Gray)
- **Cards:** #FFFFFF (White)
- **Text:** #0F172A (Dark Blue-Gray)

### Typography
- **Headings:** Bold, tight letter-spacing (-0.02em)
- **Body:** Regular weight, 400
- **Buttons:** Semi-bold (600), uppercase not applied

### Components
- **Border Radius:** 8px (default), 12px (cards)
- **Shadows:** Subtle, soft (0 10px 15px -3px rgba)
- **Spacing:** 8px base unit, consistent padding
- **Transitions:** 0.2s ease-in-out for hover states

## State Management with React Query

### Query Configuration
```javascript
{
  staleTime: 5 minutes,
  gcTime: 10 minutes,
  retry: 1,
  refetchOnWindowFocus: false
}
```

### Mutation Patterns
- Automatic query invalidation on success
- Error handling with optional toast notifications
- Optimistic updates where applicable

## Features Implemented

### Phase 1: ✅ COMPLETE
- [x] Theme setup with Material UI
- [x] Routing with React Router
- [x] Layout and App wrapper
- [x] Navbar with navigation
- [x] API routes configuration
- [x] Query keys configuration

### Phase 2: ✅ COMPLETE
- [x] Dashboard page with stat cards
- [x] Loading skeleton support
- [x] Dashboard API integration

### Phase 3: ✅ COMPLETE
- [x] Products page
- [x] Products table with search
- [x] Product CRUD operations
- [x] Product API integration

### Phase 4: ✅ COMPLETE
- [x] Customers page
- [x] Customers table
- [x] Customer CRUD operations
- [x] Customer API integration

### Phase 5: ✅ COMPLETE
- [x] Orders page
- [x] Orders table with status
- [x] Order CRUD operations
- [x] Order status filtering
- [x] Order API integration

### Phase 6: ✅ COMPLETE
- [x] API client setup with axios
- [x] All endpoint definitions
- [x] Error handling interceptors
- [x] Environment configuration

### Phase 7: PARTIAL
- [x] Loading states and skeletons
- [x] Animations (CSS-based)
- [ ] Toast notifications (planned)
- [ ] Error boundaries (planned)

### Phase 8: PARTIAL
- [x] Responsive design setup
- [ ] Mobile optimization (in progress)
- [ ] Performance optimization (planned)
- [ ] UI polish (planned)

## Environment Variables

### Development
```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_APP_NAME=Ethara Inventory & Order Management
```

### Production
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=Ethara Inventory & Order Management
```

## Development Workflow

### Setup
```bash
npm install
cp .env.example .env
```

### Development Server
```bash
npm run dev
```
Starts at `http://localhost:5173` with HMR

### Build
```bash
npm run build
```
Creates optimized build in `dist/`

### Docker
```bash
docker build -t ethara-frontend:latest .
docker run -p 80:80 ethara-frontend:latest
```

## Performance Optimizations

- **Code Splitting:** Routes lazy-loaded (route-based)
- **Vendor Splitting:** Separate chunks for vendor dependencies
- **Caching:** Static assets cached for 1 year
- **Gzip:** Enabled for all text-based assets
- **Query Caching:** React Query handles data caching
- **Memoization:** Components memoized where necessary

## Responsive Design

- **Mobile:** < 600px (full-stack layout)
- **Tablet:** 600px - 960px (single column tables)
- **Desktop:** > 960px (multi-column layout)

All components responsive without horizontal scrolling.

## Security Considerations

- No hardcoded API keys or credentials
- All sensitive data in environment variables
- HTTPS enforced in production
- CORS configured on backend
- Input validation on forms
- XSS protection via React

## Future Enhancements

1. **Authentication:**
   - User login/signup
   - JWT token management
   - Protected routes

2. **Advanced Features:**
   - Bulk operations
   - Export to CSV/PDF
   - Advanced filtering
   - Date range filtering

3. **UI Improvements:**
   - Dark mode support
   - Custom themes
   - Accessibility audit

4. **Performance:**
   - Service Workers
   - Offline support
   - Image optimization

5. **Testing:**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Cypress

## Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)
```bash
npm run build
# Deploy dist/ folder
```

### Docker (Nginx)
```bash
docker build -t ethara-frontend:latest .
docker run -p 80:80 ethara-frontend:latest
```

### Docker Compose
See `docker-compose.yml` in root directory for full stack deployment.

## Troubleshooting

### API connection issues
- Check `VITE_API_BASE_URL` in `.env`
- Ensure backend is running
- Check browser console for CORS errors

### Build errors
- Clear `node_modules` and `dist/`
- Reinstall dependencies: `npm install`
- Check Node.js version (v18+ recommended)

## Support & Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Material UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [React Query Documentation](https://tanstack.com/query)
- [Axios Documentation](https://axios-http.com)
