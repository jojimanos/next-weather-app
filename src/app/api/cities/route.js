"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../../config/database";
import City from "../../../../models/cityModel";
import { NextApiRequest } from "next";
import { useContext } from "react";
import LocationContext from "@/app/locationContext";

export const GET = async (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const location = url.searchParams.get("location");

  if (!location) {
    return new NextResponse(
      JSON.stringify({ error: "Location parameter is required" }),
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const data = await City.find(
      { name: location.toString() },
      { country: 1, lat: 1, lng: 1 }
    );

    console.log("HERE", data[0]);

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
    return new NextResponse({ message: error.message }, { status: 500 });
  }
};
