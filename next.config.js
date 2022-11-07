/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    publicRuntimeConfig: {
        // Will be available on both server and client
        API_URL: process.env.API_URL,
    },
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    images: {
        domains: ["cafedigimonbucket.s3.amazonaws.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cafedigimonbucket.s3.amazonaws.com",
                port: "",
                pathname: "/*",
            },
        ],
    },
}

module.exports = nextConfig
