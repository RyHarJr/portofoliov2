"use client"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"

export default function TechStack() {
  return (
    <section id="techstack" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10 overflow-hidden">
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
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
                    <div className="w-12 h-12 mb-4 transition-colors flex items-center justify-center pointer-events-none">
                      {tech.svg ? (
                        tech.svg.startsWith("<") ? (
                          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: tech.svg }} />
                        ) : (
                          <img src={tech.svg} alt={tech.name} className="w-full h-full tech-icon-img" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-xl bg-thirdary/50 rounded-lg">{tech.name.charAt(0)}</div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-text-primary text-center">{tech.name}</span>
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
    title: "Frontend",
    description: "Frameworks and libraries for building interactive user interfaces.",
    technologies: [
      { name: "React.js", svg: "./icons/react.svg" },
      { name: "Next.js", svg: "./icons/nextjs.svg" },
      { name: "Tailwind CSS", svg: "./icons/tailwindcss.svg" },
      { name: "HTML5", svg: "./icons/html.svg" },
      { name: "CSS3", svg: "./icons/css.svg" },
      { name: "Framer Motion", svg: "./icons/framermotion.svg" },
    ],
  },
  {
    title: "Backend",
    description: "Server-side technologies and frameworks.",
    technologies: [
      { name: "Node.js", svg: "./icons/nodejs.svg" },
      { name: "Express.js", svg: "./icons/express.svg" },
      { name: "Go (Golang)", svg: "./icons/go.svg" },
      { name: "Fiber", svg: "./icons/fiber.svg" },
      { name: "Laravel", svg: "./icons/laravel.svg" },
    ],
  },
  {
    title: "Databases & ORM",
    description: "Database management systems and Object-Relational Mappers.",
    technologies: [
      { name: "MySQL", svg: "./icons/mysql.svg" },
      { name: "PostgreSQL", svg: "./icons/postgresql.svg" },
      { name: "MongoDB", svg: "./icons/mongodb.svg" },
      { name: "Prisma ORM", svg: "./icons/prisma.svg" },
    ],
  },
  {
    title: "Tools & Infrastructure",
    description: "Development tools, version control, and deployment.",
    technologies: [
      { name: "Git", svg: "./icons/git.svg" },
      { name: "GitHub", svg: "./icons/github.svg" },
      { name: "Docker", svg: "./icons/docker.svg" },
      { name: "Linux", svg: "./icons/linux.svg" },
      { name: "Nginx", svg: "./icons/nginx.svg" },
      { name: "Postman", svg: "./icons/postman.svg" },
    ],
  },
]
