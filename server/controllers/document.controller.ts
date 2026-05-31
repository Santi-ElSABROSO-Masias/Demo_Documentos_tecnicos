import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { DocumentService } from "../services/document.service.ts";
import { 
  GenerateInventoryDto, 
  GenerateMantLaptopDto, 
  GenerateMantDesktopDto,
  EquipmentStatus
} from "../dtos/document.dto.ts";

/**
 * Controller mimicking NestJS structure.
 * Exposes endpoints for generating 3 technical acta documents.
 */
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  /**
   * Helper to execute class-validator validation and return errors if found.
   */
  private async validateDto(cls: any, body: any): Promise<string[] | null> {
    try {
      const objInstance = plainToInstance(cls, body);
      const validationErrors = await validate(objInstance);
      if (validationErrors.length > 0) {
        return validationErrors.map(err => {
          const constraints = err.constraints ? Object.values(err.constraints).join(", ") : "";
          return `${err.property}: ${constraints || "failed validation"}`;
        });
      }
      return null;
    } catch (e: any) {
      return ["Format parsing error in validation suite"];
    }
  }

  /**
   * Endpoint: POST /api/documents/generate-inventario
   */
  public generateInventory = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = await this.validateDto(GenerateInventoryDto, req.body);
      if (errors) {
        res.status(400).json({
          statusCode: 400,
          message: "Validation failed for Inventario General",
          errors,
          error: "Bad Request"
        });
        return;
      }

      const payload = req.body as GenerateInventoryDto;

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

      const docBuffer = this.documentService.generateInventoryDocument({
        ...payload,
        equipos: sanitizedEquipos
      });

      const cleanSede = payload.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_inventario_${cleanSede}_${payload.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(200).send(docBuffer);
    } catch (error: any) {
      console.error("generateInventory error:", error);
      res.status(500).json({
        statusCode: 500,
        message: `Internal server failure during inventory generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  };

  /**
   * Endpoint: POST /api/documents/generate-mant-laptop
   */
  public generateMantLaptop = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = await this.validateDto(GenerateMantLaptopDto, req.body);
      if (errors) {
        res.status(400).json({
          statusCode: 400,
          message: "Validation failed for Mantenimiento Preventivo (Laptop)",
          errors,
          error: "Bad Request"
        });
        return;
      }

      const payload = req.body as GenerateMantLaptopDto;

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

      const docBuffer = this.documentService.generateMantLaptopDocument(sanitizedData);

      const cleanSede = sanitizedData.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_laptop_${cleanSede}_${sanitizedData.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(200).send(docBuffer);
    } catch (error: any) {
      console.error("generateMantLaptop error:", error);
      res.status(500).json({
        statusCode: 500,
        message: `Internal server failure during laptop maintenance generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  };

  /**
   * Endpoint: POST /api/documents/generate-mant-desktop
   */
  public generateMantDesktop = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = await this.validateDto(GenerateMantDesktopDto, req.body);
      if (errors) {
        res.status(400).json({
          statusCode: 400,
          message: "Validation failed for Mantenimiento Preventivo (Desktop)",
          errors,
          error: "Bad Request"
        });
        return;
      }

      const payload = req.body as GenerateMantDesktopDto;

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

      const docBuffer = this.documentService.generateMantDesktopDocument(sanitizedData);

      const cleanSede = sanitizedData.sede.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
      const filename = `acta_desktop_${cleanSede}_${sanitizedData.fecha.replace(/\//g, "-")}.docx`;

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", docBuffer.length);

      res.status(200).send(docBuffer);
    } catch (error: any) {
      console.error("generateMantDesktop error:", error);
      res.status(500).json({
        statusCode: 500,
        message: `Internal server failure during desktop maintenance generation: ${error.message || error}`,
        error: "Internal Server Error"
      });
    }
  };
}
