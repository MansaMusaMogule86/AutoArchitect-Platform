import React, { useState, useEffect } from 'react';
import { AutoArchOrchestrator } from './core/orchestrator';
import PRDViewer from './components/PRDViewer';
import { ProductPRD } from './types';
import * as Lucide from 'lucide-react';

// --- Routing Components ---

const Link: React.FC<{ href: string; children: React.ReactNode; className?: string; target?: string; rel?: string }> = ({ href, children, className, ...props }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('http') || props.target === '_blank') return;
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };
  return <a href={href} onClick={handleClick} className={className} {...props}>{children}</a>;
};

// --- Page Components ---

const EXAMPLES = [
  {
    name: "MediSync",
    description: "A unified healthcare platform for elderly care. Synchronizes data from wearable devices with a dashboard for family and doctors. Includes AI-powered medication reminders.",
    icon: <Lucide.Activity className="w-4 h-4" />
  },
  {
    name: "EcoTrack SaaS",
    description: "A B2B platform for monitoring carbon footprints. Integrates with utility providers to generate real-time ESG compliance reports.",
    icon: <Lucide.Leaf className="w-4 h-4" />
  },
  {
    name: "CodeWhisper",
    description: "An automated code review agent that identifies architectural anti-patterns in React projects and provides refactoring suggestions.",
    icon: <Lucide.Code2 className="w-4 h-4" />
  }
];

const HomePage: React.FC<{
  name: string;
  setName: (v: string) => void;
  prompt: string;
  setPrompt: (v: string) => void;
  isGenerating: boolean;
  activeStep: number;
  results: any;
  handleGenerate: () => void;
}> = ({ name, setName, prompt, setPrompt, isGenerating, activeStep, results, handleGenerate }) => (
  <main className="max-w-6xl mx-auto px-6 pt-20 pb-32">
    <section className="text-center mb-16">
      <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 bg-clip-text text-transparent">
        IDEATION TO CODE<br />IN 60 SECONDS.
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
        The world's first AI project architect. Generate UI blueprints, PRD JSONs, and Next.js scaffolds via Web or CLI with 100% parity.
      </p>
      
      <div className="max-w-3xl mx-auto p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl shadow-blue-500/10">
        <div className="bg-white dark:bg-slate-900 rounded-[calc(1.5rem-4px)] p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 text-left">
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Project Name</label>
              <input 
                type="text" 
                placeholder="e.g. FitTrack"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 px-4 py-3 focus:ring-2 ring-blue-500 transition-all outline-none"
              />
            </div>
            <div className="md:col-span-2 text-left">
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Description</label>
              <input 
                type="text" 
                placeholder="Describe your vision in detail..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 px-4 py-3 focus:ring-2 ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt || !name}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white font-black py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition active:scale-[0.98]"
          >
            {isGenerating ? <Lucide.Loader2 className="animate-spin w-6 h-6" /> : <Lucide.Rocket className="w-6 h-6" />}
            {isGenerating ? `GENERATING STEP ${activeStep}...` : "GENERATE PROJECT"}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <Lucide.Sparkles className="w-3 h-3" />
          <span>Quick Start Examples</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.name}
              onClick={() => {
                setName(ex.name);
                setPrompt(ex.description);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              {ex.icon}
              {ex.name}
            </button>
          ))}
        </div>
      </div>
    </section>

    {(isGenerating || Object.keys(results).length > 0) && (
      <div className="space-y-12 mb-24 scroll-mt-24" id="results">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Pipeline Output</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <OutputPanel 
            step={1} 
            title="UI/UX Blueprint" 
            active={activeStep === 1} 
            content={results[1]} 
            loading={isGenerating && activeStep === 1}
          />
          <OutputPanel 
            step={3} 
            title="Code Scaffold" 
            active={activeStep === 3} 
            content={results[3]} 
            loading={isGenerating && activeStep === 3}
          />
        </div>

        {results[2] && (
          <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PRDViewer prd={results[2]} />
          </div>
        )}
        
        {isGenerating && activeStep === 2 && (
          <div className="w-full p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-4 animate-pulse">
            <Lucide.FileJson className="w-12 h-12 text-blue-500" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Drafting Machine-Readable PRD...</p>
          </div>
        )}
      </div>
    )}
  </main>
);

const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <nav className="border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center gap-2 group">
        <Lucide.Zap className="text-blue-500 fill-blue-500 w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">AutoArchitect</span>
      </Link>
    </div>
    <div className="flex items-center gap-4">
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
      >
        {theme === 'dark' ? <Lucide.Sun className="w-5 h-5" /> : <Lucide.Moon className="w-5 h-5" />}
      </button>
      <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-5 py-1.5 rounded-full font-bold text-xs hover:bg-slate-800 dark:hover:bg-blue-50 transition active:scale-95">
        New Project
      </button>
    </div>
  </nav>
);

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'dark';
    } catch { return 'dark'; }
  });
  
  const [prompt, setPrompt] = useState(() => {
    try { return localStorage.getItem('autoarch_project_prompt') || ""; } catch { return ""; }
  });
  const [name, setName] = useState(() => {
    try { return localStorage.getItem('autoarch_project_name') || ""; } catch { return ""; }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [results, setResults] = useState<{ 1?: string; 2?: ProductPRD; 3?: string; }>({});

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem('autoarch_project_prompt', prompt); } catch {}
  }, [prompt]);

  useEffect(() => {
    try { localStorage.setItem('autoarch_project_name', name); } catch {}
  }, [name]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleGenerate = async () => {
    if (!prompt || !name) return;
    setIsGenerating(true);
    setResults({});
    setActiveStep(1);

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    const orchestrator = new AutoArchOrchestrator();
    
    try {
      await orchestrator.run({
        name,
        description: prompt,
        onProgress: (step, status, content) => {
          setActiveStep(step);
          if (content) {
            if (step === 2) {
              try { setResults(prev => ({ ...prev, [step]: JSON.parse(content) })); } 
              catch { console.error("PRD JSON Parse Fail"); }
            } else {
              setResults(prev => ({ ...prev, [step]: content }));
            }
          }
        }
      });
    } catch (err: any) {
      alert(err.message || "Generation failed. Please check your network or API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 selection:bg-blue-500/30">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HomePage 
        name={name} setName={setName} 
        prompt={prompt} setPrompt={setPrompt}
        isGenerating={isGenerating} activeStep={activeStep}
        results={results} handleGenerate={handleGenerate}
      />
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 bg-white dark:bg-slate-950 text-center">
        <p className="text-slate-400 dark:text-slate-600 text-[10px] font-mono tracking-widest uppercase">AUTOARCHITECT_ENGINE_V1.1_STABLE</p>
      </footer>
    </div>
  );
};

const OutputPanel: React.FC<{ step: number; title: string; active: boolean; content?: string; loading: boolean }> = ({ step, title, active, content, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex flex-col h-[600px] bg-white dark:bg-slate-900 border transition-all duration-500 rounded-2xl overflow-hidden ${active ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-200 dark:border-slate-800'}`}>
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
            0{step}
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {content && !loading && (
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                copied ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-500'
              }`}
            >
              {copied ? <Lucide.Check className="w-3.5 h-3.5" /> : <Lucide.Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
          {loading && <Lucide.Loader2 className="animate-spin text-blue-500 w-4 h-4" />}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-950/30">
        {content ? (
          <pre className="mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{content}</pre>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-800">
            <Lucide.Terminal className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-xs uppercase tracking-widest font-bold opacity-50">Pipeline Awaiting Execution</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;