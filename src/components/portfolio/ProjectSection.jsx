import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import GlassCard from "@/components/portfolio/GlassCard";
import { ExternalLink, ArrowRight, Github, Star, GitFork, Loader2 } from "lucide-react";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  Jupyter: "#DA5B0B",
  MATLAB: "#e16737",
  TeX: "#3D6117",
  SCSS: "#c6538c",
  "Objective-C": "#438eff",
  React: "#61dafb",
};

const GITHUB_USERNAME = "to6661q";

export default function ProjectSection() {
  const shouldReduceMotion = useReducedMotion();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Coba fetch pinned repos dari layanan pihak ketiga
        const pinnedResponse = await fetch(
          `https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`
        );

        if (pinnedResponse.ok) {
          const pinnedData = await pinnedResponse.json();
          if (pinnedData && pinnedData.length > 0) {
            const mapped = pinnedData.slice(0, 6).map((repo) => ({
              name: repo.repo,
              description: repo.description || "No description available",
              language: repo.language,
              html_url: repo.link,
              stargazers_count: repo.stars || 0,
              forks_count: repo.forks || 0,
            }));
            setProjects(mapped);
            return; 
          }
        }

        // Fallback: fetch semua repos dari GitHub API
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );

        if (reposResponse.status === 403) {
          throw new Error("RATE_LIMIT");
        }

        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          const sorted = reposData
            .sort((a, b) => {
              if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
              }
              return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, 6)
            .map((repo) => ({
              name: repo.name,
              description: repo.description || "No description available",
              language: repo.language,
              html_url: repo.html_url,
              stargazers_count: repo.stargazers_count || 0,
              forks_count: repo.forks_count || 0,
            }));
          setProjects(sorted);
        } else {
          throw new Error("FAILED_TO_FETCH");
        }
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        
        if (err.message === "RATE_LIMIT") {
          setError("RATE_LIMIT");
        } else {
          setError("FAILED_TO_FETCH");
        }
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  return (
    <section id="project" className="py-4 sm:py-12">
      <SectionHeader title="Pinned Projects on GitHub" />

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          <p className="text-white/50 font-inter text-sm">Loading projects data...</p>
        </div>
      )}

      {!loading && error === "RATE_LIMIT" && (
        <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
          {/* Logo GitHub Besar & Transparan */}
          <Github className="w-24 h-24 text-white/10" />
          
          <div className="max-w-md space-y-2">
            <p className="text-white/80 font-inter text-lg font-semibold">
              GitHub API Rate Limit Exceeded
            </p>
            <p className="text-white/50 font-inter text-sm leading-relaxed">
              You have reached the maximum number of visits to this page. GitHub temporarily restricts unauthenticated requests. Please try again later or visit my profile directly.
            </p>
          </div>

          {/* Tombol Hijau Transparan (Style sama dengan "View more") */}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 rounded-[16px] bg-gradient-to-r from-[#39FF14]/10 to-[#29B800]/10 border border-[#39FF14]/30 text-[#39FF14] text-[14px] font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all font-inter mt-2"
          >
            Visit My GitHub Profile
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}

      {!loading && error === "FAILED_TO_FETCH" && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Github className="w-12 h-12 text-white/20" />
          <div>
            <p className="text-white/60 font-inter text-sm font-semibold">
              No projects available
            </p>
            <p className="text-white/40 font-inter text-xs mt-1">
              Check your GitHub username or network connection
            </p>
          </div>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <a
                key={project.name}
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <GlassCard delay={i * 0.08} className="h-full cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <Github className="w-5 h-5 text-white/40" />
                    <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#39FF14] transition-colors" />
                  </div>
                  <h3 className="text-[16px] font-outfit font-bold text-white tracking-tight group-hover:text-[#39FF14] transition-colors break-words">
                    {project.name}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed mt-2 font-inter min-h-[52px]">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      {project.language ? (
                        <>
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: LANG_COLORS[project.language] || "#39FF14",
                            }}
                          />
                          <span className="text-[12px] text-white/50 font-inter">
                            {project.language}
                          </span>
                        </>
                      ) : (
                        <span className="text-[12px] text-white/30 font-inter italic">
                          No language
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-[12px] text-white/40 font-inter">
                        <Star className="w-3 h-3" /> {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-[12px] text-white/40 font-inter">
                        <GitFork className="w-3 h-3" /> {project.forks_count}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-[16px] bg-gradient-to-r from-[#39FF14]/10 to-[#29B800]/10 border border-[#39FF14]/30 text-[#39FF14] text-[14px] font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all font-inter"
            >
              View more Projects on GitHub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </>
      )}
    </section>
  );
}