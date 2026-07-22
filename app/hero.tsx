"use client"
import Image from "next/image"
import { useEffect, useState, useMemo } from "react"
import FadeRight from "@/components/animations/FadeRight"
import FadeLeft from "@/components/animations/FadeLeft"

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const texts = useMemo(() => ["Frontend Developer", "Backend Developer", "Fullstack Developer"], [])

  const handleScroll = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    const currentIndex = index % texts.length

    const timeout = setTimeout(
      () => {
        const currentText = texts[currentIndex]

        if (!deleting && subIndex < currentText.length) {
          setSubIndex(subIndex + 1)
        } else if (deleting && subIndex > 0) {
          setSubIndex(subIndex - 1)
        } else if (!deleting && subIndex === currentText.length) {
          setDeleting(true)
        } else if (deleting && subIndex === 0) {
          setDeleting(false)
          setIndex((currentIndex + 1) % texts.length)
        }
      },
      deleting ? 75 : 150,
    )

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, texts])

  return (
    <>
      <section id="home" className="w-full max-w-7xl mx-auto cursor-default grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center px-6 md:px-12 py-24 md:py-32 overflow-hidden">
        <FadeLeft>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-text-primary text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                Hi, I&apos;m
                <span className="text-transparent bg-clip-text bg-linear-to-r from-text-primary to-text-secondary"> Rizki</span>
              </h1>
            </div>

            <div className="relative">
              <span className={`text-text-primary text-xl md:text-2xl lg:text-3xl font-bold tracking-tight`}>{`${texts[index].substring(0, subIndex)}`}</span>
              <span className="animate-cursor text-text-secondary text-2xl lg:text-3xl font-light">|</span>
            </div>

            <div className="max-w-xl mt-4">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium">Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu yang bermanfaat dan keren di dunia digital.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => handleScroll("projects")} className="cursor-pointer text-sm md:text-base font-bold bg-text-primary text-background px-8 py-4 rounded-xl flex flex-row items-center justify-center gap-3 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out">
                Explore Work
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </button>
              <a href="/Ahmad_Rizki_Hartawan_CV.pdf" download className="cursor-pointer text-sm md:text-base font-bold border-2 border-text-secondary/20 hover:border-text-primary text-text-primary px-8 py-4 rounded-xl flex flex-row items-center justify-center gap-3 hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-thirdary/40 transition-all duration-300 ease-out bg-background/50 backdrop-blur-sm shadow-[0_4px_10px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_10px_rgba(255,255,255,0.02)]">
                Download CV
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                </svg>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-text-secondary/10">
              <span className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-4 block">Connect</span>
              <div className="flex flex-row gap-4">
                {socialMediaList.map((item, index) => (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="p-3 border border-text-secondary/20 rounded-xl hover:border-text-primary hover:bg-text-primary hover:text-background text-text-primary transition-all duration-300" key={index}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeLeft>

        <FadeRight>
          <div className="flex flex-col items-center justify-center relative mt-12 md:mt-0">
            {/* Subtle aesthetic backdrop instead of neon glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-thirdary to-background rounded-full scale-110 opacity-50 blur-2xl"></div>

            <div className="relative z-10 p-2 bg-background border border-text-secondary/10 rounded-full shadow-2xl">
              <Image src="/images/hero.jpg" alt="Ahmad Rizki Hartawan" width={400} height={400} className="rounded-full object-cover aspect-square floating transition-all duration-700" priority />
            </div>

            {/* Quick Stats redesigned as floating minimal badges */}
            <div className="absolute -bottom-10 md:-bottom-12 -left-4 md:-left-12 z-20 flex flex-col gap-3">
              {quickStatsList.map((stat, index) => (
                <div className={`floating flex items-center gap-3 bg-background/90 backdrop-blur-md border border-text-secondary/10 p-3 pr-5 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-5`} style={{ animationDelay: `${index * 150}ms` }} key={index}>
                  <div className="bg-text-primary text-background p-2 rounded-xl">{stat.icon}</div>
                  <span className="text-xs md:text-sm font-semibold text-text-primary whitespace-nowrap">{stat.message}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </section>
    </>
  )
}

const socialMediaList = [
  {
    href: "https://instagram.com/rizki_hr4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/RyHarJr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/rizkihartawan/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
]

const quickStatsList = [
  {
    message: "2+ Years of Experience",
    icon: (
      <svg className="w-5 md:w-6 text-text-background" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    message: "Javascript Main Language",
    icon: (
      <svg className="w-5 md:w-6 text-text-background" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
      </svg>
    ),
  },
  {
    message: "Fullstack developer",
    icon: (
      <svg className="w-5 md:w-6 text-text-background" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M5 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2M5 12h14m-7 4v3m-4 0h8" />
      </svg>
    ),
  },
]
