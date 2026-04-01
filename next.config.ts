import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 核心配置：生成静态文件
  output: 'export',
  
  // 2. 路径处理：把 /about 生成为 /about/index.html，GitHub Pages 更喜欢这种
  trailingSlash: true,
  
  // 3. 图片配置：GitHub Pages 不支持 Next.js 自带的服务器端图片优化，必须关掉
  images: {
    unoptimized: true,
  },

  // 注意：因为你的仓库是 brandon-lee-bo.github.io，
  // 所以绝对不需要 basePath 配置，留空就是对的！

  // 4. Webpack 配置 (保留原项目的 bib 文件支持)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.bib$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;