import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FrequencyClass } from '../../types';
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
  // Initialize student bars at 0
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

  // Convert SVG Y-coordinate click into discrete frequency (0 to 14)
  const handleGridClick = (e: React.MouseEvent<SVGElement>, classIdx: number) => {
    const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - svgRect.top;
    const relativeY = (clickY / svgRect.height) * svgHeight;

    // Invert scaleY:
    // relativeY = margin.top + plotHeight - (freq / maxScale) * plotHeight
    // freq = ((margin.top + plotHeight - relativeY) / plotHeight) * maxScale
    const rawFreq = ((margin.top + plotHeight - relativeY) / plotHeight) * maxScale;
    const snappedFreq = Math.max(0, Math.min(maxScale, Math.round(rawFreq)));

    const next = [...userHeights];
    next[classIdx] = snappedFreq;
    setUserHeights(next);
  };

  const handleCheck = () => {
    // 1. Check axis labels
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

    // 2. Check each bar height
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

    // Success!
    setFeedback({
      type: 'success',
      message: 'Spot on, Data Artist! All 5 bars touch perfectly, heights match the frequency table, and both axes are labelled correctly! 🌟',
      messageId: 'Luar biasa! Semua 5 balok berimpit sempurna, tinggi sesuai tabel, dan kedua sumbu diberi label dengan benar! 🌟',
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    onSuccess();
  };

  const handleReset = () => {
    setUserHeights(classes.map(() => 0));
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E9D5FF] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h4 className="font-bold text-[#4C1D95] text-lg">Task A: Draw the Histogram</h4>
          <p className="text-xs text-[#7C3AED]">
            Click on the grid columns to raise each bar to match the table. In a histogram for continuous data, bars touch!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#0D9488] italic mt-0.5">
              Klik pada kolom kisi untuk menaikkan balok sesuai frekuensi di tabel. Balok harus berimpit!
            </p>
          )}
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-[#7C3AED] hover:text-[#4C1D95] bg-[#F5F3FF] px-3 py-1.5 rounded-xl border border-[#DDD6FE]"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Bars
        </button>
      </div>

      {/* Axis selection dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FAF5FF] rounded-2xl border border-[#EDE9FE]">
        <div>
          <label className="text-xs font-bold text-[#4C1D95] block mb-1">
            Horizontal (X) Axis Label:
          </label>
          <select
            value={selectedXLabel}
            onChange={e => setSelectedXLabel(e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-[#C4B5FD] bg-white text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          >
            <option value="">-- Select Label --</option>
            <option value="messages">Messages sent (n)</option>
            <option value="students">Number of students</option>
            <option value="height">Height in cm</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-[#4C1D95] block mb-1">
            Vertical (Y) Axis Label:
          </label>
          <select
            value={selectedYLabel}
            onChange={e => setSelectedYLabel(e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-[#C4B5FD] bg-white text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          >
            <option value="">-- Select Label --</option>
            <option value="frequency">Frequency (Number of students)</option>
            <option value="percentage">Percentage (%)</option>
            <option value="time">Time in hours</option>
          </select>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
        >
          {/* Y grid lines and ticks (0 to 14 by 2) */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`draw-ytick-${tick}`}>
                <line
                  x1={margin.left}
                  y1={yPos}
                  x2={svgWidth - margin.right}
                  y2={yPos}
                  stroke="#EDE9FE"
                  strokeWidth="1.5"
                  strokeDasharray={tick === 0 ? 'none' : '3,3'}
                />
                <text
                  x={margin.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="text-[12px] fill-[#6D28D9] font-bold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Y Axis Label display */}
          <text
            transform={`rotate(-90 ${margin.left - 40} ${margin.top + plotHeight / 2})`}
            x={margin.left - 40}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            className="text-[12px] fill-[#4C1D95] font-bold"
          >
            {selectedYLabel === 'frequency' ? 'Frequency' : selectedYLabel ? selectedYLabel : '(Select Y Axis)'}
          </text>

          {/* Bars and click targets */}
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
                {/* Invisible full column hit-zone for easy click */}
                <rect
                  x={x1}
                  y={margin.top}
                  width={barW}
                  height={plotHeight}
                  fill="transparent"
                  className="hover:fill-purple-500/10 transition-colors"
                />

                {/* Rendered Bar */}
                {currentHeight > 0 && (
                  <rect
                    x={x1}
                    y={yTop}
                    width={barW}
                    height={barH}
                    fill="#C4B5FD"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    className="transition-all duration-200"
                  />
                )}

                {/* Bar Value text */}
                <rect
                  x={midX - 12}
                  y={yTop - 18}
                  width="24"
                  height="16"
                  rx="6"
                  fill="#EDE9FE"
                  stroke="#7C3AED"
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={yTop - 6}
                  textAnchor="middle"
                  className="text-[11px] fill-[#4C1D95] font-black pointer-events-none"
                >
                  {currentHeight}
                </text>
              </g>
            );
          })}

          {/* Axes Lines */}
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

          {/* X ticks */}
          {Array.from(new Set([...classes.map(c => c.lower), maxBound])).map(boundary => {
            const xPos = scaleX(boundary);
            return (
              <g key={`bound-${boundary}`}>
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
                  {boundary}
                </text>
              </g>
            );
          })}

          {/* X Axis Label display */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-[12px] fill-[#4C1D95] font-bold"
          >
            {selectedXLabel === 'messages' ? 'Messages sent (n)' : selectedXLabel ? selectedXLabel : '(Select X Axis)'}
          </text>
        </svg>
      </div>

      {/* Action and feedback */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={handleCheck}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#FDE047]" /> Check My Histogram
        </button>

        {feedback && (
          <div
            className={`flex-1 text-xs md:text-sm p-3 rounded-2xl flex items-start gap-2.5 ${
              feedback.type === 'success'
                ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]'
                : 'bg-[#FFF1F2] border border-[#FECDD3] text-[#9F1239]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#F43F5E] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{feedback.message}</p>
              {showIdHint && feedback.messageId && (
                <p className="italic text-xs mt-1 text-[#047857]">
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

interface InteractivePolygonDrawerProps {
  classes: FrequencyClass[];
  variableName: string;
  unit: string;
  symbol: string;
  onSuccess: () => void;
  showIdHint?: boolean;
}

export const InteractivePolygonDrawer: React.FC<InteractivePolygonDrawerProps> = ({
  classes,
  variableName,
  unit,
  symbol,
  onSuccess,
  showIdHint = false,
}) => {
  const maxScale = 14;
  // Midpoint inputs
  const [userMidpoints, setUserMidpoints] = useState<string[]>(classes.map(() => ''));
  const [midpointsChecked, setMidpointsChecked] = useState<boolean>(false);
  const [midpointError, setMidpointError] = useState<string | null>(null);

  // User plotted points: map each class index to frequency (or null if unplotted)
  const [plottedFreqs, setPlottedFreqs] = useState<(number | null)[]>(classes.map(() => null));
  const [joined, setJoined] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'success' | 'error'; message: string; messageId?: string } | null>(null);

  const correctMidpoints = classes.map(c => (c.lower + c.upper) / 2);

  const handleVerifyMidpoints = () => {
    for (let i = 0; i < classes.length; i++) {
      const val = parseFloat(userMidpoints[i]);
      if (isNaN(val) || Math.abs(val - correctMidpoints[i]) > 0.1) {
        setMidpointError(`Check row ${i + 1}: (${classes[i].lower} + ${classes[i].upper}) ÷ 2 = ${correctMidpoints[i]}`);
        return;
      }
    }
    setMidpointError(null);
    setMidpointsChecked(true);
  };

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

  const handlePlotClick = (e: React.MouseEvent<SVGElement>, classIdx: number) => {
    const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - svgRect.top;
    const relativeY = (clickY / svgRect.height) * svgHeight;

    const rawFreq = ((margin.top + plotHeight - relativeY) / plotHeight) * maxScale;
    const snappedFreq = Math.max(0, Math.min(maxScale, Math.round(rawFreq)));

    const next = [...plottedFreqs];
    next[classIdx] = snappedFreq;
    setPlottedFreqs(next);
  };

  const handleCheckPolygon = () => {
    if (!joined) {
      setFeedback({
        type: 'error',
        message: 'Click the "Join points with ruler" button to connect your plotted midpoints!',
        messageId: 'Klik tombol "Hubungkan titik dengan penggaris" untuk menghubungkan titik-titik Anda!',
      });
      return;
    }

    for (let i = 0; i < classes.length; i++) {
      if (plottedFreqs[i] === null) {
        setFeedback({
          type: 'error',
          message: `You haven't plotted a point for class ${classes[i].lower} ≤ ${symbol} < ${classes[i].upper} yet!`,
          messageId: `Anda belum memplot titik untuk kelas ${classes[i].lower} ≤ ${symbol} < ${classes[i].upper}!`,
        });
        return;
      }
      if (plottedFreqs[i] !== classes[i].frequency) {
        setFeedback({
          type: 'error',
          message: `Point ${i + 1} at midpoint ${correctMidpoints[i]} is plotted at frequency ${plottedFreqs[i]}, but should be ${classes[i].frequency}!`,
          messageId: `Titik ${i + 1} pada titik tengah ${correctMidpoints[i]} berada di frekuensi ${plottedFreqs[i]}, seharusnya ${classes[i].frequency}!`,
        });
        return;
      }
    }

    // Success!
    setFeedback({
      type: 'success',
      message: 'Magnificent work! All midpoints accurately calculated, plotted at (midpoint, frequency), and joined with straight lines! 🌟',
      messageId: 'Hebat sekali! Semua titik tengah tepat dihitung, diplot pada (titik tengah, frekuensi), dan dihubungkan garis lurus! 🌟',
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    onSuccess();
  };

  // Build polyline points
  const polylineCoords = classes
    .map((cls, idx) => {
      const f = plottedFreqs[idx];
      if (f === null) return null;
      const mid = correctMidpoints[idx];
      return `${scaleX(mid)},${scaleY(f)}`;
    })
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E9D5FF] space-y-4">
      <div>
        <h4 className="font-bold text-[#4C1D95] text-lg">Task B: Complete Midpoints & Draw Frequency Polygon</h4>
        <p className="text-xs text-[#7C3AED]">
          Step 1: Calculate the midpoint for each interval. Step 2: Plot the points on the grid and join them with straight lines!
        </p>
      </div>

      {/* Midpoint calculation table */}
      <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-[#EDE9FE]">
        <h5 className="font-bold text-xs text-[#4C1D95] mb-2">Step 1: Fill in the Midpoints</h5>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {classes.map((cls, idx) => (
            <div key={`mid-calc-${idx}`} className="bg-white p-2 rounded-xl border border-[#DDD6FE] text-center">
              <span className="text-[11px] font-bold text-[#6D28D9] block">{cls.label}</span>
              <span className="text-[10px] text-gray-500 block mb-1">Freq: {cls.frequency}</span>
              <input
                type="number"
                step="0.5"
                placeholder="Midpoint"
                value={userMidpoints[idx]}
                disabled={midpointsChecked}
                onChange={e => {
                  const n = [...userMidpoints];
                  n[idx] = e.target.value;
                  setUserMidpoints(n);
                }}
                className={`w-full text-center text-xs font-bold py-1 px-1.5 rounded-lg border ${
                  midpointsChecked
                    ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                    : 'border-[#C4B5FD] text-[#4C1D95]'
                } focus:outline-none`}
              />
            </div>
          ))}
        </div>

        {!midpointsChecked ? (
          <div className="mt-2.5 flex items-center justify-between">
            <button
              onClick={handleVerifyMidpoints}
              className="text-xs px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl"
            >
              Verify Midpoints
            </button>
            {midpointError && (
              <span className="text-xs text-[#E11D48] font-bold">{midpointError}</span>
            )}
          </div>
        ) : (
          <p className="text-xs text-[#059669] font-bold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Midpoints verified! Now click on the grid below at each midpoint column to plot the dots.
          </p>
        )}
      </div>

      {/* Step 2: SVG Plotting Canvas */}
      {midpointsChecked && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#4C1D95]">
              Step 2: Plot (midpoint, frequency) on the grid
            </span>
            <button
              onClick={() => setJoined(!joined)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-colors ${
                joined
                  ? 'bg-[#CCFBF1] text-[#0F766E] border-[#14B8A6]'
                  : 'bg-[#F5F3FF] text-[#7C3AED] border-[#C4B5FD] hover:bg-[#EDE9FE]'
              }`}
            >
              {joined ? '✓ Points Connected' : 'Join points with ruler 📏'}
            </button>
          </div>

          <div className="w-full overflow-x-auto flex justify-center py-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full max-w-[540px] h-auto select-none font-sans"
            >
              {/* Y grid lines and ticks (0 to 14 by 2) */}
              {[0, 2, 4, 6, 8, 10, 12, 14].map(tick => {
                const yPos = scaleY(tick);
                return (
                  <g key={`poly-ytick-${tick}`}>
                    <line
                      x1={margin.left}
                      y1={yPos}
                      x2={svgWidth - margin.right}
                      y2={yPos}
                      stroke="#EDE9FE"
                      strokeWidth="1.5"
                      strokeDasharray={tick === 0 ? 'none' : '3,3'}
                    />
                    <text
                      x={margin.left - 10}
                      y={yPos + 4}
                      textAnchor="end"
                      className="text-[12px] fill-[#6D28D9] font-bold"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Y Axis Label */}
              <text
                transform={`rotate(-90 ${margin.left - 40} ${margin.top + plotHeight / 2})`}
                x={margin.left - 40}
                y={margin.top + plotHeight / 2}
                textAnchor="middle"
                className="text-[12px] fill-[#4C1D95] font-bold"
              >
                Frequency (Students)
              </text>

              {/* Midpoint vertical guide dashed lines & click zones */}
              {classes.map((cls, idx) => {
                const mid = correctMidpoints[idx];
                const xMid = scaleX(mid);
                const x1 = scaleX(cls.lower);
                const x2 = scaleX(cls.upper);
                const colW = x2 - x1;

                return (
                  <g
                    key={`mid-guide-${idx}`}
                    className="cursor-pointer"
                    onClick={e => handlePlotClick(e, idx)}
                  >
                    {/* Invisible click zone for this column */}
                    <rect
                      x={x1}
                      y={margin.top}
                      width={colW}
                      height={plotHeight}
                      fill="transparent"
                      className="hover:fill-teal-500/10 transition-colors"
                    />

                    {/* Vertical dashed guideline for midpoint */}
                    <line
                      x1={xMid}
                      y1={margin.top}
                      x2={xMid}
                      y2={margin.top + plotHeight}
                      stroke="#CCFBF1"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                  </g>
                );
              })}

              {/* Connected lines if joined */}
              {joined && polylineCoords && (
                <polyline
                  points={polylineCoords}
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Plotted Dots */}
              {classes.map((cls, idx) => {
                const f = plottedFreqs[idx];
                if (f === null) return null;
                const mid = correctMidpoints[idx];
                const xMid = scaleX(mid);
                const yPos = scaleY(f);

                return (
                  <g key={`plotted-dot-${idx}`}>
                    <circle
                      cx={xMid}
                      cy={yPos}
                      r="6.5"
                      fill="#FFFFFF"
                      stroke="#0D9488"
                      strokeWidth="3"
                    />
                    <text
                      x={xMid}
                      y={yPos - 12}
                      textAnchor="middle"
                      className="text-[11px] fill-[#0F766E] font-black"
                    >
                      ({mid}, {f})
                    </text>
                  </g>
                );
              })}

              {/* Axes Lines */}
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

              {/* X ticks for midpoints */}
              {correctMidpoints.map((mid, idx) => {
                const xPos = scaleX(mid);
                return (
                  <g key={`mid-tick-${idx}`}>
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
                      className="text-[12px] fill-[#0F766E] font-bold"
                    >
                      {mid}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Label */}
              <text
                x={margin.left + plotWidth / 2}
                y={svgHeight - 10}
                textAnchor="middle"
                className="text-[12px] fill-[#4C1D95] font-bold"
              >
                Messages sent (Midpoints)
              </text>
            </svg>
          </div>

          {/* Action button & feedback */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCheckPolygon}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FDE047]" /> Check My Frequency Polygon
            </button>

            {feedback && (
              <div
                className={`flex-1 text-xs md:text-sm p-3 rounded-2xl flex items-start gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]'
                    : 'bg-[#FFF1F2] border border-[#FECDD3] text-[#9F1239]'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#F43F5E] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{feedback.message}</p>
                  {showIdHint && feedback.messageId && (
                    <p className="italic text-xs mt-1 text-[#047857]">
                      🇮🇩 {feedback.messageId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
