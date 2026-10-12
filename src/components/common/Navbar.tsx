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
    <header className="sticky top-0 z-40 bg-[#FEFCE8]/95 backdrop-blur-md border-b-2 border-[#EAB308]/40 shadow-xs">
      {/* Top utility row */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate(1)}
          className="cursor-pointer flex items-center gap-2.5 select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FACC15] border-2 border-[#18181B] flex items-center justify-center text-[#18181B] font-black text-sm shadow-xs">
            16.1
          </div>
          <div>
            <h1 className="font-extrabold text-[#18181B] text-xs sm:text-sm tracking-tight leading-none">
              Frequency Diagrams
            </h1>
            <span className="text-[10px] text-[#B45309] font-bold">
              Cambridge Stage 8 Math
            </span>
          </div>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2">
          {/* Star Counter */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#FEF08A] px-3 py-1 rounded-xl border-2 border-[#18181B] text-xs font-black text-[#18181B] shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#CA8A04]" />
            <span>{totalStars} / 3 Stars</span>
          </div>

          {/* Bahasa Indonesia Hint Toggle */}
          <button
            onClick={onToggleIdHint}
            className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 shadow-xs ${
              showIdHint
                ? 'bg-[#FACC15] text-[#18181B] border-[#18181B] ring-2 ring-[#EAB308]'
                : 'bg-white text-[#18181B] border-[#18181B]/30 hover:bg-[#FEF08A]'
            }`}
            title="Toggle Bahasa Indonesia translations and hints"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>ID</span>
            <span className="text-[10px] hidden md:inline">{showIdHint ? 'Hints ON' : 'Hints OFF'}</span>
          </button>

          {/* Glossary Drawer Toggle */}
          <button
            onClick={onOpenGlossary}
            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white hover:bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B]/30 transition-colors flex items-center gap-1 shadow-xs"
            title="Open Math Glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* Teacher Mode Toggle */}
          <button
            onClick={onOpenTeacherMode}
            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FEF08A] hover:bg-[#FDE047] text-[#18181B] border-2 border-[#18181B] transition-colors flex items-center gap-1 shadow-xs"
            title="Open Teacher Dashboard, Lesson Timings & Answers"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#18181B]" />
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
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FACC15] text-[#18181B] shadow-xs border-2 border-[#18181B]'
                    : 'text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#18181B]' : 'text-[#CA8A04]'}`} />
                )}
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress Bar (Sunny Yellow to Warm Amber) */}
      <div className="w-full bg-[#FEF08A]/40 h-2">
        <div
          className="bg-gradient-to-r from-[#FACC15] via-[#F59E0B] to-[#18181B] h-2 transition-all duration-300"
          style={{ width: `${Math.max(14, progressPercent)}%` }}
        />
      </div>
    </header>
  );
};
