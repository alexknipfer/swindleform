module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/workspaces',
        permanent: true,
      },
    ];
  },
};
