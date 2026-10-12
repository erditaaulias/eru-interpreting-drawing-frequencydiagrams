import React, { useState } from 'react';
import { SCREEN_TIME_DATA, SIBLINGS_DATA, SCREEN_TIME_QUESTIONS, SIBLINGS_QUESTIONS } from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { BarChart } from '../charts/BarChart';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Sparkles, Lightbulb, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section5InterpretingProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section5Interpreting: React.FC<Section5InterpretingProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeSet, setActiveSet] = useState<'screen' | 'siblings'>('screen');
  const [qIndex, setQIndex] = useState(0);

  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { isCorrect: boolean; checked: boolean }>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const currentQuestions = activeSet === 'screen' ? SCREEN_TIME_QUESTIONS : SIBLINGS_QUESTIONS;
  const currentQ = currentQuestions[qIndex];

  const handleSelectOption = (option: string) => {
    setUserInputs(prev => ({ ...prev, [currentQ.id]: option }));
  };

  const handleCheckAnswer = () => {
    const input = userInputs[currentQ.id];
    if (input === undefined || input === '') return;

    let isCorrect = false;
    if (currentQ.type === 'number-input') {
      const numVal = parseFloat(input);
      isCorrect = Math.abs(numVal - (currentQ.correctAnswer as number)) < 0.01;
    } else {
      isCorrect = String(input).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    }

    setFeedback(prev => ({
      ...prev,
      [currentQ.id]: { isCorrect, checked: true },
    }));

    if (isCorrect) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  const currentResult = feedback[currentQ.id];

  return (
    <section id="section-5" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
            Section 5 • Reading &amp; Interpreting
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1">
            Interpreting Graphs: Quick Questions
          </h2>
          <p className="text-sm text-[#18181B] font-semibold mt-1">
            Inspect the graph on the left and answer the questions on the right for both continuous and discrete data!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              🇮🇩 Membaca Grafik: Temukan kelas modus, jumlah kumulatif frekuensi, dan pecahan dari histogram serta diagram batang.
            </p>
          )}
        </div>

        {/* Dataset Switcher */}
        <div className="bg-white p-1 rounded-2xl border-2 border-[#18181B]/20 shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              setActiveSet('screen');
              setQIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeSet === 'screen'
                ? 'bg-[#FACC15] text-[#18181B] shadow-[0_2px_0_#CA8A04] border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF9C3]'
            }`}
          >
            Screen Time Histogram (Continuous)
          </button>
          <button
            onClick={() => {
              setActiveSet('siblings');
              setQIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeSet === 'siblings'
                ? 'bg-[#FACC15] text-[#18181B] shadow-[0_2px_0_#CA8A04] border-2 border-[#18181B]'
                : 'text-[#18181B] hover:bg-[#FEF9C3]'
            }`}
          >
            Siblings Bar Chart (Discrete)
          </button>
        </div>
      </div>

      {/* Main 2-Column Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chart */}
        <div className="lg:col-span-6 space-y-4">
          {activeSet === 'screen' ? (
            <Histogram
              classes={SCREEN_TIME_DATA.classes || []}
              variableName={SCREEN_TIME_DATA.variableName}
              unit={SCREEN_TIME_DATA.unit || ''}
              symbol={SCREEN_TIME_DATA.symbol}
              title={SCREEN_TIME_DATA.title}
              highlightIndex={
                currentQ.id === 'st-q1' ? 2 :
                currentQ.id === 'st-q2' ? 4 :
                undefined
              }
            />
          ) : (
            <BarChart
              data={SIBLINGS_DATA.discreteData || []}
              variableName={SIBLINGS_DATA.variableName}
              title={SIBLINGS_DATA.title}
              highlightIndex={
                currentQ.id === 'sib-q1' ? 1 : undefined
              }
            />
          )}

          <div className="p-3 bg-[#FFFDF5] rounded-2xl border-2 border-[#FEF08A] text-xs text-[#18181B] font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EAB308] shrink-0" />
            <span>
              Tip: Hover or tap on the bars to inspect their exact frequencies and labels!
            </span>
          </div>
        </div>

        {/* Right Column: Question Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-xs font-black tracking-wider uppercase text-[#18181B] bg-[#FEF08A] px-2.5 py-1 rounded-full border border-[#EAB308]">
                Question {qIndex + 1} of {currentQuestions.length}
              </span>
              <div className="flex gap-1.5">
                {currentQuestions.map((q, idx) => {
                  const state = feedback[q.id];
                  return (
                    <button
                      key={`dot-${q.id}`}
                      onClick={() => setQIndex(idx)}
                      className={`w-6 h-6 rounded-full text-[10px] font-black transition-all ${
                        qIndex === idx
                          ? 'ring-2 ring-[#EAB308] ring-offset-1 scale-110'
                          : ''
                      } ${
                        state?.isCorrect
                          ? 'bg-[#FEF08A] text-[#18181B] border border-[#18181B]'
                          : state?.checked
                          ? 'bg-[#18181B] text-[#FACC15]'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-base md:text-lg font-black text-[#18181B]">
                {currentQ.questionEn}
              </h3>
              {showIdHint && currentQ.questionId && (
                <p className="text-xs text-[#B45309] italic font-bold">
                  🇮🇩 {currentQ.questionId}
                </p>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {currentQ.type === 'multiple-choice' || currentQ.type === 'true-false' ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options?.map(opt => {
                    const isSelected = userInputs[currentQ.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 rounded-2xl text-left text-xs md:text-sm font-bold border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B] shadow-sm'
                            : 'bg-[#FFFDF5] border-gray-200 text-[#18181B] hover:bg-[#FEF9C3]'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#CA8A04] stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B] block">
                    Enter your numerical answer:
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 6 or 18"
                    value={userInputs[currentQ.id] || ''}
                    onChange={e => setUserInputs(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleCheckAnswer()}
                    className="w-full text-base font-black p-3 rounded-2xl bg-[#FFFDF5] border-2 border-[#18181B]/20 text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                  />
                </div>
              )}
            </div>

            {/* Hint */}
            <div className="mt-4">
              <button
                onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="text-xs text-[#B45309] hover:underline font-black flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#EAB308]" />
                {showHint[currentQ.id] ? 'Hide Hint' : 'Need a hint?'}
              </button>
              {showHint[currentQ.id] && (
                <div className="mt-2 p-3 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] text-xs text-[#78350F] font-semibold animate-fadeIn">
                  <p>{currentQ.hintEn}</p>
                  {showIdHint && currentQ.hintId && (
                    <p className="italic text-[11px] text-[#B45309] mt-1 border-t border-[#FEF3C7] pt-1">
                      🇮🇩 {currentQ.hintId}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Explanation */}
            {currentResult?.checked && (
              <div
                className={`mt-4 p-4 rounded-2xl border-2 text-xs md:text-sm animate-fadeIn ${
                  currentResult.isCorrect
                    ? 'bg-[#FEF9C3] border-[#EAB308] text-[#18181B]'
                    : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {currentResult.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#CA8A04] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-black">
                      {currentResult.isCorrect ? 'Superb work! Correct!' : 'Not quite! Here is the explanation:'}
                    </strong>
                    <p className="mt-1 font-semibold">{currentQ.explanationEn}</p>
                    {showIdHint && currentQ.explanationId && (
                      <p className="italic text-[11px] mt-1 text-[#854D0E] font-bold">
                        🇮🇩 {currentQ.explanationId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (qIndex > 0) setQIndex(qIndex - 1);
              }}
              disabled={qIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-black text-[#18181B] bg-gray-100 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <button
              onClick={handleCheckAnswer}
              disabled={!userInputs[currentQ.id]}
              className="px-6 py-2.5 rounded-2xl text-xs md:text-sm font-black bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] border-2 border-[#18181B] shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>

            <button
              onClick={() => {
                if (qIndex < currentQuestions.length - 1) setQIndex(qIndex + 1);
              }}
              disabled={qIndex === currentQuestions.length - 1}
              className="px-3.5 py-2 rounded-xl text-xs font-black text-[#18181B] bg-gray-100 border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
