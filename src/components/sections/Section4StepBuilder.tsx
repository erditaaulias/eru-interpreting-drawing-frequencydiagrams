import React, { useState } from 'react';
import { SCREEN_TIME_DATA, BOBA_WAITING_DATA, calculateMidpoint } from '../../data/lessonData';
import { StatCat } from '../mascot/StatCat';
import { ChevronRight, ChevronLeft, RotateCcw, Check, Sparkles, BookOpen, PenTool, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section4StepBuilderProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section4StepBuilder: React.FC<Section4StepBuilderProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeTab, setActiveTab] = useState<'histogram' | 'polygon' | 'try-yourself'>('histogram');
  const [histStep, setHistStep] = useState(0); // 0 to 5
  const [polyStep, setPolyStep] = useState(0); // 0 to 4
  const [tryStep, setTryStep] = useState(0); // For bubble tea try it yourself

  const screenClasses = SCREEN_TIME_DATA.classes;
  const bobaClasses = BOBA_WAITING_DATA.classes;

  // Histogram Steps Details
  const histogramSteps = [
    {
      title: 'Step 1: Check Equal Class Widths',
      instructionEn: 'Look at the intervals in the table: 0 to 1, 1 to 2, 2 to 3, 3 to 4, 4 to 5, 5 to 6. Each class has a width of 1 hour.',
      instructionId: 'Periksa interval di tabel: tiap kelas memiliki lebar yang sama yaitu 1 jam.',
      teacherTip: 'Always check class widths first! In Cambridge Stage 8, equal class width means bar height = frequency. No complex calculations needed!',
      activeRowIdx: 0,
    },
    {
      title: 'Step 2: Draw the Axes with a Ruler',
      instructionEn: 'Draw perpendicular horizontal and vertical axes with a sharp pencil and ruler. Leave margin space for labels and numbers.',
      instructionId: 'Gambar sumbu horizontal dan vertikal menggunakan penggaris dan pensil runcing.',
      teacherTip: 'Use graph paper or squared exercise book paper. Never draw axes freehand without a ruler!',
      activeRowIdx: -1,
    },
    {
      title: 'Step 3: Choose Scales & Label Both Axes',
      instructionEn: 'The highest frequency is 9, so scale the vertical axis from 0 to 10 in steps of 1 or 2. Label both axes with variable name and units!',
      instructionId: 'Frekuensi tertinggi 9, jadi skala vertikal 0 sampai 10. Beri label nama variabel dan satuan pada kedua sumbu!',
      teacherTip: 'Examiners lose marks if you forget units! Write "Screen time (hours/day)" and "Frequency (Students)".',
      activeRowIdx: -1,
    },
    {
      title: 'Step 4: Mark Class Boundaries on Horizontal Axis',
      instructionEn: 'Mark the continuous boundaries: 0, 1, 2, 3, 4, 5, 6 as an uninterrupted number line. Do not write intervals in the middle; mark boundaries at tick marks!',
      instructionId: 'Beri tanda batas kontinu: 0, 1, 2, 3, 4, 5, 6 pada garis bilangan.',
      teacherTip: 'Class boundaries belong ON the tick marks, not floating in between like categories!',
      activeRowIdx: -1,
    },
    {
      title: 'Step 5: Draw the Bars (Bars Must Touch!)',
      instructionEn: 'Draw each rectangular bar from its lower boundary to its upper boundary. Make the bar height equal to the class frequency. Notice how bars touch!',
      instructionId: 'Gambar tiap balok dari batas bawah ke batas atas sesuai frekuensi. Balok harus berimpit tanpa celah!',
      teacherTip: 'No spaces between bars! Since time is continuous, 1 hour flows straight into the next class.',
      activeRowIdx: 2, // highlight modal class
    },
    {
      title: 'Step 6: Title & Final Quality Check',
      instructionEn: 'Give your histogram a clear, descriptive title. Double-check: Do heights match table? Are bars touching? Are axes labelled with units?',
      instructionId: 'Beri judul yang jelas. Periksa kembali: tinggi balok sesuai tabel? Balok berimpit? Sumbu ada label dan satuan?',
      teacherTip: 'Done! Your histogram looks clean, professional, and ready for full Cambridge exam marks! 🌟',
      activeRowIdx: -1,
    },
  ];

  // Frequency Polygon Steps Details
  const polygonSteps = [
    {
      title: 'Step 1: Calculate the Midpoint for Each Interval',
      instructionEn: 'Add a midpoint column to your table. Calculate Midpoint = (Lower boundary + Upper boundary) ÷ 2. For 0 ≤ t < 1, midpoint = 0.5.',
      instructionId: 'Tambahkan kolom titik tengah: (Batas bawah + Batas atas) ÷ 2. Untuk 0 ≤ t < 1, titik tengah = 0,5.',
      teacherTip: 'The midpoint is the representative centre point of the grouped interval.',
      activeRowIdx: 0,
    },
    {
      title: 'Step 2: Plot Coordinates at (Midpoint, Frequency)',
      instructionEn: 'For each class, plot a neat dot or cross at (midpoint, frequency). E.g., plot (0.5, 2), (1.5, 5), (2.5, 9), (3.5, 8), (4.5, 4), (5.5, 2).',
      instructionId: 'Plot titik pada koordinat (titik tengah, frekuensi).',
      teacherTip: 'Make sure your pencil dot is sharp and accurately placed right at the midpoint tick on the horizontal axis.',
      activeRowIdx: 2,
    },
    {
      title: 'Step 3: Join the Points with Straight Lines',
      instructionEn: 'Use a ruler to join consecutive plotted points with straight line segments in order from left to right.',
      instructionId: 'Gunakan penggaris untuk menghubungkan titik-titik secara berurutan dengan garis lurus.',
      teacherTip: 'Crucial Cambridge rule: Use a ruler! Do NOT sketch a smooth curving wave—it must be straight line segments.',
      activeRowIdx: -1,
    },
    {
      title: 'Step 4: Optional Closure to Horizontal Axis',
      instructionEn: 'To complete the "polygon" (closed shape), you may join the line down to zero frequency at the midpoints of the empty classes before and after.',
      instructionId: 'Poligon dapat ditutup ke sumbu horizontal pada frekuensi 0 di titik tengah kelas sebelum dan sesudahnya.',
      teacherTip: 'In Cambridge Stage 8, both open line polygons and closed-to-axis polygons are taught. Closing it helps show where frequencies begin and end.',
      activeRowIdx: -1,
    },
    {
      title: 'Step 5: Final Check Checklist',
      instructionEn: 'Confirm all midpoints are accurate, points are joined with straight lines, and axes are properly labelled with units.',
      instructionId: 'Pastikan titik tengah tepat, garis lurus menggunakan penggaris, dan sumbu berlabel lengkap.',
      teacherTip: 'Bravo! You have mastered drawing Cambridge frequency polygons! 🎉',
      activeRowIdx: -1,
    },
  ];

  const currentHist = histogramSteps[histStep];
  const currentPoly = polygonSteps[polyStep];

  // SVG dimensions for wizard
  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 55 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleX = (val: number, min = 0, max = 6) => {
    return margin.left + ((val - min) / (max - min)) * plotWidth;
  };

  const scaleY = (freq: number, maxF = 10) => {
    return margin.top + plotHeight - (freq / maxF) * plotHeight;
  };

  const nextHistStep = () => {
    if (histStep < histogramSteps.length - 1) {
      setHistStep(histStep + 1);
      if (histStep + 1 === histogramSteps.length - 1) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const prevHistStep = () => {
    if (histStep > 0) setHistStep(histStep - 1);
  };

  const nextPolyStep = () => {
    if (polyStep < polygonSteps.length - 1) {
      setPolyStep(polyStep + 1);
      if (polyStep + 1 === polygonSteps.length - 1) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const prevPolyStep = () => {
    if (polyStep > 0) setPolyStep(polyStep - 1);
  };

  return (
    <section id="section-4" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
            Section 4 • Drawing Wizard
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
            How to Draw: Step-by-Step Interactive Builder
          </h2>
          <p className="text-sm text-[#6D28D9] mt-1">
            Watch the graph build progressively step by step, or test your skills in "Try it yourself" mode!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#0D9488] italic mt-0.5">
              🇮🇩 Panduan Menggambar: Langkah demi langkah membangun histogram dan poligon frekuensi secara interaktif.
            </p>
          )}
        </div>

        {/* Wizard Mode Tabs */}
        <div className="bg-white p-1 rounded-2xl border border-[#DDD6FE] shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('histogram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'histogram'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            Histogram Steps
          </button>
          <button
            onClick={() => setActiveTab('polygon')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'polygon'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            Polygon Steps
          </button>
          <button
            onClick={() => setActiveTab('try-yourself')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              activeTab === 'try-yourself'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'text-[#0D9488] hover:bg-[#F0FDFA]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Try It Yourself
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {activeTab === 'histogram' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-6">
          {/* Header Bar with Step Counter & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#F3E8FF]">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
                Step {histStep + 1} of {histogramSteps.length}
              </span>
              <h3 className="text-lg md:text-xl font-black text-[#4C1D95] mt-1.5">
                {currentHist.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistStep(0)}
                className="p-2 rounded-xl text-[#7C3AED] hover:bg-[#FAF5FF] border border-[#DDD6FE]"
                title="Replay from Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={prevHistStep}
                disabled={histStep === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextHistStep}
                disabled={histStep === histogramSteps.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instruction & Teacher Tip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <p className="text-sm md:text-base text-[#374151] leading-relaxed font-semibold">
                {currentHist.instructionEn}
              </p>
              {showIdHint && (
                <p className="text-xs text-[#0D9488] italic font-medium bg-[#F0FDFA] p-2.5 rounded-xl border border-[#CCFBF1]">
                  🇮🇩 {currentHist.instructionId}
                </p>
              )}
            </div>

            {/* Handwritten Teacher Tip */}
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-black uppercase text-[#92400E] block">
                  Teacher Tip:
                </span>
                <p className="font-hand text-base md:text-lg text-[#78350F] leading-snug">
                  "{currentHist.teacherTip}"
                </p>
              </div>
            </div>
          </div>

          {/* Grid Layout: Left Table with highlighted row, Right Animated Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Table */}
            <div className="lg:col-span-5 overflow-x-auto">
              <div className="text-xs font-bold text-[#7C3AED] mb-1.5 flex items-center justify-between">
                <span>Data: Phone Screen Time (30 students)</span>
                <span className="text-[10px] text-gray-500">Row highlights as drawn</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#EDE9FE] text-[#4C1D95]">
                    <th className="p-2.5 rounded-l-xl font-bold">Class Interval (h)</th>
                    <th className="p-2.5 rounded-r-xl font-bold text-right">Frequency (f)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3E8FF]">
                  {screenClasses.map((cls, idx) => {
                    const isHighlightRow = histStep >= 4;
                    const isSpecificActive = (histStep === 0 && idx === 0) || (histStep === 4 && idx === 2);

                    return (
                      <tr
                        key={`trow-${idx}`}
                        className={`transition-colors ${
                          isSpecificActive
                            ? 'bg-[#FEF08A] font-black text-[#854D0E]'
                            : isHighlightRow
                            ? 'bg-[#FAF5FF] text-[#4C1D95]'
                            : 'text-[#4C1D95]'
                        }`}
                      >
                        <td className="p-2.5 font-bold">
                          {cls.lower} ≤ t &lt; {cls.upper}
                        </td>
                        <td className="p-2.5 text-right font-black">
                          {cls.frequency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* SVG Progressive Canvas */}
            <div className="lg:col-span-7 bg-[#FAF5FF] p-3 rounded-2xl border border-[#DDD6FE] flex justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-w-[500px] h-auto select-none font-sans"
              >
                {/* Step 3+: Grid lines and Y numbers */}
                {histStep >= 2 && [0, 2, 4, 6, 8, 10].map(tick => {
                  const yPos = scaleY(tick);
                  return (
                    <g key={`w-ytick-${tick}`}>
                      <line
                        x1={margin.left}
                        y1={yPos}
                        x2={svgWidth - margin.right}
                        y2={yPos}
                        stroke="#DDD6FE"
                        strokeWidth="1"
                        strokeDasharray={tick === 0 ? 'none' : '3,3'}
                      />
                      <text
                        x={margin.left - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        className="text-[11px] fill-[#6D28D9] font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Step 2+: Axes Lines */}
                {histStep >= 1 && (
                  <g>
                    {/* X axis line */}
                    <line
                      x1={margin.left}
                      y1={margin.top + plotHeight}
                      x2={svgWidth - margin.right}
                      y2={margin.top + plotHeight}
                      stroke="#4C1D95"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Y axis line */}
                    <line
                      x1={margin.left}
                      y1={margin.top}
                      x2={margin.left}
                      y2={margin.top + plotHeight}
                      stroke="#4C1D95"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Step 3+: Axis Labels */}
                {histStep >= 2 && (
                  <g>
                    <text
                      transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
                      x={margin.left - 35}
                      y={margin.top + plotHeight / 2}
                      textAnchor="middle"
                      className="text-[12px] fill-[#4C1D95] font-bold"
                    >
                      Frequency (Students)
                    </text>
                    <text
                      x={margin.left + plotWidth / 2}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      className="text-[12px] fill-[#4C1D95] font-bold"
                    >
                      Screen time (hours/day)
                    </text>
                  </g>
                )}

                {/* Step 4+: X Boundaries Ticks */}
                {histStep >= 3 && [0, 1, 2, 3, 4, 5, 6].map(bound => {
                  const xPos = scaleX(bound);
                  return (
                    <g key={`w-bound-${bound}`}>
                      <line
                        x1={xPos}
                        y1={margin.top + plotHeight}
                        x2={xPos}
                        y2={margin.top + plotHeight + 6}
                        stroke="#4C1D95"
                        strokeWidth="2"
                      />
                      <text
                        x={xPos}
                        y={margin.top + plotHeight + 20}
                        textAnchor="middle"
                        className="text-[12px] fill-[#4C1D95] font-bold"
                      >
                        {bound}
                      </text>
                    </g>
                  );
                })}

                {/* Step 5+: Draw Bars (Touching!) */}
                {histStep >= 4 && screenClasses.map((cls, idx) => {
                  const x1 = scaleX(cls.lower);
                  const x2 = scaleX(cls.upper);
                  const barW = x2 - x1;
                  const barH = (cls.frequency / 10) * plotHeight;
                  const yTop = scaleY(cls.frequency);

                  return (
                    <g key={`w-bar-${idx}`} className="animate-fadeIn">
                      <rect
                        x={x1}
                        y={yTop}
                        width={barW}
                        height={barH}
                        fill={idx % 2 === 0 ? '#C4B5FD' : '#DDD6FE'}
                        stroke="#7C3AED"
                        strokeWidth="2"
                      />
                      <text
                        x={(x1 + x2) / 2}
                        y={yTop - 6}
                        textAnchor="middle"
                        className="text-[11px] fill-[#4C1D95] font-black"
                      >
                        {cls.frequency}
                      </text>
                    </g>
                  );
                })}

                {/* Step 6: Title */}
                {histStep >= 5 && (
                  <text
                    x={margin.left + plotWidth / 2}
                    y={22}
                    textAnchor="middle"
                    className="text-[14px] fill-[#4C1D95] font-black"
                  >
                    Histogram: Daily Screen Time of 30 Students
                  </text>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Polygon Steps Tab */}
      {activeTab === 'polygon' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#F3E8FF]">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#0D9488] bg-[#CCFBF1] px-2.5 py-1 rounded-full">
                Step {polyStep + 1} of {polygonSteps.length}
              </span>
              <h3 className="text-lg md:text-xl font-black text-[#4C1D95] mt-1.5">
                {currentPoly.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPolyStep(0)}
                className="p-2 rounded-xl text-[#0D9488] hover:bg-[#F0FDFA] border border-[#99F6E4]"
                title="Replay from Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={prevPolyStep}
                disabled={polyStep === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextPolyStep}
                disabled={polyStep === polygonSteps.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D9488] text-white hover:bg-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instruction & Teacher Tip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <p className="text-sm md:text-base text-[#374151] leading-relaxed font-semibold">
                {currentPoly.instructionEn}
              </p>
              {showIdHint && (
                <p className="text-xs text-[#0D9488] italic font-medium bg-[#F0FDFA] p-2.5 rounded-xl border border-[#CCFBF1]">
                  🇮🇩 {currentPoly.instructionId}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-black uppercase text-[#92400E] block">
                  Teacher Tip:
                </span>
                <p className="font-hand text-base md:text-lg text-[#78350F] leading-snug">
                  "{currentPoly.teacherTip}"
                </p>
              </div>
            </div>
          </div>

          {/* Midpoint Table + SVG Plotting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Table with Midpoint column */}
            <div className="lg:col-span-5 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#CCFBF1] text-[#0F766E]">
                    <th className="p-2.5 rounded-l-xl font-bold">Class Interval</th>
                    <th className="p-2.5 font-bold">Midpoint (x)</th>
                    <th className="p-2.5 rounded-r-xl font-bold text-right">Frequency (y)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CCFBF1]/30">
                  {screenClasses.map((cls, idx) => {
                    const mid = calculateMidpoint(cls);
                    return (
                      <tr key={`prow-${idx}`} className="hover:bg-[#F0FDFA]">
                        <td className="p-2.5 font-bold text-[#4C1D95]">
                          {cls.lower} ≤ t &lt; {cls.upper}
                        </td>
                        <td className="p-2.5 font-black text-[#0D9488]">
                          {mid}
                        </td>
                        <td className="p-2.5 text-right font-black text-[#4C1D95]">
                          {cls.frequency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Polygon SVG progressively plotted */}
            <div className="lg:col-span-7 bg-[#FAF5FF] p-3 rounded-2xl border border-[#DDD6FE] flex justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-w-[500px] h-auto select-none font-sans"
              >
                {/* Grid lines and ticks */}
                {[0, 2, 4, 6, 8, 10].map(tick => {
                  const yPos = scaleY(tick);
                  return (
                    <g key={`pw-ytick-${tick}`}>
                      <line
                        x1={margin.left}
                        y1={yPos}
                        x2={svgWidth - margin.right}
                        y2={yPos}
                        stroke="#DDD6FE"
                        strokeWidth="1"
                        strokeDasharray={tick === 0 ? 'none' : '3,3'}
                      />
                      <text
                        x={margin.left - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        className="text-[11px] fill-[#6D28D9] font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line
                  x1={margin.left}
                  y1={margin.top + plotHeight}
                  x2={svgWidth - margin.right}
                  y2={margin.top + plotHeight}
                  stroke="#4C1D95"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1={margin.left}
                  y1={margin.top}
                  x2={margin.left}
                  y2={margin.top + plotHeight}
                  stroke="#4C1D95"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Axis Labels */}
                <text
                  transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
                  x={margin.left - 35}
                  y={margin.top + plotHeight / 2}
                  textAnchor="middle"
                  className="text-[12px] fill-[#4C1D95] font-bold"
                >
                  Frequency (Students)
                </text>
                <text
                  x={margin.left + plotWidth / 2}
                  y={svgHeight - 12}
                  textAnchor="middle"
                  className="text-[12px] fill-[#4C1D95] font-bold"
                >
                  Screen time (hours/day) [Midpoints marked]
                </text>

                {/* Midpoints tick marks on x axis */}
                {[0.5, 1.5, 2.5, 3.5, 4.5, 5.5].map(mid => {
                  const xPos = scaleX(mid);
                  return (
                    <g key={`pmid-tick-${mid}`}>
                      <line
                        x1={xPos}
                        y1={margin.top + plotHeight}
                        x2={xPos}
                        y2={margin.top + plotHeight + 6}
                        stroke="#0D9488"
                        strokeWidth="2"
                      />
                      <text
                        x={xPos}
                        y={margin.top + plotHeight + 20}
                        textAnchor="middle"
                        className="text-[11px] fill-[#0D9488] font-black"
                      >
                        {mid}
                      </text>
                    </g>
                  );
                })}

                {/* Step 3+: Joined Straight Line */}
                {polyStep >= 2 && (
                  <polyline
                    points={
                      (polyStep >= 3
                        ? `${scaleX(-0.5)},${scaleY(0)} `
                        : '') +
                      screenClasses
                        .map(cls => `${scaleX(calculateMidpoint(cls))},${scaleY(cls.frequency)}`)
                        .join(' ') +
                      (polyStep >= 3
                        ? ` ${scaleX(6.5)},${scaleY(0)}`
                        : '')
                    }
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Step 2+: Plotted Dots */}
                {polyStep >= 1 && screenClasses.map((cls, idx) => {
                  const mid = calculateMidpoint(cls);
                  const xMid = scaleX(mid);
                  const yPos = scaleY(cls.frequency);

                  return (
                    <g key={`poly-dot-${idx}`}>
                      <line
                        x1={xMid}
                        y1={yPos}
                        x2={xMid}
                        y2={margin.top + plotHeight}
                        stroke="#CCFBF1"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      <circle
                        cx={xMid}
                        cy={yPos}
                        r="6"
                        fill="#FFFFFF"
                        stroke="#0D9488"
                        strokeWidth="3"
                      />
                      <text
                        x={xMid}
                        y={yPos - 10}
                        textAnchor="middle"
                        className="text-[11px] fill-[#0F766E] font-black"
                      >
                        ({mid}, {cls.frequency})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* "Try It Yourself" Mode with Bubble Tea Data */}
      {activeTab === 'try-yourself' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#99F6E4] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#0D9488] bg-[#CCFBF1] px-3 py-1 rounded-full">
                Second Worked Example • Try It Yourself!
              </span>
              <h3 className="text-xl md:text-2xl font-black text-[#4C1D95] mt-1">
                Bubble Tea Shop Waiting Time (30 Customers)
              </h3>
              <p className="text-xs text-[#7C3AED]">
                Test what you learned! Calculate midpoints, inspect the table, and reveal the graph.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#CCFBF1] text-[#0F766E]">
                  <th className="p-3 rounded-l-2xl font-bold">Class Interval (minutes)</th>
                  <th className="p-3 font-bold">Midpoint Calculation</th>
                  <th className="p-3 font-bold text-center">Midpoint (x)</th>
                  <th className="p-3 rounded-r-2xl font-bold text-right">Frequency (f)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCFBF1]/30 text-[#4C1D95] font-semibold">
                {bobaClasses.map((cls, idx) => (
                  <tr key={`boba-${idx}`} className="hover:bg-[#F0FDFA]">
                    <td className="p-3 font-bold text-[#7C3AED]">
                      {cls.lower} ≤ t &lt; {cls.upper}
                    </td>
                    <td className="p-3 text-gray-600">
                      ({cls.lower} + {cls.upper}) ÷ 2
                    </td>
                    <td className="p-3 text-center font-black text-[#0D9488]">
                      {(cls.lower + cls.upper) / 2}
                    </td>
                    <td className="p-3 text-right font-black">
                      <span className="bg-[#EDE9FE] px-3 py-1 rounded-full">
                        {cls.frequency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <StatCat mood="explaining" size="sm" speech="Notice the modal class? It's 2 ≤ t < 4 minutes with 11 customers!" />
            </div>
            <button
              onClick={() => onGoToSection(5)}
              className="px-6 py-2.5 bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-bold rounded-2xl shadow-md text-xs md:text-sm"
            >
              Ready to Interpret Graphs? Go to Section 5 →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
