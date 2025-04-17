/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // API_URL: 'http://skillsyncapi-env.eba-qysqetia.eu-north-1.elasticbeanstalk.com'
        API_URL: 'https://skillsync-api.onrender.com',
        AI_URL: 'https://localhost:5000',
    }
};

export default nextConfig;
