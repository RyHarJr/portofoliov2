"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faHome, faUserCircle, faProjectDiagram, faContactCard, faBars } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

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

  return (
    <>
      <header className="relative flex items-center justify-between py-5 bg-foreground shadow-md">
        <div className="flex flex-row items-center mx-5 md:mx-10 lg:mx-20 w-full">
          <FontAwesomeIcon icon={faCode} className="text-text-primary w-3" />
          <span className="ml-2 text-md md:text-xl lg:text-2xl font-bold text-text-primary">My Portofolio</span>
        </div>

        <ul className="flex-row md:gap-5 lg:gap-7 mx-5 md:mx-10 lg:mx-20 hidden md:flex">
          {shortCut.map((item, index) => (
            <li key={index} className={`${activeSection === item.name.toLowerCase() ? "text-text-secondary bg-background" : "text-text-primary"} px-4 py-3 rounded-md flex flex-row items-center hover:scale-105 hover:bg-[#1f3140] active:scale-105 active:bg-[#1f3140] transition-transform duration-200 ease-in-out`}>
              <FontAwesomeIcon fill="none" icon={item.icon} className="w-3 mr-2" />
              <a href={item.link} className="text-sm md:text-md font-semibold">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden mr-5" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-text-primary w-3" />
        </button>

        <div className={`${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} transform absolute top-0 right-[-5] z-10 origin-top-right transition-all duration-300 ease-in-out`}>
          {/* Mobile Menu Placeholder */}
          <ul className="flex flex-col gap-5 bg-foreground absolute top-16 right-5 p-5 rounded-md shadow-md">
            {shortCut.map((item, index) => (
              <li key={index} className={`${activeSection === item.name.toLowerCase() ? "text-text-secondary" : "text-text-primary"} flex flex-row items-center hover:scale-105 hover:text-text-secondary active:scale-105 active:text-text-secondary transition-transform duration-200 ease-in-out`}>
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                <a href={item.link} className="text-xs font-semibold">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}

const shortCut = [
  { name: "Home", icon: faHome, link: "#" },
  { name: "About", icon: faUserCircle, link: "#" },
  { name: "Projects", icon: faProjectDiagram, link: "#" },
  { name: "Contacts", icon: faContactCard, link: "#" },
]
