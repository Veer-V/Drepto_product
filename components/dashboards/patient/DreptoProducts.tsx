import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../lib/utils';

// Product Data Type
interface Product {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    price: number;
    image: string;
    category: string;
    ingredients: string[];
    benefits: string[];
}

const PRODUCTS: Product[] = [
    {
        id: 1,
        title: "Drepto MenstroHerb Sheet",
        description: "For relief from cramps during those difficult days. 12 Hours, Ultimate Comfort, Instant Relief, 100% Herbal.",
        detailedDescription: "The Drepto MenstroHerb Sheet is a powerful herbal pain-relieving patch designed as a sophisticated and safe method for treating pain and inflammation. It is a Supreme Strength patch intended for use on the external skin (transdermal delivery). The sheet contains active ingredients that provide relief for 12 hours. Unique transdermal system delivers medicine directly through the skin, starting to work within 10 minutes of application.",
        price: 10,
        image: "/images/products/menstroherb.jpg",
        category: "Pain Relief",
        ingredients: ["Methyl Salicylate", "Menthol", "Camphor", "Boswellia", "Eucalyptus Oil"],
        benefits: ["12 Hours Relief", "Instant Comfort", "100% Herbal", "No Gastric Irritation", "Clean & Discreet"]
    },
    {
        id: 2,
        title: "Drepto Biodevice Aryasoothe Pad",
        description: "India's First Pain Killer Patch. Supreme Strength for Stiff Neck, Rheumatoid Arthritis, Sore Shoulder, Osteoarthritis.",
        detailedDescription: "Introducing the most sophisticated and safest method of treating pain and inflammation. The Aryasoothe patch uses traditional Ayurvedic ingredients backed by modern biotech. It provides instant cooling relief, numbs pain receptors, and reduces discomfort. The breathable adhesive is hypoallergenic and suitable for all skin types.",
        price: 10,
        image: "/images/products/aryasoothe.jpg",
        category: "Pain Relief",
        ingredients: ["Boswellia", "Eucalyptus Oil", "Methyl Salicylate", "Menthol", "Camphor", "Nirgundi Extract (Optional)"],
        benefits: ["Instant Cooling Relief", "Long-Lasting Action (8-12 Hours)", "Reduces Muscle & Joint Pain", "Improves Micro-circulation", "Non-Greasy & Mess-Free"]
    }
];

