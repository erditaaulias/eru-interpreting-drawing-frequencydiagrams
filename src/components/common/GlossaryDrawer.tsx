import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/lessonData';
import { X, Search, BookOpen, Layers, Hash, Ruler, Crosshair, BarChart2, TrendingUp, Award, Grid } from 'lucide-react';

interface GlossaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  showIdHint: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="w-5 h-5 text-[#8B5CF6]" />,
  Layers: <Layers className="w-5 h-5 text-[#EC4899]" />,
  Hash: <Hash className="w-5 h-5 text-[#F59E0B]" />,
  Crosshair: <Crosshair className="w-5 h-5 text-[#10B981]" />,
  BarChart2: <BarChart2 className="w-5 h-5 text-[#6366F1]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#14B8A6]" />,
  Award: <Award className="w-5 h-5 text-[#F97316]" />,
  Grid: <Grid className="w-5 h-5 text-[#A855F7]" />,
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-[#DDD6FE]">
        {/* Header */}
        <div className="p-5 border-b border-[#EDE9FE] bg-gradient-to-r from-[#EDE9FE] to-[#FCE7F3] flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#7C3AED]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#4C1D95] text-lg">Cambridge Math Glossary</h3>
              <p className="text-xs text-[#7C3AED] font-semibold">Stage 8 • Bilingual EN &amp; ID</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#4C1D95] flex items-center justify-center transition-colors"
            aria-label="Close glossary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#F3E8FF]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A78BFA] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Cambridge key terms..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] text-xs text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {filtered.map(item => (
            <div
              key={item.term}
              className="bg-[#FAF5FF] rounded-2xl p-4 border border-[#E9D5FF] hover:border-[#C4B5FD] transition-shadow shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-white shadow-xs">
                    {iconMap[item.iconName] || <BookOpen className="w-4 h-4 text-[#7C3AED]" />}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#4C1D95] text-sm leading-tight">{item.term}</h4>
                    <span className="text-[11px] font-semibold text-[#0D9488]">
                      🇮🇩 {item.termId}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#374151] leading-relaxed mb-2 font-medium">
                {item.cambridgeDefinitionEn}
              </p>

              <div className="p-2 rounded-xl bg-white/90 border border-[#DDD6FE] text-[11px] text-[#5B21B6] italic mb-1.5">
                🇮🇩 {item.definitionId}
              </div>

              <div className="text-[11px] text-[#6B7280] font-sans">
                <strong className="text-[#7C3AED]">e.g. </strong>
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
