const title = 'Review System';
const description = '';
const url = 'https://review-system.app';

const SEO_CONFIG = {
  titleTemplate: `%s | ${title}`,
  defaultTitle: title,
  description: description,
  canonical: url,
  keywords: 'near, p2e, game, finance, nft, crypto, rpg, blockchain',
  openGraph: {
    title,
    description,
    // images: [{ url: 'https://mfight.io/static/preview.png', width: 1920, height: 1080 }],
    url,
    type: 'website',
    locale: 'en_EN',
    site_name: 'NextApp',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default SEO_CONFIG;
