import React from 'react';
import * as Lucide from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-24">
      <div className="max-w-4xl mx-auto text-center">
        <Lucide.CreditCard className="text-blue-500 w-16 h-16 mx-auto mb-8" />
        <h1 className="text-5xl font-black tracking-tighter text-white mb-6">Usage & Billing</h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
          AutoArchitect is powered by the Google Gemini API. To generate projects, you must have an active API Key from a paid GCP project.
        </p>
        
        <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-12">
          <div className="bg-slate-900 px-12 py-8 rounded-[calc(1rem-4px)]">
            <h2 className="text-2xl font-bold text-white mb-4">Gemini API Integration</h2>
            <p className="text-slate-400 mb-8">Generation credits are consumed directly from your Google Cloud account.</p>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white text-slate-950 px-8 py-3 rounded-full font-black hover:bg-blue-50 transition block text-center"
            >
              Open Google Billing Docs
            </a>
          </div>
        </div>

        <div className="text-slate-500 text-sm">
          <p>The selected API key is securely stored in your environment session.</p>
        </div>
      </div>
    </div>
  );
}
