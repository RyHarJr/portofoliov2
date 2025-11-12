import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Comment from "@/models/Comments"

interface RequestBody {
  _id: string
  token: string
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { _id, token }: RequestBody = await req.json()

    if (!_id || !token) {
      return NextResponse.json({ success: false, message: "_id and token are required" }, { status: 400 })
    }

    const tokenReal = process.env.TOKEN

    if (token !== tokenReal) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const comment = await Comment.findByIdAndDelete(_id)

    if (!comment) {
      return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Comment deleted successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}
