import { NextResponse } from "next/server";

export async function GET() {
  const cssContent = `
:root {
  --color-primary-700: 243, 146, 0;  /* Hex: #f39200 */
  --color-primary-500: 251, 182, 0;  /* Hex: #fbb600 */
  --color-primary-300: 255, 206, 0;  /* Hex: #ffce00 */
  --color-primary-100: 255, 228, 64; /* Hex: #ffe440 */
  --color-secondary-700: 31, 26, 79; /* Hex: #1f1a4f */
  --color-secondary-500: 37, 79, 195; /* Hex: #254fc3 */
  --color-secondary-400: 6, 106, 214; /* Hex: #066ad6 */
  --color-secondary-300: 0, 141, 235; /* Hex: #008deb */
  --color-secondary-100: 67, 191, 255; /* Hex: #43bfff */
}

  `;

  return new NextResponse(cssContent, {
    headers: {
      "Content-Type": "text/css",
      "Cache-Control": "public, max-age=3600", // Optional: Caching
    },
  });
}
