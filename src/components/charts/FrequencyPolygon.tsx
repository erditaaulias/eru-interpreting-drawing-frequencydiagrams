import React, { useState } from 'react';
import { FrequencyClass } from '../../types';

interface SeriesData {
  label: string;
  classes: FrequencyClass[];
  color: string;
  strokeColor: string;
}

interface FrequencyPolygonProps {
  classes: FrequencyClass[];
  variableName: string;
  unit: string;
  symbol?: string;
  title?: string;
  maxFreq?: number;
  highlightIndex?: number;
  interactive?: boolean;
  closedToAxis?: boolean;
  secondSeries?: SeriesData;
  seriesLabel?: string;
  onPointClick?: (index: number) => void;
  selectedPoint?: number | null;
  className?: string;
}

export const FrequencyPolygon: React.FC<FrequencyPolygonProps> = ({
  classes,
  variableName,
  unit,
  symbol = 'x',
  title,
  maxFreq,
  highlightIndex,
  interactive = true,
  closedToAxis = false,
  secondSeries,
  seriesLabel = 'Dataset',
  onPointClick,
  selectedPoint,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!classes || classes.length === 0) return null;

  const minBound = classes[0].lower;
  const maxBound = classes[classes.length - 1].upper;
  const classWidth = classes[0].upper - classes[0].lower;

  const allFreqs = [
    ...classes.map(c => c.frequency),
    ...(secondSeries ? secondSeries.classes.map(c => c.frequency) : []),
  ];
  const highestFreq = maxFreq ?? Math.max(...allFreqs, 1);
  const yCeil = Math.ceil(highestFreq * 1.15);
  const yTicksCount = yCeil <= 10 ? yCeil : 5;
  const yTicks = Array.from({ length: yTicksCount + 1 }, (_, i) => 
    Math.round((yCeil / yTicksCount) * i)
  ).filter((v, idx, arr) => arr.indexOf(v) === idx);

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 310;
  const margin = { top: 35, right: 30, bottom: 55, left: 55 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // If closed to axis, extend boundaries by one half class width on each side
  const effectiveMin = closedToAxis ? minBound - classWidth : minBound;
  const effectiveMax = closedToAxis ? maxBound + classWidth : maxBound;

  const scaleX = (val: number) => {
    return margin.left + ((val - effectiveMin) / (effectiveMax - effectiveMin)) * plotWidth;
  };

  const scaleY = (freq: number) => {
    return margin.top + plotHeight - (freq / yCeil) * plotHeight;
  };

  // Primary points
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

  // Calculate full line points path
  const linePoints = [...points];
  if (closedToAxis && points.length > 0) {
    const firstMid = (classes[0].lower + classes[0].upper) / 2;
    const lastMid = (classes[classes.length - 1].lower + classes[classes.length - 1].upper) / 2;
    const startPoint = { x: scaleX(firstMid - classWidth), y: scaleY(0), mid: firstMid - classWidth, frequency: 0 };
    const endPoint = { x: scaleX(lastMid + classWidth), y: scaleY(0), mid: lastMid + classWidth, frequency: 0 };
    linePoints.unshift(startPoint as any);
    linePoints.push(endPoint as any);
  }

  const polylineStr = linePoints.map(p => `${p.x},${p.y}`).join(' ');

  // Second series if provided (e.g. for comparison 8A vs 8B)
  let secondPolylineStr = '';
  let secondPoints: any[] = [];
  if (secondSeries) {
    secondPoints = secondSeries.classes.map((cls, idx) => {
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
    secondPolylineStr = secondPoints.map(p => `${p.x},${p.y}`).join(' ');
  }

  return (
    <div className={`relative bg-white rounded-3xl p-4 shadow-sm border border-[#E9D5FF] ${className}`}>
      {title && (
        <div className="text-center mb-2">
          <h4 className="font-bold text-[#4C1D95] text-base md:text-lg">{title}</h4>
          <span className="text-xs text-[#0D9488] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full inline-block mt-0.5">
            Frequency Polygon (Plotted at Midpoints • Straight Lines)
          </span>
        </div>
      )}

      {/* Legend if second series */}
      {secondSeries && (
        <div className="flex justify-center gap-6 mb-2 text-xs font-bold">
          <div className="flex items-center gap-2 text-[#7C3AED]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#7C3AED] inline-block"></span>
            {seriesLabel}
          </div>
          <div className="flex items-center gap-2 text-[#0D9488]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0D9488] inline-block"></span>
            {secondSeries.label}
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[540px] h-auto select-none font-sans"
          role="img"
          aria-label={`Frequency polygon showing ${variableName}`}
        >
          {/* Background grid lines */}
          {yTicks.map(tick => {
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

          {/* Vertical dashed drop lines from points down to x-axis for midpoints */}
          {points.map((p, idx) => (
            <line
              key={`dropline-${idx}`}
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={margin.top + plotHeight}
              stroke="#DDD6FE"
              strokeWidth="1.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Second Series Polyline if present */}
          {secondSeries && (
            <g>
              <polyline
                points={secondPolylineStr}
                fill="none"
                stroke={secondSeries.strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {secondPoints.map((p, idx) => (
                <circle
                  key={`second-pt-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="#FFFFFF"
                  stroke={secondSeries.strokeColor}
                  strokeWidth="2.5"
                />
              ))}
            </g>
          )}

          {/* Primary Frequency Polygon Line (Straight lines!) */}
          <polyline
            points={polylineStr}
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Plotted Midpoint Dots */}
          {points.map((p, idx) => {
            const isHovered = hoveredIdx === idx;
            const isSelected = selectedPoint === idx;
            const isHighlighted = highlightIndex === idx;

            let fillColor = '#FFFFFF';
            let strokeColor = '#7C3AED';
            let r = 5.5;

            if (isSelected || isHighlighted) {
              fillColor = '#FDBA74';
              strokeColor = '#EA580C';
              r = 7.5;
            } else if (isHovered) {
              fillColor = '#99F6E4';
              strokeColor = '#0D9488';
              r = 7;
            }

            return (
              <g
                key={`point-${idx}`}
                className={interactive ? 'cursor-pointer' : ''}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onPointClick && onPointClick(idx)}
              >
                {/* Larger invisible hit zone for easy mobile tapping */}
                <circle cx={p.x} cy={p.y} r="18" fill="transparent" />

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                  className="transition-all duration-200"
                />

                {/* Plotted point value */}
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  className="text-[11px] fill-[#4C1D95] font-black"
                >
                  {p.frequency}
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

          {/* X Axis Class Boundary & Midpoint Ticks */}
          {classes.map((cls, idx) => {
            const mid = (cls.lower + cls.upper) / 2;
            const xMid = scaleX(mid);
            const xLower = scaleX(cls.lower);

            return (
              <g key={`x-labels-${idx}`}>
                {/* Boundary tick */}
                <line
                  x1={xLower}
                  y1={margin.top + plotHeight}
                  x2={xLower}
                  y2={margin.top + plotHeight + 4}
                  stroke="#A78BFA"
                  strokeWidth="1.5"
                />
                {idx === 0 && (
                  <text
                    x={xLower}
                    y={margin.top + plotHeight + 16}
                    textAnchor="middle"
                    className="text-[10px] fill-[#7C3AED] font-medium"
                  >
                    {cls.lower}
                  </text>
                )}

                {/* Midpoint tick with accent */}
                <line
                  x1={xMid}
                  y1={margin.top + plotHeight}
                  x2={xMid}
                  y2={margin.top + plotHeight + 6}
                  stroke="#4C1D95"
                  strokeWidth="2"
                />
                <text
                  x={xMid}
                  y={margin.top + plotHeight + 20}
                  textAnchor="middle"
                  className="text-[11px] fill-[#4C1D95] font-bold"
                >
                  {mid}
                </text>
              </g>
            );
          })}

          {/* Last boundary label */}
          <text
            x={scaleX(maxBound)}
            y={margin.top + plotHeight + 16}
            textAnchor="middle"
            className="text-[10px] fill-[#7C3AED] font-medium"
          >
            {maxBound}
          </text>

          {/* X Axis Label */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 8}
            textAnchor="middle"
            className="text-[13px] fill-[#4C1D95] font-bold"
          >
            {variableName} ({unit}) [Midpoints marked]
          </text>
        </svg>
      </div>

      {/* Interactive Tooltip Card at Bottom */}
      {hoveredIdx !== null && (
        <div className="mt-2 text-center text-xs md:text-sm font-semibold bg-[#F5F3FF] border border-[#DDD6FE] py-1.5 px-3 rounded-xl text-[#4C1D95] animate-fadeIn">
          Class: <span className="font-bold text-[#7C3AED]">{classes[hoveredIdx].lower} ≤ {symbol} &lt; {classes[hoveredIdx].upper} {unit}</span>
          {' • '}
          Plotted Midpoint: <span className="font-bold text-[#0D9488]">({(classes[hoveredIdx].lower + classes[hoveredIdx].upper) / 2}, {classes[hoveredIdx].frequency})</span>
        </div>
      )}
    </div>
  );
};
