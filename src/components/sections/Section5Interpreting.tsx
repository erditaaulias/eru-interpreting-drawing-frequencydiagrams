import React, { useState } from 'react';
import { SCREEN_TIME_DATA, HEIGHTS_DATA, SCREEN_TIME_QUESTIONS, HEIGHTS_QUESTIONS } from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { FrequencyPolygon } from '../charts/FrequencyPolygon';
import { StatCat } from '../mascot/StatCat';
import { CheckCircle2, AlertCircle, HelpCircle, ChevronRight, ChevronLeft, Sparkles, Lightbulb, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section5InterpretingProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
}

export const Section5Interpreting: React.FC<Section5InterpretingProps> = ({
  onGoToSection,
  showIdHint,
}) => {
  const [activeSet, setActiveSet] = useState<'screen' | 'heights'>('screen');
  const [qIndex, setQIndex] = useState(0);

  // User responses state: keyed by question ID
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { isCorrect: boolean; checked: boolean }>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const currentQuestions = activeSet === 'screen' ? SCREEN_TIME_QUESTIONS : HEIGHTS_QUESTIONS;
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
          <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
            Section 5 • Reading &amp; Interpreting
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
            Interpreting Graphs: Quick Questions
          </h2>
          <p className="text-sm text-[#6D28D9] mt-1">
            Look at the graph on the left and solve one question at a time on the right!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#0D9488] italic mt-0.5">
              🇮🇩 Membaca Grafik: Temukan kelas modus, jumlah kumulatif frekuensi, dan pecahan dari grafik.
            </p>
          )}
        </div>

        {/* Dataset Switcher */}
        <div className="bg-white p-1 rounded-2xl border border-[#DDD6FE] shadow-xs flex items-center gap-1 self-stretch md:self-auto">
          <button
            onClick={() => {
              setActiveSet('screen');
              setQIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeSet === 'screen'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            Screen Time Histogram (30)
          </button>
          <button
            onClick={() => {
              setActiveSet('heights');
              setQIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeSet === 'heights'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-[#6D28D9] hover:bg-[#FAF5FF]'
            }`}
          >
            Heights Polygon (40)
          </button>
        </div>
      </div>

      {/* Main 2-Column Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chart */}
        <div className="lg:col-span-6 space-y-4">
          {activeSet === 'screen' ? (
            <Histogram
              classes={SCREEN_TIME_DATA.classes}
              variableName={SCREEN_TIME_DATA.variableName}
              unit={SCREEN_TIME_DATA.unit}
              symbol={SCREEN_TIME_DATA.symbol}
              title={SCREEN_TIME_DATA.title}
              highlightIndex={
                currentQ.id === 'st-q1' ? 2 : // modal class
                currentQ.id === 'st-q2' ? 4 : // at least 4 hrs
                undefined
              }
            />
          ) : (
            <FrequencyPolygon
              classes={HEIGHTS_DATA.classes}
              variableName={HEIGHTS_DATA.variableName}
              unit={HEIGHTS_DATA.unit}
              symbol={HEIGHTS_DATA.symbol}
              title={HEIGHTS_DATA.title}
              highlightIndex={
                currentQ.id === 'ht-q1' || currentQ.id === 'ht-q2' ? 2 : undefined
              }
            />
          )}

          <div className="p-3 bg-[#FAF5FF] rounded-2xl border border-[#EDE9FE] text-xs text-[#6D28D9] font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>
              Tip: Hover or tap on the {activeSet === 'screen' ? 'bars' : 'points'} to see their exact numerical values!
            </span>
          </div>
        </div>

        {/* Right Column: Question Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm flex flex-col justify-between space-y-6">
          <div>
            {/* Question Progress bar */}
            <div className="flex justify-between items-center pb-3 border-b border-[#F3E8FF]">
              <span className="text-xs font-black tracking-wider uppercase text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
                Question {qIndex + 1} of {currentQuestions.length}
              </span>
              <div className="flex gap-1.5">
                {currentQuestions.map((q, idx) => {
                  const state = feedback[q.id];
                  return (
                    <button
                      key={`dot-${q.id}`}
                      onClick={() => setQIndex(idx)}
                      className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
                        qIndex === idx
                          ? 'ring-2 ring-[#7C3AED] ring-offset-1'
                          : ''
                      } ${
                        state?.isCorrect
                          ? 'bg-[#10B981] text-white'
                          : state?.checked
                          ? 'bg-[#F43F5E] text-white'
                          : 'bg-[#EDE9FE] text-[#7C3AED]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Prompt */}
            <div className="mt-4 space-y-2">
              <h3 className="text-base md:text-lg font-black text-[#4C1D95]">
                {currentQ.questionEn}
              </h3>
              {showIdHint && currentQ.questionId && (
                <p className="text-xs text-[#0D9488] italic font-medium">
                  🇮🇩 {currentQ.questionId}
                </p>
              )}
            </div>

            {/* Input / Choice Area */}
            <div className="mt-5 space-y-3">
              {currentQ.type === 'multiple-choice' || currentQ.type === 'true-false' ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options?.map(opt => {
                    const isSelected = userInputs[currentQ.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 rounded-2xl text-left text-xs md:text-sm font-bold border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#4C1D95] shadow-xs'
                            : 'bg-[#FAF5FF] border-[#E9D5FF] text-[#4C1D95] hover:bg-[#F3E8FF]'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#7C3AED]" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Number Input */
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#7C3AED] block">
                    Enter your numerical answer:
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 6 or 152.5"
                    value={userInputs[currentQ.id] || ''}
                    onChange={e => setUserInputs(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleCheckAnswer()}
                    className="w-full text-base font-bold p-3 rounded-2xl bg-[#FAF5FF] border border-[#DDD6FE] text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
              )}
            </div>

            {/* Hint Dropdown */}
            <div className="mt-4">
              <button
                onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="text-xs text-[#7C3AED] hover:text-[#4C1D95] font-bold flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                {showHint[currentQ.id] ? 'Hide Hint' : 'Need a hint?'}
              </button>
              {showHint[currentQ.id] && (
                <div className="mt-2 p-3 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] text-xs text-[#92400E] animate-fadeIn">
                  <p>{currentQ.hintEn}</p>
                  {showIdHint && currentQ.hintId && (
                    <p className="italic text-[11px] text-[#B45309] mt-1 border-t border-[#FEF3C7] pt-1">
                      🇮🇩 {currentQ.hintId}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Feedback / Worked Explanation */}
            {currentResult?.checked && (
              <div
                className={`mt-4 p-4 rounded-2xl border text-xs md:text-sm animate-fadeIn ${
                  currentResult.isCorrect
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                    : 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {currentResult.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#F43F5E] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-bold">
                      {currentResult.isCorrect ? 'Superb work! Correct!' : 'Not quite! Here is the explanation:'}
                    </strong>
                    <p className="mt-1 font-medium">{currentQ.explanationEn}</p>
                    {showIdHint && currentQ.explanationId && (
                      <p className="italic text-[11px] mt-1 text-[#047857]">
                        🇮🇩 {currentQ.explanationId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Check Answer & Next/Back */}
          <div className="pt-4 border-t border-[#F3E8FF] flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (qIndex > 0) setQIndex(qIndex - 1);
              }}
              disabled={qIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <button
              onClick={handleCheckAnswer}
              disabled={!userInputs[currentQ.id]}
              className="px-6 py-2.5 rounded-2xl text-xs md:text-sm font-bold bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>

            <button
              onClick={() => {
                if (qIndex < currentQuestions.length - 1) setQIndex(qIndex + 1);
              }}
              disabled={qIndex === currentQuestions.length - 1}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
