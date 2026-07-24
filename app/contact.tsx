"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import AlertMessage from "@/components/Alert"
import FadeDown from "@/components/animations/FadeDown"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type AlertType = "success" | "error" | "info" | "warning"

interface ChatMessage {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: Date
}

export default function Contact() {
  const [alert, setAlert] = useState<{ type: AlertType; message: string; show: boolean }>({
    type: "success",
    message: "",
    show: false,
  })
  const [loading, setLoading] = useState(false)



  // Chatbot State
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [userName, setUserName] = useState("Guest")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Initialize Chat from LocalStorage
  useEffect(() => {
    // Check for saved name
    const savedName = localStorage.getItem("ryhar_chat_name")
    if (savedName) {
      setUserName(savedName)
    } else {
      const newName = `Guest-${Math.floor(Math.random() * 10000)}`
      setUserName(newName)
      localStorage.setItem("ryhar_chat_name", newName)
    }

    // Check for saved messages
    const savedMessages = localStorage.getItem("ryhar_chat_messages")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const formattedMessages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setChatMessages(formattedMessages)
      } catch (e) {
        console.error("Failed to parse saved messages", e)
        setInitialWelcomeMessage()
      }
    } else {
      setInitialWelcomeMessage()
    }
  }, [])
  
  const setInitialWelcomeMessage = () => {
    setChatMessages([
      {
        id: "welcome-msg",
        sender: "bot",
        text: "Halo! Saya adalah asisten AI RyHar. Ada yang bisa saya bantu terkait portofolio, pengalaman, atau project RyHar?",
        timestamp: new Date()
      }
    ])
  }

  // Save Messages to LocalStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem("ryhar_chat_messages", JSON.stringify(chatMessages))
    }
  }, [chatMessages])

  useEffect(() => {
    if (isOpenChat) {
      scrollToBottom()
    }
  }, [chatMessages, isOpenChat])


  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userText = chatInput.trim()
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date()
    }

    // Build history from existing messages (exclude welcome bot message if it's the only one)
    const historyMessages = chatMessages.filter(msg => msg.id !== "welcome-msg")
    const history = [
      {
        role: "system" as const,
        content: `System Context: Kamu adalah RyHar Assistant, asisten AI pribadi untuk Ahmad Rizki Hartawan (RyHar). Tugasmu adalah menjawab pertanyaan pengunjung website portofolio RyHar dengan ramah, profesional, dan informatif menggunakan bahasa Indonesia.
        
Gunakan panduan informasi berikut tentang RyHar untuk menjawab pertanyaan:

1. **Profil & Kontak**:
   - Nama: Ahmad Rizki Hartawan (RyHar)
   - Peran: Fullstack Web Developer dengan pengalaman 2+ tahun
   - Pendidikan: Universitas Multi Data Palembang (IPK: 3.84)
   - Lokasi: Palembang, Indonesia
   - Email: a.rizkihartawan04@gmail.com
   - WhatsApp/Telepon: +62 895-0818-8642 (wa.me/6289508188642)
   - LinkedIn: linkedin.com/in/rizkihartawan/
   - Instagram: @rizki_hr4 (instagram.com/rizki_hr4)
   - TikTok: @ryhar.dev (tiktok.com/@ryhar.dev)
   - GitHub: github.com/RyHarJr
   - Pendekatan: Mengutamakan clean code, desain responsif, dan UX yang intuitif.

2. **Tech Stack**:
   - Frontend: React, Next.js, Tailwind CSS, TypeScript
   - Backend & Database: Node.js, Express.js, MySQL, MongoDB (JavaScript sebagai bahasa utama)

3. **Pengalaman Kerja**:
   - Freelance Full Stack Web Developer (2025 - present): Mengembangkan web app kustom untuk berbagai klien.
   - Litbang IT HIMSI (2026 - present): Operator IT dan Web Developer untuk organisasi.
   - MDPTV (2024 - present): Fotografi, Videografi, & Web Developer.
   - Radio Republik Indonesia (2024): Magang pemeliharaan infrastruktur broadcasting dan IT.

4. **Proyek Utama**:
   - JadibotWA (jadibotwa.xyz) - Platform automasi WhatsApp tanpa kode.
   - RyHar Panel (ryhar-panel.my.id) - Landing page & platform manajemen layanan hosting.
   - RyHar Portfolio (ryhar.my.id) - Website portofolio pribadi.

Aturan: Jawab langsung ke intinya, jangan menambahkan informasi yang tidak ada di profil ini, dan selalu bersikap ramah.`
      },
      ...historyMessages.map(msg => ({
        role: msg.sender === "user" ? "user" as const : "assistant" as const,
        content: msg.text
      }))
    ]

    setChatMessages(prev => [...prev, userMsg])
    setChatInput("")
    setIsChatLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, history }),
      })
      
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      // If response is JSON, it means an error occurred on the backend
      const contentType = response.headers.get("Content-Type") || ""
      if (contentType.includes("application/json")) {
        const data = await response.json()
        throw new Error(data.message || "Error dari server")
      }

      setIsChatLoading(false)

      const botMsgId = (Date.now() + 1).toString()
      setChatMessages(prev => [...prev, {
        id: botMsgId,
        sender: "bot",
        text: "",
        timestamp: new Date()
      }])

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let botText = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          botText += decoder.decode(value, { stream: true })
          setChatMessages(prev => 
            prev.map(msg => 
              msg.id === botMsgId ? { ...msg, text: botText } : msg
            )
          )
        }
      }

    } catch (error) {
      console.error("Chat error:", error)
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Maaf, terjadi kesalahan koneksi atau server AI.",
        timestamp: new Date()
      }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message, show: true })
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }))
    }, 3000)
  }, [])

  return (
    <section id="contacts" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative overflow-hidden border-t border-text-secondary/10">
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Contact Me</h3>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <FadeDown delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Google Maps Embed */}
            <div className="bg-background border border-text-secondary/20 rounded-3xl overflow-hidden h-[400px] lg:h-auto min-h-[400px] shadow-xl hover:border-text-primary transition-colors duration-500 relative group">
              <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-4 py-2 rounded-xl border border-text-secondary/20 shadow-lg pointer-events-none">
                <p className="text-sm font-bold text-text-primary">📍 Mami Steak Gunting</p>
                <p className="text-xs font-medium text-text-secondary">Palembang</p>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=-2.9843272,104.7208314&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-3 sm:flex sm:flex-col gap-4">
              {/* GitHub */}
              <a href="https://github.com/RyHarJr" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-text-primary hover:bg-text-secondary/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-text-primary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">GitHub</h4>
                    <p className="text-sm font-medium text-text-secondary">RyHarJr</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              {/* Email */}
              <a href="mailto:a.rizkihartawan04@gmail.com" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-text-primary hover:bg-text-secondary/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-text-primary group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">Email</h4>
                    <p className="text-sm font-medium text-text-secondary">a.rizkihartawan04@gmail.com</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/6289508188642" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">WhatsApp</h4>
                    <p className="text-sm font-medium text-text-secondary">+62 895-0818-8642</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/rizkihartawan/" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-[#0077b5] hover:bg-[#0077b5]/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-[#0077b5] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">LinkedIn</h4>
                    <p className="text-sm font-medium text-text-secondary">Rizki Hartawan</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-[#0077b5] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/rizki_hr4" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-[#E1306C] hover:bg-[#E1306C]/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-[#E1306C] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">Instagram</h4>
                    <p className="text-sm font-medium text-text-secondary">@rizki_hr4</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-[#E1306C] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>

              {/* TikTok */}
              <a href="https://tiktok.com/@ryhar.dev" target="_blank" rel="noopener noreferrer" className="group bg-background border border-text-secondary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-center sm:justify-between hover:border-text-primary hover:bg-text-primary/5 transition-all duration-300 shadow-sm hover:shadow-md aspect-square sm:aspect-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-text-secondary/10 flex items-center justify-center text-text-primary group-hover:text-text-primary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.95-.59 3.86-1.66 5.43-1.4 2.05-3.66 3.39-6.16 3.65-2.52.27-5.11-.27-7.23-1.66-2.09-1.37-3.52-3.48-4.04-5.89-.52-2.4-.1-4.95 1.15-7.05 1.25-2.11 3.33-3.67 5.71-4.24 2.2-.54 4.54-.31 6.6.62v4.11c-1.37-.62-2.92-.81-4.38-.49-1.46.32-2.78 1.16-3.66 2.37-.87 1.21-1.22 2.76-1.01 4.24.2 1.49.99 2.82 2.15 3.75 1.16.94 2.7 1.34 4.18 1.09 1.49-.24 2.83-1.04 3.76-2.2 1.01-1.25 1.47-2.87 1.47-4.47V.02z" />
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <h4 className="text-lg font-bold text-text-primary">TikTok</h4>
                    <p className="text-sm font-medium text-text-secondary">@ryhar.dev</p>
                  </div>
                </div>
                <svg className="hidden sm:block w-5 h-5 text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </FadeDown>
      </div>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-40">
        <button onClick={() => setIsOpenChat(true)} className="group bg-text-primary text-background p-4 md:p-5 rounded-full shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center relative border-4 border-background hover:shadow-text-primary/20">
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <span className="absolute -top-2 -right-2 flex h-5 w-5 md:h-6 md:w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 md:h-6 md:w-6 bg-thirdary text-text-primary border border-text-secondary/20 text-[10px] md:text-xs font-bold items-center justify-center">AI</span>
          </span>
        </button>
      </div>

      {/* Chatbot Modal Overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-0 transition-all duration-500 ${isOpenChat ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-background/90 backdrop-blur-xl transition-opacity duration-500 ${isOpenChat ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpenChat(false)}></div>

        {/* Modal content */}
        <div className={`bg-background w-full h-[100dvh] shadow-2xl z-10 flex flex-col transition-all duration-500 transform ${isOpenChat ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-text-secondary/10 bg-background relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-thirdary flex items-center justify-center text-text-primary font-black border border-text-secondary/10">AI</div>
              <div>
                <h3 className="text-lg font-black text-text-primary tracking-tight leading-none">RyHar Assistant</h3>
                <span className="text-xs text-green-500 font-bold flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={setInitialWelcomeMessage} 
                className="text-text-secondary hover:text-red-500 transition-colors p-2 bg-text-secondary/5 rounded-full"
                title="Hapus / Mulai Baru"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
              <button onClick={() => setIsOpenChat(false)} className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-text-secondary/5 rounded-full" title="Tutup">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth custom-scrollbar bg-thirdary/10 flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col gap-4 pb-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${msg.sender === "user" ? "bg-text-primary text-background rounded-tr-sm" : "bg-background border border-text-secondary/10 text-text-primary rounded-tl-sm shadow-sm"}`}>
                  {msg.sender === "user" ? (
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="text-sm font-medium leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-headings:mb-2 prose-headings:mt-3 prose-a:text-text-primary prose-code:bg-text-secondary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs overflow-hidden">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-text-primary" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="" {...props} />,
                          a: ({node, ...props}) => <a className="text-text-primary underline hover:opacity-80 font-bold" target="_blank" rel="noopener noreferrer" {...props} />,
                          table: ({node, ...props}) => (
                            <div className="w-full overflow-x-auto my-3 pb-1 custom-scrollbar">
                              <table className="w-full text-left border-collapse border border-text-secondary/20 whitespace-nowrap" {...props} />
                            </div>
                          ),
                          th: ({node, ...props}) => <th className="border border-text-secondary/20 px-3 py-2 bg-text-secondary/10 font-bold" {...props} />,
                          td: ({node, ...props}) => <td className="border border-text-secondary/20 px-3 py-2" {...props} />,
                          code: ({node, inline, className, children, ...props}: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline ? (
                              <pre className="bg-text-primary text-background p-3 rounded-xl overflow-x-auto custom-scrollbar text-xs my-2 font-mono">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            ) : (
                              <code className="bg-thirdary/30 px-1.5 py-0.5 rounded text-xs text-text-primary font-mono font-bold" {...props}>
                                {children}
                              </code>
                            )
                          },
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-thirdary pl-3 my-2 italic text-text-secondary" {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  <span className={`text-[10px] uppercase font-bold tracking-wider mt-2 block ${msg.sender === "user" ? "text-background/70" : "text-text-secondary/70"}`}>
                    {msg.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex w-full justify-start">
                <div className="max-w-[85%] bg-background border border-text-secondary/10 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-text-secondary/10 bg-background flex justify-center">
            <form onSubmit={handleSendChat} className="flex gap-2 w-full max-w-4xl">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 bg-thirdary/30 border border-text-secondary/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-text-primary text-text-primary font-medium transition-colors"
                disabled={isChatLoading}
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim() || isChatLoading}
                className="bg-text-primary text-background p-3 rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={`${alert.show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} fixed inset-0 flex top-0 right-0 items-start justify-end px-4 py-6 z-[100] transition-all duration-500 ease-out pointer-events-none`}>
        <div className="pointer-events-auto border border-text-secondary/20 shadow-2xl rounded-lg">
          <AlertMessage type={alert.type as AlertType} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
        </div>
      </div>
    </section>
  )
}
