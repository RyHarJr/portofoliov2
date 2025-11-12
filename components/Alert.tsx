"use client"
type AlertType = "success" | "error" | "info" | "warning"

export interface AlertMessageProps {
  type: AlertType
  message: string
  onClose?: () => void
}

export default function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  return (
    <div className="relative w-full flex justify-center">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-90 h-auto relative bg-bg-project-card p-4 rounded-lg shadow-2xl mx-5">
          <h1 className="font-bold text-text-primary text-md md:text-lg flex flex-row items-center gap-2">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
            </svg>
            <span>{type}</span>
          </h1>
          <p className="text-sm md:text-md text-text-secondary">{message}</p>
          <div className="flex flex-col items-center justify-center">
            <button onClick={onClose} type="button" className="rounded-xl px-10 py-2 mt-4 text-sm font-semibold text-text-project-card bg-button-hero hover:bg-button-hero-hover active:bg-button-hero-hover">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
