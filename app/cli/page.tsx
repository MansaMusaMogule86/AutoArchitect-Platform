import React from 'react';
import * as Lucide from 'lucide-react';

export default function CliPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Lucide.Terminal className="text-blue-500 w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-tight text-white">Studio CLI</h1>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
          <h2 className="text-xl font-bold mb-4 text-white">Installation</h2>
          <pre className="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-sm mb-8 border border-slate-800">
            npm install -g @autoarch/cli
          </pre>
          <h2 className="text-xl font-bold mb-4 text-white">Usage</h2>
          <pre className="bg-slate-950 p-4 rounded-xl text-blue-400 font-mono text-sm border border-slate-800">
            studio generate --name "MyProject" --description "A SaaS platform..."
          </pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h3 className="font-bold text-white mb-2">Local Parity</h3>
            <p className="text-slate-400 text-sm">Shares the exact prompt engine and logic as the web interface for identical results.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h3 className="font-bold text-white mb-2">Direct Write</h3>
            <p className="text-slate-400 text-sm">Automatically scaffolds directory structures and writes files directly to your local workspace.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
