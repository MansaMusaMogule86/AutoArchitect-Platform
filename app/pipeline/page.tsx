import React from 'react';
import * as Lucide from 'lucide-react';

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Lucide.Zap className="text-blue-500 w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-tight text-white">Generation Pipeline</h1>
        </div>
        <p className="text-slate-400 text-lg mb-12">
          The AutoArchitect pipeline is a multi-agent orchestration sequence designed for maximum technical accuracy.
        </p>
        <div className="grid gap-6">
          {[
            { step: "01", title: "DesignAgent", desc: "Transforms descriptions into high-fidelity UI/UX blueprints with Tailwind palettes." },
            { step: "02", title: "PMAgent", desc: "Generates machine-readable PRD JSONs with strictly validated feature schemas." },
            { step: "03", title: "EngineerAgent", desc: "Produces production-ready Next.js 14+ scaffolds with full TypeScript support." }
          ].map((item) => (
            <div key={item.step} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex gap-6 items-start">
              <div className="text-2xl font-black text-blue-500/50">{item.step}</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
