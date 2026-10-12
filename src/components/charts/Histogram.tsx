import React, { useState } from 'react';
import { FrequencyClass } from '../../types';

interface HistogramProps {
  classes: FrequencyClass[];
  variableName: string;
  unit: string;
  symbol?: string;
  title?: string;
  maxFreq?: number;
  highlightIndex?: number;
  interactive?: boolean;
  onBarClick?: (index: number) => void;
  selectedBar?: number | null;
  showValuesOnBars?: boolean;
  showMidpointLines?: boolean;
  className?: string;
}

export const Histogram: React.FC<HistogramProps> = ({
  classes,
  variableName,
  unit,
  symbol = 'x',
  title,
  maxFreq,
  highlightIndex,
  interactive = true,
  onBarClick,
  selectedBar,
  showValuesOnBars = true,
  showMidpointLines = false,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!classes || classes.length === 0) return null;

  const minBound = classes[0].lower;
  const maxBound = classes[classes.length - 1].upper;
  const highestFreq = maxFreq ?? Math.max(...classes.map(c => c.frequency), 1);
  // Round up y-axis ceiling for clean ticks
  const yCeil = Math.ceil(highestFreq * 1.15);
  const yTicksCount = yCeil <= 10 ? yCeil : 5;
  const yTicks = Array.from({ length: yTicksCount + 1 }, (_, i) => 
    Math.round((yCeil / yTicksCount) * i)
  ).filter((v, idx, arr) => arr.indexOf(v) === idx);

  // SVG coordinate system
  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 55 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleX = (val: number) => {
    return margin.left + ((val - minBound) / (maxBound - minBound)) * plotWidth;
  };

  const scaleY = (freq: number) => {
    return margin.top + plotHeight - (freq / yCeil) * plotHeight;
  };

  return (
    <div className={`relative bg-white rounded-3xl p-4 shadow-sm border border-[#E9D5FF] ${className}`}>
      {title && (
        <div className="text-center mb-2">
          <h4 className="font-bold text-[#4C1D95] text-base md:text-lg">{title}</h4>
          <span className="text-xs text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full inline-block mt-0.5">
            Histogram (Continuous Data • Touching Bars)
          </span>
        </div>
      )}

      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
          role="img"
          aria-label={`Histogram showing ${variableName}`}
        >
          {/* Subtle background grid lines */}
          {yTicks.map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`ytick-${tick}`}>
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
                  className="text-[12px] fill-[#6D28D9] font-semibold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Y Axis Label */}
          <text
            transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
            x={margin.left - 35}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            className="text-[13px] fill-[#4C1D95] font-bold tracking-wide"
          >
            Frequency (Number of students)
          </text>

          {/* Histogram Bars (Touching!) */}
          {classes.map((cls, idx) => {
            const x1 = scaleX(cls.lower);
            const x2 = scaleX(cls.upper);
            const barW = Math.max(0, x2 - x1);
            const barH = (cls.frequency / yCeil) * plotHeight;
            const yTop = scaleY(cls.frequency);

            const isHovered = hoveredIdx === idx;
            const isSelected = selectedBar === idx;
            const isHighlighted = highlightIndex === idx;

            let fillColor = '#DDD6FE'; // soft lavender
            let strokeColor = '#7C3AED';

            if (isSelected || isHighlighted) {
              fillColor = '#FDBA74'; // warm peach highlight
              strokeColor = '#EA580C';
            } else if (isHovered) {
              fillColor = '#99F6E4'; // mint highlight on hover
              strokeColor = '#0D9488';
            } else if (idx % 2 === 1) {
              fillColor = '#C4B5FD'; // subtle alternation
            }

            const midpoint = (cls.lower + cls.upper) / 2;
            const midX = scaleX(midpoint);

            return (
              <g
                key={`bar-${cls.lower}-${cls.upper}`}
                className={interactive ? 'cursor-pointer transition-all duration-200' : ''}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onBarClick && onBarClick(idx)}
              >
                {/* Bar rectangle */}
                <rect
                  x={x1}
                  y={yTop}
                  width={barW}
                  height={barH}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />

                {/* Optional Midpoint marker line inside bar */}
                {showMidpointLines && (
                  <line
                    x1={midX}
                    y1={yTop}
                    x2={midX}
                    y2={margin.top + plotHeight}
                    stroke="#4C1D95"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    opacity="0.6"
                  />
                )}

                {/* Frequency value badge on top of bar */}
                {showValuesOnBars && cls.frequency > 0 && (
                  <g>
                    <rect
                      x={midX - 12}
                      y={yTop - 20}
                      width="24"
                      height="16"
                      rx="8"
                      fill={isHovered || isHighlighted ? '#4C1D95' : '#EDE9FE'}
                    />
                    <text
                      x={midX}
                      y={yTop - 8}
                      textAnchor="middle"
                      className={`text-[11px] font-bold ${
                        isHovered || isHighlighted ? 'fill-white' : 'fill-[#5B21B6]'
                      }`}
                    >
                      {cls.frequency}
                    </text>
                  </g>
                )}
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

          {/* X Axis Class Boundary Ticks */}
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

          {/* X Axis Label */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-[13px] fill-[#4C1D95] font-bold"
          >
            {variableName} ({unit})
          </text>
        </svg>
      </div>

      {/* Interactive Tooltip Card at Bottom */}
      {hoveredIdx !== null && (
        <div className="mt-2 text-center text-xs md:text-sm font-semibold bg-[#F5F3FF] border border-[#DDD6FE] py-1.5 px-3 rounded-xl text-[#4C1D95] animate-fadeIn">
          Class: <span className="font-bold text-[#7C3AED]">{classes[hoveredIdx].lower} ≤ {symbol} &lt; {classes[hoveredIdx].upper} {unit}</span>
          {' • '}
          Frequency: <span className="font-bold text-[#EA580C]">{classes[hoveredIdx].frequency} students</span>
          {' • '}
          Midpoint: <span className="font-bold text-[#0D9488]">{(classes[hoveredIdx].lower + classes[hoveredIdx].upper) / 2}</span>
        </div>
      )}
    </div>
  );
};
