import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, Shield, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', path: '/admin/products', icon: Package },
    { name: 'Orders & Shipments', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-ivory flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-black/40 border-r border-brand-stone/20 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-1">
              Admin Operations Portal
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">PRAMO JEWELS</h2>
          </div>

          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive ? 'bg-brand-gold text-brand-charcoal' : 'text-brand-stone/80 hover:text-brand-gold'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-brand-stone/20 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-xs text-brand-gold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Customer Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
