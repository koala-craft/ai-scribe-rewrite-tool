"use client";

import { useState, useEffect } from "react";
import RewriteForm from "../components/RewriteForm";

export default function Home() {
  const [modelName, setModelName] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/model")
      .then(res => res.json())
      .then(data => setModelName(data.model))
      .catch(() => setModelName("AI"));
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center p-6 bg-zinc-50">
      <div className="w-full max-w-3xl">
        <header className="mb-12 flex justify-between items-start">
          <div className="font-display font-bold text-[32px] bg-black text-white px-3 py-1 neo-shadow rotate-[-1deg]">
            SCRIBE
          </div>
          
          <div className="flex flex-col items-end gap-3 mt-1">
            {/* Version Tag */}
            <div className="bg-zinc-100 border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest neo-shadow-sm">
              β Ver 1.0
            </div>
            
            {/* Connection Status Tag */}
            <div className="bg-white border-2 border-black px-3 py-1 flex items-center gap-3 neo-shadow-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter mb-0.5">Engine</span>
                <span className="text-[11px] font-black text-black">
                  {modelName || "CONNECTING..."}
                </span>
              </div>
            </div>
          </div>
        </header>

        <RewriteForm />
      </div>
    </main>
  );
}
