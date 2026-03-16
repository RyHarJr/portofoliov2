"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function FadeLeft({ children, delay = 0, duration = 0.8 }: { children: React.ReactNode, delay?: number, duration?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, x: -40, scale: 0.95, filter: "blur(10px)" }} 
      animate={inView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : {}} 
      transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20, mass: 1 }}
    >
      {children}
    </motion.div>
  )
}
