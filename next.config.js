/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/simhub/:slug*",
      destination: "https://simhub-test.yuansuan.com/simhub/:slug*",
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    instrumentationHook: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  rewrites,
  // async redirects(){
  //   return [
  //     {
  //       source: '/',
  //       destination: '/simhub',
  //       permanent: true,
  //     }
  //   ]
  // }
}

module.exports = nextConfig
