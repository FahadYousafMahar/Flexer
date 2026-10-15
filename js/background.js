// Background service worker for Flexer extension
// This script runs as a service worker in Manifest V3

self.addEventListener('install', () => {
  console.log('Flexer service worker installed');
});

self.addEventListener('activate', () => {
  console.log('Flexer service worker activated');
});
