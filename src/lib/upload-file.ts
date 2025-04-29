"use client";

// import { BUCKET_NAME } from "./s3";

// Maximum allowed file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadFileToS3(file: File): Promise<string> {
    // Check file size before proceeding
    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File is too large. Maximum size is 5MB.");
    }

    // Step 1: Request a presigned URL from the backend
    const res = await fetch("/api/get-upload-url", {
        method: "POST",
        body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to get upload URL");
    }

    const { url, key } = await res.json();
    // Step 2: Upload the file directly to S3 using the presigned URL
    const upload = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    if (!upload.ok) {
        throw new Error("Failed to upload file to S3");
    }

    // Step 3: Return the public URL of the uploaded file
    // const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    const fileUrl = `https://simplicv.s3.ap-south-1.amazonaws.com/${encodeURIComponent(key)}`;
    // const fileUrl = upload.url

    // console.log(fileUrl, "fileUrl");
    return fileUrl;
}

// https://simplicv.s3.
// ap-south-1.amazonaws.com/
// resume_photos/1745820301357-ChatGPT%20Image%20Apr%201%2C%202025%2C%2011_18_20%20AM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4SZHN57EWJOWOA6A%2F20250428%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250428T060501Z&X-Amz-Expires=3600&X-Amz-Signature=3ec85534dfc6c7144f9cd8dc191897b6d0d928d4b72c1821a9a67612e2fb82d3&X-Amz-SignedHeaders=host&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject

// https://undefined.s3.undefined.amazonaws.com/resume_photos/1745820301357-ChatGPT Image Apr 1, 2025, 11_18_20 AM.png