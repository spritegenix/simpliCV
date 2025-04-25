import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SimpliCV',
        short_name: 'SimpliCV',
        description: 'A Progressive Web App built with Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        scope: '/',
        lang: 'en',
        icons: [
            {
                src: '/icon529x529.png',
                sizes: '529x529',
                type: 'image/png',
            },
            {
                src: '/icon135x32.png',
                sizes: '135x32',
                type: 'image/png',
            },
        ],
        "screenshots": [
            {
              "src": "/desktop.png",
              "sizes": "1280x800",
              "type": "image/png",
              "form_factor": "wide"
            },
            {
              "src": "/mobile.png",
              "sizes": "390x844",
              "type": "image/png"
            }
          ]
    }
}