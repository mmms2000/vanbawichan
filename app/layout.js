import "./globals.css";

export const metadata = {
  title: "Van Bawi Chan Portfolio",
  description: "A monochrome creator portfolio for Van Bawi Chan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
