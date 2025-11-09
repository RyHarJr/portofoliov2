export default function Contact() {
  return (
    <section id="contacts" className="lg:h-160 cursor-default bg-thirdary p-5 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="flex flex-col items-center justify-center mt-5 md:mt-0">
        <div className="shadow-lg my-5 md:my-0 relative w-full lg:w-100 md:h-100 bg-background flex flex-col items-center p-5 md:p-10 rounded-lg">
          <h1 className="text-text-primary font-bold text-xl md:text-2xl absolute top-5 ">What people say?</h1>

          <div className="overflow-y-auto w-full h-80 md:h-65 mt-15 rounded-2xl md:mt-5 mb-10 md:mb-0 p-2">
            <div className="mt-5">
              <h3 className="text-text-primary font-semibold text-md">RyHar</h3>
              <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                <p className="text-text-secondary text-sm">Keren banget webnya bang senantiasa update, terima kasih</p>
                <p className="text-right text-xs text-text-primary mt-2">15 maret 2024</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-text-primary font-semibold text-md">RyHar</h3>
              <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                <p className="text-text-secondary text-sm">Keren banget webnya bang senantiasa update, terima kasih</p>
                <p className="text-right text-xs text-text-primary mt-2">15 maret 2024</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-text-primary font-semibold text-md">RyHar</h3>
              <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                <p className="text-text-secondary text-sm">Keren banget webnya bang senantiasa update, terima kasih</p>
                <p className="text-right text-xs text-text-primary mt-2">15 maret 2024</p>
              </div>

              <div className="mt-5">
                <h3 className="text-text-primary font-semibold text-md">RyHar</h3>
                <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                  <p className="text-text-secondary text-sm">Keren banget webnya bang senantiasa update, terima kasih</p>
                  <p className="text-right text-xs text-text-primary mt-2">15 maret 2024</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-text-primary font-semibold text-md">RyHar</h3>
                <div className="bg-button-hover p-2 rounded-lg shadow-lg">
                  <p className="text-text-secondary text-sm">Keren banget webnya bang senantiasa update, terima kasih</p>
                  <p className="text-right text-xs text-text-primary mt-2">15 maret 2024</p>
                </div>
              </div>
            </div>
          </div>

          <form className="w-full bottom-5 absolute px-5 flex flex-row gap-2">
            <input type="text" placeholder="Input your message here" className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="message" name="message" required />
            <button className="cursor-pointer hover:bg-button-hero-hover active:bg-button-hero-hover bg-button-hero px-2 py-1 rounded-full text-sm">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-text-primary text-xl md:text2xl font-semibold mb-5 md:mb-0">Contact Me</h1>
        <form className="md:m-5 w-full">
          <div className="flex flex-col md:items-center md:justify-center ">
            <div className="mb-2 w-full">
              <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="name">
                Your Name
              </label>
              <input className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="mb-2 w-full">
              <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="email">
                Your Email
              </label>
              <input className="text-xs md:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="email" type="text" placeholder="Enter your email" required />
            </div>
            <div className="mb-2 w-full">
              <label className="block text-text-primary text-xs md:text-sm font-bold mb-1" htmlFor="message">
                Message
              </label>
              <textarea className="text-xs md:text-sm text-left shadow appearance-none border rounded w-full py-2 px-3 text-text-primary leading-tight" id="message" rows={5} placeholder="Enter your message" required />
            </div>
            <button className="cursor-pointer w-full flex flex-row items-center justify-center text-sm md:text-md text-text-project-card bg-button-hero p-3 md:p-4 rounded-2xl font-semibold hover:bg-button-hero-hover active:bg-button-hero-hover">
              <svg className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
              </svg>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
