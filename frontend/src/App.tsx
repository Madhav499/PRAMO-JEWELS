import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/features/CartDrawer';
import { SearchModal } from '@/components/features/SearchModal';
import { HallmarkVerifierModal } from '@/components/features/HallmarkVerifierModal';
import { RingSizeVisualizerModal } from '@/components/features/RingSizeVisualizerModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

// Pages
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { CustomerDashboard } from '@/pages/CustomerDashboard';
import { GoldPurityGuide } from '@/pages/GoldPurityGuide';
import { GemstoneGuide } from '@/pages/GemstoneGuide';

// Admin Pages
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ProductManager } from '@/pages/admin/ProductManager';
import { CategoryManager } from '@/pages/admin/CategoryManager';
import { RateManager } from '@/pages/admin/RateManager';
import { OrderManager } from '@/pages/admin/OrderManager';
import { HallmarkManager } from '@/pages/admin/HallmarkManager';
import { CmsManager } from '@/pages/admin/CmsManager';
import { AuditSettingsManager } from '@/pages/admin/AuditSettingsManager';

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-ivory text-brand-charcoal">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Customer Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/gold-purity-guide" element={<GoldPurityGuide />} />
          <Route path="/gemstone-guide" element={<GemstoneGuide />} />

          {/* 18-Submodule Enterprise Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="collections" element={<CategoryManager />} />
            <Route path="rates" element={<RateManager />} />
            <Route path="inventory" element={<ProductManager />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="customers" element={<CustomerDashboard />} />
            <Route path="reviews" element={<ProductManager />} />
            <Route path="coupons" element={<CartDrawer />} />
            <Route path="shipping" element={<OrderManager />} />
            <Route path="payments" element={<OrderManager />} />
            <Route path="returns" element={<OrderManager />} />
            <Route path="hallmark" element={<HallmarkManager />} />
            <Route path="cms-homepage" element={<CmsManager />} />
            <Route path="cms-kb" element={<CmsManager />} />
            <Route path="roles" element={<AuditSettingsManager />} />
            <Route path="audit" element={<AuditSettingsManager />} />
            <Route path="settings" element={<AuditSettingsManager />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <HallmarkVerifierModal />
      <RingSizeVisualizerModal />
      <ToastContainer />
    </div>
  );
};

export default App;
