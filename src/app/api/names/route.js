"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../../config/database";
import City from "../../../../models/cityModel";
import { NextApiRequest } from "next";
import { useContext } from "react";
import LocationContext from "@/app/locationContext";
import { unicodeCharacterSetConverter } from "@/app/utils/unicodeCharacterSetConverter";

export const GET = async (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const value = url.searchParams.get("value");

  const regex = unicodeCharacterSetConverter(value);

  if (!value) {
    return new NextResponse(
      JSON.stringify({ error: "Search parameter is required" }),
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const data = await City.find(
      { name: { $regex: regex } },
      { name: 1, country: 1, admin1: 1 }
    );

    console.log("HERE", data[0]);

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
    return new NextResponse({ message: error.message }, { status: 500 });
  }
};
