import React, { useState } from 'react';
import {
  READING_DATA,
  MESSAGES_DATA,
  COMPARISON_CLASSES_8A,
  COMPARISON_CLASSES_8B,
  PRACTICE_L1_QUESTIONS,
  SPOT_MISTAKE_ITEMS,
} from '../../data/lessonData';
import { Histogram } from '../charts/Histogram';
import { FrequencyPolygon } from '../charts/FrequencyPolygon';
import {
  InteractiveHistogramDrawer,
  InteractivePolygonDrawer,
} from '../charts/InteractiveDrawingGrid';
import { StatCat } from '../mascot/StatCat';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  RefreshCw,
  Search,
  PenTool,
  Brain,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section6PracticeProps {
  onGoToSection: (sectionId: number) => void;
  showIdHint: boolean;
  onUpdateScore: (l1: number, l2H: boolean, l2P: boolean, l3: number) => void;
}

export const Section6Practice: React.FC<Section6PracticeProps> = ({
  onGoToSection,
  showIdHint,
  onUpdateScore,
}) => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 'summary'>(1);

  // Level 1 State
  const [l1Answers, setL1Answers] = useState<Record<string, string>>({});
  const [l1Checked, setL1Checked] = useState<Record<string, boolean>>({});
  const [l1Score, setL1Score] = useState<number>(0);

  // Level 2 State
  const [l2HistDone, setL2HistDone] = useState(false);
  const [l2PolyDone, setL2PolyDone] = useState(false);

  // Level 3 State
  const [selectedMistakes, setSelectedMistakes] = useState<Record<string, string>>({});
  const [mistakeChecked, setMistakeChecked] = useState<Record<string, boolean>>({});

  // Scenario Cards (Choose the best diagram)
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [scenarioChecked, setScenarioChecked] = useState(false);

  // Sentence Builder for 8A vs 8B
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [sentenceCorrect, setSentenceCorrect] = useState(false);

  // Aisha reasoning
  const [aishaChoice, setAishaChoice] = useState('');
  const [aishaChecked, setAishaChecked] = useState(false);

  // Level 1 handlers
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
        onUpdateScore(next, l2HistDone, l2PolyDone, 0);
        return next;
      });
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    }
  };

  // Level 3 Handlers
  const handleCheckMistake = (itemId: string, optId: string) => {
    setSelectedMistakes(prev => ({ ...prev, [itemId]: optId }));
    setMistakeChecked(prev => ({ ...prev, [itemId]: true }));
  };

  const handleCheckSentence = () => {
    const isCorrect = word1 === 'longer' && word2 === 'right';
    setSentenceCorrect(isCorrect);
    setSentenceChecked(true);
    if (isCorrect) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleCheckScenario = () => {
    setScenarioChecked(true);
    if (
      scenarioAnswers['fruit'] === 'bar-chart' &&
      scenarioAnswers['race'] === 'histogram' &&
      scenarioAnswers['compare'] === 'frequency-polygon'
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

  // Calculate total stars
  const l3Total =
    (Object.values(mistakeChecked).filter(Boolean).length === 3 ? 1 : 0) +
    (sentenceCorrect ? 1 : 0) +
    (aishaChoice === 'no-grouped' && aishaChecked ? 1 : 0);

  const totalStars =
    (l1Score >= 4 ? 1 : 0) +
    (l2HistDone && l2PolyDone ? 1 : 0) +
    (l3Total >= 2 ? 1 : 0);

  return (
    <section id="section-6" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
            Section 6 • Practice Zone
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#4C1D95] mt-1">
            Exercise: Three Levels of Mastery
          </h2>
          <p className="text-sm text-[#6D28D9] mt-1">
            Work through Level 1 (Warm-up), Level 2 (Interactive Drawing), and Level 3 (Detective &amp; Reasoning) to earn all 3 Stars!
          </p>
          {showIdHint && (
            <p className="text-xs text-[#0D9488] italic mt-0.5">
              🇮🇩 Zona Latihan: 3 Tingkat untuk menguji kemampuan membaca, menggambar, dan menganalisis grafik.
            </p>
          )}
        </div>

        {/* Stars Counter */}
        <div className="bg-white px-4 py-2 rounded-2xl border border-[#DDD6FE] shadow-xs flex items-center gap-2">
          <span className="text-xs font-bold text-[#4C1D95]">Stars Earned:</span>
          <div className="flex gap-1 text-[#F59E0B]">
            {[1, 2, 3].map(st => (
              <Star
                key={`st-${st}`}
                className={`w-5 h-5 ${st <= totalStars ? 'fill-[#F59E0B]' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Level Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveLevel(1)}
          className={`p-3.5 rounded-2xl font-bold text-xs md:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeLevel === 1
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'bg-white text-[#4C1D95] border-[#E9D5FF] hover:bg-[#FAF5FF]'
          }`}
        >
          <Search className="w-4 h-4" /> Level 1: Warm-up
        </button>

        <button
          onClick={() => setActiveLevel(2)}
          className={`p-3.5 rounded-2xl font-bold text-xs md:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeLevel === 2
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'bg-white text-[#4C1D95] border-[#E9D5FF] hover:bg-[#FAF5FF]'
          }`}
        >
          <PenTool className="w-4 h-4" /> Level 2: Draw It!
        </button>

        <button
          onClick={() => setActiveLevel(3)}
          className={`p-3.5 rounded-2xl font-bold text-xs md:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeLevel === 3
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'bg-white text-[#4C1D95] border-[#E9D5FF] hover:bg-[#FAF5FF]'
          }`}
        >
          <Brain className="w-4 h-4" /> Level 3: Detective
        </button>

        <button
          onClick={() => setActiveLevel('summary')}
          className={`p-3.5 rounded-2xl font-bold text-xs md:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeLevel === 'summary'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'bg-white text-[#4C1D95] border-[#E9D5FF] hover:bg-[#FAF5FF]'
          }`}
        >
          <Award className="w-4 h-4 text-[#F59E0B]" /> Score &amp; Stars
        </button>
      </div>

      {/* LEVEL 1: WARM-UP (READING HOURS HISTOGRAM) */}
      {activeLevel === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
                Level 1 • Interpret Histogram
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#4C1D95] mt-1">
                Reading Hours per Week (25 Students)
              </h3>
            </div>
            <span className="text-xs font-bold bg-[#FAF5FF] text-[#7C3AED] px-3 py-1 rounded-xl border border-[#DDD6FE]">
              Score: {l1Score} / 5
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <Histogram
                classes={READING_DATA.classes}
                variableName={READING_DATA.variableName}
                unit={READING_DATA.unit}
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
                    className="p-4 rounded-2xl bg-[#FAF5FF] border border-[#EDE9FE] space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#4C1D95]">
                        ({String.fromCharCode(97 + idx)}) {q.questionEn}
                      </span>
                      {isChecked && (
                        <span className="shrink-0">
                          {q.type === 'number-input' && Math.abs(parseFloat(userVal) - (q.correctAnswer as number)) < 0.01 ? (
                            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                          ) : q.type === 'multiple-choice' && userVal === q.correctAnswer ? (
                            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-[#F43F5E]" />
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
                            className={`p-2 rounded-xl text-xs font-bold border ${
                              l1Answers[q.id] === opt
                                ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#4C1D95]'
                                : 'bg-white border-[#DDD6FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
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
                          className="flex-1 text-xs font-bold p-2 rounded-xl bg-white border border-[#DDD6FE] text-[#4C1D95]"
                        />
                      </div>
                    )}

                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckL1(q.id)}
                        disabled={!l1Answers[q.id]}
                        className="text-xs px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl disabled:opacity-40"
                      >
                        Check
                      </button>
                    ) : (
                      <p className="text-xs text-[#065F46] font-medium bg-[#ECFDF5] p-2 rounded-xl">
                        {q.explanationEn}
                      </p>
                    )}
                  </div>
                );
              })}

              <button
                onClick={() => setActiveLevel(2)}
                className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-md text-sm flex items-center justify-center gap-2"
              >
                Proceed to Level 2: Drawing Activity <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: DRAW IT! (INTERACTIVE HISTOGRAM & POLYGON) */}
      {activeLevel === 2 && (
        <div className="space-y-6">
          <InteractiveHistogramDrawer
            classes={MESSAGES_DATA.classes}
            variableName={MESSAGES_DATA.variableName}
            unit={MESSAGES_DATA.unit}
            symbol={MESSAGES_DATA.symbol}
            showIdHint={showIdHint}
            onSuccess={() => {
              setL2HistDone(true);
              onUpdateScore(l1Score, true, l2PolyDone, 0);
            }}
          />

          <InteractivePolygonDrawer
            classes={MESSAGES_DATA.classes}
            variableName={MESSAGES_DATA.variableName}
            unit={MESSAGES_DATA.unit}
            symbol={MESSAGES_DATA.symbol}
            showIdHint={showIdHint}
            onSuccess={() => {
              setL2PolyDone(true);
              onUpdateScore(l1Score, l2HistDone, true, 0);
            }}
          />

          <div className="flex justify-end">
            <button
              onClick={() => setActiveLevel(3)}
              className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl shadow-md text-sm flex items-center gap-2"
            >
              Proceed to Level 3: Detective &amp; Challenge <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 3: DETECTIVE & CHALLENGE */}
      {activeLevel === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9D5FF] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-black uppercase text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
              Level 3 • Challenge &amp; Detective
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#4C1D95] mt-1">
              Spot the Mistakes &amp; Mathematical Reasoning
            </h3>
            <p className="text-xs md:text-sm text-[#7C3AED]">
              Put on your detective hat! Test your eye for mathematical errors, scenario matching, and class comparisons.
            </p>
          </div>

          {/* Task 1: Spot the Mistake in 3 Faulty Scenarios */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#4C1D95] text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-[#7C3AED]" /> Task 1: Spot the Mistake in 3 Graphs
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPOT_MISTAKE_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#FAF5FF] p-4 rounded-2xl border border-[#DDD6FE] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#7C3AED] block">
                      Case #{idx + 1}
                    </span>
                    <h5 className="font-bold text-sm text-[#4C1D95]">{item.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
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
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-bold'
                                : 'bg-[#FFF1F2] border-[#F43F5E] text-[#9F1239]'
                              : 'bg-white border-[#EDE9FE] text-[#4C1D95] hover:bg-[#F3E8FF]'
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
          <div className="p-5 bg-[#FAF5FF] rounded-2xl border border-[#EDE9FE] space-y-4">
            <h4 className="font-bold text-[#4C1D95] text-base">
              Task 2: Choose the Best Diagram for Each Scenario
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Scenario 1 */}
              <div className="bg-white p-3.5 rounded-xl border border-[#DDD6FE] space-y-2">
                <p className="font-bold text-[#4C1D95]">
                  "Show how many students chose each favourite fruit (apple, mango, banana)."
                </p>
                <select
                  value={scenarioAnswers['fruit'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, fruit: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-[#C4B5FD] text-[#4C1D95] font-semibold"
                >
                  <option value="">Select diagram...</option>
                  <option value="bar-chart">Bar chart (categorical data with gaps)</option>
                  <option value="histogram">Histogram</option>
                  <option value="frequency-polygon">Frequency polygon</option>
                </select>
              </div>

              {/* Scenario 2 */}
              <div className="bg-white p-3.5 rounded-xl border border-[#DDD6FE] space-y-2">
                <p className="font-bold text-[#4C1D95]">
                  "Show the distribution of completion times in a 100m sprint race."
                </p>
                <select
                  value={scenarioAnswers['race'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, race: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-[#C4B5FD] text-[#4C1D95] font-semibold"
                >
                  <option value="">Select diagram...</option>
                  <option value="histogram">Histogram (continuous data, touching bars)</option>
                  <option value="bar-chart">Bar chart</option>
                  <option value="pie-chart">Pictogram</option>
                </select>
              </div>

              {/* Scenario 3 */}
              <div className="bg-white p-3.5 rounded-xl border border-[#DDD6FE] space-y-2">
                <p className="font-bold text-[#4C1D95]">
                  "Compare two classes' test mark distributions on the SAME graph."
                </p>
                <select
                  value={scenarioAnswers['compare'] || ''}
                  onChange={e => setScenarioAnswers(prev => ({ ...prev, compare: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-[#C4B5FD] text-[#4C1D95] font-semibold"
                >
                  <option value="">Select diagram...</option>
                  <option value="frequency-polygon">Two Frequency polygons overlaid</option>
                  <option value="bar-chart">Two separate bar charts</option>
                  <option value="tally-chart">A single histogram</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCheckScenario}
              className="text-xs px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl"
            >
              Check Scenario Choices
            </button>

            {scenarioChecked && (
              <p className="text-xs text-[#065F46] font-semibold bg-[#ECFDF5] p-2.5 rounded-xl">
                ✓ Spot on! Categorical data = Bar chart. Continuous single data = Histogram. Comparing two sets on one graph = Overlaid Frequency Polygons!
              </p>
            )}
          </div>

          {/* Task 3: Compare Two Frequency Polygons (8A vs 8B) */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#4C1D95] text-base">
              Task 3: Compare Class 8A vs Class 8B Test Completion Times
            </h4>

            <FrequencyPolygon
              classes={COMPARISON_CLASSES_8A}
              variableName="Test Completion Time"
              unit="minutes"
              symbol="t"
              title="Class 8A vs Class 8B Test Times"
              seriesLabel="Class 8A"
              secondSeries={{
                label: 'Class 8B',
                classes: COMPARISON_CLASSES_8B,
                color: '#99F6E4',
                strokeColor: '#0D9488',
              }}
            />

            {/* Sentence Builder */}
            <div className="p-4 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] space-y-3">
              <span className="text-xs font-bold text-[#4C1D95] block">
                Complete the comparative statement by selecting words:
              </span>

              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-bold text-[#4C1D95]">
                <span>"Class 8B generally takes</span>
                <select
                  value={word1}
                  onChange={e => setWord1(e.target.value)}
                  className="p-1.5 rounded-xl border border-[#7C3AED] bg-white text-[#4C1D95]"
                >
                  <option value="">(choose)</option>
                  <option value="shorter">shorter</option>
                  <option value="longer">longer</option>
                  <option value="identical">identical</option>
                </select>
                <span>to finish the test because its polygon peaks further to the</span>
                <select
                  value={word2}
                  onChange={e => setWord2(e.target.value)}
                  className="p-1.5 rounded-xl border border-[#7C3AED] bg-white text-[#4C1D95]"
                >
                  <option value="">(choose)</option>
                  <option value="left">left (lower times)</option>
                  <option value="right">right (higher times)</option>
                </select>
                <span>."</span>
              </div>

              <button
                onClick={handleCheckSentence}
                disabled={!word1 || !word2}
                className="text-xs px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl disabled:opacity-40"
              >
                Check Sentence
              </button>

              {sentenceChecked && (
                <p className={`text-xs p-2 rounded-xl font-semibold ${
                  sentenceCorrect ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFF1F2] text-[#9F1239]'
                }`}>
                  {sentenceCorrect
                    ? '✓ Excellent analytical reasoning! Class 8B peaks at 40-50 min (higher), so they took longer.'
                    : 'Check again! Look at where the teal 8B peak is compared to purple 8A.'}
                </p>
              )}
            </div>
          </div>

          {/* Task 4: Aisha Reasoning Question */}
          <div className="p-5 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A] space-y-3">
            <h4 className="font-bold text-[#92400E] text-base">
              Task 4: Aisha's Claim
            </h4>
            <p className="text-xs md:text-sm text-[#78350F] leading-relaxed">
              <strong>Scenario:</strong> Looking at the Year 8 girls' height polygon, Aisha says: <em>"The polygon peaks at frequency 14 at midpoint 152.5, which proves that 14 girls are exactly 152.5 cm tall."</em>
            </p>
            <p className="text-xs font-bold text-[#92400E]">Is Aisha correct?</p>

            <div className="space-y-2">
              <button
                onClick={() => setAishaChoice('yes-exact')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border ${
                  aishaChoice === 'yes-exact'
                    ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#4C1D95]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95]'
                }`}
              >
                Yes, because the point is plotted right at 152.5 cm.
              </button>
              <button
                onClick={() => setAishaChoice('no-grouped')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border ${
                  aishaChoice === 'no-grouped'
                    ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#4C1D95]'
                    : 'bg-white border-[#DDD6FE] text-[#4C1D95]'
                }`}
              >
                No, because grouped data does not reveal exact values; the 14 girls are somewhere within the class 150 ≤ h &lt; 155 cm, and the midpoint is only a representative value.
              </button>
            </div>

            <button
              onClick={handleCheckAisha}
              disabled={!aishaChoice}
              className="text-xs px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl disabled:opacity-40"
            >
              Verify Reasoning
            </button>

            {aishaChecked && (
              <p className={`text-xs p-2.5 rounded-xl font-bold ${
                aishaChoice === 'no-grouped' ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FFF1F2] text-[#9F1239]'
              }`}>
                {aishaChoice === 'no-grouped'
                  ? '✓ Brilliant Cambridge Mathematical Reasoning! Grouped continuous data loses individual values. The midpoint represents the interval, but no individual girl is necessarily exactly 152.5 cm tall!'
                  : '✗ Remember: With grouped data, individual measurements are grouped together. We cannot know their exact values!'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* SUMMARY SCREEN */}
      {activeLevel === 'summary' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E9D5FF] shadow-sm space-y-6 text-center">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-[#EDE9FE] to-[#FCE7F3] shadow-inner">
            <Award className="w-12 h-12 text-[#F59E0B]" />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#4C1D95]">
              Practice Mastery Summary
            </h3>
            <p className="text-sm text-[#7C3AED] mt-1">
              You have completed all exercises in Unit 16.1!
            </p>
          </div>

          {/* Stars display */}
          <div className="flex justify-center gap-3">
            {[1, 2, 3].map(st => (
              <div
                key={`sum-star-${st}`}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 ${
                  st <= totalStars
                    ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]'
                    : 'bg-[#F9FAFB] border-gray-200 text-gray-400'
                }`}
              >
                <Star className={`w-8 h-8 ${st <= totalStars ? 'fill-[#F59E0B] text-[#F59E0B]' : ''}`} />
                <span className="text-xs font-bold">
                  {st === 1 ? 'Star 1: Warm-up' : st === 2 ? 'Star 2: Drawing' : 'Star 3: Detective'}
                </span>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto bg-[#FAF5FF] p-4 rounded-2xl border border-[#DDD6FE] text-xs text-left space-y-1.5 font-medium text-[#4C1D95]">
            <p>✓ Level 1 (Interpreting): {l1Score} / 5 correct</p>
            <p>✓ Level 2 (Histogram): {l2HistDone ? 'Completed 🌟' : 'Pending'}</p>
            <p>✓ Level 2 (Polygon): {l2PolyDone ? 'Completed 🌟' : 'Pending'}</p>
            <p>✓ Level 3 (Detective): {l3Total >= 2 ? 'Mastered 🌟' : 'In progress'}</p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveLevel(1)}
              className="px-5 py-2.5 rounded-2xl border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold hover:bg-[#FAF5FF] flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Exercises
            </button>
            <button
              onClick={() => onGoToSection(7)}
              className="px-6 py-2.5 rounded-2xl bg-[#4C1D95] text-white text-xs font-bold hover:bg-[#5B21B6] shadow-md flex items-center gap-1.5"
            >
              Proceed to Exit Ticket &amp; Cheat Sheet →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
