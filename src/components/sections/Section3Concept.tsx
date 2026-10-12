import React, { useState } from 'react';
import { SCREEN_TIME_DATA } from '../../data/lessonData';
import { OverlaidChart } from '../charts/OverlaidChart';
import { StatCat } from '../mascot/StatCat';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section3ConceptProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section3Concept: React.FC<Section3ConceptProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  // Mini self check state
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
        <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
          Section 3 • Core Concepts
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
          Histogram vs Frequency Polygon
        </h2>
        <p className="text-sm text-[#6D28D9] mt-1">
          Understand the golden rules for Cambridge Stage 8: how continuous data is drawn and how the two diagrams connect.
        </p>
        {showIdHint && (
          <p className="text-xs text-[#0D9488] italic mt-0.5">
            🇮🇩 Histogram (balok berimpit tanpa celah) vs Poligon Frekuensi (titik tengah dihubungkan garis lurus).
          </p>
        )}
      </div>

      {/* 2-Column Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Histogram Column */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#C4B5FD] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-3 py-1 rounded-full text-xs font-black">
              📊 Diagram Type 1
            </div>
            <h3 className="text-2xl font-black text-[#4C1D95]">Histogram</h3>

            <div className="space-y-3 text-xs md:text-sm text-[#374151]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#4C1D95]">For Continuous Data:</strong>
                  <p className="text-gray-600 mt-0.5">Used for measurements that flow smoothly like time, height, mass, or distance.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#4C1D95]">Bars Touch (No Gaps!):</strong>
                  <p className="text-gray-600 mt-0.5">
                    Because class intervals continue without a break (e.g. 0 to 1, then immediately 1 to 2), the bars touch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[#4C1D95]">Continuous Number Line:</strong>
                  <p className="text-gray-600 mt-0.5">The horizontal axis is marked with the exact class boundaries (0, 1, 2, 3, 4...).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-[#4C1D95]">Equal Class Widths:</strong>
                  <p className="text-gray-600 mt-0.5">In Stage 8, all classes have equal width, so <strong>bar height = frequency</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] text-xs font-semibold text-[#6D28D9]">
            💡 <em>Rule of thumb:</em> Think of a histogram as a solid brick wall—no spaces between bricks!
          </div>
        </div>

        {/* Frequency Polygon Column */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#99F6E4] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#CCFBF1] text-[#0F766E] px-3 py-1 rounded-full text-xs font-black">
              📈 Diagram Type 2
            </div>
            <h3 className="text-2xl font-black text-[#0F766E]">Frequency Polygon</h3>

            <div className="space-y-3 text-xs md:text-sm text-[#374151]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#0F766E]">Plotted at Midpoints:</strong>
                  <p className="text-gray-600 mt-0.5">
                    For each class interval, calculate the exact midpoint: 
                    <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded ml-1 text-[#4C1D95] font-bold">
                      (Lower + Upper) ÷ 2
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#0F766E]">Coordinates = (Midpoint, Frequency):</strong>
                  <p className="text-gray-600 mt-0.5">Plot a single point at the midpoint along the x-axis, at height equal to the frequency.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[#0F766E]">Straight Lines with a Ruler:</strong>
                  <p className="text-gray-600 mt-0.5">Join the points in order using straight line segments (never a curved freehand line!).</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-[#0F766E]">Best for Comparisons:</strong>
                  <p className="text-gray-600 mt-0.5">You can easily overlay two or three polygons on the same axes to compare two groups!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F0FDFA] rounded-2xl border border-[#99F6E4] text-xs font-semibold text-[#0F766E]">
            💡 <em>Rule of thumb:</em> Think of a polygon as constellation stars connected with a laser beam!
          </div>
        </div>
      </div>

      {/* "Don't confuse me!" Contrast Box with Bar Chart */}
      <div className="bg-[#FFFBEB] rounded-3xl p-6 border-2 border-[#FDE68A] shadow-sm flex flex-col md:flex-row items-start gap-4">
        <div className="p-3 bg-[#FEF3C7] rounded-2xl text-[#D97706] shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-extrabold text-[#92400E] text-base md:text-lg">
            Don't Confuse Me! • Histogram vs Regular Bar Chart
          </h4>
          <p className="text-xs md:text-sm text-[#78350F] leading-relaxed">
            In primary school and Year 7, you drew <strong>Bar Charts</strong> for categorical or discrete data (e.g. favourite colours: pink, mint, purple, or number of pets). 
            Those bars have <strong>gaps</strong> between them because pink and mint are separate categories!
          </p>
          <p className="text-xs md:text-sm text-[#92400E] font-bold">
            🚨 Key Cambridge Rule: In a <strong>Histogram</strong> for continuous data, the bars <u>MUST TOUCH</u>. If you leave gaps between histogram bars, examiners will deduct marks!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-1">
              🇮🇩 Diagram batang (bar chart) untuk data diskrit memiliki celah. Histogram untuk data kontinu TIDAK BOLEH memiliki celah!
            </p>
          )}
        </div>
      </div>

      {/* Animated Overlay Demonstration */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl">
              See How They Connect: The Midpoint Bridge
            </h3>
            <p className="text-xs md:text-sm text-[#7C3AED]">
              Notice where the frequency polygon points land when overlaid on the histogram!
            </p>
          </div>
          <div className="p-2 bg-[#FAF5FF] border border-[#DDD6FE] rounded-2xl text-xs text-[#5B21B6] font-semibold self-start">
            Dots sit exactly at the <strong>center top</strong> of each bar!
          </div>
        </div>

        <OverlaidChart
          classes={SCREEN_TIME_DATA.classes}
          variableName="Phone Screen Time"
          unit="hours/day"
          symbol="t"
        />
      </div>

      {/* Mini Self-Check: 3 True/False Cards */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl">
              Mini Self-Check: Test Your Understanding
            </h3>
            <p className="text-xs text-[#7C3AED]">
              Click True or False to test yourself before we start drawing!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#7C3AED]">Question 1</span>
              <p className="text-xs md:text-sm font-bold text-[#4C1D95] mt-1">
                "Bars in a histogram for continuous data should have gaps between them."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#0D9488] italic mt-1">
                  Balok histogram untuk data kontinu harus memiliki celah.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(1, true, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[1] === true
                    ? 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(1, false, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[1] === false
                    ? 'bg-[#DCFCE7] border-[#4ADE80] text-[#166534]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[1] !== null && (
              <p className={`text-xs font-semibold p-2 rounded-xl ${
                selfCheckAnswers[1] === false ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFF1F2] text-[#9F1239]'
              }`}>
                {selfCheckAnswers[1] === false
                  ? '✓ Correct! Continuous data has no breaks, so bars must touch!'
                  : '✗ Oops! Bars MUST touch each other without gaps.'}
              </p>
            )}
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#7C3AED]">Question 2</span>
              <p className="text-xs md:text-sm font-bold text-[#4C1D95] mt-1">
                "In a frequency polygon, points are plotted at the class upper boundaries."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#0D9488] italic mt-1">
                  Pada poligon frekuensi, titik diplot di batas atas interval kelas.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(2, true, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[2] === true
                    ? 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(2, false, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[2] === false
                    ? 'bg-[#DCFCE7] border-[#4ADE80] text-[#166534]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[2] !== null && (
              <p className={`text-xs font-semibold p-2 rounded-xl ${
                selfCheckAnswers[2] === false ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFF1F2] text-[#9F1239]'
              }`}>
                {selfCheckAnswers[2] === false
                  ? '✓ Correct! Points are plotted at the MIDPOINT: (lower + upper) ÷ 2!'
                  : '✗ Incorrect! Points must be plotted at the midpoints.'}
              </p>
            )}
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-[#7C3AED]">Question 3</span>
              <p className="text-xs md:text-sm font-bold text-[#4C1D95] mt-1">
                "For equal class widths, the height of each bar represents the frequency."
              </p>
              {showIdHint && (
                <p className="text-[11px] text-[#0D9488] italic mt-1">
                  Untuk lebar kelas yang sama, tinggi tiap balok menunjukkan frekuensi.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSelfCheck(3, true, true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[3] === true
                    ? 'bg-[#DCFCE7] border-[#4ADE80] text-[#166534]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleSelfCheck(3, false, false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selfCheckAnswers[3] === false
                    ? 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
                }`}
              >
                False
              </button>
            </div>

            {selfCheckAnswers[3] !== null && (
              <p className={`text-xs font-semibold p-2 rounded-xl ${
                selfCheckAnswers[3] === true ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFF1F2] text-[#9F1239]'
              }`}>
                {selfCheckAnswers[3] === true
                  ? '✓ Correct! In Stage 8 with equal class intervals, height = frequency!'
                  : '✗ Actually true! Because class widths are equal, height equals frequency.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
