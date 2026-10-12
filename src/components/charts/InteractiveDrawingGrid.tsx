import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FrequencyClass, DiscreteCategory } from '../../types';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

interface InteractiveHistogramDrawerProps {
  classes: FrequencyClass[];
  variableName: string;
  unit: string;
  symbol: string;
  onSuccess: () => void;
  showIdHint?: boolean;
}

export const InteractiveHistogramDrawer: React.FC<InteractiveHistogramDrawerProps> = ({
  classes,
  variableName,
  unit,
  symbol,
  onSuccess,
  showIdHint = false,
}) => {
  const maxScale = 14;
  const [userHeights, setUserHeights] = useState<number[]>(classes.map(() => 0));
  const [selectedXLabel, setSelectedXLabel] = useState<string>('');
  const [selectedYLabel, setSelectedYLabel] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'success' | 'error'; message: string; messageId?: string } | null>(null);

  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 60 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const minBound = classes[0].lower;
  const maxBound = classes[classes.length - 1].upper;

  const scaleX = (val: number) => {
    return margin.left + ((val - minBound) / (maxBound - minBound)) * plotWidth;
  };

  const scaleY = (freq: number) => {
    return margin.top + plotHeight - (freq / maxScale) * plotHeight;
  };

  const handleGridClick = (e: React.MouseEvent<SVGElement>, classIdx: number) => {
    const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - svgRect.top;
    const relativeY = (clickY / svgRect.height) * svgHeight;

    const rawFreq = ((margin.top + plotHeight - relativeY) / plotHeight) * maxScale;
    const snappedFreq = Math.max(0, Math.min(maxScale, Math.round(rawFreq)));

    const next = [...userHeights];
    next[classIdx] = snappedFreq;
    setUserHeights(next);
  };

  const handleCheck = () => {
    if (selectedXLabel !== 'messages') {
      setFeedback({
        type: 'error',
        message: 'Check your horizontal axis label! What variable did the students track?',
        messageId: 'Periksa label sumbu horizontal! Variabel apa yang diukur para siswa?',
      });
      return;
    }
    if (selectedYLabel !== 'frequency') {
      setFeedback({
        type: 'error',
        message: 'Check your vertical axis label! In a histogram with equal class widths, vertical axis must be Frequency.',
        messageId: 'Periksa label sumbu vertikal! Pada histogram, sumbu vertikal harus berupa Frekuensi.',
      });
      return;
    }

    for (let i = 0; i < classes.length; i++) {
      if (userHeights[i] !== classes[i].frequency) {
        setFeedback({
          type: 'error',
          message: `Bar ${i + 1} (${classes[i].lower} ≤ ${symbol} < ${classes[i].upper}) is set to height ${userHeights[i]}, but according to the table it should be ${classes[i].frequency}!`,
          messageId: `Balok ${i + 1} tingginya ${userHeights[i]}, tetapi menurut tabel seharusnya ${classes[i].frequency}!`,
        });
        return;
      }
    }

    setFeedback({
      type: 'success',
      message: 'Spot on, Data Artist! All 5 bars touch perfectly with no gaps, heights match the frequency table, and both axes are labelled correctly! 🌟',
      messageId: 'Luar biasa! Semua 5 balok berimpit sempurna tanpa celah, tinggi sesuai tabel, dan kedua sumbu diberi label dengan benar! 🌟',
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    onSuccess();
  };

  const handleReset = () => {
    setUserHeights(classes.map(() => 0));
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-[#EAB308]/40 hover:border-[#EAB308] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h4 className="font-extrabold text-[#18181B] text-lg">Task A: Draw a Histogram (Continuous Data • Touching Bars)</h4>
          <p className="text-xs text-[#18181B] font-semibold">
            Click on the grid columns to raise each bar to match the table. In a histogram for continuous data, bars touch!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              Klik pada kolom kisi untuk menaikkan balok sesuai frekuensi di tabel. Balok harus berimpit tanpa celah!
            </p>
          )}
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-[#18181B] font-bold hover:bg-[#FDE047] bg-[#FEF08A] px-3.5 py-1.5 rounded-xl border-2 border-[#18181B] transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Bars
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FEFCE8] rounded-2xl border-2 border-[#FEF08A]">
        <div>
          <label className="text-xs font-black text-[#18181B] block mb-1">
            Horizontal (X) Axis Label:
          </label>
          <select
            value={selectedXLabel}
            onChange={e => setSelectedXLabel(e.target.value)}
            className="w-full text-xs p-2 rounded-xl border-2 border-[#18181B] bg-white text-[#18181B] font-bold focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          >
            <option value="">-- Select Label --</option>
            <option value="messages">Messages sent (n)</option>
            <option value="students">Number of students</option>
            <option value="height">Height in cm</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-black text-[#18181B] block mb-1">
            Vertical (Y) Axis Label:
          </label>
          <select
            value={selectedYLabel}
            onChange={e => setSelectedYLabel(e.target.value)}
            className="w-full text-xs p-2 rounded-xl border-2 border-[#18181B] bg-white text-[#18181B] font-bold focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          >
            <option value="">-- Select Label --</option>
            <option value="frequency">Frequency (Number of students)</option>
            <option value="percentage">Percentage (%)</option>
            <option value="time">Time in hours</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto flex justify-center py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
        >
          {[0, 2, 4, 6, 8, 10, 12, 14].map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`draw-ytick-${tick}`}>
                <line
                  x1={margin.left}
                  y1={yPos}
                  x2={svgWidth - margin.right}
                  y2={yPos}
                  stroke="#F3F4F6"
                  strokeWidth="1.2"
                  strokeDasharray={tick === 0 ? 'none' : '3,3'}
                />
                <text
                  x={margin.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="text-[12px] fill-[#18181B] font-bold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <text
            transform={`rotate(-90 ${margin.left - 40} ${margin.top + plotHeight / 2})`}
            x={margin.left - 40}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            className="text-[12px] fill-[#18181B] font-black"
          >
            {selectedYLabel === 'frequency' ? 'Frequency' : selectedYLabel ? selectedYLabel : '(Select Y Axis)'}
          </text>

          {classes.map((cls, idx) => {
            const x1 = scaleX(cls.lower);
            const x2 = scaleX(cls.upper);
            const barW = x2 - x1;
            const currentHeight = userHeights[idx];
            const yTop = scaleY(currentHeight);
            const barH = (currentHeight / maxScale) * plotHeight;
            const midX = (x1 + x2) / 2;

            return (
              <g
                key={`draw-bar-${idx}`}
                className="cursor-pointer group"
                onClick={e => handleGridClick(e, idx)}
              >
                <rect
                  x={x1}
                  y={margin.top}
                  width={barW}
                  height={plotHeight}
                  fill="transparent"
                  className="hover:fill-amber-400/25 transition-colors"
                />

                {currentHeight > 0 && (
                  <rect
                    x={x1}
                    y={yTop}
                    width={barW}
                    height={barH}
                    fill="#FACC15"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    className="transition-all duration-200"
                  />
                )}

                <rect
                  x={midX - 12}
                  y={yTop - 18}
                  width="24"
                  height="16"
                  rx="6"
                  fill="#FEF08A"
                  stroke="#18181B"
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y={yTop - 6}
                  textAnchor="middle"
                  className="text-[11px] fill-[#18181B] font-black pointer-events-none"
                >
                  {currentHeight}
                </text>
              </g>
            );
          })}

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

          {Array.from(new Set([...classes.map(c => c.lower), maxBound])).map(boundary => {
            const xPos = scaleX(boundary);
            return (
              <g key={`bound-${boundary}`}>
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
                  {boundary}
                </text>
              </g>
            );
          })}

          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-[12px] fill-[#18181B] font-black"
          >
            {selectedXLabel === 'messages' ? 'Messages sent (n)' : selectedXLabel ? selectedXLabel : '(Select X Axis)'}
          </text>
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={handleCheck}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#FACC15] hover:bg-[#F59E0B] text-[#18181B] font-black rounded-2xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 border-2 border-[#18181B]"
        >
          <Sparkles className="w-4 h-4 text-[#18181B]" /> Check My Histogram
        </button>

        {feedback && (
          <div
            className={`flex-1 text-xs md:text-sm p-3 rounded-2xl flex items-start gap-2.5 ${
              feedback.type === 'success'
                ? 'bg-[#FEF9C3] border-2 border-[#EAB308] text-[#18181B]'
                : 'bg-[#FEF2F2] border-2 border-[#EF4444] text-[#991B1B]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#CA8A04] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{feedback.message}</p>
              {showIdHint && feedback.messageId && (
                <p className="italic text-xs mt-1 text-[#991B1B] font-semibold">
                  🇮🇩 {feedback.messageId}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface InteractiveBarChartDrawerProps {
  categories: DiscreteCategory[];
  variableName: string;
  onSuccess: () => void;
  showIdHint?: boolean;
}

export const InteractiveBarChartDrawer: React.FC<InteractiveBarChartDrawerProps> = ({
  categories,
  variableName,
  onSuccess,
  showIdHint = false,
}) => {
  const maxScale = 16;
  const [userHeights, setUserHeights] = useState<number[]>(categories.map(() => 0));
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'success' | 'error'; message: string; messageId?: string } | null>(null);

  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 60 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const totalSlots = categories.length;
  const slotWidth = plotWidth / totalSlots;
  const barWidth = slotWidth * 0.62; // Bars have clear spaces between them
  const barOffset = (slotWidth - barWidth) / 2;

  const scaleY = (freq: number) => {
    return margin.top + plotHeight - (freq / maxScale) * plotHeight;
  };

  const handleBarClick = (e: React.MouseEvent<SVGElement>, idx: number) => {
    const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - svgRect.top;
    const relativeY = (clickY / svgRect.height) * svgHeight;

    const rawFreq = ((margin.top + plotHeight - relativeY) / plotHeight) * maxScale;
    const snappedFreq = Math.max(0, Math.min(maxScale, Math.round(rawFreq)));

    const next = [...userHeights];
    next[idx] = snappedFreq;
    setUserHeights(next);
  };

  const handleCheck = () => {
    for (let i = 0; i < categories.length; i++) {
      if (userHeights[i] !== categories[i].frequency) {
        setFeedback({
          type: 'error',
          message: `Bar "${categories[i].category}" is set to height ${userHeights[i]}, but should be ${categories[i].frequency}!`,
          messageId: `Balok "${categories[i].category}" tingginya ${userHeights[i]}, seharusnya ${categories[i].frequency}!`,
        });
        return;
      }
    }

    setFeedback({
      type: 'success',
      message: 'Excellent! Your bar chart has clear gaps between bars, correct categories, and accurate heights! 🌟',
      messageId: 'Hebat sekali! Diagram batangmu memiliki celah antarbalok yang jelas, kategori tepat, dan tinggi akurat! 🌟',
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    onSuccess();
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-[#EAB308]/40 hover:border-[#EAB308] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h4 className="font-extrabold text-[#18181B] text-lg">Task B: Draw a Bar Chart (Discrete Data • Gaps Between Bars)</h4>
          <p className="text-xs text-[#18181B] font-semibold">
            Data: Number of pets owned by 40 students (0 pets: 8, 1 pet: 14, 2 pets: 10, 3 pets: 5, 4+ pets: 3). Click to set heights!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              Data diskrit: Gambar diagram batang dengan celah di antara tiap balok!
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setUserHeights(categories.map(() => 0));
            setFeedback(null);
          }}
          className="flex items-center gap-1.5 text-xs text-[#18181B] font-bold hover:bg-[#FDE047] bg-[#FEF08A] px-3.5 py-1.5 rounded-xl border-2 border-[#18181B] transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Bars
        </button>
      </div>

      <div className="w-full overflow-x-auto flex justify-center py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
        >
          {[0, 2, 4, 6, 8, 10, 12, 14, 16].map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`bdraw-ytick-${tick}`}>
                <line
                  x1={margin.left}
                  y1={yPos}
                  x2={svgWidth - margin.right}
                  y2={yPos}
                  stroke="#F3F4F6"
                  strokeWidth="1.2"
                  strokeDasharray={tick === 0 ? 'none' : '3,3'}
                />
                <text
                  x={margin.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="text-[12px] fill-[#18181B] font-bold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <text
            transform={`rotate(-90 ${margin.left - 40} ${margin.top + plotHeight / 2})`}
            x={margin.left - 40}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            className="text-[12px] fill-[#18181B] font-black"
          >
            Frequency (Students)
          </text>

          {categories.map((cat, idx) => {
            const slotX = margin.left + idx * slotWidth;
            const barX = slotX + barOffset;
            const currentHeight = userHeights[idx];
            const yTop = scaleY(currentHeight);
            const barH = (currentHeight / maxScale) * plotHeight;
            const midX = barX + barWidth / 2;

            return (
              <g
                key={`bdraw-bar-${idx}`}
                className="cursor-pointer group"
                onClick={e => handleBarClick(e, idx)}
              >
                <rect
                  x={slotX}
                  y={margin.top}
                  width={slotWidth}
                  height={plotHeight}
                  fill="transparent"
                  className="hover:fill-amber-400/25 transition-colors"
                />

                {currentHeight > 0 && (
                  <rect
                    x={barX}
                    y={yTop}
                    width={barWidth}
                    height={barH}
                    fill="#FBBF24"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    rx="4"
                    className="transition-all duration-200"
                  />
                )}

                <rect
                  x={midX - 12}
                  y={yTop - 18}
                  width="24"
                  height="16"
                  rx="6"
                  fill="#FEF08A"
                  stroke="#18181B"
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y={yTop - 6}
                  textAnchor="middle"
                  className="text-[11px] fill-[#18181B] font-black pointer-events-none"
                >
                  {currentHeight}
                </text>

                <text
                  x={midX}
                  y={margin.top + plotHeight + 20}
                  textAnchor="middle"
                  className="text-[11px] fill-[#18181B] font-extrabold"
                >
                  {cat.category}
                </text>
              </g>
            );
          })}

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

          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-[12px] fill-[#18181B] font-black"
          >
            {variableName} (Note the gaps between bars!)
          </text>
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={handleCheck}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#FACC15] hover:bg-[#F59E0B] text-[#18181B] font-black rounded-2xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 border-2 border-[#18181B]"
        >
          <Sparkles className="w-4 h-4 text-[#18181B]" /> Check My Bar Chart
        </button>

        {feedback && (
          <div
            className={`flex-1 text-xs md:text-sm p-3 rounded-2xl flex items-start gap-2.5 ${
              feedback.type === 'success'
                ? 'bg-[#FEF9C3] border-2 border-[#EAB308] text-[#18181B]'
                : 'bg-[#FEF2F2] border-2 border-[#EF4444] text-[#991B1B]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#CA8A04] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{feedback.message}</p>
              {showIdHint && feedback.messageId && (
                <p className="italic text-xs mt-1 text-[#991B1B] font-semibold">
                  🇮🇩 {feedback.messageId}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
