"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden"
    
    // Simulating initial load time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = "unset"
    }, 2000) // Adjust the loading time as necessary (2 seconds for demo)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Aesthetic Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-text-primary/10 rounded-full blur-[100px]" />

          {/* Staggered Text Animation */}
          <div className="relative overflow-hidden h-16 flex items-center justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              RyHar
              <span className="text-thirdary">.</span>
            </motion.div>
          </div>

          <div className="relative overflow-hidden h-8 mt-2 flex items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-sm font-bold tracking-[0.3em] uppercase text-text-secondary"
            >
              Portfolio Loading
            </motion.div>
          </div>

          {/* Progress Bar Animation */}
          <div className="mt-8 w-48 md:w-64 h-[2px] bg-text-secondary/20 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 w-full bg-text-primary rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
