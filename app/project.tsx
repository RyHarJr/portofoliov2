"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import GlareHover from "@/components/GlareHover"

export default function Project() {
  const [isOpen, setIsOpen] = useState<number | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const activeProject = projectList.find((p) => p.index === isOpen)

  return (
    <>
      <section id="projects" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
        <FadeDown>
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Selected Works</h3>
          </div>
        </FadeDown>

        {/* Desktop View: Grid */}
        <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-3 gap-8 px-6 md:px-12">
          {projectList.map((project, index) => (
            <FadeUp key={`desktop-${index}`}>
              <GlareHover className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className="relative overflow-hidden aspect-[16/10] bg-text-secondary/5 border-b border-text-secondary/10">
                  <Image src={project.imagePath} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />

                  {/* Tech Stack Overlay */}
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && <span className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">+{project.tech.length - 3}</span>}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                  {/* Numbering */}
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">{String(project.index + 1).padStart(2, "0")}</div>

                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-black text-text-primary tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all duration-500">{project.title}</h4>
                  </div>

                  <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 flex-grow line-clamp-3">{project.shortDescription}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
                    <button className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 group/btn" onClick={() => setIsOpen(project.index)}>
                      View Details
                      <span className="w-8 h-[2px] bg-text-primary group-hover/btn:w-12 transition-all duration-300"></span>
                    </button>

                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-text-secondary/20 rounded-full text-text-secondary hover:text-background hover:bg-text-primary hover:border-text-primary transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </GlareHover>
            </FadeUp>
          ))}
        </div>

        {/* Mobile & Tablet View: Infinite Loop Slider */}
        <div className="lg:hidden w-full overflow-hidden relative py-4">
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
            <div className="flex gap-6 px-3">
              {projectList.map((project, index) => (
                <div key={`mobile1-${index}`} className="w-[85vw] sm:w-[400px] flex-shrink-0">
                  <GlareHover className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl">
                    <div className="relative overflow-hidden aspect-[16/10] bg-text-secondary/5 border-b border-text-secondary/10">
                      <Image src={project.imagePath} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />

                      {/* Tech Stack Overlay */}
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && <span className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">+{project.tech.length - 3}</span>}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                      {/* Numbering */}
                      <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">{String(project.index + 1).padStart(2, "0")}</div>

                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-black text-text-primary tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all duration-500">{project.title}</h4>
                      </div>

                      <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 flex-grow line-clamp-3">{project.shortDescription}</p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
                        <button className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 group/btn" onClick={() => setIsOpen(project.index)}>
                          View Details
                          <span className="w-8 h-[2px] bg-text-primary group-hover/btn:w-12 transition-all duration-300"></span>
                        </button>

                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-text-secondary/20 rounded-full text-text-secondary hover:text-background hover:bg-text-primary hover:border-text-primary transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </GlareHover>
                </div>
              ))}
            </div>
            
            <div className="flex gap-6 px-3">
              {projectList.map((project, index) => (
                <div key={`mobile2-${index}`} className="w-[85vw] sm:w-[400px] flex-shrink-0">
                  <GlareHover className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl">
                    <div className="relative overflow-hidden aspect-[16/10] bg-text-secondary/5 border-b border-text-secondary/10">
                      <Image src={project.imagePath} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />

                      {/* Tech Stack Overlay */}
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && <span className="text-[10px] font-bold bg-background/90 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">+{project.tech.length - 3}</span>}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                      {/* Numbering */}
                      <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">{String(project.index + 1).padStart(2, "0")}</div>

                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-black text-text-primary tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-text-secondary transition-all duration-500">{project.title}</h4>
                      </div>

                      <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 flex-grow line-clamp-3">{project.shortDescription}</p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
                        <button className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 group/btn" onClick={() => setIsOpen(project.index)}>
                          View Details
                          <span className="w-8 h-[2px] bg-text-primary group-hover/btn:w-12 transition-all duration-300"></span>
                        </button>

                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-text-secondary/20 rounded-full text-text-secondary hover:text-background hover:bg-text-primary hover:border-text-primary transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </GlareHover>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FadeUp>
          <div className="mt-16 flex justify-center w-full px-6">
            <a href="https://github.com/RyHarJr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-background border border-text-secondary/20 text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background rounded-xl font-bold tracking-widest text-sm uppercase transition-all duration-300 ease-out group hover:-translate-y-1.5 hover:scale-[1.02] shadow-sm hover:shadow-xl">
              <span>View More Project</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeUp>

        <AnimatePresence>
          {isOpen !== null && activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              {/* Backdrop */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={() => setIsOpen(null)} />

              {/* Modal Container */}
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-background border border-text-secondary/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-text-secondary/10">
                  <h4 className="text-2xl font-black text-text-primary tracking-tight">{activeProject.title}</h4>
                  <button className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-text-secondary/5 rounded-full" onClick={() => setIsOpen(null)}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-text-secondary/10">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Created</span>
                      <span className="text-sm font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10">{activeProject.createdAt}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((tech, i) => (
                          <span key={i} className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-5">Key Features</span>
                    <ul className="space-y-4">
                      {activeProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start bg-thirdary/50 p-4 rounded-xl border border-text-secondary/5">
                          <span className="text-text-primary mr-3 font-black mt-0.5">&rarr;</span>
                          <span className="text-sm font-bold text-text-primary uppercase tracking-wide">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-text-secondary/10 flex flex-col sm:flex-row gap-4 bg-background">
                  <a href={activeProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-bold text-sm tracking-widest uppercase bg-text-primary text-background py-4 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                    Live Demo
                  </a>
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-bold text-sm tracking-widest uppercase border-2 border-text-secondary/20 text-text-primary hover:border-text-primary hover:-translate-y-1 transition-all duration-300 py-4 rounded-xl">
                    Source Code
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

const projectList = [
  {
    index: 0,
    imagePath: "/images/jadibotwa.png",
    title: "JadibotWA",
    shortDescription: "Architected a code-free WhatsApp automation platform featuring live bot logs via WebSockets for real-time data, status monitoring, and scalable REST APIs.",
    createdAt: "2025-05-10",
    features: ["Live Bot Logs via WebSockets", "High-performance Microservices", "Multi-device Session Management", "AI-powered Chat Workflows"],
    tech: ["Go (Fiber)", "PostgreSQL", "WhatsMeow", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/RyHarJr",
    liveDemoUrl: "https://jadibotwa.xyz",
  },
  {
    index: 1,
    imagePath: "/images/ryharpanel.png",
    title: "RyHar Panel",
    shortDescription: "Built a modern landing page and management platform for a Pterodactyl hosting service, focused on fast, responsive, and conversion-driven user experience.",
    createdAt: "2025-08-05",
    features: ["Pterodactyl Integration", "Automated Transaction Processing", "Payment Gateway", "SEO Optimization"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Express.js", "Prisma ORM", "MySQL"],
    githubUrl: "https://github.com/RyHarJr",
    liveDemoUrl: "https://ryhar-panel.my.id",
  },
  {
    index: 2,
    imagePath: "/images/hero.jpg",
    title: "RyHar Portfolio",
    shortDescription: "Developed a personal portfolio website with a modern, responsive design focused on user experience to showcase profile, skills, and completed projects.",
    createdAt: "2026-07-20",
    features: ["Interactive Animations", "Responsive Design", "Modern UI/UX"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/RyHarJr/portofoliov2",
    liveDemoUrl: "https://ryhar.my.id",
  },
]
