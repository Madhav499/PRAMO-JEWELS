import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        userHome: resolve(__dirname, 'user/index.html'),
        userShop: resolve(__dirname, 'user/shop.html'),
        userProduct: resolve(__dirname, 'user/product.html'),
        userCheckout: resolve(__dirname, 'user/checkout.html'),
        userAccount: resolve(__dirname, 'user/account.html'),
        userAbout: resolve(__dirname, 'user/about.html'),
        userContact: resolve(__dirname, 'user/contact.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        superAdmin: resolve(__dirname, 'super-admin/index.html')
      }
    }
  }
});
