import React from 'react';
import { DefaultSeo } from 'next-seo';
import { AppRoot } from '../utils/next';
import Head from 'next/head';
import SEO_CONFIG from '../utils/seo';

const App: AppRoot = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page: JSX.Element) => page);
  const children = getLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <title>Next App</title>

        <meta charSet='utf-8' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
        <meta name='robots' content='all,follow' />

        <link rel='icon' href='/favicon.ico' />
      </Head>

      <DefaultSeo {...SEO_CONFIG} />

      {children}
    </>
  );
};

App.getInitialProps = async (appContext) => {
  const { Component, ctx } = appContext;

  // eslint-disable-next-line
  let pageProps: any = {};

  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }

  const lang = 'en';
  const theme = 'light';

  return {
    lang,
    theme,
    pageProps,
  };
};

export default App;
