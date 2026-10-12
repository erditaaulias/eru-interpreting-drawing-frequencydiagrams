import React, { useState } from 'react';
import { SCREEN_TIME_DATA, SIBLINGS_DATA, BOBA_WAITING_DATA, calculateTotal } from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { BarChart } from '../charts/BarChart';
import { Smartphone, Users, Coffee, Table as TableIcon, BarChart3, Sparkles, Stethoscope, CloudSun, ShoppingBag, Music } from 'lucide-react';

interface Section2RealLifeProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section2RealLife: React.FC<Section2RealLifeProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const stories = [
    {
      dataset: SCREEN_TIME_DATA,
      icon: <Smartphone className="w-5 h-5 text-[#18181B]" />,
      chartType: 'histogram' as const,
      color: 'bg-[#FACC15]',
      badge: 'Continuous Data • Histogram (Touching Bars)',
    },
    {
      dataset: SIBLINGS_DATA,
      icon: <Users className="w-5 h-5 text-[#18181B]" />,
      chartType: 'barchart' as const,
      color: 'bg-[#FEF08A]',
      badge: 'Discrete Data • Bar Chart (Gaps Between Bars)',
    },
    {
      dataset: BOBA_WAITING_DATA,
      icon: <Coffee className="w-5 h-5 text-[#18181B]" />,
      chartType: 'histogram' as const,
      color: 'bg-[#FDE047]',
      badge: 'Continuous Data • Histogram (Touching Bars)',
    },
  ];

  const current = stories[activeStoryIdx];
  const dataset = current.dataset;
  const totalStudents = calculateTotal(dataset.classes, dataset.discreteData);

  return (
    <section id="section-2" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border-2 border-[#18181B] shadow-xs">
            Section 2 • Real-Life Data
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1.5">
            Histograms &amp; Bar Charts in Real Life 📱
          </h2>
          <p className="text-sm text-[#18181B] font-semibold mt-1">
            Learn to spot the difference: when to use a <strong>Histogram</strong> (continuous data) vs a <strong>Bar Chart</strong> (discrete data).
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              🇮🇩 Contoh nyata: Waktu layar HP (kontinu - histogram), jumlah saudara kandung (diskrit - diagram batang), dan waktu antre boba (kontinu - histogram).
            </p>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="bg-[#FEFCE8] p-1 rounded-2xl border-2 border-[#18181B] shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'chart'
                ? 'bg-[#FACC15] text-[#18181B] shadow-xs border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Chart View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-[#FACC15] text-[#18181B] shadow-xs border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" /> Table View
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
              className={`p-4 rounded-3xl text-left border-2 transition-all flex items-start gap-3.5 ${
                isActive
                  ? 'bg-[#FEFCE8] border-[#18181B] shadow-md ring-2 ring-[#FACC15]'
                  : 'bg-white border-[#EAB308]/30 hover:border-[#18181B] hover:bg-[#FEFCE8]/40'
              }`}
            >
              <div className={`p-2.5 rounded-2xl ${story.color} shrink-0 border-2 border-[#18181B] shadow-xs`}>
                {story.icon}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] block">
                  Story {idx + 1}
                </span>
                <h4 className="font-extrabold text-xs md:text-sm text-[#18181B] truncate">
                  {story.dataset.title}
                </h4>
                <p className="text-[11px] text-gray-600 font-semibold truncate mt-0.5">
                  {story.dataset.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Story Interactive Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-6">
        <div className="bg-[#FEFCE8] p-4.5 rounded-2xl border-2 border-[#FEF08A] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl">
                {dataset.title}
              </h3>
              <span className="text-xs bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B] px-3 py-0.5 rounded-full font-black shadow-xs">
                Total = {totalStudents} students
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#18181B] font-semibold leading-relaxed">
              {dataset.story}
            </p>
          </div>
          <div className="shrink-0 bg-white px-3.5 py-2 rounded-xl border-2 border-[#18181B]/15 text-xs text-[#B45309] font-black shadow-xs">
            ✨ {dataset.realWorldContext}
          </div>
        </div>

        {/* Display Content */}
        <div>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FEF08A] text-[#18181B] text-xs md:text-sm border-2 border-[#18181B]">
                    <th className="p-3 rounded-l-2xl font-black">
                      {dataset.dataType === 'continuous'
                        ? `Class Interval (${dataset.unit})`
                        : `Category (${dataset.variableName})`}
                    </th>
                    <th className="p-3 font-black text-center">Tally / Calculation</th>
                    <th className="p-3 rounded-r-2xl font-black text-right">
                      Frequency (Number of Students)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs md:text-sm font-bold text-[#18181B]">
                  {dataset.classes?.map((cls, idx) => (
                    <tr key={`row-${idx}`} className="hover:bg-[#FEFCE8] transition-colors">
                      <td className="p-3 font-black text-[#18181B]">
                        {cls.lower} ≤ {dataset.symbol} &lt; {cls.upper}
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-mono text-xs tracking-widest text-[#B45309] font-black">
                          {'|'.repeat(cls.frequency)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="inline-block bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B] px-3 py-0.5 rounded-full font-black shadow-xs">
                          {cls.frequency}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {dataset.discreteData?.map((item, idx) => (
                    <tr key={`drow-${idx}`} className="hover:bg-[#FEFCE8] transition-colors">
                      <td className="p-3 font-black text-[#18181B]">
                        {item.category}
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-mono text-xs tracking-widest text-[#B45309] font-black">
                          {'|'.repeat(item.frequency)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="inline-block bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B] px-3 py-0.5 rounded-full font-black shadow-xs">
                          {item.frequency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#FEFCE8] font-black text-[#18181B] text-xs md:text-sm border-t-2 border-[#18181B]">
                    <td className="p-3" colSpan={2}>
                      Total Frequency (Σf):
                    </td>
                    <td className="p-3 text-right text-[#18181B] text-base font-black">
                      {totalStudents} students
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div>
              {current.chartType === 'histogram' && dataset.classes && (
                <Histogram
                  classes={dataset.classes}
                  variableName={dataset.variableName}
                  unit={dataset.unit || ''}
                  symbol={dataset.symbol}
                  title={`Histogram: ${dataset.title}`}
                />
              )}
              {current.chartType === 'barchart' && dataset.discreteData && (
                <BarChart
                  data={dataset.discreteData}
                  variableName={dataset.variableName}
                  unit={dataset.unit}
                  title={`Bar Chart: ${dataset.title}`}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Real-Life Context Banner */}
      <div className="bg-gradient-to-r from-[#FEFCE8] via-white to-[#FEF08A]/40 rounded-3xl p-6 border-2 border-[#EAB308]/40 shadow-sm">
        <h3 className="font-extrabold text-[#18181B] text-base md:text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#EAB308]" />
          Who uses frequency diagrams in the real world?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border-2 border-[#18181B]/15 shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#FACC15] text-[#18181B] border border-[#18181B] shrink-0">
              <Stethoscope className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-black text-xs text-[#18181B]">Doctors &amp; Clinics</h4>
              <p className="text-[11px] text-gray-600 mt-0.5 font-medium">
                Track patient recovery hours and health vitals using continuous histograms.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border-2 border-[#18181B]/15 shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#FEF08A] text-[#18181B] border border-[#18181B] shrink-0">
              <CloudSun className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-black text-xs text-[#18181B]">Meteorologists</h4>
              <p className="text-[11px] text-gray-600 mt-0.5 font-medium">
                Record daily rainfall in Jakarta (mm) using histograms to forecast flooding.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border-2 border-[#18181B]/15 shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#18181B] text-[#FACC15] shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-black text-xs text-[#18181B]">Cafés &amp; Malls</h4>
              <p className="text-[11px] text-gray-600 mt-0.5 font-medium">
                Graph drink sales per flavour using bar charts with spaces between categories.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border-2 border-[#18181B]/15 shadow-xs flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[#FDE047] text-[#18181B] border border-[#18181B] shrink-0">
              <Music className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-black text-xs text-[#18181B]">Streaming Apps</h4>
              <p className="text-[11px] text-gray-600 mt-0.5 font-medium">
                Spotify &amp; YouTube analyse track listening durations with continuous histograms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
