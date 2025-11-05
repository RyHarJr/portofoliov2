import Image from "next/image"

export default function About() {
  return (
    <>
      <section id="about" className="bg-thirdary p-10 md:p-20">
        <h2 className="text-2xl md:text-4xl font-bold text-text-primary text-center mb-5 md:mb-10">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:flex flex-col items-center justify-center">
            <Image src="/images/hero.jpg" alt="Profile" width={300} height={300} className="floating rounded-lg" />
          </div>
          <div className="mt-10 md:mt-0">
            <div className="flex flex-col md:flex-row justify-center">
              <div className="md:mr-10">
                <div className="flex items-center space-x-2 text-text-primary font-semibold mb-2">
                  <span className="bg-button-hover p-2 rounded-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <h1 className="text-sm md:text-md">Who Am I</h1>
                </div>
                <p className="text-xs text-text-secondary">Saya seorang web developer yang berfokus pada menciptakan tampilan dan pengalaman pengguna yang sederhana, cepat, dan fungsional.</p>
              </div>
              <div className="md:mr-10 mt-5 md:mt-0">
                <div className="flex items-center space-x-2 text-text-primary font-semibold mb-2">
                  <span className="bg-button-hover p-2 rounded-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                      <path fill-rule="evenodd" d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd" />
                      <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
                    </svg>
                  </span>
                  <h1 className="text-sm md:text-md">My Approach</h1>
                </div>
                <p className="text-xs text-text-secondary">Saya mengutamakan clean code, desain responsif, dan pengalaman pengguna yang intuitif dalam setiap proyek yang saya kerjakan.</p>
              </div>
            </div>
            <span className="mt-5 text-text-primary font-semibold flex flex-row items-center text-sm md:text-md">
              <svg className="w-6 h-6 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
              </svg>
              Personal Info
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
              <div className="mt-5 flex flex-col gap-2 text-xs">
                <span className="flex flex-row text-text-primary items-center text-nowrap">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Name:</span> Ahmad Rizki Hartawan
                </span>
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Place of Birth:</span> Palembang, Indonesia
                </span>
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Phone:</span> +62 895-0818-8642
                </span>
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.78552 9.5 12.7855 14l9-4.5-9-4.5-8.99998 4.5Zm0 0V17m3-6v6.2222c0 .3483 2 1.7778 5.99998 1.7778 4 0 6-1.3738 6-1.7778V11" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">GPA:</span> 3.84
                </span>
              </div>
              <div className="mt-2 md:mt-5 flex flex-col gap-2 text-xs">
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13h2c1.1046 0 2 .8954 2 2s-.8954 2-2 2h-2.5M10 3c0 2.4-3 1.6-3 4m8-4c0 2.4-3 1.6-3 4m-7 4 .6398 6.398C5.84428 19.4428 7.56494 21 9.61995 21H10.38c2.0551 0 3.7757-1.5572 3.9802-3.602L15 11H5Z" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Hobby:</span> I Dont Know Yet.
                </span>
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Email:</span>{" "}
                  <a href="mailto:ryharofficial@gmail.com" className="underline">
                    ryharofficial@gmail.com
                  </a>
                </span>
                <span className="flex flex-row text-text-primary items-center">
                  <span className="bg-button-hover p-2 rounded-lg mr-2">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
                    </svg>
                  </span>
                  <span className="mr-1 font-semibold">Education:</span> Universitas Multi Data Palembang
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
