"use client"
import Image from "next/image"
import { useEffect, useState, useMemo } from "react"

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const texts = useMemo(() => ["Frontend Developer", "Backend Developer", "Fullstack Developer"], [])

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
      deleting ? 75 : 150
    )

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, texts])

  return (
    <>
      <section id="home" className="cursor-default grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-5 md:px-10 lg:px-20 py-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold">Hi, I`m Ahmad Rizki Hartawan 👋</h1>
          <div className="relative">
            <span className={`text-text-primary text-2xl font-semibold`}>{`${texts[index].substring(0, subIndex)}`}</span>
            <span className="animate-cursor text-text-secondary text-2xl">|</span>
          </div>
          <div className="flex flex-row">
            <p className="text-text-secondary">Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu yang bermanfaat dan keren di dunia digital.</p>
          </div>
          <span className="text-text-secondary flex flex-row">
            <span className="mr-5">Follow me on:</span>
            <div className="flex flex-row gap-4">
              <a href="https://www.instagram.com/rizki_hr4" target="_blank" rel="noopener noreferrer" className="bg-button-hover p-2 rounded-full active:shadow-lg active:scale-105 hover:shadow:lg hover:scale-105 text-text-primary transition-transform duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/rizkihartawan/" target="_blank" rel="noopener noreferrer" className="bg-button-hover p-2 rounded-full active:shadow-lg active:scale-105 hover:shadow:lg hover:scale-105 text-text-primary transition-transform duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="https://github.com/RyHarJr" target="_blank" rel="noopener noreferrer" className="bg-button-hover p-2 rounded-full active:shadow-lg active:scale-105 hover:shadow:lg hover:scale-105 text-text-primary transition-transform duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </span>
          <div className="flex flex-row gap-5 mt-5">
            <button className="cursor-pointer text-sm md:text-md lg:text-lg bg-button-hero hover:bg-button-hero-hover active:bg-button-hero-hover border border-text-primary bg-text-thirdary text-[#ffffff] px-5 py-3 rounded-md flex flex-row items-center gap-2 hover:scale-103 active:scale-103 transition-transform duration-200 ease-in-out">
              <svg className="w-5 md:w-6 text-[#ffffff]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              Explore My Project
            </button>
            <button className="cursor-pointer text-sm md:text-md lg:text-lg hover:bg-button-hover active:bg-button-hover border border-text-text-primary text-text-primary px-5 py-3 rounded-md flex flex-row items-center gap-2 hover:scale-103 active:scale-103 transition-transform duration-200 ease-in-out">
              <svg className="w-5 md:w-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
              Download My CV
            </button>
          </div>
          <div className="mb-10 md:mb-0 font-semibold">
            <span className="text-sm md:text-md lg:text-lg mt-5 text-text-primary font-semibold flex flex-row items-center gap-2">
              <svg className="w-5 md:w-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M12.1429 11v9m0-9c-2.50543-.7107-3.19099-1.39543-6.13657-1.34968-.48057.00746-.86348.38718-.86348.84968v7.2884c0 .4824.41455.8682.91584.8617 2.77491-.0362 3.45995.6561 6.08421 1.3499m0-9c2.5053-.7107 3.1067-1.39542 6.0523-1.34968.4806.00746.9477.38718.9477.84968v7.2884c0 .4824-.4988.8682-1 .8617-2.775-.0362-3.3758.6561-6 1.3499m2-14c0 1.10457-.8955 2-2 2-1.1046 0-2-.89543-2-2s.8954-2 2-2c1.1045 0 2 .89543 2 2Z" />
              </svg>
              Quick Stats:
            </span>
            <ul className="text-text-primary mt-2 flex flex-row gap-2 md:gap-5">
              <li className="cursor-pointer items-center flex flex-col md:flex-row shadow-md hover:shadow-lg active:shadow-lg active:scale-105 hover:scale-105 text-xs md:text-sm style-none text-center bg-quick-stats-bg p-3 rounded-full">
                <svg className="w-5 md:w-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd" />
                </svg>
                2+ years experience
              </li>
              <li className="cursor-pointer items-center flex flex-col md:flex-row shadow-md hover:shadow-lg active:shadow-lg active:scale-105 hover:scale-105 text-xs md:text-sm style-none text-center bg-quick-stats-bg p-3 rounded-full">
                <svg className="w-5 md:w-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3" />
                </svg>
                Javascript Main Language
              </li>
              <li className="cursor-pointer items-center flex flex-col md:flex-row shadow-md hover:shadow-lg active:shadow-lg active:scale-105 hover:scale-105 text-xs md:text-sm style-none text-center bg-quick-stats-bg p-3 rounded-full">
                <svg className="w-5 md:w-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
                </svg>
                Fullstack Developer
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="md:ml-auto flex flex-col items-center justify-center w-70 md:w-80 lg:w-90">
            <Image src="/images/hero.jpg" alt="Hero Image" width={350} height={350} className="rounded-full neon floating" />
          </div>
        </div>
      </section>
    </>
  )
}
