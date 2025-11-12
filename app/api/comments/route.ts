import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Comment from "@/models/Comments"

export async function GET() {
  try {
    await dbConnect()

    const comments = await Comment.find({})
    return NextResponse.json({ success: true, data: comments }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}
