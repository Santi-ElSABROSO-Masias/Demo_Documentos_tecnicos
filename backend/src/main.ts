import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe, Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  // Habilitar validación automática a nivel global para todos los DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configuración rigurosa de CORS consumiendo ALLOWED_ORIGINS desde .env
  const allowedOriginsEnv = configService.get<string>("ALLOWED_ORIGINS");
  const origins = allowedOriginsEnv ? allowedOriginsEnv.split(",") : ["http://localhost:5173"];
  
  app.enableCors({
    origin: origins,
    methods: ["GET", "POST"],
    credentials: true,
  });

  logger.log(`CORS habilitado para los orígenes: ${origins.join(", ")}`);

  await app.listen(port, "0.0.0.0");
  logger.log(`[NestJS Full-Stack Backend] Servidor escuchando en http://0.0.0.0:${port}`);
}

bootstrap().catch((err) => {
  console.error("Fallo crítico durante la inicialización de NestJS:", err);
});
