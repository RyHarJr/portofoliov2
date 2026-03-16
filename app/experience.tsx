"use client"
import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"

interface ExperienceItem {
  id: number
  company: string
  role: string
  date: string
  description: string
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Ryhar Panel",
    role: "Fullstack Web Developer",
    date: "2025",
    description: "Developed a web platform for selling hosting panels with dedicated admin and user dashboards. Implemented analytics for monitoring sales and system usage, built system settings management, and integrated a payment gateway for automated transactions.",
    skills: ["Next.js", "Node.js", "Prisma", "Express.js", "Tailwind CSS", "MySQL", "API Integration"],
  },
  {
    id: 2,
    company: "Ryhar API",
    role: "Fullstack Web Developer",
    date: "2025",
    description: "Developed Ryhar API, a platform that provides developers with easy access to free APIs accompanied by comprehensive documentation. Built a responsive frontend interface and implemented a backend system to handle API requests, user access, and data management.",
    skills: ["Next.js", "Tailwind CSS", "Express.js", "MySQL", "REST API"],
  },
  {
    id: 3,
    company: "WhatsApp Bot Platform",
    role: "Bot Developer",
    date: "2024 - 2025",
    description: "Built a multifunctional WhatsApp bot with various features including games, utility tools, and automated services. Implemented message processing, API integrations, and dynamic command handling to create interactive chat-based experiences.",
    skills: ["Node.js", "Baileys", "Puppeteer", "Express.js", "Canvas", "API Integration"],
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Add a slight spring physics to the line growth for smoothness
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10" ref={containerRef}>
      <FadeDown>
        <div className="max-w-3xl mx-auto text-center px-6 mb-20 md:mb-28">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Career Path</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Work Experience</h3>
        </div>
      </FadeDown>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* The Animated Vertical Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-text-secondary/20 md:-translate-x-1/2 rounded-full overflow-hidden">
          <motion.div style={{ scaleY, originY: 0 }} className="absolute top-0 left-0 w-full h-full bg-text-primary rounded-full" />
        </div>

        {/* Experience Items */}
        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(5px)" }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-background border-4 border-text-primary z-10 md:-translate-x-1/2 md:-translate-y-1/2 mt-1 md:mt-0 shadow-[0_0_0_4px_var(--background)]"></div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? "md:pl-10 text-left" : "md:pr-10 md:text-right"}`}>
                  <div className="bg-background border border-text-secondary/20 p-8 rounded-2xl hover:border-text-primary transition-colors duration-300 shadow-sm group">
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">{exp.date}</span>
                    <h4 className="text-2xl font-bold text-text-primary tracking-tight mb-1">{exp.role}</h4>
                    <h5 className="text-sm font-bold text-text-secondary tracking-wide uppercase mb-6">{exp.company}</h5>

                    <p className="text-base text-text-secondary font-medium leading-relaxed mb-6">{exp.description}</p>

                    <div className={`flex flex-wrap gap-2 ${!isEven ? "md:justify-end" : ""}`}>
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
