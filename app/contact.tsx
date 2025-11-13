"use client"
import { useState, useEffect, useCallback } from "react"
import { IComments } from "@/models/Comments"
import AlertMessage from "@/components/Alert"
import FadeDown from "@/components/animations/FadeDown"
import FadeLeft from "@/components/animations/FadeLeft"
import FadeRight from "@/components/animations/FadeRight"

type AlertType = "success" | "error" | "info" | "warning"

export default function Contact() {
  const [name_comment, setName_comment] = useState("")
  const [message_comment, setMessage_comment] = useState("")
  const [isOpenComments, setIsOpenComments] = useState(false)
  const [comments, setComments] = useState([])
  const [alert, setAlert] = useState<{ type: AlertType; message: string; show: boolean }>({
    type: "success",
    message: "",
    show: false,
  })
  const [loading, setLoading] = useState(false)

  const [name_contact, setName_contact] = useState("")
  const [email_contact, setEmail_contact] = useState("")
  const [message_contact, setMessage_contact] = useState("")

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  }

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message, show: true })
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }))
    }, 3000)
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const response = await fetch("/api/comments")
        const data = await response.json()
        if (mounted) setComments(data.data)
      } catch (error) {
        console.error(error)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmitComments = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch("/api/insert-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name_comment,
          message: message_comment,
          timestamp: new Date(),
        }),
      })

      const data = await response.json()

      setLoading(false)

      if (data.success) {
        setName_comment("")
        setMessage_comment("")
        setIsOpenComments(false)
        showAlert("success", "Comment added successfully")

        const res = await fetch("/api/comments")
        const updated = await res.json()
        setComments(updated.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section id="contacts" className="lg:h-160 cursor-default bg-thirdary p-5 md:p-10">
      <FadeDown>
        <h1 className="text-center font-semibold text-text-primary text-2xl md:text-4xl md:mb-10">Contact & Comments</h1>
      </FadeDown>

      {isOpenComments && (
        <div className="relative">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-gray-900/70 bg-opacity-90">
            <form onSubmit={handleSubmitComments} className="bg-bg-project-card p-6 rounded-lg shadow-lg w-100 relative mx-5">
              <button type="button" className="cursor-pointer absolute top-5 right-5 text-3xl text-text-primary hover:text-text-secondary active:text-text-secondary" onClick={() => setIsOpenComments(false)}>
                &times;
              </button>

              <label className="mt-5 block text-text-primary text-xs md:text-sm font-bold" htmlFor="name">
                Full Name
              </label>

              <input value={name_comment} onChange={(e) => setName_comment(e.target.value)} className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="name" type="text" placeholder="Enter your name" required />

              <label className="block text-text-primary text-xs md:text-sm font-bold mt-2" htmlFor="message">
                Message
              </label>

              <textarea value={message_comment} onChange={(e) => setMessage_comment(e.target.value)} className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="message" placeholder="Enter your message" required />

              <button type="submit" className="mt-2 cursor-pointer w-full flex flex-row items-center justify-center text-sm md:text-md text-text-project-card bg-button-hero p-2 md:p-3 rounded-2xl font-semibold hover:bg-button-hero-hover active:bg-button-hero-hover">
                Send
                <svg className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FadeLeft>
          <div className="flex flex-col items-center justify-center mt-5 md:mt-0">
            <div className="shadow-lg my-5 md:my-0 relative w-full lg:w-100 md:h-100 bg-background flex flex-col items-center p-5 md:p-10 rounded-lg">
              <h1 className="text-text-primary font-bold text-xl md:text-2xl absolute top-5 ">Comments ({comments.length})</h1>

              <div className="overflow-y-auto w-full h-80 md:h-65 mt-15 rounded-2xl md:mt-5 mb-10 md:mb-0 p-2">
                {comments.map((comment: IComments, index: number) => (
                  <div key={index} className="mt-5">
                    <h3 className="text-text-primary font-semibold text-sm md:text-md">{comment.name}</h3>
                    <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                      <p className="text-text-secondary text-sm wrap-break-word whitespace-pre-wrap overflow-hidden">{comment.message}</p>
                      <p className="text-right text-xs text-text-primary mt-2">
                        {new Date(comment.timestamp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute bottom-5 right-5 flex items-center justify-center text-text-primary hover:text-text-secondary active:text-text-secondary" onClick={() => setIsOpenComments(true)}>
                <svg className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                </svg>
                <span className="text-xs md:text-sm">Add Comments</span>
              </button>
            </div>
          </div>
        </FadeLeft>
        <FadeRight>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-text-primary text-xl md:text-2xl font-semibold mb-5 md:mb-0">Contact Me</h1>
            <form onSubmit={handleSubmitContact} className="md:m-5 w-full">
              <div className="flex flex-col md:items-center md:justify-center ">
                <div className="mb-2 w-full">
                  <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input value={name_contact} onChange={(e) => setName_contact(e.target.value)} className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="name" type="text" placeholder="Enter your name" required />
                </div>
                <div className="mb-2 w-full">
                  <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="email">
                    Email
                  </label>
                  <input value={email_contact} onChange={(e) => setEmail_contact(e.target.value)} className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="email" type="text" placeholder="Enter your email" required />
                </div>
                <div className="mb-2 w-full">
                  <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea value={message_contact} onChange={(e) => setMessage_contact(e.target.value)} className="text-xs md:text-sm text-left shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="message" rows={5} placeholder="Enter your message" required />
                </div>
                <button disabled={loading} type="submit" className="cursor-pointer w-full flex flex-row items-center justify-center text-sm md:text-md text-text-project-card bg-button-hero p-3 md:p-4 rounded-2xl font-semibold hover:bg-button-hero-hover active:bg-button-hero-hover">
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <svg className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                      </svg>
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </FadeRight>
      </div>
      <div className={`${alert.show ? "translate-y-0" : "translate-y-full"} fixed inset-0 flex top-0 right-0 items-start justify-end px-4 py-6 z-50 transition-all duration-300 ease-in-out`}>
        <AlertMessage type={alert.type as AlertType} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
      </div>
    </section>
  )
}
