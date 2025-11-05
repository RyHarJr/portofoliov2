"use client"
import { useState, useEffect } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

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
    <>
      <div className="relative flex items-center justify-between py-5 bg-foreground shadow-md">
        <div className="flex flex-row items-center mx-5 md:mx-10 lg:mx-20 w-full">
          <svg className="w-6 md:w-7 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
          </svg>
          <span className="ml-2 text-md md:text-xl lg:text-2xl font-bold text-text-primary">My Portofolio</span>
        </div>

        <ul className="flex-row md:gap-5 lg:gap-7 mx-5 md:mx-10 hidden md:flex">
          {shortCut.map((item, index) => (
            <li key={index} className={`${activeSection === item.name.toLowerCase() ? "text-text-secondary bg-button-hover" : "text-text-primary"} gap-2 px-4 py-3 rounded-md flex flex-row items-center hover:scale-105 hover:bg-button-hover active:scale-105 active:bg-button-hover transition-transform duration-200 ease-in-out`}>
              {item.d}
              <a href={item.link} className="text-sm md:text-md font-semibold">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="mr-5 md:mr-20"
          onClick={() => {
            toggleTheme()
          }}
        >
          {isDark ? (
            <svg className="w-6 h-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            </svg>
          )}
        </button>

        <button className="md:hidden mr-5" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 md:w-7 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>

        <div className={`${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} transform absolute top-3 md:top-0 right-[-5] z-10 origin-top-right transition-all duration-300 ease-in-out`}>
          {/* Mobile Menu Placeholder */}
          <ul className="flex flex-col gap-5 bg-foreground absolute top-16 right-5 p-5 rounded-md shadow-md">
            {shortCut.map((item, index) => (
              <li key={index} className={`${activeSection === item.name.toLowerCase() ? "text-text-secondary" : "text-text-primary"} gap-2 flex flex-row items-center hover:scale-105 hover:text-text-secondary active:scale-105 active:text-text-secondary transition-transform duration-200 ease-in-out`}>
                {item.d}
                <a href={item.link} className="text-xs font-semibold">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const shortCut = [
  {
    name: "Home",
    d: (
      <svg className="w-4 md:w-5 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
      </svg>
    ),
    link: "#home",
  },
  {
    name: "About",
    d: (
      <svg className="w-4 md:w-5 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </svg>
    ),
    link: "#about",
  },
  {
    name: "Projects",
    d: (
      <svg className="w-4 md:w-5 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 20v-5h2v6.988H3V15h1.98v5H17Z" />
        <path d="m6.84 14.522 8.73 1.825.369-1.755-8.73-1.825-.369 1.755Zm1.155-4.323 8.083 3.764.739-1.617-8.083-3.787-.739 1.64Zm3.372-5.481L10.235 6.08l6.859 5.704 1.132-1.362-6.859-5.704ZM15.57 17H6.655v2h8.915v-2ZM12.861 3.111l6.193 6.415 1.414-1.415-6.43-6.177-1.177 1.177Z" />
      </svg>
    ),
    link: "#projects",
  },
  {
    name: "Contacts",
    d: (
      <svg className="w-4 md:w-5 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </svg>
    ),
    link: "#contacts",
  },
]
