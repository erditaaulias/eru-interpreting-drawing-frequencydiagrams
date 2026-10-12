import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { GlossaryDrawer } from './components/common/GlossaryDrawer';
import { TeacherModeModal } from './components/common/TeacherModeModal';
import { Section1Welcome } from './components/sections/Section1Welcome';
import { Section2RealLife } from './components/sections/Section2RealLife';
import { Section3Concept } from './components/sections/Section3Concept';
import { Section4StepBuilder } from './components/sections/Section4StepBuilder';
import { Section5Interpreting } from './components/sections/Section5Interpreting';
import { Section6Practice } from './components/sections/Section6Practice';
import { Section7Summary } from './components/sections/Section7Summary';
import { ArrowRight, ChevronUp, Github, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [completedSections, setCompletedSections] = useState<number[]>([1]);
  const [masteredGoals, setMasteredGoals] = useState<string[]>([]);
  const [showIdHint, setShowIdHint] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isTeacherModeOpen, setIsTeacherModeOpen] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Scores
  const [levelScores, setLevelScores] = useState({
    l1: 0,
    l2H: false,
    l2P: false,
    l3: 0,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem('stat_mastered_goals');
      if (savedGoals) setMasteredGoals(JSON.parse(savedGoals));

      const savedComp = localStorage.getItem('stat_completed_sections');
      if (savedComp) setCompletedSections(JSON.parse(savedComp));

      const savedHint = localStorage.getItem('stat_show_id_hint');
      if (savedHint !== null) setShowIdHint(savedHint === 'true');

      const savedScores = localStorage.getItem('stat_scores');
      if (savedScores) setLevelScores(JSON.parse(savedScores));
    } catch {
      // ignore
    }
  }, []);

  const handleToggleGoal = (id: string) => {
    setMasteredGoals(prev => {
      const next = prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id];
      localStorage.setItem('stat_mastered_goals', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleIdHint = () => {
    setShowIdHint(prev => {
      const next = !prev;
      localStorage.setItem('stat_show_id_hint', String(next));
      return next;
    });
  };

  const handleUpdateScores = (l1: number, l2H: boolean, l2P: boolean, l3: number) => {
    const next = { l1, l2H, l2P, l3 };
    setLevelScores(next);
    localStorage.setItem('stat_scores', JSON.stringify(next));
  };

  const handleGoToSection = (sectionId: number) => {
    setActiveSection(sectionId);
    setCompletedSections(prev => {
      if (!prev.includes(sectionId)) {
        const next = [...prev, sectionId];
        localStorage.setItem('stat_completed_sections', JSON.stringify(next));
        return next;
      }
      return prev;
    });

    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compute stars: 1 if l1 >= 4, 1 if l2 drawing done, 1 if l3 detective done
  const totalStars =
    (levelScores.l1 >= 4 ? 1 : 0) +
    (levelScores.l2H && levelScores.l2P ? 1 : 0) +
    (levelScores.l3 >= 1 ? 1 : 0);

  return (
    <div className={`min-h-screen bg-[#FAF7FF] text-[#4C1D95] flex flex-col font-sans ${isPresentationMode ? 'text-lg' : ''}`}>
      {/* Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleGoToSection}
        showIdHint={showIdHint}
        onToggleIdHint={handleToggleIdHint}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenTeacherMode={() => setIsTeacherModeOpen(true)}
        totalStars={totalStars}
        completedSections={completedSections}
      />

      {/* Main Content Sections */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-16">
        {/* Section 1: Welcome & Goals */}
        <div className="space-y-4">
          <Section1Welcome
            masteredGoals={masteredGoals}
            onToggleGoal={handleToggleGoal}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(2)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Real Life Data (Section 2) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 2: Real Life */}
        <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
          <Section2RealLife
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(3)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Core Concepts (Section 3) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 3: Histogram vs Polygon Concept */}
        <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
          <Section3Concept
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(4)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Step-by-Step Drawing (Section 4) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 4: Step-by-step Interactive Builder */}
        <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
          <Section4StepBuilder
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(5)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Interpreting Graphs (Section 5) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 5: Interpreting Graphs */}
        <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
          <Section5Interpreting
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(6)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Practice Zone (Section 6) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 6: Exercise Practice Zone */}
        <div className="space-y-4 pt-6 border-t border-[#EDE9FE]">
          <Section6Practice
            onGoToSection={handleGoToSection}
            showIdHint={showIdHint}
            onUpdateScore={handleUpdateScores}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleGoToSection(7)}
              className="px-6 py-2.5 bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#7C3AED] font-bold rounded-2xl text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              Continue to Cheat Sheet &amp; Exit Ticket (Section 7) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 7: Summary & Exit Ticket */}
        <div className="pt-6 border-t border-[#EDE9FE]">
          <Section7Summary
            masteredGoals={masteredGoals}
            onToggleGoal={handleToggleGoal}
            showIdHint={showIdHint}
          />
        </div>
      </main>

      {/* Floating Back to Top Button */}
      <div className="fixed bottom-6 right-6 z-30 no-print">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-[#DDD6FE] text-[#7C3AED] hover:bg-white flex items-center justify-center transition-transform hover:-translate-y-1 active:translate-y-0"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#EDE9FE] bg-white py-10 px-4 text-xs text-gray-500 no-print">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="font-extrabold text-[#4C1D95] text-sm">
                Cambridge Lower Secondary Mathematics (Stage 8)
              </h4>
              <p className="text-gray-500 mt-0.5">
                Unit 16: Statistics / Handling Data • Topic 16.1 Interpreting and drawing frequency diagrams
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7C3AED]">
              <span>Static React 19 + TypeScript + Tailwind CSS</span>
            </div>
          </div>

          {/* Deployment instructions card */}
          <div className="p-4 bg-[#FAF5FF] rounded-2xl border border-[#DDD6FE] text-[11px] text-[#5B21B6] space-y-1">
            <span className="font-bold text-[#4C1D95] block">
              💻 Local Run &amp; Vercel Deployment Guide:
            </span>
            <p>
              <strong>Run locally:</strong> <code>npm install</code> then <code>npm run dev</code>. Open <code>http://localhost:3000</code>.
            </p>
            <p>
              <strong>Deploy to Vercel:</strong> Push code to your GitHub repository → Go to vercel.com → Click "Import Project" → Select your repo → Framework Preset: <strong>Vite</strong> → Click Deploy! (Zero server configuration needed).
            </p>
          </div>
        </div>
      </footer>

      {/* Glossary Drawer */}
      <GlossaryDrawer
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        showIdHint={showIdHint}
      />

      {/* Teacher Mode Modal */}
      <TeacherModeModal
        isOpen={isTeacherModeOpen}
        onClose={() => setIsTeacherModeOpen(false)}
        isPresentationMode={isPresentationMode}
        onTogglePresentation={() => setIsPresentationMode(!isPresentationMode)}
      />
    </div>
  );
}
