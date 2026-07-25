import React from 'react';
import { Button } from '@/components/ui/Button';
import { FileText, Save } from 'lucide-react';

export const CmsManager: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Homepage & Knowledge Base CMS</h1>
        <p className="text-xs text-brand-stone/70">Manage narrative storytelling sections, banners, and educational buying guides.</p>
      </div>

      <div className="p-6 bg-white/5 border border-brand-stone/20 space-y-4 text-xs">
        <h3 className="font-serif text-lg font-semibold text-white">Homepage Narrative Banner</h3>
        <div>
          <label className="text-brand-stone block mb-1">Hero Title</label>
          <input
            type="text"
            defaultValue="Pure Gold & Silver Haute Joaillerie."
            className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white font-serif text-sm"
          />
        </div>

        <div>
          <label className="text-brand-stone block mb-1">Brand Legacy Story</label>
          <textarea
            rows={3}
            defaultValue="Founded on unyielding integrity, Pramo Jewels has served over four decades as the trusted custodian for royal families, gold investors, and wedding buyers across India."
            className="w-full p-2.5 bg-black/60 border border-brand-stone/40 text-white"
          />
        </div>

        <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
          Save CMS Content Changes
        </Button>
      </div>
    </div>
  );
};
