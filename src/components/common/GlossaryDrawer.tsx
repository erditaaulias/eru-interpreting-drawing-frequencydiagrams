import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/lessonData';
import { X, Search, BookOpen, Layers, Hash, Ruler, Crosshair, BarChart2, TrendingUp, Award, Grid } from 'lucide-react';

interface GlossaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  showIdHint: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="w-5 h-5 text-[#CA8A04]" />,
  Layers: <Layers className="w-5 h-5 text-[#CA8A04]" />,
  Hash: <Hash className="w-5 h-5 text-[#18181B]" />,
  Crosshair: <Crosshair className="w-5 h-5 text-[#CA8A04]" />,
  BarChart2: <BarChart2 className="w-5 h-5 text-[#CA8A04]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#CA8A04]" />,
  Award: <Award className="w-5 h-5 text-[#CA8A04]" />,
  Grid: <Grid className="w-5 h-5 text-[#18181B]" />,
};

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({
  isOpen,
  onClose,
  showIdHint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(
    item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.termId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cambridgeDefinitionEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l-2 border-[#18181B]">
        {/* Header */}
        <div className="p-5 border-b-2 border-[#18181B] bg-gradient-to-r from-[#FACC15] via-[#FDE047] to-[#FEF08A] text-[#18181B] flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white border-2 border-[#18181B] shadow-xs flex items-center justify-center text-[#18181B]">
              <BookOpen className="w-5 h-5 text-[#CA8A04]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#18181B] text-lg">Cambridge Math Glossary</h3>
              <p className="text-xs text-[#18181B]/80 font-bold">Stage 8 • Bilingual EN &amp; ID</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#18181B] border border-[#18181B] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close glossary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100 bg-[#FFFDF5]">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Cambridge key terms..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-[#18181B]/20 text-xs text-[#18181B] font-bold focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {filtered.map(item => (
            <div
              key={item.term}
              className="bg-[#FFFDF5] rounded-2xl p-4 border-2 border-[#EAB308]/30 hover:border-[#EAB308] transition-shadow shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-white shadow-xs border border-gray-100">
                    {iconMap[item.iconName] || <BookOpen className="w-4 h-4 text-[#CA8A04]" />}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-[#18181B] text-sm leading-tight">{item.term}</h4>
                    <span className="text-[11px] font-black text-[#B45309]">
                      🇮🇩 {item.termId}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#18181B] leading-relaxed mb-2 font-medium">
                {item.cambridgeDefinitionEn}
              </p>

              <div className="p-2 rounded-xl bg-[#FEF9C3] border border-[#EAB308] text-[11px] text-[#18181B] italic mb-1.5 font-semibold">
                🇮🇩 {item.definitionId}
              </div>

              <div className="text-[11px] text-[#52525B] font-sans">
                <strong className="text-[#854D0E]">e.g. </strong>
                {item.example}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-xs">
              No matching mathematical terms found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
