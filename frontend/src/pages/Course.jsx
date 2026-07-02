import { useEffect, useState } from "react";
import { CourseAPI } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Course() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Module interaction state
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleContent, setModuleContent] = useState("");
  const [generatingContent, setGeneratingContent] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await CourseAPI.myCourse();
        setCourse(data);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load your course right now.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const handleModuleClick = async (module) => {
    setSelectedModule(module);
    setGeneratingContent(true);
    setModuleContent("");
    try {
      const { data } = await CourseAPI.moduleContent({
        title: module.title,
        concepts: module.concepts
      });
      setModuleContent(data.content);
    } catch (err) {
      console.error("Failed to generate module content:", err);
      setModuleContent("Unable to generate lesson content. Please try again.");
    } finally {
      setGeneratingContent(false);
    }
  };

  if (loading) {
    return (
      <div className="page-shell px-4 py-8 md:px-8">
        <div className="max-w-5xl mx-auto glass-panel p-5 text-sm text-slate-300">
          Loading your personalized course...
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
            Personalized course
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Your latest generated learning path.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        {course && (
          <div className="space-y-4">
            <div className="glass-panel p-5 space-y-2">
              <h2 className="text-lg font-semibold text-slate-100">{course.title}</h2>
              <p className="text-sm text-slate-300">{course.description}</p>
              <p className="text-xs text-slate-500">Subject: {course.subject}</p>
            </div>

            <div className="grid gap-3">
              {Array.isArray(course.modules) &&
                course.modules.map((module, idx) => (
                  <div 
                    key={`${module.title}-${idx}`} 
                    onClick={() => handleModuleClick(module)}
                    className="card-muted p-4 space-y-2 cursor-pointer hover:border-primary-500/50 hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">{module.title}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-primary-500/40 bg-primary-500/10 text-primary-200">
                        {module.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Estimated time: {module.estimatedTime}</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(module.concepts) &&
                        module.concepts.map((concept) => (
                          <span
                            key={concept}
                            className="text-[11px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-900/70 text-slate-300"
                          >
                            {concept}
                          </span>
                        ))}
                    </div>

                    {Array.isArray(module.resources) && module.resources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/50 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Learning Resources</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {module.resources.map((res, rIdx) => (
                            <a
                              key={`${res.url}-${rIdx}`}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 transition-colors group"
                            >
                              <div className="text-primary-400 group-hover:text-primary-300">
                                {res.type === "video" && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                  </svg>
                                )}
                                {res.type === "article" && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                  </svg>
                                )}
                                {res.type === "documentation" && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10.804C3.057 15.094 4.245 14.804 5.5 14.804c1.179 0 2.307.252 3.328.707L9 4.804zM11 4.804V15.511c1.021-.455 2.149-.707 3.328-.707 1.255 0 2.443.29 3.5.804V4.804A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804z" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[11px] font-medium text-slate-200 truncate group-hover:text-white">{res.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass-panel flex flex-col overflow-hidden shadow-2xl border-slate-700/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-800/60 bg-slate-900/40">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-50">{selectedModule.title}</h2>
                  <div className="flex gap-2">
                    {selectedModule.concepts.map(c => (
                      <span key={c} className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/30">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-900/20">
                {generatingContent ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="h-10 w-10 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
                    <p className="text-sm text-slate-400 animate-pulse">AI is crafting your detailed lesson...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed space-y-6">
                      {moduleContent.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-slate-50 mt-6 mb-4">{line.substring(2)}</h1>;
                        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-slate-100 mt-5 mb-3">{line.substring(3)}</h2>;
                        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-slate-200 mt-4 mb-2">{line.substring(4)}</h3>;
                        if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 list-disc text-slate-300">{line.substring(2)}</li>;
                        if (line.trim() === '') return <br key={i} />;
                        return <p key={i} className="mb-4">{line}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800/60 bg-slate-900/40 flex justify-end">
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors"
                >
                  Close Lesson
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
