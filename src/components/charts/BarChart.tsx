import React, { useState } from 'react';
import { DiscreteCategory } from '../../types';

interface BarChartProps {
  data: DiscreteCategory[];
  variableName: string;
  unit?: string;
  title?: string;
  maxFreq?: number;
  highlightIndex?: number;
  interactive?: boolean;
  onBarClick?: (index: number) => void;
  selectedBar?: number | null;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  variableName,
  unit = '',
  title,
  maxFreq,
  highlightIndex,
  interactive = true,
  onBarClick,
  selectedBar,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const highestFreq = maxFreq ?? Math.max(...data.map(d => d.frequency), 1);
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

  const totalSlots = data.length;
  // Slot width includes the bar and the gap
  const slotWidth = plotWidth / totalSlots;
  // Clear gap between bars! (Cambridge requirement for Bar Charts: bars have spaces between them)
  const barWidth = slotWidth * 0.62;
  const barOffset = (slotWidth - barWidth) / 2;

  const scaleY = (freq: number) => {
    return margin.top + plotHeight - (freq / yCeil) * plotHeight;
  };

  return (
    <div className={`relative bg-white rounded-3xl p-4 shadow-sm border-2 border-[#EAB308]/40 hover:border-[#EAB308] transition-colors ${className}`}>
      {title && (
        <div className="text-center mb-2">
          <h4 className="font-extrabold text-[#18181B] text-base md:text-lg">{title}</h4>
          <span className="text-xs text-[#18181B] bg-[#FEF08A] font-extrabold px-3 py-0.5 rounded-full inline-block mt-0.5 border border-[#EAB308] shadow-xs">
            📊 Bar Chart (Discrete Data • Gaps Between Bars)
          </span>
        </div>
      )}

      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
          role="img"
          aria-label={`Bar chart showing ${variableName}`}
        >
          {/* Y Gridlines and ticks */}
          {yTicks.map(tick => {
            const yPos = scaleY(tick);
            return (
              <g key={`bar-ytick-${tick}`}>
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

          {/* Y Axis Label */}
          <text
            transform={`rotate(-90 ${margin.left - 35} ${margin.top + plotHeight / 2})`}
            x={margin.left - 35}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            className="text-[13px] fill-[#18181B] font-black tracking-wide"
          >
            Frequency (Number of students)
          </text>

          {/* Bars with GAPS between them */}
          {data.map((item, idx) => {
            const slotX = margin.left + idx * slotWidth;
            const barX = slotX + barOffset;
            const yTop = scaleY(item.frequency);
            const barH = (item.frequency / yCeil) * plotHeight;
            const midX = barX + barWidth / 2;

            const isHovered = hoveredIdx === idx;
            const isSelected = selectedBar === idx;
            const isHighlighted = highlightIndex === idx;

            // Warm cheerful yellows with clean black borders
            let fillColor = idx % 2 === 0 ? '#FBBF24' : '#FACC15';
            let strokeColor = '#18181B';

            if (isSelected || isHighlighted) {
              fillColor = '#F59E0B';
              strokeColor = '#18181B';
            } else if (isHovered) {
              fillColor = '#FEF08A';
              strokeColor = '#18181B';
            }

            return (
              <g
                key={`barchart-item-${idx}`}
                className={interactive ? 'cursor-pointer transition-all duration-200' : ''}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onBarClick && onBarClick(idx)}
              >
                {/* Bar */}
                <rect
                  x={barX}
                  y={yTop}
                  width={barWidth}
                  height={barH}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  rx="4"
                  className="transition-colors duration-200"
                />

                {/* Value on top of bar */}
                {item.frequency > 0 && (
                  <g>
                    <rect
                      x={midX - 12}
                      y={yTop - 20}
                      width="24"
                      height="16"
                      rx="6"
                      fill={isHovered || isHighlighted ? '#18181B' : '#FEF08A'}
                      stroke="#18181B"
                      strokeWidth="1.2"
                    />
                    <text
                      x={midX}
                      y={yTop - 8}
                      textAnchor="middle"
                      className={`text-[11px] font-black ${
                        isHovered || isHighlighted ? 'fill-[#FACC15]' : 'fill-[#18181B]'
                      }`}
                    >
                      {item.frequency}
                    </text>
                  </g>
                )}

                {/* X Category Label under bar */}
                <text
                  x={midX}
                  y={margin.top + plotHeight + 20}
                  textAnchor="middle"
                  className="text-[12px] fill-[#18181B] font-bold"
                >
                  {item.category}
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

          {/* X Axis Title */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-[13px] fill-[#18181B] font-black"
          >
            {variableName} {unit ? `(${unit})` : ''}
          </text>
        </svg>
      </div>

      {/* Tooltip on hover */}
      {hoveredIdx !== null && (
        <div className="mt-2 text-center text-xs md:text-sm font-semibold bg-[#FEF08A] border-2 border-[#18181B] py-1.5 px-3 rounded-2xl text-[#18181B] shadow-xs animate-fadeIn">
          Category: <span className="font-black text-[#18181B] underline decoration-[#EAB308]">{data[hoveredIdx].category}</span>
          {' • '}
          Frequency: <span className="font-black text-[#B45309]">{data[hoveredIdx].frequency} students</span>
          {' • '}
          <em>Notice: Gaps between bars for discrete/separate data!</em>
        </div>
      )}
    </div>
  );
};