const DreptoProducts: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    // State
    const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalQuantity, setModalQuantity] = useState(1);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [showDiscountPopup, setShowDiscountPopup] = useState(false);

    // Payment State
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | ''>('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Load Cart
    useEffect(() => {
        try {
            const stored = localStorage.getItem('drepto_cart');
            if (stored) {
                setCart(JSON.parse(stored));
            }
        } catch { }
    }, []);

    // Save Cart
    useEffect(() => {
        localStorage.setItem('drepto_cart', JSON.stringify(cart));
    }, [cart]);

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

    const updateCartQuantity = (productId: number, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product.id === productId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
        if (cart.length <= 1) setDiscountApplied(false);
    };

    const calculateTotal = () => {
        let total = 0;
        let discountUsed = false;

        cart.forEach((item) => {
            let itemPrice = item.product.price;
            for (let i = 0; i < item.quantity; i++) {
                if (discountApplied && !discountUsed) {
                    total += 5;
                    discountUsed = true;
                } else {
                    total += itemPrice;
                }
            }
        });
        return total;
    };

    const handleApplyCoupon = () => {
        if (couponCode.trim().toUpperCase() === 'DREPTO50' || couponCode.trim().length > 0) {
            setDiscountApplied(true);
            setShowDiscountPopup(true);
            setTimeout(() => setShowDiscountPopup(false), 3000);
        }
    };

    const handlePayment = () => {
        setPaymentProcessing(true);
        setTimeout(() => {
            setPaymentProcessing(false);
            setPaymentSuccess(true);
            // Clear cart
            setCart([]);
            setDiscountApplied(false);
            setCouponCode('');
        }, 2000);
    };

    const closeDetails = () => setSelectedProduct(null);

    return (
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
                    Use code <strong>DREPTO50</strong> for special discounts!
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {PRODUCTS.map(product => (
                    <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col h-full">
                        <div className="relative h-64 overflow-hidden bg-gray-100">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                {product.category}
                            </span>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold mb-1 shadow-black/50 drop-shadow-md">{product.title}</h3>
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
                                    <span>Add to Cart</span>
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm group-hover:bg-white/30 transition-colors">₹{product.price}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative animate-scale-up">
                        <button onClick={closeDetails} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="h-64 sm:h-80 bg-gray-100 shrink-0 relative">
                            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <h2 className="absolute bottom-6 left-6 text-2xl sm:text-3xl font-bold text-white shadow-sm">{selectedProduct.title}</h2>
                        </div>

                        <div className="p-8 space-y-8">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Overview
                                </h4>
                                <p className="text-gray-600 leading-relaxed">{selectedProduct.detailedDescription}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Key Benefits
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedProduct.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                        Ingredients
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProduct.ingredients.map((ing, i) => (
                                            <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <span className="text-sm text-gray-500 block">Price per pack</span>
                                    <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.price}</span>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1 bg-gray-50">
                                        <button
                                            onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                                            className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                        </button>
                                        <span className="font-bold text-gray-900 w-8 text-center">{modalQuantity}</span>
                                        <button
                                            onClick={() => setModalQuantity(modalQuantity + 1)}
                                            className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => { addToCart(selectedProduct, modalQuantity); closeDetails(); }}
                                        className="flex-1 sm:flex-none px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors transform active:scale-95 whitespace-nowrap"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer & Payment */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                My Cart
                            </h3>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    </div>
                                    <p className="text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {cart.map((item, index) => (
                                            <div key={index} className="flex gap-4 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm">
                                                <img src={item.product.image} alt={item.product.title} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 text-sm line-clamp-2">{item.product.title}</h4>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-1">
                                                            <button
                                                                onClick={() => updateCartQuantity(item.product.id, -1)}
                                                                className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                                            </button>
                                                            <span className="font-bold text-gray-900 w-6 text-center text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateCartQuantity(item.product.id, 1)}
                                                                className="p-1.5 text-gray-500 hover:text-green-600 transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-orange-600 font-bold">₹{item.product.price * item.quantity}</div>
                                                            <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Coupon Section */}
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Apply Coupon</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={e => setCouponCode(e.target.value)}
                                                disabled={discountApplied}
                                                placeholder="Enter code"
                                                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={discountApplied || !couponCode}
                                                className="px-4 py-2 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {discountApplied ? 'Applied' : 'Apply'}
                                            </button>
                                        </div>
                                        {discountApplied && (
                                            <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                Coupon Applied! One item reduced to ₹5.
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-white">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-500 font-medium">Total Amount</span>
                                    <div className="text-right">
                                        {discountApplied ? (
                                            <>
                                                <span className="text-sm text-gray-400 line-through block font-medium">₹{cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)}</span>
                                                <span className="text-3xl font-bold text-orange-600">₹{calculateTotal()}</span>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-bold text-gray-900">₹{calculateTotal()}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setIsPaymentOpen(true); setPaymentSuccess(false); setPaymentMethod(''); }}
                                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 text-lg"
                                >
                                    Checkout Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-scale-up">
                        <button onClick={() => setIsPaymentOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {!paymentSuccess ? (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Secure Checkout</h3>
                                <p className="text-sm text-gray-500 mb-6">Complete your purchase securely.</p>

                                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex justify-between items-center">
                                    <span className="font-medium text-gray-600">Total Payable</span>
                                    <span className="text-2xl font-bold text-gray-900">₹{calculateTotal()}</span>
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
                                            {paymentMethod === m && <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={!paymentMethod || paymentProcessing}
                                    onClick={handlePayment}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${paymentMethod ? 'bg-gray-900 hover:bg-gray-800 shadow-gray-200' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    {paymentProcessing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Processing...
                                        </span>
                                    ) : 'Pay Now'}
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                                <p className="text-gray-500 mb-8 max-w-[260px] mx-auto">Your payment was successful and your order has been placed.</p>
                                <button
                                    onClick={() => { setIsPaymentOpen(false); setIsCartOpen(false); setPaymentSuccess(false); }}
                                    className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Discount Success Popup */}
            {showDiscountPopup && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-green-500 flex flex-col items-center text-center animate-bounce-in max-w-sm">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                        <p className="text-gray-600 font-medium">You have received this discount.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DreptoProducts;
