/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        transpileOnly: true, // same name as in ts-node --transpile-only
	ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
