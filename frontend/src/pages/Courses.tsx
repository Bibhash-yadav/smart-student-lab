import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import courseData from "../data/courseData";

export default function Courses() {
  const [language, setLanguage] = useState("C");
  const [activeTopic, setActiveTopic] = useState("Introduction");

  // 🔥 NEW STATE (Overlay)
  const [showNotice, setShowNotice] = useState(true);

  const languages = [
    "C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "TSX"
  ];

  const topics = [
    "Introduction", "Variables", "Data Types", "Loops",
    "Functions", "Programs", "Projects"
  ];

  // ✅ TYPE SAFE ACCESS
  const currentData = useMemo(() => {
    return (
      courseData?.[language as keyof typeof courseData]?.[
        activeTopic as keyof typeof courseData["C"]
      ] || {
        title: "Coming Soon",
        description: "This module is under development.",
        sections: []
      }
    );
  }, [language, activeTopic]);

  // 🔥 AUTO HIDE (optional)
  useEffect(() => {
    const timer = setTimeout(() => setShowNotice(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#0b0f19] text-white overflow-hidden">

      {/* 🔷 NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
        <Navbar />
      </div>

      {/* 🔷 LANGUAGE SWITCH */}
      <div className="flex gap-3 p-3 overflow-x-auto backdrop-blur-xl bg-white/5 border-b border-white/10">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => {
              setLanguage(lang);
              setActiveTopic("Introduction");
            }}
            className={`px-4 py-2 rounded-full text-sm transition ${
              language === lang
                ? "bg-cyan-400 text-black shadow-lg"
                : "bg-white/10 text-gray-400"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* 🔥 MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* 🔷 SIDEBAR */}
        <aside className="hidden lg:flex w-72 flex-col backdrop-blur-xl bg-white/5 border-r border-white/10 p-4">
          <h2 className="text-xs text-cyan-400 uppercase mb-4">
            Topics
          </h2>

          <div className="overflow-y-auto">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
                  activeTopic === topic
                    ? "bg-cyan-400/20 text-cyan-300"
                    : "text-gray-400 hover:bg-white/10"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </aside>

        {/* 🔷 CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">
              {currentData.title}
            </h1>
            <p className="text-gray-400">
              {currentData.description}
            </p>
          </div>

          {/* SECTIONS */}
          <div className="space-y-8">
            {currentData.sections.length > 0 ? (
              currentData.sections.map((section: any, i: number) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:scale-[1.01] transition"
                >

                  {/* TITLE */}
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl font-bold">
                      {section.title}
                    </h2>

                    {section.difficulty && (
                      <span className="text-xs px-2 py-1 bg-cyan-400/20 rounded-full text-cyan-300">
                        {section.difficulty}
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  {section.content && (
                    <p className="text-gray-300 mb-3">
                      {section.content}
                    </p>
                  )}

                  {/* LIST */}
                  {section.list && (
                    <ul className="mb-3">
                      {section.list.map((item: string, idx: number) => (
                        <li key={idx} className="text-gray-300">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CODE */}
                  {section.code && (
                    <pre className="bg-black/80 p-4 rounded-xl text-sm text-cyan-300 overflow-x-auto mb-3">
                      <code>{section.code}</code>
                    </pre>
                  )}

                  {/* PRACTICE */}
                  {section.practice && (
                    <div className="mb-3">
                      <h3 className="text-green-400 text-sm mb-1">
                        Practice
                      </h3>
                      {section.practice.map((q: string, idx: number) => (
                        <p key={idx} className="text-gray-300 text-sm">
                          👉 {q}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* INTERVIEW */}
                  {section.interview && (
                    <div className="mb-3">
                      <h3 className="text-yellow-400 text-sm mb-1">
                        Interview
                      </h3>
                      {section.interview.map((q: string, idx: number) => (
                        <p key={idx} className="text-gray-300 text-sm">
                          💡 {q}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* FEATURES */}
                  {section.features && (
                    <div>
                      <h3 className="text-purple-400 text-sm mb-1">
                        Features
                      </h3>
                      {section.features.map((f: string, idx: number) => (
                        <p key={idx} className="text-gray-300 text-sm">
                          ⚡ {f}
                        </p>
                      ))}
                    </div>
                  )}

                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-20">
                🚧 Coming Soon
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 🔥 BOTTOM TAB (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/10 border-t border-white/10 p-3 flex justify-around lg:hidden">
        {topics.slice(0, 4).map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`text-xs ${
              activeTopic === topic
                ? "text-cyan-300"
                : "text-gray-400"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* 🔥 CENTER OVERLAY (NEW) */}
      {showNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">

          <div className="bg-[#0b0f19]/90 border border-white/10 rounded-2xl p-8 text-center max-w-md shadow-2xl">

            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              🚧 Page Under Development
            </h2>

            <p className="text-gray-400 mb-6">
              This section is currently being updated.  
              Please check back soon.
            </p>

            <button
              onClick={() => setShowNotice(false)}
              className="px-6 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-105 transition"
            >
              Got it 👍
            </button>

          </div>

        </div>
      )}

    </div>
  );
}