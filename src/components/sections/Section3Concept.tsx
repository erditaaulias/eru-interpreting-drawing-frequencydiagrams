import React, { useState } from 'react';
import { SCREEN_TIME_DATA, SIBLINGS_DATA } from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { BarChart } from '../charts/BarChart';
import { HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section3ConceptProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section3Concept: React.FC<Section3ConceptProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [selfCheckAnswers, setSelfCheckAnswers] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
  });

  const handleSelfCheck = (qId: number, answer: boolean, isCorrect: boolean) => {
    setSelfCheckAnswers(prev => ({ ...prev, [qId]: answer }));
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="section-3" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div>
        <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3.5 py-1 rounded-full border-2 border-[#18181B] shadow-xs">
          Section 3 • Core Concepts
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1.5">
          Histogram vs Bar Chart: Spot the Golden Rule ⭐
        </h2>
        <p className="text-sm text-[#18181B] font-semibold mt-1">
          Cambridge Stage 8 golden rule: Understand why bars <strong>touch</strong> in a histogram, but have <strong>gaps</strong> in a bar chart!
        </p>
        {showIdHint && (
          <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
            🇮🇩 Histogram (data kontinu, balok berimpit tanpa celah) vs Diagram Batang (data diskrit, balok memiliki celah).
          </p>
        )}
      </div>

      {/* 2-Column Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Histogram Column */}
        <div className="bg-[#FEFCE8]/40 rounded-3xl p-6 md:p-8 border-2 border-[#EAB308] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#FACC15] text-[#18181B] px-3.5 py-1 rounded-full text-xs font-black border-2 border-[#18181B] shadow-xs">
              📊 Diagram Type 1
            </div>
            <h3 className="text-2xl font-black text-[#18181B]">Histogram</h3>

            <div className="space-y-3 text-xs md:text-sm text-[#18181B]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-[#18181B]">For Continuous Grouped Data:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">Measurements that flow without breaks like time, height, mass, or distance.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-[#18181B]">Bars Must Touch (NO GAPS):</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">
                    Because class intervals continue without interruption (e.g. 0 to 1, then immediately 1 to 2), the bars touch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-[#18181B]">Continuous Number Line:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">The horizontal axis is marked with exact class boundaries (0, 1, 2, 3, 4...).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  4
                </span>
                <div>
                  <strong className="text-[#18181B]">Equal Class Widths:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">For equal intervals, <strong>height of bar = frequency</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-[#FEF08A] text-xs font-black text-[#854D0E] shadow-xs">
            💡 <em>Remember:</em> Continuous data flows like water $\to$ no gaps between bars!
          </div>
        </div>

        {/* Bar Chart Column */}
        <div className="bg-[#FEFCE8]/40 rounded-3xl p-6 md:p-8 border-2 border-[#EAB308] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#FEF08A] text-[#18181B] px-3.5 py-1 rounded-full text-xs font-black border-2 border-[#18181B] shadow-xs">
              📊 Diagram Type 2
            </div>
            <h3 className="text-2xl font-black text-[#18181B]">Bar Chart</h3>

            <div className="space-y-3 text-xs md:text-sm text-[#18181B]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-[#18181B]">For Discrete or Categorical Data:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">Data counted in whole numbers (siblings, pets, cars) or categories (favourite colours).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-[#18181B]">Bars Have Spaces (GAPS):</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">
                    Each category is separate, so bars are drawn with <strong>equal spaces</strong> between them.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-[#18181B]">Separate Labels:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">Each bar is labelled directly underneath with its category or value (e.g. 0, 1, 2, 3).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-[#FACC15] flex items-center justify-center font-black shrink-0 mt-0.5 text-xs">
                  4
                </span>
                <div>
                  <strong className="text-[#18181B]">Equal Bar Widths:</strong>
                  <p className="text-gray-700 mt-0.5 font-semibold">All bars have identical width, and height shows the frequency.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-[#FEF08A] text-xs font-black text-[#854D0E] shadow-xs">
            💡 <em>Remember:</em> Discrete items are separate stepping stones $\to$ always leave gaps!
          </div>
        </div>
      </div>

      {/* Visual Contrast Demonstration */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-4">
        <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl">
          Visual Comparison: See the Difference Side by Side
        </h3>
        <p className="text-xs md:text-sm text-[#18181B] font-semibold">
          Look at how the bars touch in the Histogram on the left, while the Bar Chart on the right has clear gaps:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <Histogram
              classes={SCREEN_TIME_DATA.classes || []}
              variableName="Continuous Screen Time"
              unit="hours/day"
              symbol="t"
              title="Histogram (Touching Bars)"
            />
          </div>
          <div>
            {SIBLINGS_DATA.discreteData && (
              <BarChart
                data={SIBLINGS_DATA.discreteData}
                variableName="Discrete Siblings"
                title="Bar Chart (Gaps Between Bars)"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mini Self-Check: 3 True/False Cards */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-[#FEF08A] border-2 border-[#18181B] flex items-center justify-center text-[#18181B] font-black shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl">
              Mini Self-Check: Test Your Understanding
            </h3>
            <p className="text-xs text-[#18181B] font-semibold">
              Click True or False before we begin drawing in Section 4!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-[#FEFCE8]/50 border-2 border-[#18181B]/15 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#B45309]">Question 1</span>
              <p className="text-xs md:text-sm font-extrabold text-[#18181B] mt-1">
                "Bars in a histogram for continuous data should have gaps between them."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#B45309] italic mt-1 font-bold">
                  Balok histogram untuk data kontinu harus memiliki celah.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(1, true, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[1] === true
                    ? 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(1, false, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[1] === false
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[1] !== null && (
              <p className={`text-xs font-bold p-2 rounded-xl ${
                selfCheckAnswers[1] === false ? 'bg-[#FEF9C3] text-[#18181B] border border-[#EAB308]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]'
              }`}>
                {selfCheckAnswers[1] === false
                  ? '✓ Correct! Continuous data has no breaks, so bars must touch with no gaps!'
                  : '✗ False! Histogram bars must touch.'}
              </p>
            )}
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-[#FEFCE8]/50 border-2 border-[#18181B]/15 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#B45309]">Question 2</span>
              <p className="text-xs md:text-sm font-extrabold text-[#18181B] mt-1">
                "Bars in a bar chart for discrete data should have spaces (gaps) between them."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#B45309] italic mt-1 font-bold">
                  Balok pada diagram batang untuk data diskrit harus memiliki celah di antaranya.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(2, true, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[2] === true
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(2, false, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[2] === false
                    ? 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[2] !== null && (
              <p className={`text-xs font-bold p-2 rounded-xl ${
                selfCheckAnswers[2] === true ? 'bg-[#FEF9C3] text-[#18181B] border border-[#EAB308]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]'
              }`}>
                {selfCheckAnswers[2] === true
                  ? '✓ Correct! Discrete numerical data is separate, so bars have equal gaps!'
                  : '✗ Actually true! Bars in a bar chart must have gaps.'}
              </p>
            )}
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-[#FEFCE8]/50 border-2 border-[#18181B]/15 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#B45309]">Question 3</span>
              <p className="text-xs md:text-sm font-extrabold text-[#18181B] mt-1">
                "In a histogram with equal class widths, the height of each bar represents frequency."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#B45309] italic mt-1 font-bold">
                  Pada histogram dengan lebar kelas sama, tinggi tiap balok menunjukkan frekuensi.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(3, true, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[3] === true
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(3, false, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border-2 transition-colors ${
                  selfCheckAnswers[3] === false
                    ? 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                    : 'bg-white border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[3] !== null && (
              <p className={`text-xs font-bold p-2 rounded-xl ${
                selfCheckAnswers[3] === true ? 'bg-[#FEF9C3] text-[#18181B] border border-[#EAB308]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]'
              }`}>
                {selfCheckAnswers[3] === true
                  ? '✓ Correct! For equal class intervals in Stage 8, height = frequency!'
                  : '✗ Actually true! Equal class width means height equals frequency.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
