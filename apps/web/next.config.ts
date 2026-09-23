import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Los paquetes del workspace se publican como TypeScript y los transpila Next. */
  transpilePackages: ["@avicola/ui", "@avicola/core"],
};

export default nextConfig;
