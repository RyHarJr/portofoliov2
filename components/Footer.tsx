import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-text-secondary/10 bg-background py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-text-secondary">
            &copy; {currentYear} RyHarJr. All rights reserved.
          </p>
          <p className="text-xs font-medium text-text-secondary/70 mt-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a href="https://github.com/RyHarJr" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/rizkihartawan/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">
            LinkedIn
          </a>
          <a href="https://instagram.com/rizki_hr4" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-xs font-bold uppercase tracking-widest">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
