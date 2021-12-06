const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb+srv://sift:riobLDgbOSdPYP64@cluster0.wubxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "]pCkF<Mfu<?&vA'^`[vB6e>-uhj$&s&RJnJ8+r}.J6Up}THK&",
    "REFRESH_TOKEN_SECRET": "m)/(LE$hcSwMQ)X4uCeV`^,t/4L`}3c-h5)w}kwK:3k3ApBh?V"
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: createSecureHeaders({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: "'self'",
            styleSrc: ["'self'", "https://stackpath.bootstrapcdn.com"],
          },
        },
        forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
        referrerPolicy: "same-origin",
      })
    }];
  },
}
