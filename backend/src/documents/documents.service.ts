import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { 
  GenerateInventoryDto, 
  GenerateMantLaptopDto, 
  GenerateMantDesktopDto 
} from "./dtos/document.dto";

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);
  private resourcesDir: string;
  private templateInventarioPath: string;
  private templateLaptopPath: string;
  private templateDesktopPath: string;

  constructor() {
    this.resourcesDir = path.join(process.cwd(), "resources");
    this.templateInventarioPath = path.join(this.resourcesDir, "template_inventario.docx");
    this.templateLaptopPath = path.join(this.resourcesDir, "template_mant_laptop.docx");
    this.templateDesktopPath = path.join(this.resourcesDir, "template_mant_desktop.docx");

    // Ensure resources directory and default template skeletons exist for safe development
    this.ensureAllTemplates();
  }

  /**
   * Generates a DOCX inventory report.
   */
  public generateInventoryDocument(dto: GenerateInventoryDto): Buffer {
    return this.renderTemplate(this.templateInventarioPath, dto);
  }

  /**
   * Generates a DOCX laptop maintenance report.
   */
  public generateMantLaptopDocument(dto: GenerateMantLaptopDto): Buffer {
    return this.renderTemplate(this.templateLaptopPath, dto);
  }

  /**
   * Generates a DOCX desktop maintenance report.
   */
  public generateMantDesktopDocument(dto: GenerateMantDesktopDto): Buffer {
    return this.renderTemplate(this.templateDesktopPath, dto);
  }

  /**
   * Universal template renderer helper using pizzip and docxtemplater.
   */
  private renderTemplate(templatePath: string, data: any): Buffer {
    try {
      if (!fs.existsSync(templatePath)) {
        this.logger.warn(`Template not found: ${templatePath}. Running fallback check...`);
        this.ensureAllTemplates();
      }
      
      const content = fs.readFileSync(templatePath, "binary");
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData(data);

      try {
        doc.render();
      } catch (error: any) {
        this.logger.error(`Docxtemplater rendering error in ${path.basename(templatePath)}:`, error);
        throw new Error(`Rendering failed: ${error.message || error}`);
      }

      return doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });
    } catch (err: any) {
      this.logger.error(`Document Service render exception for ${path.basename(templatePath)}:`, err);
      throw new Error(`Failed to generate document: ${err.message || err}`);
    }
  }

  /**
   * Helper method to verify and automatically compile all valid minimal .docx templates
   * on the server if they do not already exist on disk (acts as a safe fallback).
   */
  private ensureAllTemplates(): void {
    if (!fs.existsSync(this.resourcesDir)) {
      fs.mkdirSync(this.resourcesDir, { recursive: true });
    }

    // 1. Ensure Inventory template
    if (!fs.existsSync(this.templateInventarioPath)) {
      this.logger.log(`Generating default template_inventario.docx at: ${this.templateInventarioPath}`);
      const docXml = this.getInventoryXml();
      this.writeDocxZip(this.templateInventarioPath, docXml);
    }

    // 2. Ensure Laptop template
    if (!fs.existsSync(this.templateLaptopPath)) {
      this.logger.log(`Generating default template_mant_laptop.docx at: ${this.templateLaptopPath}`);
      const docXml = this.getLaptopXml();
      this.writeDocxZip(this.templateLaptopPath, docXml);
    }

    // 3. Ensure Desktop template
    if (!fs.existsSync(this.templateDesktopPath)) {
      this.logger.log(`Generating default template_mant_desktop.docx at: ${this.templateDesktopPath}`);
      const docXml = this.getDesktopXml();
      this.writeDocxZip(this.templateDesktopPath, docXml);
    }
  }

  /**
   * Helper to write a valid XML-formed DOCX zip file structure.
   */
  private writeDocxZip(targetPath: string, documentXml: string): void {
    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

    const zip = new PizZip();
    zip.file("[Content_Types].xml", contentTypesXml);
    zip.file("_rels/.rels", relsXml);
    zip.file("word/document.xml", documentXml);

    const buffer = zip.generate({ type: "nodebuffer" });
    fs.writeFileSync(targetPath, buffer);
  }

  /**
   * Returns XML payload for template_inventario.docx
   */
  private getInventoryXml(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="32"/><w:color w:val="1E293B"/></w:rPr>
        <w:t>ACTA DE INVENTARIO GENERAL - SOPORTE TI</w:t>
      </w:r>
    </w:p>
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>SEDE OPERATIVA: </w:t></w:r>
      <w:r><w:t>{sede}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>FECHA: </w:t></w:r>
      <w:r><w:t>{fecha}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>MOTIVO: </w:t></w:r>
      <w:r><w:t>{motivo}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>REFERENCIA: </w:t></w:r>
      <w:r><w:t>{referencia}</w:t></w:r>
    </w:p>
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0F172A"/></w:rPr><w:t>EQUIPOS EN INVENTARIO:</w:t></w:r>
    </w:p>
    <w:tbl>
      <w:tblPr>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc><w:tcPr><w:tcW w:w="800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>N°</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="1600" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>Nro. Serie</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="2600" w:type="dxa"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>Descripción / Especificación</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="1600" w:type="dxa"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>Ubicación</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="1400" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>Estado</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="2000" w:type="dxa"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>Observación</w:t></w:r></w:p></w:tc>
      </w:tr>
      {#equipos}
      <w:tr>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:sz w:val="18"/><w:t>{item}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:sz w:val="18"/><w:t>{serie}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:sz w:val="18"/><w:t>{descripcion}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:sz w:val="18"/><w:t>{ubicacion}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:sz w:val="18"/><w:t>{estado}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:sz w:val="18"/><w:t>{observacion}</w:t></w:r></w:p></w:tc>
      </w:tr>
      {/equipos}
    </w:tbl>
    <w:p/>
    <w:p/>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>_____________________________________________</w:t></w:r></w:p>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>Firma Responsable de Inventario</w:t></w:r></w:p>
  </w:body>
</w:document>`;
  }

  /**
   * Returns XML payload for template_mant_laptop.docx
   */
  private getLaptopXml(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="32"/><w:color w:val="14B8A6"/></w:rPr>
        <w:t>CONSTANCIA DE MANTENIMIENTO PREVENTIVO (LAPTOP)</w:t>
      </w:r>
    </w:p>
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>SEDE OPERATIVA: </w:t></w:r>
      <w:r><w:t>{sede}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>FECHA REGISTRO: </w:t></w:r>
      <w:r><w:t>{fecha}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>ÁREA SOLICITANTE: </w:t></w:r>
      <w:r><w:t>{area}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>USUARIO ASIGNADO: </w:t></w:r>
      <w:r><w:t>{usuario}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>MOTIVO CONTROL: </w:t></w:r>
      <w:r><w:t>{motivo}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>DOCUMENTO REFERENCIA: </w:t></w:r>
      <w:r><w:t>{referencia}</w:t></w:r>
    </w:p>
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0F172A"/></w:rPr><w:t>DETALLES DEL EQUIPO EVALUADO:</w:t></w:r>
    </w:p>
    
    <w:tbl>
      <w:tblPr>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="CCCCCC"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E5E7EB"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E5E7EB"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc><w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:fill="F3F4F6"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Modelo Laptop</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="6000" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{laptop_modelo}</w:t></w:r></w:p></w:tc>
      </w:tr>
      <w:tr>
        <w:tc><w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:fill="F3F4F6"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Nro de Serie</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="6000" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{laptop_serie}</w:t></w:r></w:p></w:tc>
      </w:tr>
      <w:tr>
        <w:tc><w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:fill="F3F4F6"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Hostname / Red</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="6000" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{laptop_hostname}</w:t></w:r></w:p></w:tc>
      </w:tr>
    </w:tbl>

    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0F172A"/></w:rPr><w:t>ACTIVIDADES DE MANTENIMIENTO PREVENTIVO REALIZADAS:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Desarmado integral y soplado / remoción de polvo a presión.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Limpieza de ventiladores internos y ductos de refrigeración.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Renovación de grasa refrigerante o pasta térmica en la CPU/GPU.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Sanetizado estético del teclado, descansamanos y pantalla LCD.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Auditoría de almacenamiento, caches de sistema y archivos huérfanos.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [X] Comprobación de estado operativo de batería y cargador.</w:t></w:r>
    </w:p>
    <w:p/>
    <w:p/>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>_____________________________________________</w:t></w:r></w:p>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>Firma Responsable Soporte TI</w:t></w:r></w:p>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:t>CMAC TRUJILLO</w:t></w:r></w:p>
  </w:body>
</w:document>`;
  }

  /**
   * Returns XML payload for template_mant_desktop.docx
   */
  private getDesktopXml(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="32"/><w:color w:val="14B8A6"/></w:rPr>
        <w:t>CONSTANCIA DE MANTENIMIENTO PREVENTIVO (DESKTOP)</w:t>
      </w:r>
    </w:p>
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>SEDE OPERATIVA: </w:t></w:r>
      <w:r><w:t>{sede}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>FECHA REGISTRO: </w:t></w:r>
      <w:r><w:t>{fecha}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>ÁREA SOLICITANTE: </w:t></w:r>
      <w:r><w:t>{area}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>USUARIO ASIGNADO: </w:t></w:r>
      <w:r><w:t>{usuario}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>MOTIVO CONTROL: </w:t></w:r>
      <w:r><w:t>{motivo}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>DOCUMENTO REFERENCIA: </w:t></w:r>
      <w:r><w:t>{referencia}</w:t></w:r>
    </w:p>
    <w:p/>
    
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0F172A"/></w:rPr><w:t>CONSTITUCIÓN DEL EQUIPO DE ESCRITORIO EVALUADO:</w:t></w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      
      <!-- Table Headers -->
      <w:tr>
        <w:tc><w:tcPr><w:tcW w:w="2500" w:type="dxa"/><w:shd w:fill="E2E8F0"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>Componente</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:fill="E2E8F0"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>Marca / Fabricante</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:fill="E2E8F0"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>Modelo Coincidente</w:t></w:r></w:p></w:tc>
        <w:tc><w:tcPr><w:tcW w:w="2100" w:type="dxa"/><w:shd w:fill="E2E8F0"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>Nro. Serie / TAG</w:t></w:r></w:p></w:tc>
      </w:tr>

      <!-- Row for CPU -->
      <w:tr>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>UNIDAD CENTRAL (CPU)</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>Varios (Interno)</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{cpu_modelo}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{cpu_serie}</w:t></w:r></w:p></w:tc>
      </w:tr>

      <!-- Row for Monitor -->
      <w:tr>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>PANTALLA / MONITOR</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{monitor_marca}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{monitor_modelo}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{monitor_serie}</w:t></w:r></w:p></w:tc>
      </w:tr>

      <!-- Row for Teclado -->
      <w:tr>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>TECLADO TI</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{teclado_marca}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{teclado_modelo}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{teclado_serie}</w:t></w:r></w:p></w:tc>
      </w:tr>

      <!-- Row for Mouse -->
      <w:tr>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>MOUSE OPTICO</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{mouse_marca}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>{mouse_modelo}</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{mouse_serie}</w:t></w:r></w:p></w:tc>
      </w:tr>
    </w:tbl>

    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:color w:val="475569"/></w:rPr><w:t>HOSTNAME ASOCIADO EN RED: </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>{cpu_hostname}</w:t></w:r>
    </w:p>

    <w:p/>
    <w:p>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="0F172A"/></w:rPr><w:t>CHECKLIST DE PROTOCOLO PREVENTIVO EFECTUADO:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Apertura de CPU y soplado integral con compresora dialéctica facial.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Limpieza profunda del cooler de refrigeración de procesador principal.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Cambio térmico por compuesto metálico de alto rendimiento cerámico.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Verificación y purga de sulfato en slots de memoria RAM.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Limpieza estética y testeo electromecánico de teclado, mouse y monitor.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>   [✓] Análisis de fragmentación de disco y purga de logs del sistema operativo.</w:t></w:r>
    </w:p>

    <w:p/>
    <w:p/>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>_____________________________________________</w:t></w:r></w:p>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>Firma Responsable Soporte TI</w:t></w:r></w:p>
    <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:t>CMAC TRUJILLO</w:t></w:r></w:p>
  </w:body>
</w:document>`;
  }
}
