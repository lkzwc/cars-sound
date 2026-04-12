const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
  functions: {
    // 这里的名字可以随便起
    audioApi: {
      // 1. 必填：告诉 OpenNext 这个函数负责哪些路由请求
      routes: ["app/api/audio/[...key]/route"], 
      // 2. 必填：告诉构建工具去哪里找文件
      patterns: ["api/audio/*"],
      override: {
        wrapper: "cloudflare-edge",
        converter: "edge",
        proxyExternalRequest: "fetch",
      },
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
