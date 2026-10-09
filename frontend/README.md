# Mini Lab Frontend - React + Vite

A mobile-first React application for the Mini Lab e-commerce store.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
- `VITE_API_BASE_URL=http://localhost:8085/api`
- `VITE_RAZORPAY_KEY=your_razorpay_key_here`

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── CartView.jsx
│   ├── AddressForm.jsx
│   ├── PaymentPage.jsx
│   └── ...
├── pages/               # Page components
│   └── ProductsPage.jsx
├── data/                # Static data
│   └── products.jsx
├── App.jsx              # Main component
├── main.jsx             # Vite entry point
└── index.css            # Global styles + Tailwind

public/                  # Static assets
├── favicon.ico
└── ...

index.html              # HTML template
```

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Key Features

- ✅ Mobile-first design (320px-480px optimized)
- ✅ User authentication flow
- ✅ Product catalog with search and filtering
- ✅ Shopping cart management
- ✅ Checkout with address form
- ✅ Razorpay payment integration
- ✅ Order management
- ✅ Responsive design with Tailwind CSS

## Technologies

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 7
- Axios (HTTP client)

## Mobile Optimizations

- Responsive design from 320px
- Touch-friendly buttons (44px minimum)
- Optimized for iOS and Android
- Safe area inset support for notched devices
- Reduced motion preferences respected

## API Integration

The frontend communicates with the backend API:

```javascript
// API calls use Axios
const response = await fetch('http://localhost:8085/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: email, password })
});
```

Base URL: `http://localhost:8085/api`

### Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /orders` - Place order
- `GET /products` - Fetch products

## Authentication

- Client-side user state management
- localStorage for persistence
- Session-based auth with backend

## Styling

- Tailwind CSS for utility styles
- CSS custom properties for design tokens
- Mobile-first breakpoints:
  - 320px - 480px (mobile)
  - 768px+ (md: breakpoint)
  - 1024px+ (lg: breakpoint)

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### API connection fails
- Ensure backend is running: `http://localhost:8085`
- Check `.env.local` has correct `VITE_API_BASE_URL`
- Check browser Network tab for CORS errors

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Vite provides fast HMR (Hot Module Replacement)
- Optimized production build with code splitting
- Tree-shaking removes unused code

## Deployment

### Deploy to Vercel (Recommended for Vite)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build first
npm run build

# Deploy dist/ folder via Netlify UI or CLI
netlify deploy --prod --dir=dist
```

### Deploy to Static Hosting (S3, GitHub Pages, etc.)

1. Build: `npm run build`
2. Upload `dist/` folder to your hosting
3. Configure environment variable `VITE_API_BASE_URL` to your backend URL

## Development Tips

- Use React DevTools browser extension for debugging
- Check Network tab for API calls
- Use console for debugging
- Hot reload works for most changes
- Full page reload needed for some config changes

## Related

- Backend: See `../backend/README.md`
- Main project: See `../README.md`

