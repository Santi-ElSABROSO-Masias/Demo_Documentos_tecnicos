import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsEnum, IsNumber } from "class-validator";
import { Type } from "class-transformer";

/**
 * =========================================================================
 * 1. DTOs FOR TIPO 1: INVENTARIO GENERAL
 * =========================================================================
 */

export enum EquipmentStatus {
  OPERATIVO = "OPERATIVO",
  INOPERATIVO = "INOPERATIVO",
  EN_REPARACION = "EN REPARACIÓN"
}

export class EquipmentDto {
  @IsNumber()
  @IsOptional()
  item?: number;

  @IsString()
  @IsNotEmpty()
  serie!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @IsEnum(EquipmentStatus)
  @IsNotEmpty()
  estado!: EquipmentStatus;

  @IsString()
  @IsOptional()
  observacion?: string;
}

export class GenerateInventoryDto {
  @IsString()
  @IsNotEmpty()
  sede!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsString()
  @IsNotEmpty()
  referencia!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipmentDto)
  equipos!: EquipmentDto[];
}

/**
 * =========================================================================
 * 2. DTOs FOR TIPO 2: CONSTANCIA DE MANTENIMIENTO PREVENTIVO (LAPTOP)
 * =========================================================================
 */

export class GenerateMantLaptopDto {
  @IsString()
  @IsNotEmpty()
  sede!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  area!: string;

  @IsString()
  @IsNotEmpty()
  usuario!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsString()
  @IsNotEmpty()
  referencia!: string;

  @IsString()
  @IsNotEmpty()
  laptop_modelo!: string;

  @IsString()
  @IsNotEmpty()
  laptop_serie!: string;

  @IsString()
  @IsNotEmpty()
  laptop_hostname!: string;
}

/**
 * =========================================================================
 * 3. DTOs FOR TIPO 3: CONSTANCIA DE MANTENIMIENTO PREVENTIVO (DESKTOP)
 * =========================================================================
 */

export class GenerateMantDesktopDto {
  @IsString()
  @IsNotEmpty()
  sede!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  area!: string;

  @IsString()
  @IsNotEmpty()
  usuario!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsString()
  @IsNotEmpty()
  referencia!: string;

  // CPU Fija
  @IsString()
  @IsNotEmpty()
  cpu_modelo!: string;

  @IsString()
  @IsNotEmpty()
  cpu_serie!: string;

  @IsString()
  @IsNotEmpty()
  cpu_hostname!: string;

  // Monitor Fijo
  @IsString()
  @IsNotEmpty()
  monitor_marca!: string;

  @IsString()
  @IsNotEmpty()
  monitor_modelo!: string;

  @IsString()
  @IsNotEmpty()
  monitor_serie!: string;

  // Teclado Fijo
  @IsString()
  @IsNotEmpty()
  teclado_marca!: string;

  @IsString()
  @IsNotEmpty()
  teclado_modelo!: string;

  @IsString()
  @IsNotEmpty()
  teclado_serie!: string;

  // Mouse Fijo
  @IsString()
  @IsNotEmpty()
  mouse_marca!: string;

  @IsString()
  @IsNotEmpty()
  mouse_modelo!: string;

  @IsString()
  @IsNotEmpty()
  mouse_serie!: string;
}
