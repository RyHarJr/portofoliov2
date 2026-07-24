import { NextRequest, NextResponse } from "next/server"
export const runtime = 'edge'
import OpenAI from 'openai'

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

    const apiKey = process.env.NVIDIA_APIKEY
    if (!apiKey) {
      console.error("NVIDIA_APIKEY is missing in environment variables")
      return NextResponse.json({ success: false, message: "Konfigurasi API AI tidak ditemukan." }, { status: 500 })
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    })

    // Menggabungkan history dengan pesan terbaru dari user
    const messages = [
      ...history,
      { role: "user", content: text }
    ];

    const completion = await openai.chat.completions.create({
      model: "thinkingmachines/inkling",
      messages: messages as any,
      temperature: 1,
      top_p: 0.7,
      max_tokens: 4096,
      stream: true
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content || '';
            
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive"
      }
    });

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ success: false, message: "Gagal terhubung ke server AI." }, { status: 500 })
  }
}
