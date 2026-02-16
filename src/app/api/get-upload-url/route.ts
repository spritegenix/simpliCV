import { generatePresignedUploadUrl } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

// This handler generates a presigned URL for uploading the file to S3
export async function POST(req: NextRequest) {
  try {
    const { filename, contentType } = await req.json();
    const headers = {
      "Access-Control-Allow-Origin": "*", // Allow all origins (or use specific origin)
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
    };
    // Validate the input
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400, headers },
      );
    }

    // Generate a unique S3 key for the file
    const key = `resume_photos/${Date.now()}-${filename}`;

    // Generate the presigned URL to upload the file
    const url = await generatePresignedUploadUrl(key, contentType);

    // Return the presigned URL and key
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 },
    );
  }
}
