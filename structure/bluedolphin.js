const config = {
  hello: "hello world !",
  vendor_dir: "/vendor/",
  vendor_files: [
    {
      name: "a1.png",
      url: "https://avatars2.githubusercontent.com/u/6905598?v=3&s=460",
      child_dir: "a/",
      version: "1.0.1"
    },
    {
      name: "a2.png",
      url: "https://avatars2.githubusercontent.com/u/6905598?v=3&s=40"
    },
    {
      name: "a3.png",
      url: "https://avatars2.githubusercontent.com/u/6905598?v=3&s=60"
    }
  ],
  redis: {
    host: '127.0.0.1',
    port: 6666
  }
}

module.exports = config;
