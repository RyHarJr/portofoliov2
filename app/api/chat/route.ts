import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { text, name } = await req.json()

    if (!text) {
      return NextResponse.json({ success: false, message: "Pesan tidak boleh kosong" }, { status: 400 })
    }

    const apiKey = process.env.API_KEY_AI
    if (!apiKey) {
      console.error("API_KEY_AI is missing in environment variables")
      return NextResponse.json({ success: false, message: "Konfigurasi API AI tidak ditemukan." }, { status: 500 })
    }

    const url = new URL("https://api.ryhar.my.id/ai/qwen-ai")
    url.searchParams.append("text", text)
    url.searchParams.append("name", name || "Guest")
    url.searchParams.append("apikey", apiKey)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`API AI Error: ${response.status}`)
    }

    const data = await response.json()

    const botReply = data.data || "Maaf, AI tidak memahami pesan tersebut."

    return NextResponse.json({ success: true, message: botReply }, { status: 200 })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ success: false, message: "Gagal terhubung ke server AI." }, { status: 500 })
  }
}
