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
    { section: '2. Real-Life Contexts', duration: '8 min', note: 'Explore screen time, height & boba queue data.' },
    { section: '3. Concept: Hist vs Poly', duration: '7 min', note: 'Emphasise touching bars vs midpoint coordinates.' },
    { section: '4. Drawing Wizard', duration: '15 min', note: 'Model step-by-step with ruler; try boba example.' },
    { section: '5. Interpreting Graphs', duration: '10 min', note: 'Modal class, cumulative totals, fraction of total.' },
    { section: '6. Practice Zone', duration: '15 min', note: 'Independent work: 3 levels (drawing + detective).' },
    { section: '7. Summary & Exit Ticket', duration: '5 min', note: 'Self-assessment checklist and reflection submission.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-2 border-[#DDD6FE] max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#F3E8FF]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#EDE9FE] text-[#7C3AED]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#4C1D95] text-xl">
                Teacher Dashboard &amp; Lesson Plan
              </h3>
              <p className="text-xs text-[#7C3AED] font-semibold">
                Cambridge Lower Secondary Mathematics Stage 8 • Unit 16.1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF5FF] hover:bg-[#EDE9FE] text-[#4C1D95] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presentation Mode Toggle */}
        <div className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="font-bold text-sm text-[#0F766E] flex items-center gap-1.5">
              <Presentation className="w-4 h-4" /> Classroom Presentation Mode
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Increases font size, centers diagrams, and optimizes contrast for classroom projectors.
            </p>
          </div>
          <button
            onClick={onTogglePresentation}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              isPresentationMode
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'bg-white border border-[#99F6E4] text-[#0F766E] hover:bg-[#CCFBF1]'
            }`}
          >
            {isPresentationMode ? '✓ Presentation ON' : 'Turn ON for Projector'}
          </button>
        </div>

        {/* Suggested Timings Table */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#4C1D95] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7C3AED]" /> Suggested 65-Minute Lesson Timings
          </h4>
          <div className="divide-y divide-[#F3E8FF] border border-[#EDE9FE] rounded-2xl overflow-hidden text-xs">
            {timings.map(t => (
              <div key={t.section} className="p-3 bg-[#FAF5FF] flex justify-between items-center gap-2">
                <span className="font-bold text-[#4C1D95]">{t.section}</span>
                <span className="text-gray-500 hidden sm:inline">{t.note}</span>
                <span className="bg-[#EDE9FE] text-[#7C3AED] px-2.5 py-1 rounded-full font-black shrink-0">
                  {t.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cambridge Examiner Key Insights */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-2">
          <h4 className="font-bold text-sm text-[#92400E] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#D97706]" /> Cambridge Examiner Tips &amp; Common Misconceptions
          </h4>
          <ul className="text-xs text-[#78350F] space-y-1.5 list-disc list-inside">
            <li>
              <strong>Gaps between bars:</strong> Students often confuse histograms with bar charts. Emphasise that continuous data has continuous boundaries.
            </li>
            <li>
              <strong>Polygon midpoints:</strong> Students frequently plot at class endpoints. Remind: Midpoint is always <code>(lower + upper) / 2</code>.
            </li>
            <li>
              <strong>Straight lines only:</strong> Polygons must be drawn with a ruler connecting successive midpoints; never accept curved sketches.
            </li>
            <li>
              <strong>Grouped data limitations:</strong> Students often falsely claim an exact individual max or min exists. Grouped data gives frequencies per interval, not exact individual measurements!
            </li>
          </ul>
        </div>

        {/* Answers Quick Reference */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-sm text-[#4C1D95] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Exercise Answers Quick Sheet
          </h4>
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-200 text-gray-700 space-y-1 font-mono text-[11px]">
            <p>• <strong>Level 1 (Reading):</strong> (a) 25, (b) 4 ≤ t &lt; 6, (c) 10, (d) 7, (e) 7</p>
            <p>• <strong>Level 2 (Messages):</strong> Bars: 4, 9, 12, 7, 3 | Midpoints: 5, 15, 25, 35, 45</p>
            <p>• <strong>Level 3 (Detective):</strong> A: Gaps error; B: Plotted at upper boundary; C: Uneven Y-axis</p>
            <p>• <strong>Level 3 (Scenarios):</strong> Fruit = Bar Chart; 100m = Histogram; Two classes = Frequency Polygons</p>
            <p>• <strong>Level 3 (Comparison):</strong> Class 8B takes <em>longer</em>, peaks further to the <em>right</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};
