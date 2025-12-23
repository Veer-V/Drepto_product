
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}> = ({ title, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} p-3 rounded-xl shadow-md active:scale-95 transition-transform duration-200 flex flex-col items-center justify-center h-28 text-center relative overflow-hidden`}
  >
    <div className="text-white mb-2 opacity-90">{icon}</div>
    <h3 className="font-bold text-white text-xs leading-tight">{title}</h3>
  </button>
);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  images: string[];
}

const MobileHome: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { title: 'Patient Login', color: 'bg-gradient-to-br from-emerald-400 to-emerald-600', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, action: () => navigate('/auth') },
    { title: 'Drepto Store', color: 'bg-gradient-to-br from-orange-400 to-orange-600', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>, action: () => navigate('/mobile/products') },
    { title: 'About Us', color: 'bg-gradient-to-br from-blue-400 to-blue-600', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, action: () => navigate('/about-us') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header + Search */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-500 text-xs font-medium">Welcome to</p>
            <h1 className="text-xl font-bold text-dark-blue">Drepto Biodevices</h1>
          </div>
          <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Drepto products..."
            className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4">
        <div className="bg-[#0f3460] rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-xs opacity-90 font-semibold uppercase tracking-wider mb-1">New Launch</p>
            <h2 className="text-xl font-bold mb-3">MenstroHerb Relief Sheet</h2>
            <button onClick={() => navigate('/mobile/products')} className="bg-white text-[#0f3460] text-xs font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card, i) => (
            <MobileCard key={i} title={card.title} color={card.color} onClick={card.action} icon={card.icon} />
          ))}
        </div>
      </div>

      {/* Drepto Products */}
      <section className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Drepto Store</h2>
          <button onClick={() => navigate('/mobile/products')} className="text-xs text-primary font-bold">See all</button>
        </div>
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[160px] h-48 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4">
            {products.map((p) => (
              <div key={p.id} onClick={() => navigate('/mobile/products')} className="min-w-[170px] snap-start bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                  <img src={p.images && p.images.length > 0 ? p.images[0] : `https://placehold.co/200x200?text=${p.name}`} alt={p.name} className="h-24 w-24 object-contain hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">₹{p.price}</span>
                  <span className="text-[10px] text-gray-400 line-through">₹{p.mrp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Drepto Strip */}
      <div className="px-4 mt-8">
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-emerald-800 text-xs font-medium leading-tight">
            Our patches are 100% Herbal and Bio-degradable, providing non-invasive pain relief for 12+ hours.
          </p>
        </div>
      </div>
    </div>
  );
};


export default MobileHome;

