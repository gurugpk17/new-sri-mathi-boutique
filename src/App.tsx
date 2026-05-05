import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Story from './pages/Story';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import { WishlistProvider } from './context/WishlistContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'story', element: <Story /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'contact', element: <Contact /> },
      { path: 'admin', element: <Admin /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'wishlist', element: <Wishlist /> },
    ],
  },
]);

export default function App() {
  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  );
}
