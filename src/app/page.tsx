'use client';

import { useState } from 'react';
import EndpointCard from '@/components/EndpointCard';
import { generateEndpoints, Endpoint } from '@/lib/generateEndpoints';

const EXAMPLE_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "createdAt": "2024-01-15"
}`;

export default function Home() {
  const [json, setJson] = useState(EXAMPLE_JSON);
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [resourceName, setResourceName] = useState('users');
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setError('');
    try {
      JSON.parse(json);
      const eps = generateEndpoints(resourceName, json);
      setEndpoints(eps);
      setGenerated(true);
    } catch {
      setError('Invalid JSON — please check your input.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff88] font-bold text-xl tracking-tight">Snap</span>
          <span className="text-white font-bold text-xl tracking-tight">API</span>
          <span className="ml-2 text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 px-2 py-0.5 rounded-full">beta</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/50">
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
          <button className="bg-[#00ff88] text-black px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-[#00ff88]/90 transition-colors">
            Sign up free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-block bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs px-3 py-1 rounded-full mb-6">
          Paste JSON → Get a live REST API instantly
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
          Stop mocking APIs<br />
          <span className="text-[#00ff88]">the hard way.</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Paste any JSON schema, get fully documented REST endpoints in seconds. Share the URL, hit it from Postman, ship faster.
        </p>
      </section>

      {/* Generator */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Input header */}
          <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-[#00ff88]/70" />
              <span className="text-white/30 text-sm ml-2">schema.json</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-white/40 text-sm">Resource name:</label>
              <input
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-[#00ff88]/50 w-28"
              />
            </div>
          </div>

          {/* JSON input */}
          <div className="relative">
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              rows={12}
              className="w-full bg-transparent px-6 py-5 text-sm text-[#00ff88]/90 focus:outline-none resize-none leading-relaxed"
              placeholder="Paste your JSON schema here..."
              spellCheck={false}
            />
          </div>

          {error && (
            <div className="mx-6 mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Generate button */}
          <div className="border-t border-white/10 px-6 py-4 flex justify-end">
            <button
              onClick={handleGenerate}
              className="bg-[#00ff88] text-black font-bold px-8 py-2.5 rounded-xl hover:bg-[#00ff88]/90 active:scale-95 transition-all text-sm"
            >
              Generate API →
            </button>
          </div>
        </div>

        {/* Generated endpoints */}
        {generated && endpoints.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-white/60 text-sm">
                {endpoints.length} endpoints generated — base URL:
              </span>
              <code className="text-[#00ff88] text-sm">{`https://snapapi.dev/mock/${resourceName}`}</code>
            </div>
            <div className="space-y-3">
              {endpoints.map((ep, i) => (
                <EndpointCard key={i} endpoint={ep} resource={resourceName} json={json} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-white/10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-white/50 text-sm mb-2">Free</div>
              <div className="text-4xl font-bold mb-6">$0<span className="text-white/30 text-lg font-normal">/mo</span></div>
              <ul className="space-y-3 text-sm text-white/70">
                {['3 active mock APIs', '1,000 requests/month', 'Community support', '7-day data retention'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00ff88]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full border border-white/20 text-white py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Get started
              </button>
            </div>
            {/* Pro */}
            <div className="bg-[#00ff88]/5 border-2 border-[#00ff88]/30 rounded-2xl p-8">
              <div className="text-[#00ff88] text-sm mb-2">Pro — most popular</div>
              <div className="text-4xl font-bold mb-6">$12<span className="text-white/30 text-lg font-normal">/mo</span></div>
              <ul className="space-y-3 text-sm text-white/70">
                {['Unlimited mock APIs', '100k requests/month', 'Custom domain support', 'Persistent data', 'Priority support', 'Swagger UI export'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00ff88]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-[#00ff88] text-black font-bold py-2.5 rounded-xl hover:bg-[#00ff88]/90 transition-colors text-sm">
                Start 14-day trial
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        Built with Next.js · © 2025 SnapAPI
      </footer>
    </main>
  );
}
