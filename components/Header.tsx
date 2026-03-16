"use client"
import { useState, useEffect } from "react"
import FadeDown from "./animations/FadeDown"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    const prefersDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)

    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", shouldBeDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newTheme)
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const handleScroll = () => {
      let current: string | null = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id")
        }
      })
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none w-full">
      <div className="w-full max-w-5xl pointer-events-auto">
        <FadeDown>
          <div className="relative flex items-center justify-between py-3 md:py-4 px-6 md:px-8 bg-background/80 backdrop-blur-md border border-text-secondary/20 rounded-full shadow-lg transition-colors duration-300">
            <div className="flex flex-row items-center">
              {/* Typographic Logo */}
              <span className="text-xl md:text-2xl font-black text-text-primary tracking-tighter">PORTFOLIO.</span>
            </div>

            <nav className="flex-row md:gap-8 lg:gap-10 hidden lg:flex items-center">
              {shortCut.map((item, index) => (
                <button 
                  onClick={() => handleScroll(item.link)} 
                  key={index} 
                  className={`
                    ${activeSection === item.name.toLowerCase() ? "text-text-primary font-bold" : "text-text-secondary font-medium hover:text-text-primary"} 
                    cursor-pointer text-sm md:text-base tracking-wide flex flex-row items-center transition-colors duration-200 ease-in-out
                  `}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => {
                  toggleTheme()
                }}
              >
                {isDark ? (
                  <svg className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  </svg>
                )}
              </button>

              <button className="lg:hidden text-text-secondary" onClick={() => setIsOpen(!isOpen)}>
                <svg className="w-6 md:w-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                   <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                </svg>
              </button>
            </div>

            <div className={`${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} md:hidden transform absolute top-16 right-4 z-50 origin-top-right transition-all duration-300 ease-in-out`}>
              {/* Mobile Menu Placeholder */}
              <div className="flex flex-col gap-6 bg-background/95 backdrop-blur-md border border-text-secondary/10 p-6 rounded-2xl shadow-xl w-48">
                {shortCut.map((item, index) => (
                  <button 
                    onClick={() => { handleScroll(item.link); setIsOpen(false); }} 
                    key={index} 
                    className={`
                      ${activeSection === item.name.toLowerCase() ? "text-text-primary font-bold" : "text-text-secondary font-medium"} 
                      cursor-pointer text-sm md:text-base flex flex-row items-center hover:text-text-primary transition-colors duration-200 ease-in-out
                    `}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeDown>
      </div>
    </div>
  )
}

const shortCut = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "About",
    link: "about",
  },
  {
    name: "Experience",
    link: "experience",
  },
  {
    name: "Projects",
    link: "projects",
  },
  {
    name: "Contacts",
    link: "contacts",
  },
]
