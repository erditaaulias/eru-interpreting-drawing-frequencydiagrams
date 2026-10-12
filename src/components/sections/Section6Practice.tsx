import React, { useState } from 'react';
import {
  READING_DATA,
  MESSAGES_DATA,
  PETS_DISCRETE_DATA,
  PRACTICE_L1_QUESTIONS,
  SPOT_MISTAKE_ITEMS,
} from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import {
  InteractiveHistogramDrawer,
  InteractiveBarChartDrawer,
} from '../charts/InteractiveDrawingGrid';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Award,
  RefreshCw,
  Search,
  PenTool,
  Brain,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section6PracticeProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
  onUpdateScore: (l1: number, l2H: boolean, l2B: boolean, l3: number) => void;
}

export const Section6Practice: React.FC<Section6PracticeProps> = ({
  onGoToSection,
  showIdHint,
  onUpdateScore,
}) => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 'summary'>(1);

  const [l1Answers, setL1Answers] = useState<Record<string, string>>({});
  const [l1Checked, setL1Checked] = useState<Record<string, boolean>>({});
  const [l1Score, setL1Score] = useState<number>(0);

  const [l2HistDone, setL2HistDone] = useState(false);
  const [l2BarDone, setL2BarDone] = useState(false);

  const [selectedMistakes, setSelectedMistakes] = useState<Record<string, string>>({});
  const [mistakeChecked, setMistakeChecked] = useState<Record<string, boolean>>({});

  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [scenarioChecked, setScenarioChecked] = useState(false);

  const [aishaChoice, setAishaChoice] = useState('');
  const [aishaChecked, setAishaChecked] = useState(false);

  const handleCheckL1 = (qId: string) => {
    const q = PRACTICE_L1_QUESTIONS.find(item => item.id === qId);
    if (!q) return;
    const input = l1Answers[qId];
    if (input === undefined || input === '') return;

    let isCorrect = false;
    if (q.type === 'number-input') {
      isCorrect = Math.abs(parseFloat(input) - (q.correctAnswer as number)) < 0.01;
    } else {
      isCorrect = String(input).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
    }

    setL1Checked(prev => ({ ...prev, [qId]: true }));
    if (isCorrect) {
      setL1Score(prev => {
        const next = prev + 1;
        onUpdateScore(next, l2HistDone, l2BarDone, 0);
        return next;
      });
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleCheckMistake = (itemId: string, optId: string) => {
    setSelectedMistakes(prev => ({ ...prev, [itemId]: optId }));
    setMistakeChecked(prev => ({ ...prev, [itemId]: true }));
  };

  const handleCheckScenario = () => {
    setScenarioChecked(true);
    if (
      scenarioAnswers['fruit'] === 'bar-chart' &&
      scenarioAnswers['race'] === 'histogram' &&
      scenarioAnswers['shoes'] === 'bar-chart'
    ) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleCheckAisha = () => {
    setAishaChecked(true);
    if (aishaChoice === 'no-grouped') {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  const l3Total =
    (Object.values(mistakeChecked).filter(Boolean).length === 3 ? 1 : 0) +
    (scenarioChecked ? 1 : 0) +
    (aishaChoice === 'no-grouped' && aishaChecked ? 1 : 0);

  const totalStars =
    (l1Score >= 4 ? 1 : 0) +
    (l2HistDone && l2BarDone ? 1 : 0) +
    (l3Total >= 2 ? 1 : 0);

  return (
    <section id="section-6" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
            Section 6 • Practice Zone
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#18181B] mt-1">
            Exercise: Three Levels of Mastery
          </h2>
          <p className="text-sm text-[#18181B] font-semibold mt-1">
            Work through Level 1 (Warm-up), Level 2 (Drawing Activities), and Level 3 (Detective &amp; Reasoning) to earn all 3 Stars!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#B45309] italic mt-0.5 font-bold">
              🇮🇩 Zona Latihan: 3 Tingkat untuk menguji kemampuan membaca, menggambar, dan menganalisis grafik.
            </p>
          )}
        </div>

        {/* Stars Counter */}
        <div className="bg-white px-4 py-2 rounded-2xl border-2 border-[#18181B]/20 shadow-xs flex items-center gap-2">
          <span className="text-xs font-bold text-[#18181B]">Stars Earned:</span>
          <div className="flex gap-1 text-[#EAB308]">
            {[1, 2, 3].map(st => (
              <Star
                key={`st-${st}`}
                className={`w-5 h-5 ${st <= totalStars ? 'fill-[#EAB308] text-[#CA8A04]' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Level Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveLevel(1)}
          className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all flex items-center justify-center gap-2 ${
            activeLevel === 1
              ? 'bg-[#FACC15] text-[#18181B] border-[#18181B] shadow-[0_3px_0_#CA8A04]'
              : 'bg-white text-[#18181B] border-[#18181B]/20 hover:bg-[#FEF08A]'
          }`}
        >
          <Search className="w-4 h-4 text-[#CA8A04]" /> Level 1: Warm-up
        </button>

        <button
          onClick={() => setActiveLevel(2)}
          className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all flex items-center justify-center gap-2 ${
            activeLevel === 2
              ? 'bg-[#FACC15] text-[#18181B] border-[#18181B] shadow-[0_3px_0_#CA8A04]'
              : 'bg-white text-[#18181B] border-[#18181B]/20 hover:bg-[#FEF08A]'
          }`}
        >
          <PenTool className="w-4 h-4 text-[#CA8A04]" /> Level 2: Draw It!
        </button>

        <button
          onClick={() => setActiveLevel(3)}
          className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all flex items-center justify-center gap-2 ${
            activeLevel === 3
              ? 'bg-[#FACC15] text-[#18181B] border-[#18181B] shadow-[0_3px_0_#CA8A04]'
              : 'bg-white text-[#18181B] border-[#18181B]/20 hover:bg-[#FEF08A]'
          }`}
        >
          <Brain className="w-4 h-4 text-[#CA8A04]" /> Level 3: Detective
        </button>

        <button
          onClick={() => setActiveLevel('summary')}
          className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all flex items-center justify-center gap-2 ${
            activeLevel === 'summary'
              ? 'bg-[#FACC15] text-[#18181B] border-[#18181B] shadow-[0_3px_0_#CA8A04]'
              : 'bg-white text-[#18181B] border-[#18181B]/20 hover:bg-[#FEF08A]'
          }`}
        >
          <Award className="w-4 h-4 text-[#CA8A04]" /> Score &amp; Stars
        </button>
      </div>

      {/* LEVEL 1: WARM-UP (READING HOURS HISTOGRAM) */}
      {activeLevel === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
                Level 1 • Interpret Histogram
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#18181B] mt-1">
                Reading Hours per Week (25 Students)
              </h3>
            </div>
            <span className="text-xs font-black bg-[#FEF08A] text-[#18181B] px-3.5 py-1.5 rounded-xl border-2 border-[#18181B] shadow-xs">
              Score: {l1Score} / 5
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <Histogram
                classes={READING_DATA.classes || []}
                variableName={READING_DATA.variableName}
                unit={READING_DATA.unit || ''}
                symbol={READING_DATA.symbol}
                title={READING_DATA.title}
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              {PRACTICE_L1_QUESTIONS.map((q, idx) => {
                const isChecked = l1Checked[q.id];
                const userVal = l1Answers[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-[#FFFDF5] border border-gray-200 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-black text-[#18181B]">
                        ({String.fromCharCode(97 + idx)}) {q.questionEn}
                      </span>
                      {isChecked && (
                        <span className="shrink-0">
                          {q.type === 'number-input' && Math.abs(parseFloat(userVal) - (q.correctAnswer as number)) < 0.01 ? (
                            <CheckCircle2 className="w-5 h-5 text-[#CA8A04]" />
                          ) : q.type === 'multiple-choice' && userVal === q.correctAnswer ? (
                            <CheckCircle2 className="w-5 h-5 text-[#CA8A04]" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                          )}
                        </span>
                      )}
                    </div>

                    {q.type === 'multiple-choice' ? (
                      <div className="grid grid-cols-2 gap-2">
                        {q.options?.map(opt => (
                          <button
                            key={opt}
                            disabled={isChecked}
                            onClick={() => setL1Answers(prev => ({ ...prev, [q.id]: opt }))}
                            className={`p-2 rounded-xl text-xs font-black border-2 ${
                              l1Answers[q.id] === opt
                                ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                                : 'bg-white border-gray-200 text-[#18181B] hover:bg-[#FEF9C3]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="any"
                          disabled={isChecked}
                          placeholder="Your answer"
                          value={l1Answers[q.id] || ''}
                          onChange={e => setL1Answers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          className="flex-1 text-xs font-black p-2 rounded-xl bg-white border-2 border-gray-300 text-[#18181B]"
                        />
                      </div>
                    )}

                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckL1(q.id)}
                        disabled={!l1Answers[q.id]}
                        className="text-xs px-3.5 py-1.5 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-xl border-2 border-[#18181B] shadow-[0_2px_0_#CA8A04] disabled:opacity-40"
                      >
                        Check
                      </button>
                    ) : (
                      <p className="text-xs text-[#18181B] font-bold bg-[#FEF9C3] p-2 rounded-xl border border-[#EAB308]">
                        {q.explanationEn}
                      </p>
                    )}
                  </div>
                );
              })}

              <button
                onClick={() => setActiveLevel(2)}
                className="w-full py-3 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-2xl shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none text-sm flex items-center justify-center gap-2 border-2 border-[#18181B] transition-all"
              >
                Proceed to Level 2: Drawing Activities <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: DRAW IT! (HISTOGRAM & BAR CHART) */}
      {activeLevel === 2 && (
        <div className="space-y-6">
          <InteractiveHistogramDrawer
            classes={MESSAGES_DATA.classes || []}
            variableName={MESSAGES_DATA.variableName}
            unit={MESSAGES_DATA.unit || ''}
            symbol={MESSAGES_DATA.symbol || 'n'}
            showIdHint={showIdHint}
            onSuccess={() => {
              setL2HistDone(true);
              onUpdateScore(l1Score, true, l2BarDone, 0);
            }}
          />

          <InteractiveBarChartDrawer
            categories={PETS_DISCRETE_DATA}
            variableName="Number of pets owned"
            showIdHint={showIdHint}
            onSuccess={() => {
              setL2BarDone(true);
              onUpdateScore(l1Score, l2HistDone, true, 0);
            }}
          />

          <div className="flex justify-end">
            <button
              onClick={() => setActiveLevel(3)}
              className="px-6 py-3 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-2xl shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none text-sm flex items-center gap-2 border-2 border-[#18181B] transition-all"
            >
              Proceed to Level 3: Detective &amp; Challenge <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 3: DETECTIVE & CHALLENGE */}
      {activeLevel === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EAB308]/40 hover:border-[#EAB308] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-black uppercase text-[#18181B] bg-[#FEF08A] px-3 py-1 rounded-full border border-[#EAB308]">
              Level 3 • Challenge &amp; Detective
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#18181B] mt-1">
              Spot the Mistakes &amp; Mathematical Reasoning
            </h3>
            <p className="text-xs md:text-sm text-[#18181B] font-semibold">
              Put on your detective hat! Test your eye for mistakes in histograms and bar charts, and choose the right diagram for each scenario.
            </p>
          </div>

          {/* Task 1: Spot the Mistake */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#18181B] text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-[#CA8A04]" /> Task 1: Spot the Mistake in 3 Graphs
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPOT_MISTAKE_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#18181B]/15 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#854D0E] block">
                      Case #{idx + 1}
                    </span>
                    <h5 className="font-black text-sm text-[#18181B]">{item.title}</h5>
                    <p className="text-xs text-gray-700 mt-1 font-semibold">{item.description}</p>
                  </div>

                  <div className="space-y-2">
                    {item.options.map(opt => {
                      const isSelected = selectedMistakes[item.id] === opt.id;
                      const isChecked = mistakeChecked[item.id];

                      return (
                        <button
                          key={opt.id}
                          disabled={isChecked}
                          onClick={() => handleCheckMistake(item.id, opt.id)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border-2 transition-all ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B] font-black shadow-xs'
                                : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                              : 'bg-white border-gray-200 text-[#18181B] hover:bg-[#FEF9C3]'
                          }`}
                        >
                          {opt.textEn}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task 2: Choose the Best Diagram */}
          <div className="p-5 bg-[#FFFDF5] rounded-2xl border-2 border-[#FEF08A] space-y-4">
            <h4 className="font-extrabold text-[#18181B] text-base">
              Task 2: Choose the Best Diagram for Each Situation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <p className="font-black text-[#18181B]">
                  "Show how many students chose each favourite fruit (apple, mango, banana)."
                </p>
                <select
                  value={scenarioAnswers['fruit'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, fruit: e.target.value }))}
                  className="w-full p-2 rounded-lg border-2 border-[#18181B]/20 text-[#18181B] font-bold"
                >
                  <option value="">Select diagram...</option>
                  <option value="bar-chart">Bar chart (categorical data with gaps)</option>
                  <option value="histogram">Histogram</option>
                  <option value="pictogram">Frequency table only</option>
                </select>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <p className="font-black text-[#18181B]">
                  "Show the distribution of completion times in a 100m sprint race."
                </p>
                <select
                  value={scenarioAnswers['race'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, race: e.target.value }))}
                  className="w-full p-2 rounded-lg border-2 border-[#18181B]/20 text-[#18181B] font-bold"
                >
                  <option value="">Select diagram...</option>
                  <option value="histogram">Histogram (continuous data, touching bars)</option>
                  <option value="bar-chart">Bar chart</option>
                  <option value="line-graph">Pictogram</option>
                </select>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                <p className="font-black text-[#18181B]">
                  "Show the frequency of shoe sizes in Year 8 (sizes 36, 37, 38, 39)."
                </p>
                <select
                  value={scenarioAnswers['shoes'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, shoes: e.target.value }))}
                  className="w-full p-2 rounded-lg border-2 border-[#18181B]/20 text-[#18181B] font-bold"
                >
                  <option value="">Select diagram...</option>
                  <option value="bar-chart">Bar chart (discrete whole sizes with gaps)</option>
                  <option value="histogram">Histogram</option>
                  <option value="pie-chart">Line graph</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCheckScenario}
              className="text-xs px-4 py-2 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-xl border-2 border-[#18181B] shadow-[0_3px_0_#CA8A04] transition-all"
            >
              Check Scenario Choices
            </button>

            {scenarioChecked && (
              <p className="text-xs text-[#18181B] font-bold bg-[#FEF9C3] p-2.5 rounded-xl border border-[#EAB308]">
                ✓ Spot on! Categorical data &amp; discrete shoe sizes = Bar chart with gaps. Continuous race time = Histogram with touching bars!
              </p>
            )}
          </div>

          {/* Task 3: Reasoning Question */}
          <div className="p-5 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A] space-y-3">
            <h4 className="font-extrabold text-[#92400E] text-base">
              Task 3: Grouped Data Reasoning
            </h4>
            <p className="text-xs md:text-sm text-[#78350F] font-semibold leading-relaxed">
              <strong>Scenario:</strong> Aisha inspects the Screen Time Histogram. She says: <em>"The bar for 2 ≤ t &lt; 3 has a frequency of 9, so exactly 9 students spent exactly 2.5 hours on their phones."</em>
            </p>
            <p className="text-xs font-black text-[#92400E]">Is Aisha correct?</p>

            <div className="space-y-2">
              <button
                onClick={() => setAishaChoice('yes-exact')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border-2 ${
                  aishaChoice === 'yes-exact'
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-white border-gray-200 text-[#18181B]'
                }`}
              >
                Yes, because 2.5 is right in the middle of 2 and 3.
              </button>
              <button
                onClick={() => setAishaChoice('no-grouped')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border-2 ${
                  aishaChoice === 'no-grouped'
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-white border-gray-200 text-[#18181B]'
                }`}
              >
                No, because continuous data is grouped into intervals. We only know 9 students had times somewhere between 2 and 3 hours; the exact values are unknown!
              </button>
            </div>

            <button
              onClick={handleCheckAisha}
              disabled={!aishaChoice}
              className="text-xs px-4 py-2 bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] font-black rounded-xl border-2 border-[#18181B] shadow-[0_3px_0_#CA8A04] transition-all disabled:opacity-40"
            >
              Verify Reasoning
            </button>

            {aishaChecked && (
              <p className={`text-xs p-2.5 rounded-xl font-bold ${
                aishaChoice === 'no-grouped' ? 'bg-[#FEF9C3] text-[#18181B] border border-[#EAB308]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]'
              }`}>
                {aishaChoice === 'no-grouped'
                  ? '✓ Brilliant Cambridge Mathematical Reasoning! Grouped continuous data loses individual values. The bar only tells us how many fall in that range!'
                  : '✗ Remember: With grouped data, individual measurements are grouped together. We cannot know their exact values!'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* SUMMARY SCREEN */}
      {activeLevel === 'summary' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border-2 border-[#EAB308]/40 shadow-sm space-y-6 text-center">
          <div className="inline-flex p-4 rounded-3xl bg-[#FEF08A] border-2 border-[#18181B] shadow-sm">
            <Award className="w-12 h-12 text-[#CA8A04]" />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#18181B]">
              Practice Mastery Summary
            </h3>
            <p className="text-sm text-[#18181B] font-bold mt-1">
              You have completed all exercises for Histograms &amp; Bar Charts in Unit 16.1!
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {[1, 2, 3].map(st => (
              <div
                key={`sum-star-${st}`}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${
                  st <= totalStars
                    ? 'bg-[#FEF08A] border-[#18181B] text-[#18181B]'
                    : 'bg-[#F9FAFB] border-gray-200 text-gray-400'
                }`}
              >
                <Star className={`w-8 h-8 ${st <= totalStars ? 'fill-[#EAB308] text-[#CA8A04]' : ''}`} />
                <span className="text-xs font-black">
                  {st === 1 ? 'Star 1: Warm-up' : st === 2 ? 'Star 2: Drawing' : 'Star 3: Detective'}
                </span>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#FEF08A] text-xs text-left space-y-1.5 font-bold text-[#18181B]">
            <p>✓ Level 1 (Interpreting Histogram): {l1Score} / 5 correct</p>
            <p>✓ Level 2 (Draw Histogram): {l2HistDone ? 'Completed 🌟' : 'Pending'}</p>
            <p>✓ Level 2 (Draw Bar Chart): {l2BarDone ? 'Completed 🌟' : 'Pending'}</p>
            <p>✓ Level 3 (Detective &amp; Reasoning): {l3Total >= 2 ? 'Mastered 🌟' : 'In progress'}</p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveLevel(1)}
              className="px-5 py-2.5 rounded-2xl border-2 border-[#18181B]/20 text-[#18181B] text-xs font-black hover:bg-[#FEF9C3] flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Exercises
            </button>
            <button
              onClick={() => onGoToSection(7)}
              className="px-6 py-2.5 rounded-2xl bg-[#FACC15] hover:bg-[#FDE047] text-[#18181B] text-xs font-black border-2 border-[#18181B] shadow-[0_4px_0_#CA8A04] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 transition-all"
            >
              Proceed to Exit Ticket &amp; Cheat Sheet →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
