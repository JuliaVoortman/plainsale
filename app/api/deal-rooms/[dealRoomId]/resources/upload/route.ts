import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authOptions } from "@/lib/auth";
import { s3Client } from "@/lib/s3";

export async function POST(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { filename, contentType } = await req.json();
    const key = `${session.user.organizationId}/${params.dealRoomId}/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[RESOURCE_UPLOAD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}