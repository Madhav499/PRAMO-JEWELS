import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Layers, Bookmark, TrendingUp, Boxes, ShoppingCart,
  Users, MessageSquare, Tag, Truck, CreditCard, RotateCcw, ShieldCheck,
  FileText, BookOpen, UserCheck, ShieldAlert, Settings, Database, ArrowLeft
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuGroups = [
    {
      group: 'Core Operations',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Product Catalog', path: '/admin/products', icon: Package },
        { name: 'Category Manager', path: '/admin/categories', icon: Layers },
        { name: 'Collections', path: '/admin/collections', icon: Bookmark },
        { name: 'Gold & Silver Rates', path: '/admin/rates', icon: TrendingUp },
        { name: 'Inventory Control', path: '/admin/inventory', icon: Boxes },
      ],
    },
    {
      group: 'Commerce & Logistics',
      items: [
        { name: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Customer Profiles', path: '/admin/customers', icon: Users },
        { name: 'Reviews & Ratings', path: '/admin/reviews', icon: MessageSquare },
        { name: 'Coupons & Offers', path: '/admin/coupons', icon: Tag },
        { name: 'Shipping & AWB', path: '/admin/shipping', icon: Truck },
        { name: 'Payment Audit Logs', path: '/admin/payments', icon: CreditCard },
        { name: 'Returns & Buybacks', path: '/admin/returns', icon: RotateCcw },
      ],
    },
    {
      group: 'Compliance & Enterprise CMS',
      items: [
        { name: 'BIS Hallmark & HUID', path: '/admin/hallmark', icon: ShieldCheck },
        { name: 'Homepage CMS', path: '/admin/cms-homepage', icon: FileText },
        { name: 'Knowledge Base CMS', path: '/admin/cms-kb', icon: BookOpen },
        { name: 'Employee RBAC Roles', path: '/admin/roles', icon: UserCheck },
        { name: 'System Audit Logs', path: '/admin/audit', icon: ShieldAlert },
        { name: 'Settings & Backups', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-ivory flex flex-col lg:flex-row">
      {/* 18 Submodule Enterprise Sidebar */}
      <aside className="w-full lg:w-72 bg-black/60 border-r border-brand-stone/20 p-6 flex flex-col justify-between shrink-0 max-h-screen overflow-y-auto">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-1">
              Enterprise Operations Suite
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">PRAMO JEWELS</h2>
          </div>

          <nav className="space-y-6">
            {menuGroups.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-brand-stone/40 font-semibold px-2 block mb-1">
                  {grp.group}
                </span>
                {grp.items.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-wider font-semibold transition-colors rounded-none ${
                        isActive
                          ? 'bg-brand-gold text-brand-charcoal font-bold'
                          : 'text-brand-stone/80 hover:text-brand-gold hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-brand-stone/20 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-xs text-brand-gold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
