import { Controller, Post, Body, Res, HttpStatus, Logger, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { DocumentsService } from "./documents.service";
import { 
  GenerateInventoryDto, 
  GenerateMantLaptopDto, 
  GenerateMantDesktopDto,
  EquipmentStatus
} from "./dtos/document.dto";

@Controller("api/documents")
export class DocumentsController {
  private readonly logger = new Logger(DocumentsController.name);

  constructor(private readonly documentsService: DocumentsService) {}

  /**
   * Endpoint: POST /api/documents/generate-inventario
   */
  @Post("generate-inventario")
  @UsePipes(new ValidationPipe({ transform: true }))
  public async generateInventory(
    @Body() payload: GenerateInventoryDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      // Ensure proper indices & upper-case sanitized fields
      const sanitizedEquipos = payload.equipos.map((eq, idx) => ({
        ...eq,
        item: idx + 1,
        serie: (eq.serie || "").trim().toUpperCase(),
        descripcion: (eq.descripcion || "").trim(),
        ubicacion: (eq.ubicacion || "").trim(),
        estado: (eq.estado || EquipmentStatus.OPERATIVO).toUpperCase() as EquipmentStatus,
        observacion: (eq.observacion || "").trim() || "NINGUNA"
      }));

      const docBuffer = this.documentsService.generateInventoryDocument({
        ...payload,
        equipos: sanitizedEquipos
      });

      const cleanSede = payload.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_inventario_${cleanSede}_${payload.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(HttpStatus.OK).send(docBuffer);
    } catch (error: any) {
      this.logger.error("generateInventory error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: `Internal server failure during inventory generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  }

  /**
   * Endpoint: POST /api/documents/generate-mant-laptop
   */
  @Post("generate-mant-laptop")
  @UsePipes(new ValidationPipe({ transform: true }))
  public async generateMantLaptop(
    @Body() payload: GenerateMantLaptopDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      // Sanitize fields
      const sanitizedData: GenerateMantLaptopDto = {
        ...payload,
        sede: payload.sede.trim().toUpperCase(),
        area: payload.area.trim().toUpperCase(),
        usuario: payload.usuario.trim().toUpperCase(),
        laptop_modelo: payload.laptop_modelo.trim(),
        laptop_serie: payload.laptop_serie.trim().toUpperCase(),
        laptop_hostname: payload.laptop_hostname.trim().toUpperCase(),
      };

      const docBuffer = this.documentsService.generateMantLaptopDocument(sanitizedData);

      const cleanSede = sanitizedData.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_laptop_${cleanSede}_${sanitizedData.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(HttpStatus.OK).send(docBuffer);
    } catch (error: any) {
      this.logger.error("generateMantLaptop error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: `Internal server failure during laptop maintenance generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  }

  /**
   * Endpoint: POST /api/documents/generate-mant-desktop
   */
  @Post("generate-mant-desktop")
  @UsePipes(new ValidationPipe({ transform: true }))
  public async generateMantDesktop(
    @Body() payload: GenerateMantDesktopDto,
    @Res() res: Response
  ): Promise<void> {
    try {
      // Sanitize fields
      const sanitizedData: GenerateMantDesktopDto = {
        ...payload,
        sede: payload.sede.trim().toUpperCase(),
        area: payload.area.trim().toUpperCase(),
        usuario: payload.usuario.trim().toUpperCase(),
        cpu_modelo: payload.cpu_modelo.trim(),
        cpu_serie: payload.cpu_serie.trim().toUpperCase(),
        cpu_hostname: payload.cpu_hostname.trim().toUpperCase(),
        monitor_marca: payload.monitor_marca.trim().toUpperCase(),
        monitor_modelo: payload.monitor_modelo.trim(),
        monitor_serie: payload.monitor_serie.trim().toUpperCase(),
        teclado_marca: payload.teclado_marca.trim().toUpperCase(),
        teclado_modelo: payload.teclado_modelo.trim(),
        teclado_serie: payload.teclado_serie.trim().toUpperCase(),
        mouse_marca: payload.mouse_marca.trim().toUpperCase(),
        mouse_modelo: payload.mouse_modelo.trim(),
        mouse_serie: payload.mouse_serie.trim().toUpperCase(),
      };

      const docBuffer = this.documentsService.generateMantDesktopDocument(sanitizedData);

      const cleanSede = sanitizedData.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_desktop_${cleanSede}_${sanitizedData.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(HttpStatus.OK).send(docBuffer);
    } catch (error: any) {
      this.logger.error("generateMantDesktop error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: `Internal server failure during desktop maintenance generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  }
}
