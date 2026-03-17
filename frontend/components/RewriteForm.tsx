"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Loader2 } from "lucide-react";

const MODES = [
  { id: "business", label: "ビジネス文書" },
  { id: "summary", label: "要約" },
  { id: "refine", label: "わかりやすく" },
  { id: "casual", label: "カジュアルに" },
  { id: "email", label: "メール返信" },
];

export default function RewriteForm() {
  const [activeTab, setActiveTab] = useState<"rewrite" | "email">("rewrite");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  
  // States for inputs
  const { inputText, setInputText, addToHistory } = useAppStore();
  const [emailOriginal, setEmailOriginal] = useState("");
  const [emailPoints, setEmailPoints] = useState("");

  const handleRewrite = async (mode: string) => {
    if (activeTab === "email") {
      if (!emailPoints.trim()) return;

      setLoading(true);
      setError("");
      setResult("");

      try {
        const response = await fetch("http://localhost:8000/rewrite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Fix 1: original と points を個別フィールドで送信
          body: JSON.stringify({
            text: emailPoints,
            mode: "email",
            original: emailOriginal,
            points: emailPoints,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const detail = errorData.detail;
          const message = typeof detail === "string"
            ? detail
            : typeof detail === "object" && detail !== null
              ? JSON.stringify(detail)
              : "文章生成に失敗しました";
          throw new Error(message);
        }

        const data = await response.json();
        setResult(data.result);
        addToHistory({
          originalText: `[原文]\n${emailOriginal}\n\n[要点]\n${emailPoints}`,
          rewrittenText: data.result,
          mode,
        });
      } catch (err: any) {
        setError(err.message || "文章生成に失敗しました。サーバーが起動しているか確認してください。");
      } finally {
        setLoading(false);
      }
      return;
    }

    // リライトタブの処理（従来通り）
    let finalInput = inputText;
    if (!finalInput.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("http://localhost:8000/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: finalInput, mode }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail;
        const message = typeof detail === "string" 
          ? detail 
          : typeof detail === "object" && detail !== null
            ? JSON.stringify(detail)
            : "文章生成に失敗しました";
        throw new Error(message);
      }

      const data = await response.json();
      setResult(data.result);
      addToHistory({
        originalText: finalInput,
        rewrittenText: data.result,
        mode,
      });
    } catch (err: any) {
      setError(
        err.message ||
          "文章生成に失敗しました。サーバーが起動しているか確認してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const currentMode = MODES.find((m) => m.id === MODES.find(mode => mode.id === result)?.id);
  const { history } = useAppStore();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Tab UI */}
      <div className="flex bg-black p-1 neo-border">
        <button
          onClick={() => setActiveTab("rewrite")}
          className={`flex-1 py-2 text-xs font-black transition-colors ${
            activeTab === "rewrite" ? "bg-white text-black" : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          文章を磨く
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={`flex-1 py-2 text-xs font-black transition-colors ${
            activeTab === "email" ? "bg-white text-black" : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          メールの作成・返信
        </button>
      </div>

      {/* Editor Card */}
      <div className="bg-white neo-border neo-shadow">
        {activeTab === "rewrite" ? (
          <>
            <div className="p-4 border-b-2 border-black bg-zinc-50 flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter font-display neo-border">
                Input
              </span>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 font-bold">
                入力を磨く
              </label>
            </div>
            <div className="p-1 min-h-[220px]">
              <textarea
                className="w-full h-[220px] p-4 text-[16px] outline-none resize-none bg-transparent"
                placeholder="ここに磨きたい文章を入力してください..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 bg-black gap-0 border-t-2 border-black">
              {MODES.filter(m => m.id !== "email").map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleRewrite(mode.id)}
                  disabled={loading || !inputText.trim()}
                  className="bg-white p-[16px] font-black text-sm cursor-pointer border-[0.5px] border-black hover:bg-[var(--accent)] hover:text-white active:bg-black active:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="border-b-2 border-black">
              <div className="p-3 bg-zinc-50 border-b-2 border-black border-dashed flex items-center gap-2">
                <span className="bg-zinc-200 text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter font-display neo-border">
                  Step 01
                </span>
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                  相手からのメール原文（任意）
                </label>
              </div>
              <div className="p-1">
                <textarea
                  className="w-full h-[140px] p-4 text-[14px] outline-none resize-none bg-transparent placeholder:text-zinc-300"
                  placeholder="頂いたメールの内容をここに貼り付けると、文脈を考慮した返信が作れます。空欄でもOKです。"
                  value={emailOriginal}
                  onChange={(e) => setEmailOriginal(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="p-3 bg-zinc-50 border-b-2 border-black border-dashed flex items-center gap-2">
                <span className="bg-[var(--accent)] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter font-display neo-border">
                  Step 02
                </span>
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-800">
                  伝えたい要点
                </label>
              </div>
              <div className="p-1">
                <textarea
                  className="w-full h-[160px] p-4 text-[14px] outline-none resize-none bg-transparent placeholder:text-zinc-300"
                  placeholder="例：
・火曜日の14時なら空いていること
・資料は週明けに送ること
・検討のお礼"
                  value={emailPoints}
                  onChange={(e) => setEmailPoints(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => handleRewrite("email")}
              disabled={loading || !emailPoints.trim()}
              className="bg-black text-white p-[18px] font-black text-sm cursor-pointer hover:bg-[var(--accent)] active:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-t-2 border-black"
            >
              マナーに則ったビジネスメールを生成する
            </button>
          </div>
        )}
      </div>

      {/* Result Section */}
      {(loading || result || error) && (
        <div className="pl-1">
          <div className="flex items-center gap-2 mb-4">
            <span className={`${error ? "bg-red-600" : "bg-[var(--accent)]"} text-white px-3 py-1 text-[11px] font-black uppercase tracking-tighter font-display neo-border neo-shadow-sm`}>
              {loading ? "Processing" : error ? "Error" : "Result"}
            </span>
            <label className="text-[12px] font-black uppercase tracking-widest text-zinc-800">
              {loading ? "実行中" : error ? "発生したエラー" : "書き換え結果"}
            </label>
          </div>

          <div
            className={`text-[17px] font-bold leading-relaxed mb-6 min-h-[40px] whitespace-pre-wrap ${
              error ? "text-red-600" : "text-black"
            } ${loading ? "opacity-50" : "opacity-100"}`}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="animate-pulse">Generating...</span>
              </div>
            ) : (
              error || result
            )}
          </div>

          {!error && !loading && result && (
            <button
              onClick={copyToClipboard}
              className="copy-trigger neo-border neo-shadow-sm px-3 py-[6px] text-[11px] font-black bg-white hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_var(--black)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_var(--black)] transition-all uppercase"
            >
              {copied ? "コピーしました" : "クリップボードにコピー"}
            </button>
          )}
        </div>
      )}

      {/* History Log */}
      {history.length > 0 && (
        <div className="pt-8 border-t-2 border-black border-dashed">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-black text-white px-3 py-1 text-[11px] font-black uppercase tracking-tighter font-display neo-border">
                Log
              </span>
              <label className="text-[12px] font-black uppercase tracking-widest text-zinc-800">
                履歴ログ（セッション中）
              </label>
            </div>
            <button 
              onClick={() => useAppStore.getState().clearHistory()}
              className="text-[10px] font-black text-zinc-400 hover:text-red-600 transition-colors uppercase underline"
            >
              Clear Log
            </button>
          </div>
          
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="bg-zinc-50 neo-border p-4 relative group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-black px-1.5 py-0.5 bg-zinc-200 uppercase neo-border">
                    {MODES.find(m => m.id === item.mode)?.label || item.mode}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm font-bold line-clamp-3 text-zinc-600 mb-2 border-l-2 border-zinc-200 pl-3">
                  {item.originalText}
                </div>
                <div className="text-sm font-black whitespace-pre-wrap">
                  {item.rewrittenText}
                </div>
                <button
                  onClick={() => {
                    setResult(item.rewrittenText);
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                  className="absolute top-4 right-4 text-[10px] font-black bg-white neo-border px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
                >
                  LOAD
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
