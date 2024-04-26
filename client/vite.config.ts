import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// http://44.201.189.101:3300/
// http://localhost:3300/


export default defineConfig({
  server:{
    proxy: {
      "/api": {
        target:"http://44.202.237.86:3300/",
        secure: false
      }
    }
  },
  plugins: [react()],
})
