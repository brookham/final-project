import type { Metadata } from "next";

import { AppThemeProvider } from "./theme/themeProvider";

export const metadata: Metadata = {
  title: "Global Wildfire Tracker",
  description: "interactive wildfire map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppThemeProvider>


  );
}