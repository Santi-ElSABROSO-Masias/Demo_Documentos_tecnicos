import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { DocumentService } from "./server/services/document.service.ts";
import { DocumentController } from "./server/controllers/document.controller.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON configuration and payload parser limits (supporting bulk inventories)
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // NestJS architectural mimics
  const documentService = new DocumentService();
  const documentController = new DocumentController(documentService);

  // REST API Route mappings mimicking NestJS endpoints
  app.post("/api/documents/generate-inventario", documentController.generateInventory);
  app.post("/api/documents/generate-mant-laptop", documentController.generateMantLaptop);
  app.post("/api/documents/generate-mant-desktop", documentController.generateMantDesktop);

  // Health and verification
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Acta Document Generator Fullstack Engine",
    });
  });

  // Hot-mount development or production static builds
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Engine] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal startup fault in server.ts initialization list:", err);
});
