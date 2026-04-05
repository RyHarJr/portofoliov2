"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"

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
      <section id="projects" className="py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
        <FadeDown>
          <div className="max-w-3xl mx-auto text-center px-6 mb-16 md:mb-24">
            <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Selected Works</h3>
          </div>
        </FadeDown>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {projectList.map((project, index) => (
            <FadeUp key={index}>
              <div className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)]">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image src={project.imagePath} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">{project.title}</h4>
                  <p className="text-base text-text-secondary font-medium leading-relaxed mb-8 flex-grow">{project.shortDescription}</p>

                  <button className="w-full text-center font-bold text-sm tracking-widest uppercase border border-text-primary text-text-primary hover:bg-text-primary hover:text-background py-4 rounded-xl transition-colors duration-300 flex justify-center items-center gap-2" onClick={() => setIsOpen(project.index)}>
                    View Details
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
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
    imagePath: "/images/project1.png",
    title: "Ryhar Panel",
    shortDescription: "Platform web untuk menjual panel hosting dengan sistem dashboard terpisah untuk admin dan user serta integrasi payment gateway.",
    createdAt: "2026-01-10",
    features: ["Admin Dashboard", "User Dashboard", "Analytics Monitoring", "Payment Gateway Integration", "User Management"],
    tech: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MySQL"],
    githubUrl: "https://github.com/RyHarJr/ryhar-panelv2-fe",
    liveDemoUrl: "https://ryhar-panel.my.id",
  },
  {
    index: 1,
    imagePath: "/images/project2.png",
    title: "Ryhar API",
    shortDescription: "Platform Rest API yang menyediakan berbagai endpoint gratis dan mudah digunakan untuk developer, lengkap dengan dokumentasi API yang jelas.",
    createdAt: "2025-08-05",
    features: ["API Documentation", "User Authentication", "API Endpoint Access", "Developer Dashboard", "Request Handling"],
    tech: ["Next.js", "Tailwind CSS", "Express.js", "Node.js", "MySQL", "REST API"],
    githubUrl: "https://github.com/RyHarJr/rest-apiv3-fe",
    liveDemoUrl: "https://dash.ryhar.my.id",
  },
  {
    index: 2,
    imagePath: "/images/project3.png",
    title: "Elaina Bot (WhatsApp)",
    shortDescription: "Multifunctional WhatsApp bot with games, tools, and automation features designed to enhance user interaction directly within WhatsApp.",
    createdAt: "2024-12-15",
    features: ["Games System", "Utility Tools", "API Integration", "Media Generation (Canvas)", "Automation Commands"],
    tech: ["Node.js", "Baileys", "Puppeteer", "Express.js", "Canvas", "JavaScript"],
    githubUrl: "https://github.com/RyHarJr/Elaina",
    liveDemoUrl: "https://wa.me/6289508188642",
  },
]
