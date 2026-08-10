import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Aakash Jha — Android Portfolio",
  description:
    "An interactive Android OS simulation portfolio by Aakash Jha. Explore projects, skills, and achievements like native Android apps.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function AndroidLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Roboto loaded via <link> to avoid PostCSS @import ordering issues */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400&family=Roboto+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div
        className="android-root"
        style={{
          fontFamily: "'Roboto', 'Google Sans', system-ui, sans-serif",
          height: "100dvh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {children}
      </div>
    </>
  );
}
