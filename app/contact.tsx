export default function Contact() {
  return (
    <section id="contacts" className="cursor-default bg-thirdary p-5 md:p-10">
      <h1 className="text-center text-text-primary text-2xl md:text-4xl font-semibold mb-2 md:mb-0">Contact Me</h1>
      <form className="md:m-5">
        <div className="w-full flex flex-col md:items-center md:justify-center ">
          <div className="md:w-1/2 flex flex-col gap-2">
            <div className="mb-2">
              <label className="block text-text-primary text-sm font-bold mb-1" htmlFor="name">
                Your Name
              </label>
              <input className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="name" type="text" placeholder="Enter your name" required />
            </div>

            <div className="mb-2">
              <label className="block text-text-primary text-sm font-bold mb-1" htmlFor="email">
                Your Email
              </label>
              <input className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="email" type="text" placeholder="Enter your email" required />
            </div>

            <div className="mb-2">
              <label className="block text-text-primary text-sm font-bold mb-1" htmlFor="message">
                Message
              </label>
              <textarea className="text-sm text-left shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="message" rows={5} placeholder="Enter your message" required />
            </div>

            <button className="flex flex-row items-center justify-center text-sm md:text-md text-text-project-card bg-button-hero p-3 md:p-4 rounded-2xl font-semibold hover:bg-button-hero-hover active:bg-button-hero-hover">
              <svg className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
