import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Diabuddies" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Diabuddies" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Track your health, connect with a supportive community, shop essential supplies, and enhance your knowledge with our diabetes management platform."
        />
        <meta
          name="keywords"
          content="Diabetes management, Diabetes support, Blood glucose tracking, Insulin dose recording, Health metrics monitoring, Diabetic supplies, Online store for diabetics, Diabetes education, Newly diagnosed diabetics, Blood sugar management, Healthy eating for diabetics, Physical activity and diabetes, Medication management for diabetics, Emotional well-being for diabetics, Diabetic recipes, Diabetic snacks, Diabetes empowerment, Health and wellness for diabetics"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Adnane Louardi" />

        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/icon-512x512.png" color="azure" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}

        {/* <!-- apple splash screen images --> */}

        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="2048x2732" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="1668x2224" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="1536x2048" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="1125x2436" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="1242x2208" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="750x1334" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" sizes="640x1136" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins&family=Roboto:wght@300;400;500;700&family=Rubik&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
