import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const HallmarkVerifierModal: React.FC = () => {
  const { isHallmarkVerifierOpen, toggleHallmarkVerifier } = useUIStore();
  const [huidCode, setHuidCode] = useState('');
  const [result, setResult] = useState<any | null>(null);

  if (!isHallmarkVerifierOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!huidCode.trim()) return;

    // Simulate official BIS HUID / IGI verification lookup
    setResult({
      huid: huidCode.toUpperCase(),
      purity: '22K Gold (916 BIS Hallmark)',
      assayer: 'Government Assaying & Hallmarking Centre #108, Jaipur',
      centerCode: 'AHC-RJ-2026-09',
      dateVerified: '2026-01-15',
      status: 'VERIFIED_GENUINE',
      certifiedBy: 'Bureau of Indian Standards (BIS)',
    });
  };

  return (
    <Modal
      isOpen={isHallmarkVerifierOpen}
      onClose={() => {
        setResult(null);
        toggleHallmarkVerifier(false);
      }}
      title="BIS Hallmark HUID & Certificate Verifier"
      maxWidth="lg"
    >
      <div className="space-y-6">
        <p className="text-xs text-brand-slate leading-relaxed">
          Pramo Jewels provides 100% transparent authenticity. Enter the 6-digit alphanumeric HUID (Hallmark Unique Identification) stamped on your jewellery or IGI/GIA certificate number below.
        </p>

        <form onSubmit={handleVerify} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter HUID (e.g. BIS-HUID-JP-77120)"
            value={huidCode}
            onChange={(e) => setHuidCode(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white border border-brand-stone text-xs font-mono uppercase focus:outline-none focus:border-brand-gold"
          />
          <Button type="submit" size="sm" variant="primary" leftIcon={<ShieldCheck className="w-4 h-4" />}>
            Verify
          </Button>
        </form>

        {result && (
          <div className="p-5 bg-brand-sage/10 border border-brand-sage/40 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-brand-sage font-serif font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Official Genuine Authenticity Verified</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-brand-charcoal pt-2 border-t border-brand-sage/20">
              <div>
                <span className="text-brand-slate block text-[10px] uppercase">HUID Code</span>
                <span className="font-mono font-bold">{result.huid}</span>
              </div>
              <div>
                <span className="text-brand-slate block text-[10px] uppercase">Certified Purity</span>
                <span className="font-semibold">{result.purity}</span>
              </div>
              <div>
                <span className="text-brand-slate block text-[10px] uppercase">Assaying Centre</span>
                <span>{result.assayer}</span>
              </div>
              <div>
                <span className="text-brand-slate block text-[10px] uppercase">Regulatory Body</span>
                <span className="font-semibold">{result.certifiedBy}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
