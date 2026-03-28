import React, { useState } from 'react';
import { ProductPRD } from '../types';
import * as Lucide from 'lucide-react';

interface PRDViewerProps {
  prd: ProductPRD;
}

const PRDViewer: React.FC<PRDViewerProps> = ({ prd }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'raw'>('visual');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = JSON.stringify(prd, null, 2);
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy PRD: ', err);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/80 gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
          Product PRD (v{prd.metadata?.version || '1.0'})
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-tight transition ${activeTab === 'visual' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Visual UI
            </button>
            <button 
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-tight transition ${activeTab === 'raw' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Raw JSON
            </button>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
              copied 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' 
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Copy PRD JSON to clipboard"
          >
            {copied ? <Lucide.Check className="w-3.5 h-3.5" /> : <Lucide.Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900/40">
        {activeTab === 'raw' ? (
          <pre className="mono text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-lg overflow-x-auto text-emerald-600 dark:text-emerald-400 leading-relaxed border border-slate-200 dark:border-slate-800">
            {JSON.stringify(prd, null, 2)}
          </pre>
        ) : (
          <div className="space-y-8">
            <section>
              <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                Overview: {prd.overview?.title}
              </h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">{prd.overview?.summary}</p>
              </div>
            </section>

            <section>
              <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prd.features?.map((f) => (
                  <div key={f.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{f.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        f.priority === 'P0' ? 'bg-red-500/20 text-red-600 dark:text-red-400' : 
                        f.priority === 'P1' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 
                        'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {f.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                  User Stories
                </h3>
                <ul className="space-y-2">
                  {prd.user_stories?.map((story, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                      {story}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                  Technical Constraints
                </h3>
                <ul className="space-y-2">
                  {prd.technical_constraints?.map((constraint, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PRDViewer;