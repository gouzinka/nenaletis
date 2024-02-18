const config = require("./config");

module.exports = {
  async rewrites() {
    return [
      {
        source: `/eshopy/:path*`,
        destination: "/shops/:path*",
      },
    ];
  },
};
