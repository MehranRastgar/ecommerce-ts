# Modern eCommerce Platform

A full-featured eCommerce platform built with Next.js, TypeScript, and TailwindCSS.

![Storefront Preview](public/Asset12.png)

## Features

- 🛍️ Full eCommerce functionality
- 🏪 Product catalog with categories and filters
- 🔍 Advanced search capabilities
- 🛒 Shopping cart management
- 👤 User authentication and profiles
- 📱 Responsive mobile-first design
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark/Light theme support
- 🔐 Secure checkout process
- 📦 Order management

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [SWR](https://swr.vercel.app/) - Data fetching
- [MongoDB](https://www.mongodb.com/) - Database
- [React Icons](https://react-icons.github.io/react-icons/) - Icon components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ecommerce-ts.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```
NEXT_PUBLIC_BASE_API_URL=your_api_url
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── pages/            # Next.js pages
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── store/        # Redux store and slices
│   ├── types/        # TypeScript types
│   ├── hooks/        # Custom React hooks
│   └── utils/        # Utility functions
├── styles/           # Global styles
└── ...config files
```

## Key Features Implementation

### Shopping Cart

- Persistent cart storage
- Real-time price updates
- Quantity adjustments
- Remove items

### User Authentication

- Phone number verification
- OTP authentication
- User profiles
- Order history

### Product Catalog

- Product categories
- Advanced filtering
- Search functionality
- Product variants

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
