import { useEffect, useState } from "react";
import { CourseAPI } from "../services/api";

export default function CourseDashboard() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="glass-panel p-5 md:p-6 shadow-sm shadow-slate-950/30">
          <p className="text-xs uppercase tracking-wide text-primary-300">Course Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-50">
            {course?.title || "Personalized learning path"}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            {course?.description ||
              "Your generated course appears here once available."}
          </p>
        </header>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300 shadow-sm shadow-slate-950/30">
            Loading your latest course...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100 shadow-sm shadow-red-950/30">
            {error}
          </div>
        )}

        {!loading && !error && course && (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(course.modules) &&
              course.modules.map((module, idx) => (
                <article
                  key={`${module.title}-${idx}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm shadow-slate-950/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold text-slate-100">{module.title}</h2>
                    <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-200">
                      {module.level}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Estimated time: <span className="text-slate-300">{module.estimatedTime}</span>
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-300">Concepts</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-400">
                      {Array.isArray(module.concepts) &&
                        module.concepts.map((concept) => <li key={concept}>{concept}</li>)}
                    </ul>
                  </div>

                  {Array.isArray(module.resources) && module.resources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50">
                      <p className="text-xs font-medium text-slate-300 mb-2">Resources</p>
                      <div className="space-y-2">
                        {module.resources.map((res, rIdx) => (
                          <a
                            key={`${res.url}-${rIdx}`}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group"
                          >
                            <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
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
                            <span className="text-[11px] text-slate-400 group-hover:text-primary-200 transition-colors truncate">
                              {res.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
          </section>
        )}
      </div>
    </div>
  );
}
