import React, { useState } from 'react';
import { SCREEN_TIME_DATA, SIBLINGS_DATA, BOBA_WAITING_DATA } from '../../data/lessonData';
import { StatCat } from '../mascot/StatCat';
import { ChevronRight, ChevronLeft, RotateCcw, PenTool, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section4StepBuilderProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section4StepBuilder: React.FC<Section4StepBuilderProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeTab, setActiveTab] = useState<'histogram' | 'barchart' | 'try-yourself'>('histogram');
  const [histStep, setHistStep] = useState(0);
  const [barStep, setBarStep] = useState(0);

  const screenClasses = SCREEN_TIME_DATA.classes || [];
  const siblingsData = SIBLINGS_DATA.discreteData || [];
  const bobaClasses = BOBA_WAITING_DATA.classes || [];

  const histogramSteps = [
    {
      title: 'Step 1: Check Equal Class Widths',
      instructionEn: 'Look at the intervals in the table: 0 to 1, 1 to 2, 2 to 3, 3 to 4, 4 to 5, 5 to 6. Each class has an equal width of 1 hour.',
      instructionId: 'Periksa interval di tabel: tiap kelas memiliki lebar yang sama yaitu 1 jam.',
      teacherTip: 'Always check class widths first! In Cambridge Stage 8, equal class width means bar height = frequency.',
      activeRowIdx: 0,
    },
    {
      title: 'Step 2: Draw the Axes with a Ruler',
      instructionEn: 'Draw perpendicular horizontal and vertical axes with a sharp pencil and ruler on graph paper.',
      instructionId: 'Gambar sumbu horizontal dan vertikal menggunakan penggaris dan pensil runcing.',
      teacherTip: 'Never draw axes freehand! Use a ruler and leave margins for axis labels and numbers.',
      activeRowIdx: -1,
    },
    {
      title: 'Step 3: Choose Scales & Label Both Axes',
      instructionEn: 'The highest frequency is 9, so scale the vertical axis from 0 to 10 in equal steps. Label both axes with variable name and units!',
      instructionId: 'Frekuensi tertinggi 9, skala vertikal 0 sampai 10. Beri label nama variabel dan satuan pada kedua sumbu!',
      teacherTip: 'Examiners lose marks if you forget units! Write "Screen time (hours/day)" and "Frequency (Students)".',
      activeRowIdx: -1,
    },
    {
      title: 'Step 4: Mark Class Boundaries on Horizontal Axis',
      instructionEn: 'Mark the continuous boundaries: 0, 1, 2, 3, 4, 5, 6 as an uninterrupted number line. Boundaries belong on tick marks, not in between!',
      instructionId: 'Beri tanda batas kontinu: 0, 1, 2, 3, 4, 5, 6 pada garis bilangan tepat di garis penunjuk.',
      teacherTip: 'In a histogram, tick marks represent boundary values (0, 1, 2...), not categories.',
      activeRowIdx: -1,
    },
    {
      title: 'Step 5: Draw the Bars (Bars Must Touch!)',
      instructionEn: 'Draw each rectangular bar from its lower boundary to its upper boundary. Make the bar height equal to the class frequency. Notice how bars touch!',
      instructionId: 'Gambar tiap balok dari batas bawah ke batas atas sesuai frekuensi. Balok harus berimpit tanpa celah!',
      teacherTip: 'No spaces between bars! Since time is continuous, 1 hour flows straight into the next class.',
      activeRowIdx: 2,
    },
    {
      title: 'Step 6: Title & Final Quality Check',
      instructionEn: 'Give your histogram a clear, descriptive title. Double-check: Do heights match table? Are bars touching? Are axes labelled with units?',
      instructionId: 'Beri judul yang jelas. Periksa kembali: tinggi balok sesuai tabel? Balok berimpit? Sumbu ada label dan satuan?',
      teacherTip: 'Done! Your histogram looks clean, professional, and ready for full Cambridge exam marks! 🌟',
      activeRowIdx: -1,
    },
  ];

  const barChartSteps = [
    {
      title: 'Step 1: Read Discrete Data Table',
      instructionEn: 'Identify the discrete categories: 0, 1, 2, 3, 4+ siblings. Because siblings can only be counted in whole numbers, this is discrete data.',
      instructionId: 'Identifikasi kategori diskrit: 0, 1, 2, 3, 4+ saudara. Karena dihitung bilangan bulat, ini adalah data diskrit.',
      teacherTip: 'For discrete or categorical data, Cambridge requires a Bar Chart with gaps between bars.',
      activeRowIdx: 0,
    },
    {
      title: 'Step 2: Draw the Axes with a Ruler',
      instructionEn: 'Draw horizontal and vertical axes with a ruler. Leave ample room along the bottom for separate category labels.',
      instructionId: 'Gambar sumbu menggunakan penggaris. Berikan ruang di bawah untuk label kategori.',
      teacherTip: 'Leave equal spacing along the horizontal axis for both bars and gaps.',
      activeRowIdx: -1,
    },
    {
      title: 'Step 3: Choose Frequency Scale',
      instructionEn: 'The highest frequency is 16, so scale the vertical axis from 0 to 18 in steps of 2. Label vertical axis "Frequency (Number of students)".',
      instructionId: 'Frekuensi tertinggi 16, skala vertikal 0 sampai 18 kelipatan 2. Beri label Frekuensi.',
      teacherTip: 'Always choose a consistent scale with equal gaps between numbers (0, 2, 4, 6...).',
      activeRowIdx: -1,
    },
    {
      title: 'Step 4: Mark Equal Bars & Equal GAPS',
      instructionEn: 'Plan bars of equal width, leaving an equal gap between each bar (and between the first bar and the vertical axis).',
      instructionId: 'Buat balok dengan lebar yang sama, serta berikan celah yang sama antarbalok.',
      teacherTip: 'Golden Rule: Bars in a bar chart MUST NOT touch. Gaps show the categories are separate!',
      activeRowIdx: -1,
    },
    {
      title: 'Step 5: Draw the Bars with Heights = Frequency',
      instructionEn: 'Draw each bar to its frequency height (0: 6, 1: 16, 2: 12, 3: 4, 4+: 2). Write the category name centered directly beneath each bar.',
      instructionId: 'Gambar tiap balok sesuai frekuensi. Tulis nama kategori tepat di bawah tiap balok.',
      teacherTip: 'Use a ruler for all bar edges. Shade or colour bars neatly.',
      activeRowIdx: 1,
    },
    {
      title: 'Step 6: Title & Final Check',
      instructionEn: 'Add an informative title. Verify that all bars have equal width, equal gaps, and heights correspond accurately to the survey.',
      instructionId: 'Beri judul. Pastikan semua balok memiliki lebar sama, celah sama, dan tinggi akurat.',
      teacherTip: 'Superb! You now know exactly how to draw both Histograms and Bar Charts! 🎉',
      activeRowIdx: -1,
    },
  ];

  const currentHist = histogramSteps[histStep];
  const currentBar = barChartSteps[barStep];

  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 55 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleHistX = (val: number, min = 0, max = 6) => {
    return margin.left + ((val - min) / (max - min)) * plotWidth;
  };

  const scaleHistY = (freq: number, maxF = 10) => {
    return margin.top + plotHeight - (freq / maxF) * plotHeight;
  };

  // Bar chart scale
  const totalSlots = siblingsData.length;
  const slotWidth = plotWidth / totalSlots;
  const barW = slotWidth * 0.62;
  const barOff = (slotWidth - barW) / 2;
  const scaleBarY = (freq: number, maxF = 18) => {
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

  const nextBarStep = () => {
    if (barStep < barChartSteps.length - 1) {
      setBarStep(barStep + 1);
      if (barStep + 1 === barChartSteps.length - 1) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const prevBarStep = () => {
    if (barStep > 0) setBarStep(barStep - 1);
  };

  return (
    <section id="section-4" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3.5 py-1 rounded-full border-2 border-[#18181B] shadow-xs">
            Section 4 • Drawing Wizard
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1.5">
            How to Draw: Step-by-Step Interactive Builder 📐
          </h2>
          <p className="text-sm text-[#18181B] font-semibold mt-1">
            Watch how a <strong>Histogram</strong> (touching bars) and a <strong>Bar Chart</strong> (bars with gaps) are constructed step-by-step!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              🇮🇩 Panduan Menggambar: Langkah demi langkah membangun histogram (data kontinu) dan diagram batang (data diskrit).
            </p>
          )}
        </div>

        {/* Wizard Mode Tabs */}
        <div className="bg-[#FEFCE8] p-1 rounded-2xl border-2 border-[#18181B] shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('histogram')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'histogram'
                ? 'bg-[#FACC15] text-[#18181B] shadow-xs border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            Histogram Steps (Continuous)
          </button>
          <button
            onClick={() => setActiveTab('barchart')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'barchart'
                ? 'bg-[#FACC15] text-[#18181B] shadow-xs border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            Bar Chart Steps (Discrete)
          </button>
          <button
            onClick={() => setActiveTab('try-yourself')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === 'try-yourself'
                ? 'bg-[#18181B] text-[#FACC15] shadow-xs border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Try It Yourself
          </button>
        </div>
      </div>

      {/* HISTOGRAM STEPS TAB */}
      {activeTab === 'histogram' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border-2 border-[#18181B] shadow-xs">
                Histogram Step {histStep + 1} of {histogramSteps.length}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-[#18181B] mt-1.5">
                {currentHist.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistStep(0)}
                className="p-2 rounded-xl text-[#18181B] hover:bg-[#FEF08A] border-2 border-[#18181B] transition-colors shadow-xs"
                title="Replay from Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={prevHistStep}
                disabled={histStep === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-black bg-[#FEFCE8] text-[#18181B] border-2 border-[#18181B] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextHistStep}
                disabled={histStep === histogramSteps.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-black bg-[#FACC15] text-[#18181B] hover:bg-[#F59E0B] border-2 border-[#18181B] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <p className="text-sm md:text-base text-[#18181B] leading-relaxed font-bold">
                {currentHist.instructionEn}
              </p>
              {showIdHint && (
                <p className="text-xs text-[#854D0E] italic font-bold bg-[#FFFDF5] p-2.5 rounded-xl border border-[#FEF08A]">
                  🇮🇩 {currentHist.instructionId}
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
                  "{currentHist.teacherTip}"
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 overflow-x-auto">
              <div className="text-xs font-black text-[#18181B] mb-1.5 flex items-center justify-between">
                <span>Data: Phone Screen Time (30 students)</span>
                <span className="text-[10px] text-gray-500 font-bold">Continuous intervals</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B]">
                    <th className="p-2.5 rounded-l-xl font-black">Class Interval (h)</th>
                    <th className="p-2.5 rounded-r-xl font-black text-right">Frequency (f)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {screenClasses.map((cls, idx) => {
                    const isSpecificActive = (histStep === 0 && idx === 0) || (histStep === 4 && idx === 2);

                    return (
                      <tr
                        key={`trow-${idx}`}
                        className={`transition-colors ${
                          isSpecificActive
                            ? 'bg-[#FEF08A] font-black text-[#18181B]'
                            : 'text-[#18181B]'
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

            <div className="lg:col-span-7 bg-white p-3 rounded-2xl border-2 border-[#EAB308]/40 flex justify-center shadow-xs">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-w-[500px] h-auto select-none font-sans"
              >
                {histStep >= 2 && [0, 2, 4, 6, 8, 10].map(tick => {
                  const yPos = scaleHistY(tick);
                  return (
                    <g key={`w-ytick-${tick}`}>
                      <line
                        x1={margin.left}
                        y1={yPos}
                        x2={svgWidth - margin.right}
                        y2={yPos}
                        stroke="#F3F4F6"
                        strokeWidth="1"
                        strokeDasharray={tick === 0 ? 'none' : '3,3'}
                      />
                      <text
                        x={margin.left - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        className="text-[11px] fill-[#18181B] font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {histStep >= 1 && (
                  <g>
                    <line
                      x1={margin.left}
                      y1={margin.top + plotHeight}
                      x2={svgWidth - margin.right}
                      y2={margin.top + plotHeight}
                      stroke="#18181B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1={margin.left}
                      y1={margin.top}
                      x2={margin.left}
                      y2={margin.top + plotHeight}
                      stroke="#18181B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {histStep >= 2 && (
                  <g>
                    <text
                      transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
                      x={margin.left - 35}
                      y={margin.top + plotHeight / 2}
                      textAnchor="middle"
                      className="text-[12px] fill-[#18181B] font-black"
                    >
                      Frequency (Students)
                    </text>
                    <text
                      x={margin.left + plotWidth / 2}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      className="text-[12px] fill-[#18181B] font-black"
                    >
                      Screen time (hours/day)
                    </text>
                  </g>
                )}

                {histStep >= 3 && [0, 1, 2, 3, 4, 5, 6].map(bound => {
                  const xPos = scaleHistX(bound);
                  return (
                    <g key={`w-bound-${bound}`}>
                      <line
                        x1={xPos}
                        y1={margin.top + plotHeight}
                        x2={xPos}
                        y2={margin.top + plotHeight + 6}
                        stroke="#18181B"
                        strokeWidth="2"
                      />
                      <text
                        x={xPos}
                        y={margin.top + plotHeight + 20}
                        textAnchor="middle"
                        className="text-[12px] fill-[#18181B] font-bold"
                      >
                        {bound}
                      </text>
                    </g>
                  );
                })}

                {/* Bars TOUCHING with NO GAPS */}
                {histStep >= 4 && screenClasses.map((cls, idx) => {
                  const x1 = scaleHistX(cls.lower);
                  const x2 = scaleHistX(cls.upper);
                  const barWidth = x2 - x1;
                  const barH = (cls.frequency / 10) * plotHeight;
                  const yTop = scaleHistY(cls.frequency);

                  return (
                    <g key={`w-bar-${idx}`} className="animate-fadeIn">
                      <rect
                        x={x1}
                        y={yTop}
                        width={barWidth}
                        height={barH}
                        fill={idx % 2 === 0 ? '#FACC15' : '#FBBF24'}
                        stroke="#18181B"
                        strokeWidth="2.5"
                      />
                      <text
                        x={(x1 + x2) / 2}
                        y={yTop - 6}
                        textAnchor="middle"
                        className="text-[11px] fill-[#18181B] font-black drop-shadow-sm"
                      >
                        {cls.frequency}
                      </text>
                    </g>
                  );
                })}

                {histStep >= 5 && (
                  <text
                    x={margin.left + plotWidth / 2}
                    y={22}
                    textAnchor="middle"
                    className="text-[14px] fill-[#18181B] font-black"
                  >
                    Histogram: Daily Screen Time (Bars Touch!)
                  </text>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* BAR CHART STEPS TAB */}
      {activeTab === 'barchart' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
                Bar Chart Step {barStep + 1} of {barChartSteps.length}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-[#18181B] mt-1.5">
                {currentBar.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBarStep(0)}
                className="p-2 rounded-xl text-[#18181B] hover:bg-[#FEF08A] border border-[#18181B]/20 transition-colors"
                title="Replay from Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={prevBarStep}
                disabled={barStep === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-black bg-[#FAFAFA] text-[#18181B] border border-[#18181B]/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextBarStep}
                disabled={barStep === barChartSteps.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-black bg-[#FACC15] text-[#18181B] hover:bg-[#FDE047] border-2 border-[#18181B] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-[0_3px_0_#CA8A04] active:translate-y-0.5 active:shadow-none"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <p className="text-sm md:text-base text-[#18181B] leading-relaxed font-bold">
                {currentBar.instructionEn}
              </p>
              {showIdHint && (
                <p className="text-xs text-[#854D0E] italic font-bold bg-[#FFFDF5] p-2.5 rounded-xl border border-[#FEF08A]">
                  🇮🇩 {currentBar.instructionId}
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
                  "{currentBar.teacherTip}"
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 overflow-x-auto">
              <div className="text-xs font-black text-[#18181B] mb-1.5 flex items-center justify-between">
                <span>Data: Number of Siblings (40 students)</span>
                <span className="text-[10px] text-gray-500">Discrete values</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#18181B] text-[#FACC15]">
                    <th className="p-2.5 rounded-l-xl font-black">Siblings (Category)</th>
                    <th className="p-2.5 rounded-r-xl font-black text-right">Frequency (f)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {siblingsData.map((item, idx) => {
                    const isSpecificActive = (barStep === 0 && idx === 0) || (barStep === 4 && idx === 1);

                    return (
                      <tr
                        key={`brow-${idx}`}
                        className={`transition-colors ${
                          isSpecificActive
                            ? 'bg-[#FEF08A] font-black text-[#18181B]'
                            : 'text-[#18181B]'
                        }`}
                      >
                        <td className="p-2.5 font-bold">
                          {item.category}
                        </td>
                        <td className="p-2.5 text-right font-black">
                          {item.frequency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-7 bg-[#FFFDF5] p-3 rounded-2xl border-2 border-[#EAB308]/30 flex justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-w-[500px] h-auto select-none font-sans"
              >
                {barStep >= 2 && [0, 2, 4, 6, 8, 10, 12, 14, 16, 18].map(tick => {
                  const yPos = scaleBarY(tick);
                  return (
                    <g key={`bw-ytick-${tick}`}>
                      <line
                        x1={margin.left}
                        y1={yPos}
                        x2={svgWidth - margin.right}
                        y2={yPos}
                        stroke="#E4E4E7"
                        strokeWidth="1"
                        strokeDasharray={tick === 0 ? 'none' : '3,3'}
                      />
                      <text
                        x={margin.left - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        className="text-[11px] fill-[#18181B] font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {barStep >= 1 && (
                  <g>
                    <line
                      x1={margin.left}
                      y1={margin.top + plotHeight}
                      x2={svgWidth - margin.right}
                      y2={margin.top + plotHeight}
                      stroke="#18181B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1={margin.left}
                      y1={margin.top}
                      x2={margin.left}
                      y2={margin.top + plotHeight}
                      stroke="#18181B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {barStep >= 2 && (
                  <g>
                    <text
                      transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
                      x={margin.left - 35}
                      y={margin.top + plotHeight / 2}
                      textAnchor="middle"
                      className="text-[12px] fill-[#18181B] font-black"
                    >
                      Frequency (Students)
                    </text>
                    <text
                      x={margin.left + plotWidth / 2}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      className="text-[12px] fill-[#18181B] font-black"
                    >
                      Number of siblings (Discrete)
                    </text>
                  </g>
                )}

                {/* Bars with CLEAR GAPS between them */}
                {barStep >= 4 && siblingsData.map((item, idx) => {
                  const slotX = margin.left + idx * slotWidth;
                  const barX = slotX + barOff;
                  const yTop = scaleBarY(item.frequency);
                  const barH = (item.frequency / 18) * plotHeight;
                  const midX = barX + barW / 2;

                  return (
                    <g key={`bw-bar-${idx}`} className="animate-fadeIn">
                      <rect
                        x={barX}
                        y={yTop}
                        width={barW}
                        height={barH}
                        fill="#FACC15"
                        stroke="#18181B"
                        strokeWidth="2.5"
                        rx="3"
                      />
                      <text
                        x={midX}
                        y={yTop - 6}
                        textAnchor="middle"
                        className="text-[11px] fill-[#18181B] font-black"
                      >
                        {item.frequency}
                      </text>
                      <text
                        x={midX}
                        y={margin.top + plotHeight + 18}
                        textAnchor="middle"
                        className="text-[11px] fill-[#18181B] font-bold"
                      >
                        {item.category}
                      </text>
                    </g>
                  );
                })}

                {barStep >= 5 && (
                  <text
                    x={margin.left + plotWidth / 2}
                    y={22}
                    textAnchor="middle"
                    className="text-[14px] fill-[#18181B] font-black"
                  >
                    Bar Chart: Siblings (Bars Have Equal Gaps!)
                  </text>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* "TRY IT YOURSELF" TAB */}
      {activeTab === 'try-yourself' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
                Second Worked Example • Try It Yourself!
              </span>
              <h3 className="text-xl md:text-2xl font-black text-[#18181B] mt-1">
                Bubble Tea Shop Waiting Time (30 Customers)
              </h3>
              <p className="text-xs text-[#18181B] font-semibold">
                Waiting time in minutes is continuous. Which diagram should Nadia draw?
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FFFDF5] rounded-2xl border-2 border-[#FEF08A] space-y-3">
            <p className="text-sm font-bold text-[#18181B]">
              <strong>Question:</strong> "Is waiting time discrete or continuous? Should bars touch or have gaps?"
            </p>
            <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-[#854D0E] font-bold">
              ✓ <strong>Answer:</strong> Waiting time is <strong>continuous</strong> (e.g. 3.25 minutes). Therefore, Nadia must draw a <strong>Histogram</strong> with <strong>touching bars</strong>!
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#18181B] text-[#FACC15] border border-[#18181B]">
                  <th className="p-3 rounded-l-2xl font-black">Class Interval (minutes)</th>
                  <th className="p-3 font-black text-center">Tally</th>
                  <th className="p-3 rounded-r-2xl font-black text-right">Frequency (f)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-[#18181B] font-bold">
                {bobaClasses.map((cls, idx) => (
                  <tr key={`boba-${idx}`} className="hover:bg-[#FFFDF5]">
                    <td className="p-3 font-black text-[#854D0E]">
                      {cls.lower} ≤ t &lt; {cls.upper}
                    </td>
                    <td className="p-3 text-center text-gray-500 font-mono">
                      {'|'.repeat(cls.frequency)}
                    </td>
                    <td className="p-3 text-right font-black">
                      <span className="bg-[#FEF08A] border border-[#EAB308] px-3 py-1 rounded-full text-[#18181B]">
                        {cls.frequency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FFFDF5] rounded-2xl border-2 border-[#FEF08A] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <StatCat mood="explaining" size="sm" speech="Notice the modal class? It's 2 ≤ t < 4 minutes with 11 customers!" />
            </div>
            <button
              onClick={() => onGoToSection(5)}
              className="px-6 py-2.5 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-2xl shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none text-xs md:text-sm border-2 border-[#18181B] transition-all"
            >
              Ready to Interpret Graphs? Go to Section 5 →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
