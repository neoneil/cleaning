"use client";

import { useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "zh";

const STORAGE_KEY = "cleanprime-language";

function applyLanguage(language: Language) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
}

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem(STORAGE_KEY) === "zh" ? "zh" : "en";
}

export function useLanguageChoice() {
  const language = useSyncExternalStore<Language>(
    (callback) => {
      window.addEventListener("cleanprime-language-change", callback);
      window.addEventListener("storage", callback);
      return () => {
        window.removeEventListener("cleanprime-language-change", callback);
        window.removeEventListener("storage", callback);
      };
    },
    readStoredLanguage,
    () => "en"
  );

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  function setLanguage(nextLanguage: Language) {
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    window.dispatchEvent(
      new CustomEvent("cleanprime-language-change", { detail: nextLanguage })
    );
  }

  return { language, setLanguage };
}

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguageChoice();

  return (
    <div
      className="grid grid-cols-2 overflow-hidden rounded-md border border-gray-300 bg-white p-0.5 text-xs font-semibold text-gray-700"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded px-2.5 py-1.5 transition ${
          language === "en" ? "bg-gray-900 text-white" : "hover:bg-gray-100"
        }`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("zh")}
        className={`rounded px-2.5 py-1.5 transition ${
          language === "zh" ? "bg-gray-900 text-white" : "hover:bg-gray-100"
        }`}
        aria-pressed={language === "zh"}
      >
        中文
      </button>
    </div>
  );
}
