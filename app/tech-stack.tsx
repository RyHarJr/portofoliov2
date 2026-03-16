"use client"
import { motion } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"

export default function TechStack() {
  return (
    <section id="techstack" className="py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10 overflow-hidden">
      <FadeDown>
        <div className="max-w-3xl mx-auto text-center px-6 mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Skills & Tools</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">My Tech Stack</h3>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {techCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="md:w-1/3">
              <FadeDown delay={idx * 0.1}>
                <h4 className="text-2xl font-black text-text-primary tracking-tight mb-2">{category.title}</h4>
                <p className="text-text-secondary font-medium text-sm">{category.description}</p>
              </FadeDown>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {category.technologies.map((tech, techIdx) => (
                <FadeUp key={techIdx} delay={idx * 0.1 + techIdx * 0.05}>
                  <div className="group flex flex-col items-center justify-center p-6 bg-thirdary/20 hover:bg-thirdary/50 border border-text-secondary/10 hover:border-text-primary/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="w-12 h-12 mb-4 text-text-secondary group-hover:text-text-primary transition-colors flex items-center justify-center pointer-events-none" dangerouslySetInnerHTML={{ __html: tech.svg }} />
                    <span className="text-sm font-bold text-text-primary">{tech.name}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const techCategories = [
  {
    title: "Frontend Languages & Frameworks",
    description: "The tools I use to build beautiful, responsive, and interactive user interfaces.",
    technologies: [
      {
        name: "React",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.955 21a9.75 9.75 0 0 1-2.903-8.878A10 10 0 0 1 12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10a9.932 9.932 0 0 1-.045-1ZM8.5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z"/></svg>`,
      },
      {
        name: "Next.js",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.187 14.168-5.32-7.532V16.3h-1.63V7.644h1.5l5.584 7.828V7.644h1.63v8.524h-1.764z" /></svg>`,
      },
      {
        name: "Tailwind CSS",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>`,
      },
      {
        name: "TypeScript",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2V2Zm11.08 15.4c0-2.84 2.84-2.84 2.84-4.84 0-1.12-1.04-1.84-2.48-1.84-1.2 0-2.4.4-3.4 1.24l-1.08-2.08c1.32-1.08 3.08-1.68 4.96-1.68 2.84 0 5 1.52 5 4.36 0 2.92-2.92 3-2.92 4.92h-2.92Zm-6.52.12v-6.36H3.32v-2.52H9.8v2.52H6.56v6.36h-2Z"/></svg>`,
      },
    ],
  },
  {
    title: "Backend Core",
    description: "The foundations of the APIs and services I build for web apps and bots.",
    technologies: [
      {
        name: "Node.js",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.874 1.344a1.88 1.88 0 0 0-1.785 0L2.348 5.864a1.88 1.88 0 0 0-.943 1.62v9.034c0 .66.35 1.265.943 1.62l7.741 4.522c.553.323 1.233.323 1.786 0l7.74-4.523a1.88 1.88 0 0 0 .944-1.62V7.485c0-.66-.35-1.265-.943-1.62L11.874 1.344zm5.558 13v.006l-4.707 2.768a1.275 1.275 0 0 1-1.282 0l-4.7-2.76v-1.235l4.576 2.684a1.055 1.055 0 0 0 1.066 0l4.57-2.682v-.838l-4.57 2.684a1.055 1.055 0 0 1-1.066 0l-4.578-2.686V8.95L11.516 6l5.914 3.428v4.916zm-5.46-8.528 2.748 1.581-2.88 1.69-2.753-1.583 2.885-1.688Z"/></svg>`,
      },
      {
        name: "Express.js",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.187-5.832-5.32-7.532V16.3h-1.63V7.644h1.5l5.584 7.828V7.644h1.63v8.524h-1.764z"/></svg>`,
      },
      {
        name: "MySQL",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.522 0 10 1.79 10 4s-4.478 4-10 4-10-1.79-10-4 4.478-4 10-4zm0 2.5c-4.418 0-8-.895-8-2s3.582-2 8-2 8 .895 8 2-3.582 2-8 2zm0 7.5c5.522 0 10-1.79 10-4v3.5c0 2.21-4.478 4-10 4s-10-1.79-10-4V8c0 2.21 4.478 4 10 4zm0 7c5.522 0 10-1.79 10-4v3.5c0 2.21-4.478 4-10 4s-10-1.79-10-4V15c0 2.21 4.478 4 10 4z"/></svg>`,
      },
      {
        name: "MongoDB",
        svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.536 21.054a1.004 1.004 0 0 1-.505.006c-.198-.052-.395-.125-.589-.221A15.908 15.908 0 0 1 7.218 17.6c-2.3-2.905-2.73-5.228-2.61-6.938.169-2.396 1.343-4.148 2.053-5.078C8.508 3.167 11.231.298 11.294.239A.996.996 0 0 1 12 0c.265.005.528.087.731.239.063.059 2.786 2.928 4.634 5.344.71 1.012 1.884 2.84.205 5.078.12 1.71-.31 4.033-2.61 6.939a15.9 15.9 0 0 1-3.224 3.238 4.192 4.192 0 0 1-.589.22c-.179.052-.367.073-.554.062a.457.457 0 0 1-.067-.066Z"/></svg>`,
      },
    ],
  },
]
