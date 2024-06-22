/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https" , 
                hostname:"i.ytimg.com"
            }, 
            {
                protocol: "https", 
                hostname: "knowsdgs.jrc.ec.europa.eu"
            }, 
            {
                protocol:"https", 
                hostname: "assets.weforum.org"
            }
        ]
    },experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
