import React from 'react';
import { Star, BookOpen, GraduationCap, Globe, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeSection: number;
  onNavigate: (sectionId: number) => void;
  showIdHint: boolean;
  onToggleIdHint: () => void;
  onOpenGlossary: () => void;
  onOpenTeacherMode: () => void;
  totalStars: number;
  completedSections: number[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  showIdHint,
  onToggleIdHint,
  onOpenGlossary,
  onOpenTeacherMode,
  totalStars,
  completedSections,
}) => {
  const sections = [
    { id: 1, label: 'Goals', fullLabel: '1. Welcome & Goals' },
    { id: 2, label: 'Real Life', fullLabel: '2. Real-Life Data' },
    { id: 3, label: 'Concept', fullLabel: '3. Core Concepts' },
    { id: 4, label: 'Drawing', fullLabel: '4. How to Draw' },
    { id: 5, label: 'Interpreting', fullLabel: '5. Interpreting' },
    { id: 6, label: 'Practice', fullLabel: '6. Practice Zone' },
    { id: 7, label: 'Summary', fullLabel: '7. Exit Ticket' },
  ];

  const progressPercent = Math.round((completedSections.length / 7) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E9D5FF] shadow-xs">
      {/* Top utility row */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate(1)}
          className="cursor-pointer flex items-center gap-2 select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-black text-sm shadow-xs">
            16.1
          </div>
          <div>
            <h1 className="font-extrabold text-[#4C1D95] text-xs sm:text-sm tracking-tight leading-none">
              Frequency Diagrams
            </h1>
            <span className="text-[10px] text-[#7C3AED] font-semibold">
              Cambridge Stage 8 Math
            </span>
          </div>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2">
          {/* Star Counter */}
          <div className="hidden sm:flex items-center gap-1 bg-[#FEF3C7] px-2.5 py-1 rounded-xl border border-[#FDE68A] text-xs font-black text-[#92400E]">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{totalStars} / 3 Stars</span>
          </div>

          {/* Bahasa Indonesia Hint Toggle */}
          <button
            onClick={onToggleIdHint}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 shadow-xs ${
              showIdHint
                ? 'bg-[#CCFBF1] text-[#0F766E] border-[#14B8A6] ring-1 ring-[#14B8A6]'
                : 'bg-white text-[#7C3AED] border-[#DDD6FE] hover:bg-[#FAF5FF]'
            }`}
            title="Toggle Bahasa Indonesia translations and hints"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-black">ID</span>
            <span className="text-[10px] hidden md:inline">{showIdHint ? 'Hints ON' : 'Hints OFF'}</span>
          </button>

          {/* Glossary Drawer Toggle */}
          <button
            onClick={onOpenGlossary}
            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FAF5FF] hover:bg-[#EDE9FE] text-[#4C1D95] border border-[#DDD6FE] transition-colors flex items-center gap-1 shadow-xs"
            title="Open Math Glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* Teacher Mode Toggle */}
          <button
            onClick={onOpenTeacherMode}
            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white hover:bg-[#FAF5FF] text-[#6D28D9] border border-[#C4B5FD] transition-colors flex items-center gap-1 shadow-xs"
            title="Open Teacher Dashboard, Lesson Timings & Answers"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="hidden sm:inline">Teacher</span>
          </button>
        </div>
      </div>

      {/* Section Nav Bar */}
      <div className="max-w-6xl mx-auto px-4 pb-1.5 overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-1 min-w-max py-0.5">
          {sections.map(s => {
            const isActive = activeSection === s.id;
            const isCompleted = completedSections.includes(s.id);

            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
                }`}
              >
                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#99F6E4]' : 'text-[#10B981]'}`} />
                )}
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Thin animated Progress bar */}
      <div className="w-full bg-[#EDE9FE] h-1">
        <div
          className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#14B8A6] h-1 transition-all duration-300"
          style={{ width: `${Math.max(14, progressPercent)}%` }}
        />
      </div>
    </header>
  );
};
