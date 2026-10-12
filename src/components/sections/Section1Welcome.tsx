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
      <div className="relative overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#FCE7F3] to-[#CCFBF1] rounded-3xl p-6 md:p-10 border border-[#DDD6FE] shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#7C3AED] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            Cambridge Lower Secondary Mathematics • Stage 8 • Unit 16.1
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#4C1D95] tracking-tight leading-tight">
            Frequency Diagrams:<br />
            <span className="text-[#7C3AED] underline decoration-[#FDBA74] decoration-wavy decoration-2">
              Make Data Tell a Story
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#5B21B6] font-medium leading-relaxed max-w-2xl">
            Welcome, Year 8! When you collect numbers from 30, 40, or 100 students, raw numbers look messy.
            Today we will transform continuous data into crisp <strong>histograms</strong> and <strong>frequency polygons</strong>!
          </p>

          {showIdHint && (
            <p className="text-xs md:text-sm text-[#0D9488] bg-white/80 p-2.5 rounded-2xl italic font-medium">
              🇮🇩 <strong>Panduan Bahasa:</strong> Diagram frekuensi membantu kita menyajikan data kelompok kontinu agar mudah dibaca dan dianalisis polanya.
            </p>
          )}

          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <button
              onClick={() => onGoToSection(2)}
              className="px-6 py-3 bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-bold rounded-2xl shadow-md transition-all transform active:scale-95 flex items-center gap-2"
            >
              Start the Journey <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenGlossary}
              className="px-5 py-3 bg-white/80 hover:bg-white text-[#4C1D95] font-bold rounded-2xl border border-[#DDD6FE] transition-colors flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#7C3AED]" /> Open Glossary
            </button>
          </div>
        </div>

        {/* Mascot floating in top right */}
        <div className="hidden lg:block absolute right-8 bottom-4">
          <StatCat
            mood="happy"
            size="lg"
            speech="Hi Year 8! I'm Stat Cat. Let's make stats super fun today!"
            speechId="Halo Kelas 8! Saya Stat Cat. Yuk belajar diagram frekuensi!"
            showIdHint={showIdHint}
          />
        </div>
      </div>

      {/* Warm-Up Quick Poll */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] font-bold">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl">
              Quick Warm-Up Question
            </h3>
            <p className="text-xs md:text-sm text-[#7C3AED]">
              Imagine your teacher collected 30 phone screen-time numbers. Which would you rather read?
            </p>
            {showIdHint && (
              <p className="text-xs text-[#0D9488] italic">
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
              className={`p-4 rounded-2xl text-left text-sm font-bold border transition-all ${
                warmupSelected === option.id
                  ? option.id === 1
                    ? 'bg-[#CCFBF1] border-[#14B8A6] text-[#0F766E] shadow-sm'
                    : 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                  : 'bg-[#FAF5FF] border-[#E9D5FF] text-[#4C1D95] hover:bg-[#F3E8FF]'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {warmupSelected !== null && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EDE9FE] to-[#FCE7F3] border border-[#DDD6FE] text-[#4C1D95] text-sm animate-fadeIn flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#F59E0B] shrink-0" />
            <div>
              <p className="font-bold">
                {warmupSelected === 1
                  ? 'Exactly right! 🎉'
                  : 'A picture is worth 100 numbers!'}
              </p>
              <p className="text-xs mt-0.5 text-[#5B21B6]">
                Human brains spot peaks, spreads, and patterns in diagrams in less than a second. That is why mathematicians draw <strong>Histograms</strong> and <strong>Frequency Polygons</strong>!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Key Words Chips */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9D5FF] shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-[#4C1D95] text-base md:text-lg flex items-center gap-2">
            <span>🔑 Key Words for This Topic</span>
            <span className="text-xs font-normal text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full">
              Tap any word to view definition
            </span>
          </h3>
          <button
            onClick={onOpenGlossary}
            className="text-xs font-bold text-[#7C3AED] hover:underline"
          >
            View Full Glossary →
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {GLOSSARY_TERMS.map(g => (
            <button
              key={g.term}
              onClick={onOpenGlossary}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF5FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] text-[#4C1D95] text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>{g.term}</span>
              {showIdHint && <span className="text-[10px] text-[#0D9488]">({g.termId})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Goals Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              Learning Goals Checklist
            </h3>
            <p className="text-xs text-[#7C3AED]">
              Track your confidence as you progress through the lesson. Tick off each goal as you master it!
            </p>
          </div>
          <div className="text-xs font-bold bg-[#EDE9FE] text-[#6D28D9] px-3 py-1.5 rounded-xl self-start">
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
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isMastered
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] shadow-xs'
                    : 'bg-[#FAF5FF] border-[#E9D5FF] hover:border-[#C4B5FD]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isMastered
                      ? 'bg-[#10B981] text-white'
                      : 'border-2 border-[#C4B5FD] bg-white'
                  }`}
                >
                  {isMastered && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-black tracking-wider uppercase text-[#7C3AED] block">
                    Goal {idx + 1}
                  </span>
                  <p className={`text-xs md:text-sm font-bold ${isMastered ? 'text-[#065F46]' : 'text-[#4C1D95]'}`}>
                    {goal.textEn}
                  </p>
                  {showIdHint && (
                    <p className="text-xs text-[#0D9488] italic mt-1 font-medium">
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
