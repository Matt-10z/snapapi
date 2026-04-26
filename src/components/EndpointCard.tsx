'use client';

import { useState } from 'react';
import { Endpoint } from '@/lib/generateEndpoints';

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20',
  POST: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  PUT: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  DELETE: 'text-red-400 bg-red-400/10 border-red-400/20',
};

interface Props {
  endpoint: Endpoint;
  resource: string;
  json: string;
}

export default function EndpointCard({ endpoint, resource, json }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const baseUrl = `https://snapapi.dev/mock/${resource}`;
  const fullUrl = `${baseUrl}${endpoint.path}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sampleResponse = endpoint.method === 'GET' && !endpoint.path.includes(':id')
    ? `[${json}, ${json}]`
    : endpoint.method === 'DELETE'
    ? `{ "success": true, "message": "Resource deleted" }`
    : json;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono ${METHOD_COLORS[endpoint.method]}`}>
            {endpoint.method}
          </span>
          <code className="text-white/80 text-sm">{endpoint.path}</code>
          <span className="text-white/30 text-sm hidden sm:block">— {endpoint.description}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-1 border border-white/10 rounded-lg"
          >
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-1 border border-white/10 rounded-lg"
          >
            {expanded ? 'Hide' : 'Preview'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/10 px-5 py-4 bg-black/30">
          <div className="text-xs text-white/40 mb-2">Sample response</div>
          <pre className="text-xs text-[#00ff88]/80 overflow-auto max-h-48 leading-relaxed">
            {JSON.stringify(JSON.parse(sampleResponse), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
