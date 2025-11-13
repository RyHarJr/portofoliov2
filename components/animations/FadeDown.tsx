"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function FadeDown({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: "easeOut" }}>
      {children}
    </motion.div>
  )
}
