import Header from "@/components/Header"
import Hero from "./hero"
import About from "./about"
import Project from "./project"
import Contact from "./contact"

export default function Home() {
  return (
    <>
      <header className="cursor-default sticky top-0 z-50">
        <Header />
      </header>
      <Hero />
      <About />
      <Project />
      <Contact />
    </>
  )
}
