"use client"
import Image from "next/image"
import { useState } from "react"
import GlareHover from "@/components/GlareHover"

export default function Project() {
  const [isOpen, setIsOpen] = useState<number | null>(null)

  return (
    <>
      <section id="projects" className="lg:h-180 cursor-default bg-secondary p-5 md:p-10 relative">
        <h2 className="text-2xl md:text-4xl font-bold text-text-primary text-center">Projects</h2>
        <div className="relative w-full mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectList.map((project, index) => (
            <GlareHover key={index} className="bg-bg-project-card rounded-lg shadow-lg overflow-hidden p-2 floating" glareColor="#ffffff" glareOpacity={0.3} glareAngle={-30} glareSize={300} transitionDuration={800} playOnce={false}>
              <Image src={project.imagePath} alt={project.title} width={500} height={500} className="w-full h-48 object-cover rounded-2xl" />
              <div className="p-4">
                <h3 className=" text-lg font-semibold text-text-primary">{project.title}</h3>
                <p className="text-xs md:text-sm text-text-secondary">{project.shortDescription}</p>
              </div>
              <button className="cursor-pointer flex felx-row font-semibold text-sm md:text-md bg-button-hero text-text-project-card px-4 py-2 rounded hover:bg-button-hero-hover active:bg-button-hero-hover m-4" onClick={() => setIsOpen(project.index)}>
                View More
                <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </button>
              {isOpen === index && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-thirdary bg-opacity-90">
                  <div className="flex flex-col text-sm p-5 md:p-10 text-left text-text-primary">
                    <button className="cursor-pointer absolute top-5 right-5 text-3xl text-text-primary hover:text-text-secondary active:text-text-secondary" onClick={() => setIsOpen(null)}>
                      &times;
                    </button>

                    <div className="mb-5 overflow-y-auto h-50">
                      <p className="text-text-secondary">
                        <span>Created At: </span>
                        <span className="font-semibold">{project.createdAt}</span>
                      </p>
                      <p className="mt-3 text-text-secondary">
                        <span>Technologies Used: </span>
                        <span className="font-semibold">{project.tech.map((tech, index) => (index === project.tech.length - 1 ? tech : `${tech}, `))}</span>
                      </p>
                      <p className="mt-3 text-text-secondary">
                        <span>Description: </span>
                        <span className="font-semibold">{project.description}</span>
                      </p>
                    </div>

                    <div className="absolute bottom-5 flex flex-row">
                      <button onClick={() => window.open(project.githubUrl, "_blank")} className="cursor-pointer flex flex-row items-center justify-between mt-5 bg-button-hero text-text-project-card px-4 py-2 rounded hover:bg-button-hero-hover active:bg-button-hero-hover">
                        <svg className="mr-2  w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
                        </svg>
                        Github
                      </button>
                      <button onClick={() => window.open(project.liveDemoUrl, "_blank")} className="cursor-pointer flex flex-row items-center justify-between ml-3 mt-5 border text-text-primary px-4 py-2 rounded hover:bg-button-hover active:bg-button-hover">
                        <svg className="mr-2  w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
                        </svg>
                        Live Demo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </GlareHover>
          ))}
        </div>
      </section>
    </>
  )
}

const projectList = [
  {
    index: 0,
    imagePath: "/images/project1.png",
    title: "RyHar API",
    shortDescription: "Ini adalah project Rest API saya, yang dibuat untuk memberi fasilitas API yang terjangkau bagi temen'",
    createdAt: "2025-08-05",
    description: `RyHar API adalah RESTful API yang dirancang untuk memberikan solusi pengembangan aplikasi yang cepat, aman, dan scalable.
API ini memudahkan developer dalam mengintegrasikan berbagai fitur ke dalam aplikasi mereka dengan arsitektur yang efisien dan dokumentasi yang mudah dipahami.
Dibangun menggunakan Next.js dan MongoDB, RyHar API mendukung format JSON standar serta struktur respons yang konsisten untuk pengalaman integrasi yang lancar.`,
    tech: ["React", "Next.js", "Tailwind", "TypeScript", "MongoDB", "Node.js"],
    githubUrl: "https://github.com/RyHarJr/rest-apiv2",
    liveDemoUrl: "https://api.ryhar.my.id",
  },
  {
    index: 1,
    imagePath: "/images/project1.png",
    title: "Project 1",
    shortDescription: "Test",
    createdAt: "2023-01-01",
    description: "Panjang",
    tech: ["React", "Next.js", "Tailwind"],
    githubUrl: "https://github.com/RyHarJr/rest-apiv2",
    liveDemoUrl: "https://api.ryhar.my.id",
  },
  {
    index: 2,
    imagePath: "/images/project1.png",
    title: "Project 1",
    shortDescription: "Test",
    createdAt: "2023-01-01",
    description: "Panjang",
    tech: ["React", "Next.js", "Tailwind"],
    githubUrl: "https://github.com/RyHarJr/rest-apiv2",
    liveDemoUrl: "https://api.ryhar.my.id",
  },
]
