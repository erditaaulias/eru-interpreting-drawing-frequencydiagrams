import React, { useState } from 'react';
import { SCREEN_TIME_DATA, HEIGHTS_DATA, BOBA_WAITING_DATA, calculateTotal, calculateMidpoint } from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { FrequencyPolygon } from '../charts/FrequencyPolygon';
import { OverlaidChart } from '../charts/OverlaidChart';
import { StatCat } from '../mascot/StatCat';
import { Smartphone, Ruler, Coffee, Table as TableIcon, BarChart3, TrendingUp, Sparkles, Stethoscope, CloudSun, ShoppingBag, Music } from 'lucide-react';

interface Section2RealLifeProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section2RealLife: React.FC<Section2RealLifeProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'chart' | 'table' | 'overlay'>('chart');

  const stories = [
    {
      dataset: SCREEN_TIME_DATA,
      icon: <Smartphone className="w-5 h-5 text-[#8B5CF6]" />,
      defaultChart: 'histogram' as const,
      color: 'from-[#EDE9FE] to-[#DDD6FE]',
    },
    {
      dataset: HEIGHTS_DATA,
      icon: <Ruler className="w-5 h-5 text-[#EC4899]" />,
      defaultChart: 'polygon' as const,
      color: 'from-[#FCE7F3] to-[#FBCFE8]',
    },
    {
      dataset: BOBA_WAITING_DATA,
      icon: <Coffee className="w-5 h-5 text-[#14B8A6]" />,
      defaultChart: 'overlaid' as const,
      color: 'from-[#CCFBF1] to-[#99F6E4]',
    },
  ];

  const current = stories[activeStoryIdx];
  const dataset = current.dataset;
  const totalStudents = calculateTotal(dataset.classes);

  return (
    <section id="section-2" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
            Section 2 • Real-Life Data
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
            Frequency Diagrams in Real Life
          </h2>
          <p className="text-sm text-[#6D28D9] mt-1">
            Data is everywhere in our lives—from how long we scroll our phones, to our class height records, to bubble tea queues!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#0D9488] italic mt-0.5">
              🇮🇩 Contoh nyata: Waktu layar HP, tinggi badan siswi Kelas 8, dan waktu antre boba.
            </p>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="bg-white p-1 rounded-2xl border border-[#DDD6FE] shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
              viewMode === 'chart'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Chart View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" /> Table View
          </button>
          <button
            onClick={() => setViewMode('overlay')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
              viewMode === 'overlay'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Compare Overlay
          </button>
        </div>
      </div>

      {/* Story Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stories.map((story, idx) => {
          const isActive = activeStoryIdx === idx;
          return (
            <button
              key={story.dataset.id}
              onClick={() => setActiveStoryIdx(idx)}
              className={`p-4 rounded-3xl text-left border transition-all flex items-start gap-3.5 ${
                isActive
                  ? 'bg-white border-[#7C3AED] shadow-md ring-2 ring-[#C4B5FD]'
                  : 'bg-white/70 border-[#E9D5FF] hover:bg-white hover:border-[#C4B5FD]'
              }`}
            >
              <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${story.color} shrink-0`}>
                {story.icon}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7C3AED] block">
                  Story {idx + 1}
                </span>
                <h4 className="font-bold text-xs md:text-sm text-[#4C1D95] truncate">
                  {story.dataset.title}
                </h4>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {story.dataset.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Story Interactive Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-6">
        {/* Story Intro */}
        <div className="bg-[#FAF5FF] p-4 rounded-2xl border border-[#EDE9FE] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl flex items-center gap-2">
              <span>{dataset.title}</span>
              <span className="text-xs bg-[#EDE9FE] text-[#6D28D9] px-2.5 py-0.5 rounded-full font-bold">
                Total = {totalStudents} students
              </span>
            </h3>
            <p className="text-xs md:text-sm text-[#5B21B6] leading-relaxed">
              {dataset.story}
            </p>
          </div>
          <div className="shrink-0 bg-white px-3 py-2 rounded-xl border border-[#DDD6FE] text-xs text-[#7C3AED] font-semibold">
            ✨ {dataset.realWorldContext}
          </div>
        </div>

        {/* Display Content based on viewMode */}
        <div>
          {viewMode === 'table' ? (
            /* Frequency Table View */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EDE9FE] text-[#4C1D95] text-xs md:text-sm">
                    <th className="p-3 rounded-l-2xl font-extrabold">
                      Class Interval ({dataset.unit})
                    </th>
                    <th className="p-3 font-extrabold">Midpoint</th>
                    <th className="p-3 font-extrabold text-center">Tally / Calculation</th>
                    <th className="p-3 rounded-r-2xl font-extrabold text-right">
                      Frequency (Number of Students)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3E8FF] text-xs md:text-sm font-semibold text-[#4C1D95]">
                  {dataset.classes.map((cls, idx) => {
                    const mid = calculateMidpoint(cls);
                    return (
                      <tr key={`row-${idx}`} className="hover:bg-[#FAF5FF] transition-colors">
                        <td className="p-3 font-bold text-[#7C3AED]">
                          {cls.lower} ≤ {dataset.symbol} &lt; {cls.upper}
                        </td>
                        <td className="p-3 text-[#0D9488]">
                          ({cls.lower} + {cls.upper}) ÷ 2 = <strong>{mid}</strong>
                        </td>
                        <td className="p-3 text-center">
                          <span className="font-mono text-xs tracking-widest text-gray-500">
                            {'|'.repeat(cls.frequency)}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="inline-block bg-[#EDE9FE] text-[#4C1D95] px-3 py-1 rounded-full font-black">
                            {cls.frequency}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#FAF5FF] font-black text-[#4C1D95] text-xs md:text-sm">
                    <td className="p-3" colSpan={3}>
                      Total Frequency (Σf):
                    </td>
                    <td className="p-3 text-right text-[#7C3AED] text-base">
                      {totalStudents} students
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : viewMode === 'chart' ? (
            /* Selected Diagram */
            <div>
              {current.defaultChart === 'histogram' && (
                <Histogram
                  classes={dataset.classes}
                  variableName={dataset.variableName}
                  unit={dataset.unit}
                  symbol={dataset.symbol}
                  title={`Histogram: ${dataset.title}`}
                />
              )}
              {current.defaultChart === 'polygon' && (
                <FrequencyPolygon
                  classes={dataset.classes}
                  variableName={dataset.variableName}
                  unit={dataset.unit}
                  symbol={dataset.symbol}
                  title={`Frequency Polygon: ${dataset.title}`}
                />
              )}
              {current.defaultChart === 'overlaid' && (
                <OverlaidChart
                  classes={dataset.classes}
                  variableName={dataset.variableName}
                  unit={dataset.unit}
                  symbol={dataset.symbol}
                  title={`Overlaid: ${dataset.title}`}
                />
              )}
            </div>
          ) : (
            /* Overlaid Comparison View */
            <OverlaidChart
              classes={dataset.classes}
              variableName={dataset.variableName}
              unit={dataset.unit}
              symbol={dataset.symbol}
              title={`Combined View: ${dataset.title}`}
            />
          )}
        </div>
      </div>

      {/* Real-Life Context Banner: Who uses frequency diagrams? */}
      <div className="bg-gradient-to-r from-[#FAF5FF] via-white to-[#F0FDFA] rounded-3xl p-6 border border-[#DDD6FE] shadow-sm">
        <h3 className="font-extrabold text-[#4C1D95] text-base md:text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
          Who uses frequency diagrams in the real world?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE9FE] shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#FCE7F3] text-[#EC4899] shrink-0">
              <Stethoscope className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-xs text-[#4C1D95]">Doctors &amp; Clinics</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Track growth percentiles (height and baby weight) over time using polygons.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE9FE] shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#CCFBF1] text-[#0D9488] shrink-0">
              <CloudSun className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-xs text-[#4C1D95]">Meteorologists</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Record daily rainfall in Jakarta (mm) to forecast monsoon flash flooding.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE9FE] shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#EDE9FE] text-[#7C3AED] shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-xs text-[#4C1D95]">Cafés &amp; Malls</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Graph customer wait times to decide when to open extra cashier counters.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE9FE] shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#FEF3C7] text-[#D97706] shrink-0">
              <Music className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-xs text-[#4C1D95]">Streaming Apps</h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Spotify &amp; YouTube analyse audio streaming durations to recommend music!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
