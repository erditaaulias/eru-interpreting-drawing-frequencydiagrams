import React, { useState } from 'react';
import { LEARNING_GOALS, GLOSSARY_TERMS } from '../../data/lessonData';
import { StatCat } from '../mascot/StatCat';
import { Check, Star, Sparkles, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section1WelcomeProps {
  masteredGoals: string[];
  onToggleGoal: (id: string) => void;
  onOpenGlossary: () => void;
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section1Welcome: React.FC<Section1WelcomeProps> = ({
  masteredGoals,
  onToggleGoal,
  onOpenGlossary,
  onGoToSection,
  showIdHint,
}) => {
  const [warmupSelected, setWarmupSelected] = useState<number | null>(null);

  const handleWarmup = (idx: number) => {
    setWarmupSelected(idx);
    if (idx === 1) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="section-1" className="scroll-mt-24 space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FACC15] via-[#FDE047] to-[#FEF08A] text-[#18181B] rounded-3xl p-6 md:p-10 border-2 border-[#18181B] shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#18181B] text-[#FACC15] px-3.5 py-1.5 rounded-full text-xs font-black border border-[#18181B] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            Cambridge Lower Secondary Mathematics • Stage 8 • Unit 16.1
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[#18181B] tracking-tight leading-tight">
            Frequency Diagrams:<br />
            <span className="text-[#854D0E] underline decoration-[#18181B] decoration-wavy decoration-2">
              Make Data Tell a Story ✨
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#27272A] font-extrabold leading-relaxed max-w-2xl">
            Welcome, Year 8! When you collect numbers from 30, 40, or 100 students, raw numbers look messy.
            Today we will explore and master drawing and interpreting <strong className="text-[#18181B] bg-white/70 px-2 py-0.5 rounded-lg border border-[#18181B]/20">histograms</strong> (for continuous data) and <strong className="text-[#18181B] bg-white/70 px-2 py-0.5 rounded-lg border border-[#18181B]/20">bar charts</strong> (for discrete data)!
          </p>

          {showIdHint && (
            <p className="text-xs md:text-sm text-[#18181B] bg-white/90 p-3 rounded-2xl italic font-bold border-2 border-[#18181B] shadow-xs">
              🇮🇩 <strong>Panduan Bahasa:</strong> Diagram frekuensi membantu kita menyajikan data kelompok kontinu dan data diskrit agar mudah dibaca dan dianalisis polanya.
            </p>
          )}

          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <button
              onClick={() => onGoToSection(2)}
              className="px-6 py-3 bg-[#18181B] hover:bg-[#27272A] text-[#FACC15] font-black rounded-2xl shadow-md transition-all transform active:scale-95 flex items-center gap-2 border-2 border-[#18181B]"
            >
              Start the Journey 🚀 <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenGlossary}
              className="px-5 py-3 bg-white hover:bg-yellow-50 text-[#18181B] font-black rounded-2xl border-2 border-[#18181B] transition-colors flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#B45309]" /> Open Glossary
            </button>
          </div>
        </div>

        {/* Mascot in banner */}
        <div className="hidden lg:block absolute right-8 bottom-4">
          <StatCat
            mood="happy"
            size="lg"
            speech="Hi Year 8! I'm Stat Cat. Let's make stats super fun today!"
            speechId="Halo Kelas 8! Saya Stat Cat. Yuk belajar diagram frekuensi yang seru!"
            showIdHint={showIdHint}
          />
        </div>
      </div>

      {/* Warm-Up Quick Poll */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-[#FEF08A] border-2 border-[#18181B] flex items-center justify-center text-[#18181B] font-black shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl">
              Quick Warm-Up Question
            </h3>
            <p className="text-xs md:text-sm text-[#18181B] font-semibold">
              Imagine your teacher collected 30 phone screen-time numbers. Which would you rather read?
            </p>
            {showIdHint && (
              <p className="text-xs text-[#B45309] italic font-bold">
                🇮🇩 Manakah yang lebih kamu sukai: daftar 30 angka yang panjang, atau gambarnya?
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {[
            { id: 0, text: 'A long list of 30 messy decimal numbers: 2.3, 1.4, 5.1...' },
            { id: 1, text: 'A colourful, visual picture (frequency diagram)!' },
            { id: 2, text: 'Reading them all aloud one by one in class' },
          ].map(option => (
            <button
              key={option.id}
              onClick={() => handleWarmup(option.id)}
              className={`p-4 rounded-2xl text-left text-sm font-black border-2 transition-all ${
                warmupSelected === option.id
                  ? option.id === 1
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B] shadow-md ring-2 ring-[#FACC15]'
                    : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                  : 'bg-[#FEFCE8]/50 border-gray-200 text-[#18181B] hover:bg-[#FEF08A] hover:border-[#18181B]'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {warmupSelected !== null && (
          <div className="p-4 rounded-2xl bg-[#FEFCE8] border-2 border-[#EAB308] text-[#18181B] text-sm animate-fadeIn flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#EAB308] shrink-0" />
            <div>
              <p className="font-black text-[#18181B]">
                {warmupSelected === 1
                  ? 'Exactly right! 🎉'
                  : 'A picture is worth 100 numbers!'}
              </p>
              <p className="text-xs mt-0.5 text-[#18181B] font-semibold">
                Human brains spot peaks, spreads, and patterns in diagrams in less than a second. That is why mathematicians draw <strong>Histograms</strong> and <strong>Bar Charts</strong>!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Key Words Chips */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-[#18181B] text-base md:text-lg flex items-center gap-2">
            <span>🔑 Key Words for This Topic</span>
            <span className="text-xs font-bold text-[#18181B] bg-[#FEF08A] px-2.5 py-0.5 rounded-full border border-[#EAB308]">
              Tap any word to view definition
            </span>
          </h3>
          <button
            onClick={onOpenGlossary}
            className="text-xs font-black text-[#B45309] hover:underline"
          >
            View Full Glossary →
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {GLOSSARY_TERMS.map(g => (
            <button
              key={g.term}
              onClick={onOpenGlossary}
              className="px-3.5 py-1.5 rounded-xl bg-[#FEFCE8] hover:bg-[#FDE047] border-2 border-[#18181B]/20 hover:border-[#18181B] text-[#18181B] text-xs font-black transition-transform active:scale-95 flex items-center gap-1.5 shadow-xs"
            >
              <span>{g.term}</span>
              {showIdHint && <span className="text-[10px] text-[#B45309]">({g.termId})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Goals Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
              Learning Goals Checklist
            </h3>
            <p className="text-xs text-[#18181B] font-semibold">
              Track your confidence as you progress through the lesson. Tick off each goal as you master it!
            </p>
          </div>
          <div className="text-xs font-black bg-[#FEF08A] text-[#18181B] px-3.5 py-1.5 rounded-xl self-start border-2 border-[#18181B] shadow-xs">
            {masteredGoals.length} of {LEARNING_GOALS.length} Mastered ⭐
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {LEARNING_GOALS.map((goal, idx) => {
            const isMastered = masteredGoals.includes(goal.id);
            return (
              <div
                key={goal.id}
                onClick={() => onToggleGoal(goal.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isMastered
                    ? 'bg-[#FEF9C3] border-[#18181B] shadow-sm'
                    : 'bg-[#FEFCE8]/40 border-gray-200 hover:border-[#18181B]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isMastered
                      ? 'bg-[#18181B] text-[#FACC15]'
                      : 'border-2 border-[#18181B] bg-white'
                  }`}
                >
                  {isMastered && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-black tracking-wider uppercase text-[#B45309] block">
                    Goal {idx + 1}
                  </span>
                  <p className="text-xs md:text-sm font-black text-[#18181B]">
                    {goal.textEn}
                  </p>
                  {showIdHint && (
                    <p className="text-xs text-[#B45309] italic mt-1 font-bold">
                      🇮🇩 {goal.textId}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
