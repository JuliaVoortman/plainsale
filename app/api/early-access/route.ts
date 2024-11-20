import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Here you would typically:
    // 1. Store the email in your database
    // 2. Send a confirmation email
    // 3. Add to your email marketing list

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[EARLY_ACCESS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}