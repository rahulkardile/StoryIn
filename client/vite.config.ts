import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// http://3.110.28.37:3300/
// http://localhost:3300/
// https://storyin-1.onrender.com/

export default defineConfig({
  server:{
    proxy: {
      "/api": {
        target:"https://storyin-1.onrender.com",
        secure: false
      }
    }
  },
  plugins: [react()],
})
