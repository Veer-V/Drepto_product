import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../lib/utils';
import { useAuth } from '../../../hooks/useAuth'; // Assuming hook exists
import { plans, Plan } from './SubscriptionPlans';


// Product Interface matching DB
interface Product {
    id: string;
    name: string;
    description: string;
    detailedDescription?: string;
    price: number;
    mrp: number;
    images: string[];
    image: string; // Computed for display
    category: string;
    ingredients?: string[];
    benefits?: string[];
    sideEffects?: string[];
    developmentStory?: string;
}

const DreptoProducts: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalQuantity, setModalQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [cartTotal, setCartTotal] = useState<{ total: number, message: string }>({ total: 0, message: '' });
    const [calculating, setCalculating] = useState(false);

    // Payment State
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | ''>('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    // Initial Load
    useEffect(() => {
        fetchProducts();

        // Sync cart from DB if possible, or load local
        const stored = localStorage.getItem('drepto_cart');
        if (stored) {
            try {
                // Format migration might be needed if structure changed, but let's assume valid
                setCart(JSON.parse(stored));
            } catch { }
        }
    }, []);

    // Save Cart & Sync with DB
    useEffect(() => {
        if (cart.length > 0) {
            calculateBackendTotal();
        } else {
            setCartTotal({ total: 0, message: '' });
        }
        localStorage.setItem('drepto_cart', JSON.stringify(cart));

        // Sync to DB with debounce
        const timer = setTimeout(() => {
            fetch('/api/cart/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart.map(c => ({ id: c.product.id, quantity: c.quantity })) })
            }).catch(e => console.error("Sync failed", e));
        }, 1000);
        return () => clearTimeout(timer);
    }, [cart, couponCode]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    // Map DB fields to UI expected fields if necessary, or just use as is
                    setProducts(data.map((p: any) => ({
                        ...p,
                        title: p.name, // UI uses title
                        image: p.images && p.images.length > 0 ? p.images[0] : '/images/placeholder.jpg',
                        ingredients: p.ingredients || ["Herbal Extracts"],
                        benefits: p.benefits || ["Fast Relief"]
                    })));
                } catch (e) { console.error("Bad JSON", text); }
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateBackendTotal = async () => {
        setCalculating(true);
        try {
            const items = cart.map(item => ({ id: item.product.id, quantity: item.quantity }));
            const res = await fetch('/api/cart/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, couponCode })
            });
            const text = await res.text();
            try {
                const data = JSON.parse(text);
                setCartTotal(data);
            } catch (e) {
                console.error("Failed to parse JSON:", text);
                if (!res.ok) console.error("Server Error:", res.status);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCalculating(false);
        }
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { product, quantity }];
        });
        setIsCartOpen(true);
    };

    const updateCartQuantity = (productId: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product.id === productId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const handleApplyCoupon = () => {
        // Just trigger calculation, useEffect handles it
        calculateBackendTotal();
    };

    const handlePayment = async () => {
        setPaymentProcessing(true);
        try {
            const items = cart.map(item => ({ id: item.product.id, quantity: item.quantity }));
            const res = await fetch('/api/orders/place', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, couponCode })
            });

            if (res.ok) {
                setPaymentSuccess(true);
                setCart([]);
                setCouponCode('');
                localStorage.removeItem('drepto_cart');
            } else {
                const err = await res.text();
                console.error("Order failed:", res.status, err);
                alert(`Payment/Order Failed (${res.status}): ${err}`);
            }
        } catch (error) {
            console.error("Order failed", error);
            alert('An error occurred.');
        } finally {
            setPaymentProcessing(false);
        }
    };

    const closeDetails = () => setSelectedProduct(null);

    if (loading) return <div className="p-10 text-center">Loading Store...</div>;

    return (
        <>
            <div className="animate-fade-in-up pb-10 relative">
                {/* Header */}
                <div className="flex items-center mb-8 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-30 py-4 border-b border-gray-100">
                    <button onClick={onBack} className="mr-4 p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">Drepto Store</h2>
                    </div>



                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-orange-500 relative transition-transform hover:scale-105"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        {cart.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Banner */}
                <div className="bg-orange-50 rounded-2xl p-8 mb-10 text-center relative overflow-hidden shadow-inner">
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-900 mb-2 relative z-10">Advanced Pain Relief</h3>
                    <p className="text-orange-800/70 relative z-10">Innovative biodegradable patches for your wellness.</p>
                    <div className="mt-4 inline-block bg-orange-100/50 px-4 py-2 rounded-lg border border-orange-200 text-orange-800 text-sm animate-pulse">
                        Use code <strong>FIRSTFREE</strong> for a free trial!
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                    {product.category}
                                </span>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold mb-1 shadow-black/50 drop-shadow-md">{product.name}</h3>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{product.description}</p>

                                <div className="mt-auto flex gap-3">
                                    <button
                                        onClick={() => { setSelectedProduct(product); setModalQuantity(1); }}
                                        className="flex-1 py-3 px-4 rounded-xl border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-50 transition-colors text-sm uppercase tracking-wide"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="flex-[2] py-3 px-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-orange-500 transition-colors shadow-lg hover:shadow-orange-200 flex items-center justify-center gap-2 group-active:scale-95"
                                    >
                                        <span>Add</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm group-hover:bg-white/30 transition-colors line-through text-gray-300 text-xs">₹{product.mrp}</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm group-hover:bg-white/30 transition-colors">₹{product.price}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODALS (Outside Animation Wrapper) --- */}

            {/* Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.2s' }}>
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col relative animate-scale-up">
                        <button onClick={closeDetails} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="h-64 sm:h-80 bg-gray-100 shrink-0 relative">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <h2 className="absolute bottom-6 left-6 text-2xl sm:text-3xl font-bold text-white shadow-sm">{selectedProduct.name}</h2>
                        </div>

                        <div className="p-8 space-y-8">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">Overview</h4>
                                <p className="text-gray-600 leading-relaxed">{selectedProduct.detailedDescription || selectedProduct.description}</p>
                            </div>

                            {selectedProduct.developmentStory && (
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Development Story</h4>
                                    <p className="text-gray-600 leading-relaxed italic border-l-4 border-orange-200 pl-4">{selectedProduct.developmentStory}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {selectedProduct.ingredients && (
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Key Ingredients</h4>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                                            {selectedProduct.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {selectedProduct.sideEffects && (
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Safety Information</h4>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                                            {selectedProduct.sideEffects.map((se, i) => <li key={i}>{se}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <span className="text-sm text-gray-500 block">Price per pack</span>
                                    <span className="text-sm text-gray-400 line-through mr-2">₹{selectedProduct.mrp}</span>
                                    <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.price}</span>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1 bg-gray-50">
                                        <button onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))} className="p-2 text-gray-500 hover:text-orange-600 transition-colors">-</button>
                                        <span className="font-bold text-gray-900 w-8 text-center">{modalQuantity}</span>
                                        <button onClick={() => setModalQuantity(modalQuantity + 1)} className="p-2 text-gray-500 hover:text-orange-600 transition-colors">+</button>
                                    </div>
                                    <button
                                        onClick={() => { addToCart(selectedProduct, modalQuantity); closeDetails(); }}
                                        className="flex-1 sm:flex-none px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-colors active:scale-95"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            {/* Subscription Option for Menstro Only */}
                            {selectedProduct.name.toLowerCase().includes('menstro') && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs uppercase tracking-wide">Subscribe & Save</span>
                                                Regular Deliveries
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">Get up to 17% off with our subscription plans.</p>
                                        </div>
                                        <button
                                            onClick={() => { setIsSubscriptionModalOpen(true); }}
                                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                                        >
                                            View Subscription Plans
                                        </button>
                                    </div>
                                </div>
                            )} // End of Subscription Option


                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer - Fixed to right side */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10">
                            <h3 className="text-xl font-bold text-gray-900">My Cart</h3>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                    <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    <p>Your cart is empty</p>
                                    <button onClick={() => setIsCartOpen(false)} className="px-6 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm">Start Shopping</button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {cart.map((item, index) => (
                                            <div key={index} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden relative">
                                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{item.product.name}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-gray-400 hover:text-red-500 p-1 -mt-1 -mr-1"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                        </button>
                                                    </div>

                                                    <div className="flex items-end justify-between mt-3">
                                                        {/* Big Quantity Controls */}
                                                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 h-10">
                                                            <button
                                                                onClick={() => updateCartQuantity(item.product.id, -1)}
                                                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-orange-600 rounded-l-xl transition-colors text-lg"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-bold text-gray-900 w-8 text-center text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateCartQuantity(item.product.id, 1)}
                                                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-orange-600 rounded-r-xl transition-colors text-lg"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <div className="text-right">
                                                            <div className="font-bold text-lg text-orange-600">₹{item.product.price * item.quantity}</div>
                                                            {item.quantity > 1 && <div className="text-[10px] text-gray-400">₹{item.product.price} each</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Coupon Section */}
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mt-6">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Apply Coupon</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                                                placeholder="Enter code"
                                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none uppercase focus:border-orange-500 transition-colors"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="px-6 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {cartTotal.message && <p className={`text-xs font-bold mt-2 ${cartTotal.total === 0 ? 'text-green-600' : 'text-orange-600'}`}>{cartTotal.message}</p>}
                                    </div>
                                </>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-white pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500 font-medium">Total Amount</span>
                                    <span className="text-3xl font-bold text-orange-600">
                                        {calculating ? '...' : `₹${cartTotal.total}`}
                                    </span>
                                </div>
                                <button
                                    onClick={() => { setIsPaymentOpen(true); setPaymentSuccess(false); setPaymentMethod(''); }}
                                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 text-lg flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.2s' }}>
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-scale-up max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsPaymentOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500 z-10">X</button>

                        {!paymentSuccess ? (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {cartTotal.total === 0 ? 'Complete Your Order' : 'Secure Checkout'}
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex justify-between items-center">
                                    <span className="font-medium text-gray-600">Total Payable</span>
                                    <span className="text-2xl font-bold text-gray-900">₹{cartTotal.total}</span>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Select Payment Method</label>
                                    {(['UPI', 'Card', 'COD'] as const).map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setPaymentMethod(m)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${paymentMethod === m ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <span className="font-bold">{m}</span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={(!paymentMethod && cartTotal.total > 0) || paymentProcessing}
                                    onClick={handlePayment}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${((paymentMethod || cartTotal.total === 0) && !paymentProcessing) ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    {paymentProcessing ? 'Processing...' : (cartTotal.total === 0 ? 'Place Order (Free) 🎁' : 'Pay Now')}
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                                <p className="text-gray-500 mb-8 max-w-[260px] mx-auto">
                                    You have successfully placed your order. Thank you for choosing Drepto!
                                </p>
                                <button
                                    onClick={() => { setIsPaymentOpen(false); setIsCartOpen(false); setPaymentSuccess(false); }}
                                    className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Subscription Selection Modal */}
            {isSubscriptionModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-scale-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsSubscriptionModalOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500 z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Subscribe to {selectedProduct.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Select a plan to start your subscription</p>
                        </div>

                        <div className="space-y-3">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    onClick={async () => {
                                        if (confirm(`Confirm subscription for ${plan.name} (${plan.price})?`)) {
                                            setLoading(true);
                                            try {
                                                const res = await fetch('/api/subscription', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ plan: plan.name })
                                                });
                                                if (res.ok) {
                                                    alert(`Successfully subscribed to ${plan.name} Plan!`);
                                                    setIsSubscriptionModalOpen(false);
                                                } else {
                                                    alert('Subscription failed. Please try again.');
                                                }
                                            } catch (e) {
                                                alert('Error processing subscription');
                                            } finally {
                                                setLoading(false);
                                            }
                                        }
                                    }}
                                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 flex items-center justify-between ${plan.recommended ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                                >
                                    {plan.recommended && (
                                        <span className="absolute -top-3 left-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                            {plan.name === '6 Months' ? 'Most Popular' : 'Best Value'}
                                        </span>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-gray-900">{plan.name}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{plan.features[0]} • {plan.features[2]}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-orange-600">{plan.price}</div>
                                        <div className="text-[10px] text-gray-400 line-through">Regular</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DreptoProducts;
