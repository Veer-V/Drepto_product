import React, { useEffect, useState } from 'react';
import MobileHeader from './MobileHeader';
import { useAuth } from '../../hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  images: string[];
}

const MobileProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [coupon, setCoupon] = useState('');
  const [cartTotal, setCartTotal] = useState<{
    total: number;
    message: string;
  } | null>(null);
  const [calculating, setCalculating] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/shop?action=products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id: string) => {
    const newCart = [...cart, { id, quantity: 1 }];
    setCart(newCart);

    // Sync to DB
    try {
      await fetch('/api/shop?action=sync-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: newCart }),
      });
    } catch (e) {
      console.error('Failed to sync cart', e);
    }

    alert('Added to cart');
  };

  const handleCheckout = async () => {
    setCalculating(true);
    try {
      // First calculate to show user
      const res = await fetch('/api/shop?action=calculate-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, couponCode: coupon }),
      });
      const data = await res.json();
      setCartTotal(data);

      // If total is 0 or user confirms, place order
      if (
        data.total === 0 ||
        window.confirm(`Place order for ₹${data.total}?`)
      ) {
        const orderRes = await fetch('/api/shop?action=place-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart, couponCode: coupon }),
        });
        if (orderRes.ok) {
          alert('Order placed successfully!');
          setCart([]);
          setCartTotal(null);
          setCoupon('');
        } else {
          alert('Failed to place order.');
        }
      }
    } catch (error) {
      console.error('Checkout failed', error);
    } finally {
      setCalculating(false);
    }
  };

  if (loading)
    return <div className="p-4 text-center">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Drepto Products" />

      {/* Coupon Section */}
      <div className="p-4 bg-white shadow-sm mb-4">
        <h3 className="font-bold mb-2">Cart & Coupons</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter Coupon (e.g. FIRSTFREE)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleCheckout}
            disabled={calculating || cart.length === 0}
            className="bg-primary text-white px-4 py-2 rounded font-bold disabled:opacity-50"
          >
            Apply
          </button>
        </div>
        {cartTotal && (
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="font-bold text-lg">Total Pay: ₹{cartTotal.total}</p>
            <p className="text-sm text-green-700">{cartTotal.message}</p>
          </div>
        )}
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {products.length === 0 && (
          <p className="col-span-2 text-center text-gray-500">
            No products available.
          </p>
        )}
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center"
          >
            <img
              src={
                prod.images && prod.images.length > 0
                  ? prod.images[0]
                  : `https://placehold.co/200x200?text=${prod.name}`
              }
              alt={prod.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <h3 className="font-bold text-gray-800 text-sm mb-1">
              {prod.name}
            </h3>
            <div className="flex items-center gap-2 justify-center">
              <p className="text-gray-400 line-through text-xs">₹{prod.mrp}</p>
              <p className="text-primary font-bold">₹{prod.price}</p>
            </div>
            <button
              onClick={() => addToCart(prod.id)}
              className="mt-3 w-full bg-teal-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-teal-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProducts;
