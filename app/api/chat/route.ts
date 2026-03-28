import { NextRequest, NextResponse } from "next/server"

interface HistoryEntry {
  role: "system" | "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { text, history = [] }: { text: string; history: HistoryEntry[] } = await req.json()

    if (!text) {
      return NextResponse.json({ success: false, message: "Pesan tidak boleh kosong" }, { status: 400 })
    }

    const apiKey = process.env.API_KEY_AI
    if (!apiKey) {
      console.error("API_KEY_AI is missing in environment variables")
      return NextResponse.json({ success: false, message: "Konfigurasi API AI tidak ditemukan." }, { status: 500 })
    }

    const response = await fetch("https://api.ryhar.my.id/ai/qwen-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-apikey": apiKey,
      },
      body: JSON.stringify({ text, history }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(`API AI Error: ${response.status}`, errText)
      throw new Error(`API AI Error: ${response.status} - ${errText}`)
    }

    const data = await response.json()

    const botReply = data.data || "Maaf, AI tidak memahami pesan tersebut."

    return NextResponse.json({ success: true, message: botReply }, { status: 200 })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ success: false, message: "Gagal terhubung ke server AI." }, { status: 500 })
  }
}
