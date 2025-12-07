import "dotenv/config"
import { spawn } from "child_process"

const port = process.env.PORT || 3000

const next = spawn("next", ["start", "-p", port], {
  stdio: "inherit",
  shell: true,
})

next.on("exit", (code) => {
  process.exit(code)
})
