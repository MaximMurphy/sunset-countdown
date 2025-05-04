import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching sunset data:", error);
    return NextResponse.json(
      { error: "Failed to fetch sunset data" },
      { status: 500 }
    );
  }
}
