import React from 'react';
import { X, Clock, GraduationCap, CheckCircle2, Presentation, Lightbulb } from 'lucide-react';

interface TeacherModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
}

export const TeacherModeModal: React.FC<TeacherModeModalProps> = ({
  isOpen,
  onClose,
  isPresentationMode,
  onTogglePresentation,
}) => {
  if (!isOpen) return null;

  const timings = [
    { section: '1. Warm-up & Goals', duration: '5 min', note: 'Engage with quick-poll & set expectations.' },
    { section: '2. Real-Life Contexts', duration: '8 min', note: 'Explore screen time (histogram) and siblings (bar chart).' },
    { section: '3. Concept: Hist vs Bar', duration: '7 min', note: 'Emphasise touching bars (continuous) vs gaps (discrete).' },
    { section: '4. Drawing Wizard', duration: '15 min', note: 'Model step-by-step with ruler: histogram and bar chart.' },
    { section: '5. Interpreting Graphs', duration: '10 min', note: 'Modal class, cumulative totals, comparing frequencies.' },
    { section: '6. Practice Zone', duration: '15 min', note: 'Independent work: 3 levels (drawing + detective).' },
    { section: '7. Summary & Exit Ticket', duration: '5 min', note: 'Self-assessment checklist and reflection submission.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-2 border-[#EAB308] max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FEF08A] text-[#18181B] border-2 border-[#18181B] shadow-xs">
              <GraduationCap className="w-6 h-6 text-[#CA8A04]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#18181B] text-xl">
                Teacher Dashboard &amp; Lesson Plan
              </h3>
              <p className="text-xs text-[#18181B] font-bold">
                Cambridge Lower Secondary Mathematics Stage 8 • Unit 16.1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#FEF08A] text-[#18181B] flex items-center justify-center transition-colors border border-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presentation Mode Toggle */}
        <div className="p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#EAB308] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="font-extrabold text-sm text-[#18181B] flex items-center gap-1.5">
              <Presentation className="w-4 h-4 text-[#CA8A04]" /> Classroom Presentation Mode
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Increases font size, centers diagrams, and optimizes contrast for classroom projectors.
            </p>
          </div>
          <button
            onClick={onTogglePresentation}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              isPresentationMode
                ? 'bg-[#FACC15] text-[#18181B] border-2 border-[#18181B] shadow-[0_2px_0_#CA8A04]'
                : 'bg-white border-2 border-[#18181B]/30 text-[#18181B] hover:bg-[#FEF08A]'
            }`}
          >
            {isPresentationMode ? '✓ Presentation ON' : 'Turn ON for Projector'}
          </button>
        </div>

        {/* Suggested Timings Table */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-sm text-[#18181B] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#CA8A04]" /> Suggested 65-Minute Lesson Timings
          </h4>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden text-xs">
            {timings.map(t => (
              <div key={t.section} className="p-3 bg-[#FAFAFA] flex justify-between items-center gap-2">
                <span className="font-bold text-[#18181B]">{t.section}</span>
                <span className="text-gray-500 hidden sm:inline">{t.note}</span>
                <span className="bg-[#FEF08A] text-[#18181B] border border-[#EAB308] px-3 py-1 rounded-full font-black shrink-0">
                  {t.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cambridge Examiner Key Insights */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-2">
          <h4 className="font-extrabold text-sm text-[#92400E] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#D97706]" /> Cambridge Examiner Tips &amp; Common Misconceptions
          </h4>
          <ul className="text-xs text-[#78350F] space-y-1.5 list-disc list-inside font-semibold">
            <li>
              <strong>Gaps between bars:</strong> Students often leave gaps in histograms or forget gaps in bar charts. Emphasise: Continuous = touching bars; Discrete = equal gaps between bars.
            </li>
            <li>
              <strong>Class boundary labels:</strong> In a histogram, values (0, 1, 2...) are marked on the ticks of the continuous number line, not floating between bars.
            </li>
            <li>
              <strong>Equal class widths:</strong> For equal class widths in Stage 8, bar height directly represents frequency.
            </li>
            <li>
              <strong>Grouped data limitations:</strong> Students often falsely claim an exact individual value exists. Grouped data gives frequencies per interval, not exact individual measurements!
            </li>
          </ul>
        </div>

        {/* Answers Quick Reference */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-sm text-[#18181B] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#CA8A04]" /> Exercise Answers Quick Sheet
          </h4>
          <div className="bg-[#18181B] text-[#FEF08A] p-3 rounded-2xl border border-black space-y-1 font-mono text-[11px]">
            <p>• <strong>Level 1 (Reading):</strong> (a) 25, (b) 4 ≤ t &lt; 6, (c) 10, (d) 7, (e) Continuous touching bars</p>
            <p>• <strong>Level 2 Task A (Histogram):</strong> Bars: 4, 9, 12, 7, 3 (Touching bars)</p>
            <p>• <strong>Level 2 Task B (Bar Chart):</strong> Bars: 8, 14, 10, 5, 3 (Gaps between bars)</p>
            <p>• <strong>Level 3 (Detective):</strong> A: Gaps in histogram; B: Discrete bars touching; C: Uneven Y-axis</p>
            <p>• <strong>Level 3 (Scenarios):</strong> Fruit = Bar Chart; 100m = Histogram; Shoe sizes = Bar Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
};
