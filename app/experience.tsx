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
    company: "Freelance",
    role: "Full Stack Web Developer",
    date: "2025 - present",
    description: "Engineered and deployed custom responsive web applications for multiple clients using modern full-stack frameworks. Led technical discovery sessions to translate business requirements into functional architecture, and implemented end-to-end development practices optimizing performance and scalability across Linux servers.",
    skills: ["Next.js", "Express.js", "Laravel", "React"],
  },
  {
    id: 2,
    company: "Litbang IT (HIMSI)",
    role: "IT & Web Developer",
    date: "2026 - present",
    description: "Served as an operator for the CTRL-Z event, ensuring smooth technical execution. Developed a web-based application for the organization using React.",
    skills: ["React.js", "Technical Operations"],
  },
  {
    id: 3,
    company: "MDPTV",
    role: "Photography, Videography & Web Developer",
    date: "2024 - present",
    description: "Operated professional camera equipment for campus broadcasting and media production. Developed a custom web platform for MDPTV using React.js for the frontend, alongside Bun and Prisma ORM for the backend.",
    skills: ["React.js", "Bun", "Prisma ORM", "Broadcasting"],
  },
  {
    id: 4,
    company: "Procom (Programming Community)",
    role: "Member",
    date: "2024 - 2026",
    description: "Completed Coaching program covering ReactJS and RESTful APIs, culminating in a Next.js web application as the final project.",
    skills: ["ReactJS", "RESTful APIs", "Next.js"],
  },
  {
    id: 5,
    company: "Radio Republik Indonesia",
    role: "Intern",
    date: "Feb 2024 - May 2024",
    description: "Maintained digital broadcasting infrastructure and IT operation systems to ensure uninterrupted media production. Resolved technical hardware and network troubleshooting tasks to minimize system downtime during live broadcasts.",
    skills: ["IT Operations", "Network Troubleshooting", "Hardware Maintenance"],
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
                <div className="absolute -left-[7px] md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-background border-4 border-text-primary z-10 md:-translate-x-1/2 md:-translate-y-1/2 mt-1 md:mt-0 shadow-[0_0_0_4px_var(--background)]"></div>

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
