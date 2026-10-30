"use client";

import { Editor } from "@monaco-editor/react";

const LANGUAGE_MAP = {
  javascript: "javascript",
  java: "java",
  python: "python",
} as const;

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: keyof typeof LANGUAGE_MAP;
};

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: CodeEditorProps) {
  return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono ">
        {language}
      </div>
      <div className="h-75 w-full">
        <Editor
          height={"300px"}
          defaultLanguage={LANGUAGE_MAP[language]}
          language={LANGUAGE_MAP[language]}
          theme="vs-dark"
          value={value}
          onChange={(value) => onChange(value ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
