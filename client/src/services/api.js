import React from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "te", name: "Telugu" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" }
];

export default function LanguageSelector({ value, onChange, label }) {
  return (
    <label style={{ display: "block", marginBottom: 8 }}>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ marginLeft: 8 }}>
        {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
    </label>
  );
}
