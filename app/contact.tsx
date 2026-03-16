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

  // Contact Form State
  const [name_contact, setName_contact] = useState("")
  const [email_contact, setEmail_contact] = useState("")
  const [message_contact, setMessage_contact] = useState("")

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

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name_contact,
          email: email_contact,
          message: message_contact,
          timestamp: new Date(),
        }),
      })

      const data = await response.json()
      setLoading(false)

      if (data.success) {
        setName_contact("")
        setEmail_contact("")
        setMessage_contact("")
        showAlert("success", "Email sent successfully")
      } else {
        showAlert("error", "Error sending email")
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      showAlert("error", "Failed to send email")
    }
  }

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

    setChatMessages(prev => [...prev, userMsg])
    setChatInput("")
    setIsChatLoading(true)

    try {
      let apiText = userText
      const isFirstMessage = chatMessages.length <= 1
      
      if (isFirstMessage) {
        const systemPrompt = "System Context: Kamu adalah RyHar Assistant, asisten AI pribadi untuk Ahmad Rizki Hartawan (RyHar), seorang Fullstack Web Developer. Tujuanmu adalah menjawab pertanyaan pengunjung website portofolionya dengan ramah, profesional, dan menggunakan bahasa Indonesia yang baik. Jawab langsung pertanyaannya tanpa basa-basi berlebihan.\n\nUser Message: "
        apiText = systemPrompt + userText
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: apiText, name: userName }),
      })
      
      const data = await response.json()
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.success ? data.message : "Maaf, saya sedang mengalami gangguan sistem saat ini. Coba lagi nanti ya!",
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error("Chat error:", error)
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Maaf, terjadi kesalahan koneksi.",
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
    <section id="contacts" className="py-24 md:py-32 cursor-default bg-background relative overflow-hidden border-t border-text-secondary/10">
      <FadeDown>
        <div className="max-w-3xl mx-auto text-center px-6 mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Contact Me</h3>
        </div>
      </FadeDown>

      <div className="max-w-5xl mx-auto px-6 w-full">
        <FadeDown delay={0.2}>
          <div className="bg-background border border-text-secondary/20 rounded-3xl p-8 md:p-12 flex flex-col w-full hover:border-text-primary transition-colors duration-500 shadow-xl">
            <h2 className="text-text-primary font-black text-2xl md:text-3xl mb-8 tracking-tighter">Send an Email directly.</h2>
            <form onSubmit={handleSubmitContact} className="flex flex-col flex-1">
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2" htmlFor="contact-name">
                  Name
                </label>
                <input value={name_contact} onChange={(e) => setName_contact(e.target.value)} id="contact-name" type="text" className="w-full px-4 py-4 bg-transparent border-2 border-text-secondary/20 rounded-xl focus:border-text-primary focus:outline-none transition-colors text-text-primary font-medium" placeholder="John Doe" required />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2" htmlFor="contact-email">
                  Email
                </label>
                <input value={email_contact} onChange={(e) => setEmail_contact(e.target.value)} id="contact-email" type="email" className="w-full px-4 py-4 bg-transparent border-2 border-text-secondary/20 rounded-xl focus:border-text-primary focus:outline-none transition-colors text-text-primary font-medium" placeholder="johndoe@example.com" required />
              </div>
              <div className="mb-8 flex-1">
                <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2" htmlFor="contact-message">
                  Message
                </label>
                <textarea value={message_contact} onChange={(e) => setMessage_contact(e.target.value)} id="contact-message" className="w-full h-40 px-4 py-4 bg-transparent border-2 border-text-secondary/20 rounded-xl focus:border-text-primary focus:outline-none transition-colors text-text-primary resize-none font-medium" placeholder="Your message here..." required></textarea>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-text-primary text-background font-bold tracking-widest text-sm py-4 px-6 rounded-xl hover:opacity-90 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase flex justify-center items-center">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
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
      <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 lg:p-6 transition-all duration-500 ${isOpenChat ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-background/90 backdrop-blur-xl transition-opacity duration-500 ${isOpenChat ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpenChat(false)}></div>

        {/* Modal content */}
        <div className={`bg-background border border-text-secondary/20 w-full lg:w-[450px] h-[90vh] rounded-t-3xl lg:rounded-3xl shadow-2xl z-10 flex flex-col transition-all duration-500 transform ${isOpenChat ? "translate-y-0 scale-100" : "translate-y-full lg:translate-y-8 lg:scale-95 opacity-0"}`}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-text-secondary/10 bg-background rounded-t-3xl relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-thirdary flex items-center justify-center text-text-primary font-black border border-text-secondary/10">AI</div>
              <div>
                <h3 className="text-lg font-black text-text-primary tracking-tight leading-none">RyHar Assistant</h3>
                <span className="text-xs text-green-500 font-bold flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpenChat(false)} className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-text-secondary/5 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar bg-thirdary/10 flex flex-col gap-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${msg.sender === "user" ? "bg-text-primary text-background rounded-tr-sm" : "bg-background border border-text-secondary/10 text-text-primary rounded-tl-sm shadow-sm"}`}>
                  {msg.sender === "user" ? (
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="text-sm font-medium leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-headings:mb-2 prose-headings:mt-3 prose-a:text-thirdary prose-code:bg-text-secondary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs overflow-hidden">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-text-primary" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="" {...props} />,
                          a: ({node, ...props}) => <a className="text-thirdary underline hover:opacity-80 font-bold" target="_blank" rel="noopener noreferrer" {...props} />,
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

          {/* Chat Input */}
          <div className="p-4 border-t border-text-secondary/10 bg-background rounded-b-3xl">
            <form onSubmit={handleSendChat} className="flex gap-2">
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
