import { Html, Main, Head, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <style>{`* { box-sizing: border-box; padding: 0; margin: 0 }`}</style>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
