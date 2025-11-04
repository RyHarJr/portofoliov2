import Header from "@/components/Header"
import Hero from "./hero"
import About from "./about"

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <Hero />
      <About />
    </>
  )
}
