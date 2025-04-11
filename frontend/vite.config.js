import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const { GOOGLE_MAPS_API_KEY = '', MAP_ID = '', URL = '' } = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY),
            'process.env.MAP_ID': JSON.stringify(MAP_ID),
            'process.env.URL': JSON.stringify(URL),
        },
        resolve: {
            alias: {
                '@vis.gl/react-google-maps/examples.js':
                    'https://visgl.github.io/react-google-maps/scripts/examples.js',
            },
        },
    }
})
