import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Florence Laundry — Industrial Scale. Hospital Standards. Luxury Finish.",
  description:
    "Florence Laundry — a premium commercial laundry in Doha, Qatar. Processing over 7.5 tons of linen daily (135,000 pieces weekly) with hospital-grade sterilization protocols and luxury finishing.",
  keywords: [
    "Florence Laundry",
    "commercial laundry",
    "laundry Doha",
    "Qatar laundry",
    "hospital sterilization",
    "linen service",
    "industrial laundry",
  ],
  authors: [{ name: "Florence Laundry" }],
  openGraph: {
    title: "Florence Laundry — Industrial Scale. Hospital Standards. Luxury Finish.",
    description:
      "Premium commercial laundry in Doha, Qatar. 7.5+ tons daily, 135,000 pieces weekly, hospital-grade sterilization.",
    siteName: "Florence Laundry",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
