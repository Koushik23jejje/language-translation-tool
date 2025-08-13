import React, { useState } from "react";
import { translate } from "./services/api";
import LanguageSelector from "./components/LanguageSelector";

export default function App() {
  const [text, setText] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("te");
  const [provider, setProvider] = useState("microsoft");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onTranslate() {
    setLoading(true);
    setOutput("");
    try {
      const { translated } = await translate({ text, from, to, provider });
      setOutput(translated);
    } catch {
      setOutput("Translation failed. Check server and keys.");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output || "");
  }

  function speak() {
    if (!output) return;
    const uttr = new SpeechSynthesisUtterance(output);
    window.speechSynthesis.speak(uttr);
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Inter, system-ui, Arial" }}>
      <h1>🌐 Language Translation Tool</h1>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <LanguageSelector label="From" value={from} onChange={setFrom} />
        <LanguageSelector label="To" value={to} onChange={setTo} />

        <label>
          Provider
          <select value={provider} onChange={(e) => setProvider(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="microsoft">Microsoft</option>
            <option value="google">Google</option>
          </select>
        </label>
      </div>

      <textarea
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: 16 }}
      />

      <button onClick={onTranslate} disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Translating..." : "Translate"}
      </button>

      <h3 style={{ marginTop: 24 }}>Result</h3>
      <div style={{ border: "1px solid #ddd", padding: 12, minHeight: 80 }}>{output}</div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={copy} disabled={!output}>Copy</button>
        <button onClick={speak} disabled={!output}>🔊 Speak</button>
      </div>
    </div>
  );
}
