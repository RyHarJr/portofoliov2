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
    <section id="experience" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10" ref={containerRef}>
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Career Path</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Work Experience</h3>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative group/list flex flex-col">
        {experiences.map((exp, index) => {
          return (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 40, filter: "blur(5px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: index * 0.1 }} className="group/item relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 -mx-6 md:-mx-8 rounded-2xl transition-all duration-500 hover:!opacity-100 hover:!blur-none group-hover/list:opacity-40 group-hover/list:blur-[2px] hover:bg-text-secondary/5 hover:shadow-lg border border-transparent hover:border-text-secondary/10">
              
              {/* Left Column: Date */}
              <div className="md:col-span-1 pt-1 md:pt-2">
                <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">{exp.date}</span>
              </div>

              {/* Right Column: Details */}
              <div className="md:col-span-3 flex flex-col">
                <h4 className="text-2xl font-bold text-text-primary tracking-tight mb-1 group-hover/item:text-text-primary transition-colors">{exp.role}</h4>
                <h5 className="text-sm font-bold text-text-secondary tracking-wide uppercase mb-6">{exp.company}</h5>

                <p className="text-base text-text-secondary font-medium leading-relaxed mb-6">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="text-xs font-bold bg-background md:bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider group-hover/item:bg-background transition-colors duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
