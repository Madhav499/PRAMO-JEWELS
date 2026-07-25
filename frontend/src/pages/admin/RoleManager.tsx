import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UserCheck, Plus } from 'lucide-react';

export const RoleManager: React.FC = () => {
  const employees = [
    { id: 1, name: 'Maharaja Pramo', email: 'admin@pramojewels.com', role: 'Super Admin', permissions: 'Full Access (18 Sub-Modules)', status: 'Active' },
    { id: 2, name: 'Rajesh Sharma', email: 'rajesh@pramojewels.com', role: 'Inventory Manager', permissions: 'Products, Stock, Rates, HUID', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Employee & Role Management (RBAC)</h1>
          <p className="text-xs text-brand-stone/70">Configure fine-grained role-based permissions across admin sub-modules.</p>
        </div>
        <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Invite Employee
        </Button>
      </div>

      <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
            <tr>
              <th className="p-4">Employee Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Module Permissions</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
            {employees.map((e) => (
              <tr key={e.id} className="hover:bg-white/5">
                <td className="p-4 font-semibold text-white flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-brand-gold" /> {e.name}
                </td>
                <td className="p-4 font-mono">{e.email}</td>
                <td className="p-4"><Badge variant="gold">{e.role}</Badge></td>
                <td className="p-4">{e.permissions}</td>
                <td className="p-4"><Badge variant="sage">{e.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
