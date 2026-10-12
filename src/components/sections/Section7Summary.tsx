import React, { useState, useEffect } from 'react';
import { LEARNING_GOALS } from '../../data/lessonData';
import { StatCat } from '../mascot/StatCat';
import { Printer, Download, Check, Star, Sparkles, Send, Award, Heart, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section7SummaryProps {
  masteredGoals: string[];
  onToggleGoal: (id: string) => void;
  showIdHint: boolean;
}

export const Section7Summary: React.FC<Section7SummaryProps> = ({
  masteredGoals,
  onToggleGoal,
  showIdHint,
}) => {
  // Exit ticket reflection saved in localStorage
  const [reflection, setReflection] = useState<string>('');
  const [exitQ1, setExitQ1] = useState<string>('');
  const [exitQ2, setExitQ2] = useState<string>('');
  const [exitQ3, setExitQ3] = useState<string>('');
  const [submittedTicket, setSubmittedTicket] = useState<boolean>(false);
  const [claimedBadge, setClaimedBadge] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('stat_exit_reflection');
    if (saved) setReflection(saved);

    const savedTicket = localStorage.getItem('stat_exit_submitted');
    if (savedTicket === 'true') setSubmittedTicket(true);

    const savedBadge = localStorage.getItem('stat_badge_claimed');
    if (savedBadge === 'true') setClaimedBadge(true);
  }, []);

  const handleSaveReflection = (val: string) => {
    setReflection(val);
    localStorage.setItem('stat_exit_reflection', val);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTicket(true);
    localStorage.setItem('stat_exit_submitted', 'true');
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handleClaimBadge = () => {
    setClaimedBadge(true);
    localStorage.setItem('stat_badge_claimed', 'true');
    confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="section-7" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
          Section 7 • Summary &amp; Exit Ticket
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
          Cheat Sheet &amp; Your Exit Ticket
        </h2>
        <p className="text-sm text-[#6D28D9] mt-1">
          Review the golden rules, reflect on today's learning, and claim your Data Detective badge!
        </p>
      </div>

      {/* Visual Cheat Sheet Card (Print-friendly) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#C4B5FD] shadow-sm space-y-6 print-page">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#F3E8FF]">
          <div>
            <span className="text-xs font-black uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
              Quick Revision Reference
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[#4C1D95] mt-1">
              Unit 16.1 Cambridge Frequency Diagrams Cheat Sheet
            </h3>
          </div>
          <button
            onClick={handlePrint}
            className="no-print px-4 py-2 rounded-2xl bg-[#FAF5FF] hover:bg-[#F3E8FF] border border-[#DDD6FE] text-xs font-bold text-[#4C1D95] flex items-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-[#7C3AED]" /> Print / Save Cheat Sheet
          </button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] space-y-2">
            <h4 className="font-extrabold text-sm text-[#4C1D95] flex items-center gap-1.5">
              <span>📊</span> Histogram Rules
            </h4>
            <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside font-medium">
              <li>For <strong>continuous data</strong> (time, height, weight).</li>
              <li>Bars <strong>must touch</strong> (no gaps!).</li>
              <li>Horizontal axis = continuous number line of boundaries.</li>
              <li>Equal width: <strong>Height = Frequency</strong>.</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F766E] flex items-center gap-1.5">
              <span>📈</span> Polygon Steps
            </h4>
            <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside font-medium">
              <li>Plot at <strong>(Midpoint, Frequency)</strong>.</li>
              <li>Join dots with <strong>straight lines</strong> (ruler!).</li>
              <li>Never draw smooth freehand curves.</li>
              <li>Best for comparing two datasets on one grid.</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
            <h4 className="font-extrabold text-sm text-[#92400E] flex items-center gap-1.5">
              <span>🧮</span> Midpoint Formula
            </h4>
            <div className="p-2 bg-white rounded-xl border border-[#FDE68A] text-center font-mono text-xs font-black text-[#92400E]">
              Midpoint = <br />
              (Lower + Upper) ÷ 2
            </div>
            <p className="text-[11px] text-[#78350F] leading-tight">
              e.g. for 150 ≤ h &lt; 155:<br />(150 + 155) / 2 = <strong>152.5</strong>
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-2xl bg-[#FCE7F3] border border-[#FBCFE8] space-y-2">
            <h4 className="font-extrabold text-sm text-[#9D174D] flex items-center gap-1.5">
              <span>💡</span> Interpreting Tips
            </h4>
            <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside font-medium">
              <li><strong>Modal class</strong> = tallest bar / peak.</li>
              <li><strong>"At least x"</strong> = sum all bars from x upwards.</li>
              <li><strong>"Less than x"</strong> = sum bars below x.</li>
              <li>Grouped data <em>cannot</em> give exact individual values!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Re-show Learning Goals Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              Final Self-Assessment: Check Your Mastery
            </h3>
            <p className="text-xs text-[#7C3AED]">
              Are you confident with all 6 learning outcomes for Cambridge Stage 8 Unit 16.1?
            </p>
          </div>
          <span className="text-xs font-bold bg-[#EDE9FE] text-[#7C3AED] px-3 py-1 rounded-xl self-start">
            {masteredGoals.length} / {LEARNING_GOALS.length} Mastered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {LEARNING_GOALS.map((goal, idx) => {
            const isDone = masteredGoals.includes(goal.id);
            return (
              <div
                key={goal.id}
                onClick={() => onToggleGoal(goal.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isDone
                    ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                    : 'bg-[#FAF5FF] border-[#E9D5FF] hover:border-[#C4B5FD]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone ? 'bg-[#10B981] text-white' : 'border border-[#C4B5FD] bg-white'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="text-xs">
                  <p className={`font-bold ${isDone ? 'text-[#065F46]' : 'text-[#4C1D95]'}`}>
                    {goal.textEn}
                  </p>
                  {showIdHint && (
                    <p className="text-[11px] text-[#0D9488] italic mt-0.5">
                      🇮🇩 {goal.textId}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exit Ticket Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#4C1D95] text-lg md:text-xl">
              Class Exit Ticket (3 Quick Checks + Reflection)
            </h3>
            <p className="text-xs text-[#7C3AED]">
              Answer these 3 quick checks and write your takeaway before class ends. (Saved locally on your device!)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Exit Q1 */}
            <div className="p-3.5 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] space-y-2">
              <label className="text-xs font-bold text-[#4C1D95] block">
                1. For a histogram of continuous data, do bars have gaps?
              </label>
              <select
                value={exitQ1}
                onChange={e => setExitQ1(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border border-[#C4B5FD] bg-white text-[#4C1D95]"
              >
                <option value="">Choose answer...</option>
                <option value="no">No, bars touch with no gaps</option>
                <option value="yes">Yes, bars must have gaps</option>
              </select>
            </div>

            {/* Exit Q2 */}
            <div className="p-3.5 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] space-y-2">
              <label className="text-xs font-bold text-[#4C1D95] block">
                2. What point is plotted on a frequency polygon?
              </label>
              <select
                value={exitQ2}
                onChange={e => setExitQ2(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border border-[#C4B5FD] bg-white text-[#4C1D95]"
              >
                <option value="">Choose answer...</option>
                <option value="midpoint">(Midpoint, Frequency)</option>
                <option value="upper">(Upper boundary, Frequency)</option>
                <option value="lower">(Lower boundary, Frequency)</option>
              </select>
            </div>

            {/* Exit Q3 */}
            <div className="p-3.5 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] space-y-2">
              <label className="text-xs font-bold text-[#4C1D95] block">
                3. Can you find the exact maximum height from grouped data?
              </label>
              <select
                value={exitQ3}
                onChange={e => setExitQ3(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border border-[#C4B5FD] bg-white text-[#4C1D95]"
              >
                <option value="">Choose answer...</option>
                <option value="no">No, we only know its class interval</option>
                <option value="yes">Yes, it is always the upper boundary</option>
              </select>
            </div>
          </div>

          {/* Reflection prompt */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4C1D95] block">
              Personal Reflection: One thing I learned today (or one tip I will remember for exams):
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I learned that continuous data means histogram bars must touch, and in polygons points are always at midpoints with a ruler!..."
              value={reflection}
              onChange={e => handleSaveReflection(e.target.value)}
              className="w-full p-3 text-xs md:text-sm rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-md text-xs md:text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Exit Ticket
            </button>

            {submittedTicket && (
              <span className="text-xs text-[#065F46] font-bold bg-[#ECFDF5] px-3.5 py-1.5 rounded-xl border border-[#A7F3D0] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Exit Ticket recorded in local memory!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* FINAL BADGE: DATA DETECTIVE */}
      <div className="bg-gradient-to-r from-[#EDE9FE] via-[#FCE7F3] to-[#CCFBF1] rounded-3xl p-6 md:p-10 border-2 border-[#DDD6FE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <StatCat
            mood={claimedBadge ? 'celebrating' : 'detective'}
            size="lg"
            speech={
              claimedBadge
                ? 'Yay! Congratulations! You are officially an accredited Stage 8 Data Detective! 🎉'
                : 'You worked so hard today! Tap to claim your official Data Detective badge!'
            }
          />
        </div>

        <div className="text-center md:text-right space-y-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7C3AED] bg-white px-3 py-1 rounded-full shadow-xs">
              Cambridge Lower Secondary Award
            </span>
            <h3 className="text-2xl font-black text-[#4C1D95] mt-1">
              "Data Detective" Badge
            </h3>
            <p className="text-xs text-[#6D28D9]">
              Awarded for mastering Histograms &amp; Frequency Polygons in Unit 16.1
            </p>
          </div>

          <button
            onClick={handleClaimBadge}
            className={`px-6 py-3 rounded-2xl font-black text-xs md:text-sm transition-all transform active:scale-95 shadow-lg flex items-center gap-2 mx-auto md:ml-auto ${
              claimedBadge
                ? 'bg-[#10B981] text-white'
                : 'bg-[#F59E0B] hover:bg-[#D97706] text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {claimedBadge ? 'Badge Claimed! 🌟 Detective Awarded' : 'Claim Data Detective Badge!'}
          </button>
        </div>
      </div>
    </section>
  );
};
