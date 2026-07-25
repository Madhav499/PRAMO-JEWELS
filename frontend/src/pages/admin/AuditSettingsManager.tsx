import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Database, Download } from 'lucide-react';

export const AuditSettingsManager: React.FC = () => {
  const auditLogs = [
    { id: 1, actor: 'Maharaja Pramo (Admin)', action: 'UPDATE_METAL_RATE', entity: 'Spot 22K Gold', ip: '103.22.41.8', timestamp: '2026-07-25 10:30:15' },
    { id: 2, actor: 'Inventory Manager', action: 'STOCK_ADJUSTMENT', entity: 'PJ-GLD-NCK-01', ip: '103.22.41.9', timestamp: '2026-07-25 09:12:00' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">System Audit Logs & Backup Recovery</h1>
        <p className="text-xs text-brand-stone/70">Role-based access logs, database backup policies, and system settings.</p>
      </div>

      {/* Backup Section */}
      <div className="p-6 bg-white/5 border border-brand-stone/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="w-8 h-8 text-brand-gold" />
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">Automated Relational Database Backup</h3>
            <p className="text-xs text-brand-stone/70">Last automated snapshot created at 2026-07-25 00:00:00 UTC.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Download Instant SQL Backup
        </Button>
      </div>

      {/* Audit Logs Table */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-semibold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-brand-gold" /> Security Activity Audit Stream
        </h3>

        <div className="bg-white/5 border border-brand-stone/20 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 text-brand-gold uppercase tracking-wider text-[10px] border-b border-brand-stone/20">
              <tr>
                <th className="p-4">Actor</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-stone/10 text-brand-stone/90">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5">
                  <td className="p-4 font-semibold text-white">{log.actor}</td>
                  <td className="p-4"><Badge variant="gold">{log.action}</Badge></td>
                  <td className="p-4 font-mono">{log.entity}</td>
                  <td className="p-4 font-mono text-brand-stone/70">{log.ip}</td>
                  <td className="p-4 font-mono">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
