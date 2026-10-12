import React, { useState } from 'react';
import { FrequencyClass } from '../../types';

interface OverlaidChartProps {
  classes: FrequencyClass[];
  variableName: string;
  unit: string;
  symbol?: string;
  title?: string;
  showBars?: boolean;
  showPolygon?: boolean;
  className?: string;
}

export const OverlaidChart: React.FC<OverlaidChartProps> = ({
  classes,
  variableName,
  unit,
  symbol = 'x',
  title,
  showBars = true,
  showPolygon = true,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!classes || classes.length === 0) return null;

  const minBound = classes[0].lower;
  const maxBound = classes[classes.length - 1].upper;
  const highestFreq = Math.max(...classes.map(c => c.frequency), 1);
  const yCeil = Math.ceil(highestFreq * 1.15);
  const yTicksCount = yCeil <= 10 ? yCeil : 5;
  const yTicks = Array.from({ length: yTicksCount + 1 }, (_, i) => 
    Math.round((yCeil / yTicksCount) * i)
  ).filter((v, idx, arr) => arr.indexOf(v) === idx);

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

  const points = classes.map((cls, idx) => {
    const mid = (cls.lower + cls.upper) / 2;
    return {
      x: scaleX(mid),
      y: scaleY(cls.frequency),
      mid,
      frequency: cls.frequency,
      cls,
      idx,
    };
  });

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className={`relative bg-white rounded-3xl p-4 shadow-sm border border-[#E9D5FF] ${className}`}>
      {title && (
        <div className="text-center mb-2">
          <h4 className="font-bold text-[#4C1D95] text-base md:text-lg">{title}</h4>
          <span className="text-xs text-[#6D28D9] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full inline-block mt-0.5">
            Histogram + Frequency Polygon Overlaid
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-2 text-xs font-bold">
        {showBars && (
          <div className="flex items-center gap-1.5 text-[#6D28D9]">
            <span className="w-3.5 h-3.5 rounded bg-[#DDD6FE] border border-[#7C3AED] inline-block"></span>
            Histogram Bars
          </div>
        )}
        {showPolygon && (
          <div className="flex items-center gap-1.5 text-[#0D9488]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0D9488] inline-block"></span>
            Polygon (Midpoint line)
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
          role="img"
          aria-label={`Overlaid chart for ${variableName}`}
        >
          {/* Grid lines */}
          {yTicks.map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`over-ytick-${tick}`}>
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
            Frequency (Students)
          </text>

          {/* Histogram Bars */}
          {showBars && classes.map((cls, idx) => {
            const x1 = scaleX(cls.lower);
            const x2 = scaleX(cls.upper);
            const barW = Math.max(0, x2 - x1);
            const barH = (cls.frequency / yCeil) * plotHeight;
            const yTop = scaleY(cls.frequency);
            const isHovered = hoveredIdx === idx;

            return (
              <rect
                key={`over-bar-${idx}`}
                x={x1}
                y={yTop}
                width={barW}
                height={barH}
                fill={isHovered ? '#C4B5FD' : '#E9D5FF'}
                stroke="#8B5CF6"
                strokeWidth="1.8"
                fillOpacity="0.85"
                className="transition-colors duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}

          {/* Polygon line connecting tops of bars centres */}
          {showPolygon && (
            <g>
              <polyline
                points={polylineStr}
                fill="none"
                stroke="#0D9488"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p, idx) => (
                <circle
                  key={`over-pt-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="#FFFFFF"
                  stroke="#0D9488"
                  strokeWidth="3"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </g>
          )}

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

      {hoveredIdx !== null && (
        <div className="mt-2 text-center text-xs md:text-sm font-semibold bg-[#F5F3FF] border border-[#DDD6FE] py-1 px-3 rounded-xl text-[#4C1D95]">
          Notice: The polygon dot at <span className="text-[#0D9488]">x = {(classes[hoveredIdx].lower + classes[hoveredIdx].upper) / 2}</span> sits exactly at the centre top of the bar for <span className="text-[#7C3AED]">{classes[hoveredIdx].lower} ≤ {symbol} &lt; {classes[hoveredIdx].upper}</span>!
        </div>
      )}
    </div>
  );
};
