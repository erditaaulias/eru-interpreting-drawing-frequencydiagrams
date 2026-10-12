import React, { useState, useEffect } from 'react';
import { LEARNING_GOALS } from '../../data/lessonData';
import { StatCat } from '../mascot/StatCat';
import { Printer, Check, Star, Sparkles, Send } from 'lucide-react';
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
        <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
          Section 7 • Summary &amp; Exit Ticket
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1">
          Cheat Sheet &amp; Your Exit Ticket
        </h2>
        <p className="text-sm text-[#18181B] font-semibold mt-1">
          Review the golden rules, reflect on today's learning, and claim your Data Detective badge!
        </p>
      </div>

      {/* Visual Cheat Sheet Card (Print-friendly) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/50 hover:border-[#EAB308] shadow-sm space-y-6 print-page">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-black uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
              Quick Revision Reference
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[#18181B] mt-1">
              Unit 16.1 Cambridge Frequency Diagrams Cheat Sheet
            </h3>
          </div>
          <button
            onClick={handlePrint}
            className="no-print px-4 py-2 rounded-2xl bg-[#FFFDF5] hover:bg-[#FEF08A] border-2 border-[#18181B] text-xs font-black text-[#18181B] flex items-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-[#CA8A04]" /> Print / Save Cheat Sheet
          </button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#EAB308] space-y-2">
            <h4 className="font-black text-sm text-[#CA8A04] flex items-center gap-1.5">
              <span>📊</span> Histogram Rules
            </h4>
            <ul className="text-xs text-gray-800 space-y-1.5 list-disc list-inside font-semibold">
              <li>For <strong>continuous data</strong> (time, height, weight).</li>
              <li>Bars <strong>must touch</strong> (NO gaps!).</li>
              <li>Horizontal axis = continuous number line of boundaries.</li>
              <li>Equal class widths: <strong>Height = Frequency</strong>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#EAB308] space-y-2">
            <h4 className="font-black text-sm text-[#CA8A04] flex items-center gap-1.5">
              <span>📊</span> Bar Chart Rules
            </h4>
            <ul className="text-xs text-gray-800 space-y-1.5 list-disc list-inside font-semibold">
              <li>For <strong>discrete or categorical</strong> data (pets, shoe sizes, colours).</li>
              <li>Bars <strong>must have equal gaps</strong> between them!</li>
              <li>Categories labelled individually under each bar.</li>
              <li>Height of each bar = frequency.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#18181B] space-y-2">
            <h4 className="font-black text-sm text-[#18181B] flex items-center gap-1.5">
              <span>⚖️</span> Discrete vs Continuous
            </h4>
            <div className="text-[11px] text-gray-800 font-semibold space-y-1">
              <p>• <strong>Discrete:</strong> Counted in whole numbers $\to$ Bar Chart (Gaps!).</p>
              <p>• <strong>Continuous:</strong> Measured on a continuous scale $\to$ Histogram (No gaps!).</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF08A] border-2 border-[#18181B] space-y-2">
            <h4 className="font-black text-sm text-[#18181B] flex items-center gap-1.5">
              <span>💡</span> Interpreting Tips
            </h4>
            <ul className="text-xs text-gray-900 space-y-1.5 list-disc list-inside font-bold">
              <li><strong>Modal class/category</strong> = tallest bar.</li>
              <li><strong>"At least x"</strong> = sum all bars from x upwards.</li>
              <li><strong>"Less than x"</strong> = sum bars below x.</li>
              <li>Grouped continuous data cannot give exact individual values!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Re-show Learning Goals Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-[#EAB308] fill-[#EAB308]" />
              Final Self-Assessment: Check Your Mastery
            </h3>
            <p className="text-xs text-[#18181B] font-semibold">
              Are you confident with all 6 learning outcomes for Histograms and Bar Charts in Cambridge Stage 8 Unit 16.1?
            </p>
          </div>
          <span className="text-xs font-black bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B] px-3.5 py-1 rounded-xl self-start shadow-xs">
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
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  isDone
                    ? 'bg-[#FEF9C3] border-[#18181B] shadow-xs'
                    : 'bg-[#FFFDF5] border-[#18181B]/15 hover:border-[#18181B]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone ? 'bg-[#18181B] text-[#FACC15]' : 'border-2 border-[#18181B] bg-white'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="text-xs">
                  <p className="font-black text-[#18181B]">
                    {goal.textEn}
                  </p>
                  {showIdHint && (
                    <p className="text-[11px] text-[#854D0E] italic mt-0.5 font-bold">
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
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FEF08A] flex items-center justify-center text-[#18181B] border-2 border-[#18181B] shadow-xs">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#18181B] text-lg md:text-xl">
              Class Exit Ticket (3 Quick Checks + Reflection)
            </h3>
            <p className="text-xs text-[#18181B] font-semibold">
              Answer these 3 quick checks and write your takeaway before class ends. (Saved locally on your device!)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 bg-[#FFFDF5] rounded-2xl border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-[#18181B] block">
                1. For a histogram of continuous data, do bars have gaps?
              </label>
              <select
                value={exitQ1}
                onChange={e => setExitQ1(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border-2 border-[#18181B]/20 bg-white text-[#18181B] font-bold"
              >
                <option value="">Choose answer...</option>
                <option value="no">No, bars touch with no gaps</option>
                <option value="yes">Yes, bars must have gaps</option>
              </select>
            </div>

            <div className="p-3.5 bg-[#FFFDF5] rounded-2xl border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-[#18181B] block">
                2. In a bar chart for discrete data, how are bars drawn?
              </label>
              <select
                value={exitQ2}
                onChange={e => setExitQ2(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border-2 border-[#18181B]/20 bg-white text-[#18181B] font-bold"
              >
                <option value="">Choose answer...</option>
                <option value="gaps">With equal gaps between bars</option>
                <option value="touch">Bars touching each other</option>
              </select>
            </div>

            <div className="p-3.5 bg-[#FFFDF5] rounded-2xl border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-[#18181B] block">
                3. Can you find the exact maximum height from a grouped continuous histogram?
              </label>
              <select
                value={exitQ3}
                onChange={e => setExitQ3(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-xl border-2 border-[#18181B]/20 bg-white text-[#18181B] font-bold"
              >
                <option value="">Choose answer...</option>
                <option value="no">No, we only know its class interval</option>
                <option value="yes">Yes, it is always the upper boundary</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#18181B] block">
              Personal Reflection: One thing I learned today (or one tip I will remember for exams):
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I learned that histograms for continuous data must have touching bars, while bar charts for discrete data must have gaps between bars!..."
              value={reflection}
              onChange={e => handleSaveReflection(e.target.value)}
              className="w-full p-3 text-xs md:text-sm rounded-2xl bg-[#FFFDF5] border-2 border-[#18181B]/20 text-[#18181B] font-bold focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-2xl shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none text-xs md:text-sm flex items-center justify-center gap-2 border-2 border-[#18181B] transition-all"
            >
              <Send className="w-4 h-4" /> Submit Exit Ticket
            </button>

            {submittedTicket && (
              <span className="text-xs text-[#18181B] font-black bg-[#FEF08A] px-3.5 py-1.5 rounded-xl border border-[#EAB308] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#CA8A04]" /> Exit Ticket recorded in local memory!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* FINAL BADGE: DATA DETECTIVE */}
      <div className="bg-gradient-to-br from-[#FACC15] via-[#FDE047] to-[#FEF08A] text-[#18181B] rounded-3xl p-6 md:p-10 border-2 border-[#18181B] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
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
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FACC15] bg-[#18181B] px-3 py-1 rounded-full shadow-xs border border-[#18181B]">
              Cambridge Lower Secondary Award
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-[#18181B] mt-1">
              "Data Detective" Badge 🏅
            </h3>
            <p className="text-xs text-[#27272A] font-bold">
              Awarded for mastering Histograms &amp; Bar Charts in Unit 16.1
            </p>
          </div>

          <button
            onClick={handleClaimBadge}
            className={`px-6 py-3 rounded-2xl font-black text-xs md:text-sm transition-all transform active:scale-95 shadow-[0_4px_0_#000000] border-2 border-[#18181B] flex items-center gap-2 mx-auto md:ml-auto ${
              claimedBadge
                ? 'bg-[#FEF08A] text-[#18181B]'
                : 'bg-[#18181B] hover:bg-[#27272A] text-[#FACC15]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            {claimedBadge ? 'Badge Claimed! 🌟 Detective Awarded' : 'Claim Data Detective Badge!'}
          </button>
        </div>
      </div>
    </section>
  );
};
