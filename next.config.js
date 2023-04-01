module.exports = {
  images: {
    domains: ["ai-prompt-newsfeed.s3.us-west-2.amazonaws.com"],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    maxRequestBodySize: "50mb",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    maxRequestBodySize: "50mb",
  },
  reactStrictMode: true,
}
