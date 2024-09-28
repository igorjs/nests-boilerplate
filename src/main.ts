import { configureServer } from 'src/app.server';

// Start server
(async function main() {
  const PORT = process.env.PORT || 3000;
  const server = await configureServer();
  server.listen(PORT, '0.0.0.0');
})();
