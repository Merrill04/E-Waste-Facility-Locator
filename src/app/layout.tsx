// src/app/layout.tsx
import './global.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="E-Waste Facility Locator - Find nearby e-waste recycling centers" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <title>E-Waste Facility Locator</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
