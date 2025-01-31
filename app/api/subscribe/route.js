import { google } from "googleapis";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

export async function POST(request) {
  try {
    const { email, position, feedback } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    console.log("Private key format:", {
      firstChars: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50),
      length: process.env.GOOGLE_PRIVATE_KEY?.length,
    });

    // Create auth client using environment variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        project_id: process.env.GOOGLE_PROJECT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const range = "A2:D";

    // Append new email to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, position, feedback, new Date().toISOString()]],
      },
    });

    return NextResponse.json(
      { message: "Success! You're on the waitlist." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
