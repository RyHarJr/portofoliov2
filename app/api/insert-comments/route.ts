import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Comment from "@/models/Comments"

interface RequestBody {
  name: string
  timestamp: Date
  message: string
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { name, timestamp, message }: RequestBody = await req.json()

    if (!name || !timestamp || !message) {
      return NextResponse.json({ success: false, message: "name, timestamp, and message are required" }, { status: 400 })
    }

    const comment = new Comment({
      name,
      timestamp,
      message,
    })

    await comment.save()

    return NextResponse.json({ success: true, data: comment }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}
