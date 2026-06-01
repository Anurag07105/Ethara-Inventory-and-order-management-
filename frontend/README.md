# Ethara Frontend - Inventory & Order Management

A modern, production-grade SaaS frontend for managing products, customers, and orders.

## 🎨 Design

Built with a professional design language inspired by platforms like Stripe, Linear, and Vercel:
- Clean, minimal interface
- Smooth animations and transitions
- Responsive design for all devices
- Premium color palette and typography

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── api/              # API client and endpoint definitions
│   ├── hooks/            # Custom React hooks
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── routes/           # Route definitions
│   ├── constants/        # Constants and configuration
│   ├── theme/            # Material UI theme
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── Dockerfile            # Docker configuration
└── nginx.conf            # Nginx configuration
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 6** - Routing
- **Axios** - HTTP client
- **TanStack React Query** - State management
- **Material UI 5** - UI components
- **Emotion** - CSS-in-JS

## 🌐 API Configuration

Configure the API base URL in `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For production:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📱 Features

### Dashboard
- Total revenue statistics
- Total orders count
- Total products count
- Total customers count
- Loading states with skeletons

### Products
- View all products with pagination
- Search products by name/SKU
- Add new products
- Edit product details
- Delete products
- Stock level indicators

### Customers
- View all customers
- Search customers
- Add new customers
- Edit customer information
- Delete customers

### Orders
- View all orders
- Filter by status
- Search orders
- View order details
- Update order status
- Delete orders

## 🎯 Components

### Pages
- **Dashboard** - Overview with statistics
- **Products** - Product management
- **Customers** - Customer management
- **Orders** - Order management

### Shared Components
- **Navbar** - Navigation bar with active route highlighting
- **ProductTable** - Sortable product table
- **CustomerTable** - Customer data table
- **OrderTable** - Order data table with status
- **LoadingSkeleton** - Loading animation
- **EmptyState** - Empty state display
- **ConfirmDialog** - Confirmation dialog

## 🎨 Theme & Styling

The application uses a professional Material UI theme with custom colors:

- **Primary:** #4F46E5 (Indigo)
- **Secondary:** #7C3AED (Purple)
- **Success:** #10B981 (Green)
- **Warning:** #F59E0B (Amber)
- **Error:** #EF4444 (Red)

See `src/theme/theme.js` for complete theme configuration.

## 📊 State Management

React Query is used for data management:

```javascript
// Fetching data
const { data, isLoading, error } = useProducts(params);

// Mutating data
const mutation = useCreateProduct();
mutation.mutate({ name: 'Product', price: 100 });
```

## 🔄 API Integration

All API calls are centralized in the `src/api/` directory:

```javascript
// src/api/products.js
export const fetchProducts = async (params) => {
  return apiClient.get(API_ROUTES.PRODUCTS, { params });
};

// src/hooks/useProducts.js
export const useProducts = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => fetchProducts(params),
  });
};

// In component
const { data } = useProducts({ page: 1, pageSize: 10 });
```

## 📦 Docker Deployment

### Build Docker Image
```bash
docker build -t ethara-frontend:latest .
```

### Run Container
```bash
docker run -p 80:80 ethara-frontend:latest
```

### Docker Compose
```bash
docker-compose up frontend
```

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production build will be optimized and output to the `dist/` directory.

## 🔒 Security

- Environment variables for sensitive configuration
- No hardcoded API keys or credentials
- HTTPS enforced in production
- CORS configured on backend
- Input validation on forms

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus states for interactive elements
- Color contrast compliance

## 📱 Responsive Design

The application is fully responsive:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🧪 Testing

Currently no tests implemented. Planned for future releases:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Cypress

## 📈 Performance

Optimizations included:
- Code splitting by route
- Vendor chunk separation
- Gzip compression
- Asset caching (1 year)
- React Query caching
- Lazy loading of components

## 🐛 Troubleshooting

### API Connection Error
- Check `VITE_API_BASE_URL` in `.env`
- Ensure backend is running at configured URL
- Check browser console for CORS errors

### Build Error
```bash
# Clear build and node_modules
rm -rf node_modules dist

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

### Port Already in Use
Update `vite.config.js`:
```javascript
server: {
  port: 5174, // Use different port
}
```

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Material UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [React Query Documentation](https://tanstack.com/query)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1:8000` |
| `VITE_APP_NAME` | Application name | `Ethara Inventory & Order Management` |

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT

## 📞 Support

For issues or questions, please refer to:
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Detailed project documentation
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes

---

**Version:** 1.0.0  
**Last Updated:** 2024-01-XX  
**Status:** Production Ready ✅
