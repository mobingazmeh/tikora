import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const API_KEY = process.env.NEXT_PUBLIC_MAP_SERVICE_API_KEY;

    // دریافت مقادیر از کوئری استرینگ یا استفاده از مقدار پیش‌فرض
    const zoom = searchParams.get("zoom") || 14;
    const lat = searchParams.get("lat") || 35.700538;
    const lng = searchParams.get("lng") || 51.337907;
    const width = searchParams.get("width") || 1120;
    const height = searchParams.get("height") || 400;
  
    // ارسال درخواست به API
    const response = await axios.get("https://api.neshan.org/v4/static", {
      params: {
        key: API_KEY,
        type: "neshan",
        zoom,
        center: `${lat},${lng}`, // مرکز به صورت رشته فرمت شده
        width,
        height,
        markerToken:'501347.cAMvJWMU'
      },
      responseType: "arraybuffer", // دریافت پاسخ به صورت باینری
    });

    // ارسال تصویر به کلاینت
    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "image/png", // تنظیم نوع محتوا
        "Content-Length": response.data.length, // طول داده‌ها
      },
    });
 
  } catch (error: any) {
    console.error("Error fetching map image:", error?.message);
    return NextResponse.error();
  }
}
