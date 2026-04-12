// @ts-ignore - 忽略类型检查错误，因为 OpenNext 底层是支持这个字段的
const config = {
    default: {
        override: {
            wrapper: "cloudflare-node",
            converter: "edge",
            proxyExternalRequest: "fetch",
        },
    },
    // 强制指定动态路由的打包方式
    functions: {
        audioApi: {
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
};

export default config;
