import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import nodemailer from "nodemailer"

interface RequestBody {
  name: string
  timestamp: Date
  message: string
  email: string
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { name, timestamp, message, email }: RequestBody = await req.json()

    if (!name || !timestamp || !message || !email) {
      return NextResponse.json({ success: false, message: "name, timestamp, email and message are required" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: `Name: ${name}\nTimestamp: ${timestamp}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ success: true, data: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}
