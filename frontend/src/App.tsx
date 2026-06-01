/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Settings,
  Layers,
  FileCheck2,
  Laptop,
  Monitor,
  Cpu,
  MousePointer,
  Keyboard
} from "lucide-react";

// Import custom form components
import { InventarioForm } from "./components/InventarioForm.tsx";
import { MantLaptopForm } from "./components/MantLaptopForm.tsx";
import { MantDesktopForm } from "./components/MantDesktopForm.tsx";

// Share Row types for compilation
interface EquipmentRow {
  id: string;
  serie: string;
  descripcion: string;
  ubicacion: string;
  estado: "OPERATIVO" | "INOPERATIVO" | "EN REPARACIÓN";
  observacion: string;
}

const DEMO_INVENTARIO_ROWS: EquipmentRow[] = [
  {
    id: "demo-1",
    serie: "MJ0K94MC",
    descripcion: "ThinkCentre M80s Gen 3 Intel i7 16GB RAM",
    ubicacion: "CREDITOS",
    estado: "OPERATIVO",
    observacion: "Actualizado a Windows 11 Enterprise",
  },
  {
    id: "demo-2",
    serie: "VYF37391",
    descripcion: "ThinkVision E22-28 Monitor 21.5\"",
    ubicacion: "CREDITOS",
    estado: "OPERATIVO",
    observacion: "Panel impecable",
  },
  {
    id: "demo-3",
    serie: "SN-934892",
    descripcion: "Impresora HP LaserJet Pro M404dw",
    ubicacion: "CONTABILIDAD",
    estado: "MANTENIMIENTO" as any, // mapping to required option format
    observacion: "Lubricación de bandejas de papel realizada",
  },
  {
    id: "demo-4",
    serie: "SN-883492",
    descripcion: "UPS APC Back-UPS SMT1500C",
    ubicacion: "SALA TI",
    estado: "INOPERATIVO",
    observacion: "Batería descargada, requiere recambio técnico",
  }
];

export default function App() {
  // Primary Navigation State
  // null = Selector Home; 1 = Inventario General; 2 = Laptop; 3 = Desktop
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  // Loading & Global Notifications
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info" | null;
    message: string | null;
  }>({ type: null, message: null });

  // Help alert helper
  const showNotice = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((prev) => {
        if (prev.message === message) {
          return { type: null, message: null };
        }
        return prev;
      });
    }, 6000);
  };

  // Helper date initializer
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // ==========================================
  // STATE STORE FOR TIPO 1: INVENTARIO GENERAL
  // ==========================================
  const [sede1, setSede1] = useState("CHIMBOTE");
  const [fecha1, setFecha1] = useState(getTodayDate());
  const [motivo1, setMotivo1] = useState("Inventario General de Control");
  const [referencia1, setReferencia1] = useState("CONTRATO N° 004-2023-CMAC-T");
  const [equipos, setEquipos] = useState<EquipmentRow[]>([
    {
      id: "row-1",
      serie: "MJ0K94MC",
      descripcion: "ThinkCentre M80s Gen 3",
      ubicacion: "CREDITOS",
      estado: "OPERATIVO",
      observacion: "",
    },
    {
      id: "row-2",
      serie: "VYF37391",
      descripcion: "ThinkVision E22-28",
      ubicacion: "CREDITOS",
      estado: "OPERATIVO",
      observacion: "",
    }
  ]);

  const handleLoadDemoInventario = () => {
    setSede1("CHIMBOTE SECTOR CENTRAL");
    setMotivo1("Inventario Anual de Bienes Tecnológicos");
    setReferencia1("AUDITORIA INTERNA TI-2026");
    setEquipos(DEMO_INVENTARIO_ROWS);
    showNotice("success", "¡Datos demo de Inventario General cargados con éxito!");
  };

  const handleGenerateInventario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (equipos.length === 0) {
      showNotice("error", "Error: Debes ingresar al menos un equipo en la tabla.");
      return;
    }

    setIsGenerating(true);
    setNotification({ type: "info", message: "Procesando plantilla de Inventario..." });

    try {
      let friendlyDate = fecha1;
      if (fecha1.includes("-")) {
        const [yyyy, mm, dd] = fecha1.split("-");
        friendlyDate = `${dd}/${mm}/${yyyy}`;
      }

      const payload = {
        sede: sede1.trim().toUpperCase() || "SIN ESPECIFICAR",
        fecha: friendlyDate,
        motivo: motivo1.trim() || "Inventario General",
        referencia: referencia1.trim() || "N/A",
        equipos: equipos.map((eq, idx) => ({
          item: idx + 1,
          serie: eq.serie.trim(),
          descripcion: eq.descripcion.trim(),
          ubicacion: eq.ubicacion.trim() || "S/D",
          estado: eq.estado === ("MANTENIMIENTO" as any) ? "INOPERATIVO" : eq.estado, // map to required types if mismatch
          observacion: eq.observacion.trim() || "NINGUNA"
        }))
      };

      const response = await fetch("/api/documents/generate-inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Falla de compilación remota del documento .docx");

      const blob = await response.blob();
      triggerDownload(blob, `acta_inventario_${payload.sede.replace(/\s+/g, "_")}_${friendlyDate.replace(/\//g, "-")}.docx`);
      showNotice("success", "¡Acta de Inventario General generada y descargada con éxito!");
    } catch (err: any) {
      showNotice("error", err.message || "Error al generar documento.");
    } finally {
      setIsGenerating(false);
    }
  };


  // ==========================================
  // STATE STORE FOR TIPO 2: MANTENIMIENTO LAPTOP
  // ==========================================
  const [sede2, setSede2] = useState("TRUJILLO PRINCIPAL");
  const [fecha2, setFecha2] = useState(getTodayDate());
  const [area2, setArea2] = useState("RECURSOS HUMANOS");
  const [usuario2, setUsuario2] = useState("JUAN PEREZ SALINAS");
  const [motivo2, setMotivo2] = useState("Mantenimiento Preventivo");
  const [referencia2, setReferencia2] = useState("CONTRATO N° 004-2023-CMAC-T");
  
  const [laptopModelo, setLaptopModelo] = useState("Lenovo ThinkPad L14 Gen 4");
  const [laptopSerie, setLaptopSerie] = useState("PF4JK92B");
  const [laptopHostname, setLaptopHostname] = useState("LAP-RRHH-02");

  const handleLoadDemoLaptop = () => {
    setSede2("TRUJILLO SEDE ALTO TRUJILLO");
    setArea2("OPERACIONES DE CRÉDITO");
    setUsuario2("CARLOS TORRES MENDOZA");
    setMotivo2("Mantenimiento Preventivo Trimestral");
    setReferencia2("CMAC-ORD-2026-904");
    setLaptopModelo("Lenovo ThinkPad P15 Gen 2 i9");
    setLaptopSerie("PF3AK49M");
    setLaptopHostname("LAP-CRED-H3");
    showNotice("success", "¡Datos demo de Laptop cargados con éxito!");
  };

  const handleGenerateLaptop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setNotification({ type: "info", message: "Mandando especificaciones del equipo al compilador Laptop..." });

    try {
      let friendlyDate = fecha2;
      if (fecha2.includes("-")) {
        const [yyyy, mm, dd] = fecha2.split("-");
        friendlyDate = `${dd}/${mm}/${yyyy}`;
      }

      const payload = {
        sede: sede2,
        fecha: friendlyDate,
        area: area2,
        usuario: usuario2,
        motivo: motivo2,
        referencia: referencia2,
        laptop_modelo: laptopModelo,
        laptop_serie: laptopSerie,
        laptop_hostname: laptopHostname
      };

      const response = await fetch("/api/documents/generate-mant-laptop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Falla de compilación de Constancia Laptop.");

      const blob = await response.blob();
      triggerDownload(blob, `acta_laptop_${sede2.replace(/\s+/g, "_")}_${friendlyDate.replace(/\//g, "-")}.docx`);
      showNotice("success", "¡Constancia de Mantenimiento Laptop descargada!");
    } catch (err: any) {
      showNotice("error", err.message || "Error al generar constancia.");
    } finally {
      setIsGenerating(false);
    }
  };


  // ==========================================
  // STATE STORE FOR TIPO 3: MANTENIMIENTO DESKTOP
  // ==========================================
  const [sede3, setSede3] = useState("TRUJILLO SEDE ALTO");
  const [fecha3, setFecha3] = useState(getTodayDate());
  const [area3, setArea3] = useState("FINANZAS");
  const [usuario3, setUsuario3] = useState("ESPERANZA GOMEZ VEGA");
  const [motivo3, setMotivo3] = useState("Mantenimiento Preventivo");
  const [referencia3, setReferencia3] = useState("CONTRATO N° 004-2023-CMAC-T");

  // CPU
  const [cpuModelo, setCpuModelo] = useState("ThinkCentre M70s Intel Core i5");
  const [cpuSerie, setCpuSerie] = useState("S4KP329F");
  const [cpuHostname, setCpuHostname] = useState("PC-FIN-08");

  // Monitor
  const [monitorMarca, setMonitorMarca] = useState("LENOVO");
  const [monitorModelo, setMonitorModelo] = useState("ThinkVision E22-28");
  const [monitorSerie, setMonitorSerie] = useState("VYF37391");

  // Teclado
  const [tecladoMarca, setTecladoMarca] = useState("LENOVO");
  const [tecladoModelo, setTecladoModelo] = useState("Preferred Pro II USB");
  const [tecladoSerie, setTecladoSerie] = useState("SN-KEY-8832");

  // Mouse
  const [mouseMarca, setMouseMarca] = useState("LENOVO");
  const [mouseModelo, setMouseModelo] = useState("USB Optical Mouse");
  const [mouseSerie, setMouseSerie] = useState("SN-MSE-1132");

  const handleLoadDemoDesktop = () => {
    setSede3("TRUJILLO SEDE PRINCIPAL");
    setArea3("CONTABILIDAD Y FINANZAS");
    setUsuario3("PATRICIA DELGADO SOSA");
    setMotivo3("Mantenimiento Preventivo Completo");
    setReferencia3("CONTRATO N° 004-2023-CMAC-T");
    
    setCpuModelo("ThinkCentre M80s Intel i7 Pro");
    setCpuSerie("MJ0K11AL");
    setCpuHostname("PC-CON-22");

    setMonitorMarca("LENOVO");
    setMonitorModelo("ThinkVision T24i-20 IPS");
    setMonitorSerie("VYF90832");

    setTecladoMarca("LENOVO");
    setTecladoModelo("Mecánico Trackpoint Pro");
    setTecladoSerie("KB-2026-LNV");

    setMouseMarca("LENOVO");
    setMouseModelo("Essential Mouse Pro");
    setMouseSerie("MS-V5421");
    showNotice("success", "¡Datos demo corporativos para Desktop inyectados!");
  };

  const handleGenerateDesktop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setNotification({ type: "info", message: "Conectando al microservicio para armar estructura Desktop XML..." });

    try {
      let friendlyDate = fecha3;
      if (fecha3.includes("-")) {
        const [yyyy, mm, dd] = fecha3.split("-");
        friendlyDate = `${dd}/${mm}/${yyyy}`;
      }

      const payload = {
        sede: sede3,
        fecha: friendlyDate,
        area: area3,
        usuario: usuario3,
        motivo: motivo3,
        referencia: referencia3,
        cpu_modelo: cpuModelo,
        cpu_serie: cpuSerie,
        cpu_hostname: cpuHostname,
        monitor_marca: monitorMarca,
        monitor_modelo: monitorModelo,
        monitor_serie: monitorSerie,
        teclado_marca: tecladoMarca,
        teclado_modelo: tecladoModelo,
        teclado_serie: tecladoSerie,
        mouse_marca: mouseMarca,
        mouse_modelo: mouseModelo,
        mouse_serie: mouseSerie
      };

      const response = await fetch("/api/documents/generate-mant-desktop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Falla al generar constancia física Desktop remota.");

      const blob = await response.blob();
      triggerDownload(blob, `acta_desktop_${sede3.replace(/\s+/g, "_")}_${friendlyDate.replace(/\//g, "-")}.docx`);
      showNotice("success", "¡Acta Word .docx de Desktop descargada correctamente!");
    } catch (err: any) {
      showNotice("error", err.message || "Error al generar acta.");
    } finally {
      setIsGenerating(false);
    }
  };


  // ==========================================
  // HELPER DOWNLOAD TRIGGER
  // ==========================================
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", filename);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc] font-sans antialiased pb-20 selection:bg-[#14b8a6] selection:text-[#042f2e]">
      {/* Soft gradient banner */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#14b8a6]/5 via-[#14b8a6]/2 to-transparent pointer-events-none" />

      {/* Main Header */}
      <header className="relative max-w-7xl mx-auto px-4 pt-12 pb-8 sm:px-6 lg:px-8 border-b border-[#27272a]/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] rounded-xl shrink-0 flex items-center justify-center text-[#042f2e] shadow-lg shadow-[#14b8a6]/20 font-bold border border-[#2dd4bf]/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#14b8a6]/10 text-[#2dd4bf] border border-[#14b8a6]/20 rounded-full uppercase tracking-wider">
                  Módulo Corporativo
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">CMAC TRUJILLO v3.0</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f1f5f9] mt-0.5">
                Generador de Actas Técnicas
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 max-w-2xl">
                Infraestructura TI y Soporte Técnico — Automatización integral de actas Word de inventarios y mantenimiento preventivo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded-lg text-xs text-teal-400">
              <span className="w-1.5 h-1.5 bg-[#14b8a6] rounded-full animate-ping" />
              <span>Servidor Activo</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Banner Alert Notification */}
        <AnimatePresence mode="popLayout">
          {notification.message && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-6"
            >
              <div
                className={`flex gap-3 items-start p-4 rounded-xl border ${
                  notification.type === "success"
                    ? "bg-[#0c2e2a]/50 border-[#14b8a6]/30 text-teal-200"
                    : notification.type === "error"
                    ? "bg-rose-950/40 border-rose-500/30 text-rose-200"
                    : "bg-teal-950/40 border-[#14b8a6]/20 text-[#2dd4bf]"
                }`}
              >
                {notification.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5" />}
                {notification.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                {notification.type === "info" && <RefreshCw className="w-5 h-5 text-[#2dd4bf] animate-spin shrink-0 mt-0.5" />}
                
                <div className="flex-1 text-sm">
                  <p className="font-bold">
                    {notification.type === "success" ? "Operación Correcta" : notification.type === "error" ? "Inconveniente Detectado" : "Procesando Estructura"}
                  </p>
                  <p className="text-xs opacity-90 mt-0.5">{notification.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotification({ type: null, message: null })}
                  className="text-zinc-400 hover:text-zinc-200 text-xs shrink-0 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Route Switching Canvas */}
        <AnimatePresence mode="wait">
          {selectedDoc === null ? (
            /* ==========================================
               SELECTOR SCREEN (HOME)
               ========================================== */
            <motion.div
              key="selector-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="text-center py-4">
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Selección de Documento
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#f1f5f9] mt-3">
                  ¿Qué tipo de acta técnica desea emitir hoy?
                </h2>
                <p className="text-zinc-500 text-sm mt-1 max-w-xl mx-auto">
                  Seleccione una de las siguientes opciones corporativas habilitadas. Se cargará el formulario adaptado al instante.
                </p>
              </div>

              {/* Document Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Type 1: Inventario General */}
                <button
                  onClick={() => setSelectedDoc(1)}
                  className="bg-[#18181b] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-[#14b8a6]/5 hover:shadow-xl rounded-xl p-6 text-left group transition-all duration-300 flex flex-col justify-between h-64 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#14b8a6]"
                >
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg group-hover:bg-[#14b8a6]/10 text-zinc-400 group-hover:text-[#14b8a6] flex items-center justify-center transition border border-[#27272a] group-hover:border-[#14b8a6]/20">
                    <Layers className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mt-4">Acta Primaria</h3>
                    <h4 className="text-lg font-bold text-[#f8fafc] mt-1">Inventario General</h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Control masivo de bienes informáticos en una sede. Soporta inserción de múltiples registros con autonumerado y descripción.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#14b8a6] font-semibold mt-4">
                    <span>Abrir Formulario</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>

                {/* Type 2: Laptop Maintenance */}
                <button
                  onClick={() => setSelectedDoc(2)}
                  className="bg-[#18181b] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-[#14b8a6]/5 hover:shadow-xl rounded-xl p-6 text-left group transition-all duration-300 flex flex-col justify-between h-64 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#14b8a6]"
                >
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg group-hover:bg-[#14b8a6]/10 text-zinc-400 group-hover:text-[#14b8a6] flex items-center justify-center transition border border-[#27272a] group-hover:border-[#14b8a6]/20">
                    <Laptop className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mt-4">Constancia Individual</h3>
                    <h4 className="text-lg font-bold text-[#f8fafc] mt-1">Mantenimiento Laptop</h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Ficha de control de mantenimiento para equipos portátiles. Incluye especificaciones únicas del equipo y checklist técnico.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#14b8a6] font-semibold mt-4">
                    <span>Abrir Formulario</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>

                {/* Type 3: Desktop Maintenance */}
                <button
                  onClick={() => setSelectedDoc(3)}
                  className="bg-[#18181b] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-[#14b8a6]/5 hover:shadow-xl rounded-xl p-6 text-left group transition-all duration-300 flex flex-col justify-between h-64 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#14b8a6]"
                >
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg group-hover:bg-[#14b8a6]/10 text-zinc-400 group-hover:text-[#14b8a6] flex items-center justify-center transition border border-[#27272a] group-hover:border-[#14b8a6]/20">
                    <Monitor className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mt-4">Ficha Estación Fija</h3>
                    <h4 className="text-lg font-bold text-[#f8fafc] mt-1">Mantenimiento Desktop</h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Formulario avanzado para computadoras de escritorio. Mapea CPU y todos sus periféricos autorizados (Monitor, Teclado, Mouse).
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#14b8a6] font-semibold mt-4">
                    <span>Abrir Formulario</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              </div>

              {/* Informative Grid */}
              <div className="bg-[#18181b]/40 rounded-xl border border-[#27272a]/60 p-6 flex items-center gap-4">
                <Settings className="w-6 h-6 text-[#14b8a6] shrink-0" />
                <div className="text-xs text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-200 block mb-1">Nota del Administrador TI:</span>
                  Todas las plantillas .docx generadas siguen exactamente el formato legal de CMAC TRUJILLO. El servidor utiliza el compilador seguro PizZip para estructurar los esquemas XML e inyectar sus parámetros variables.
                </div>
              </div>
            </motion.div>
          ) : (
            /* ==========================================
               ACTIVE FORM CANVAS
               ========================================== */
            <motion.div
              key="active-form-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              {/* Back navigation & form indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#27272a]/40 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-teal-400 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Volver al Selector Principal</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    {selectedDoc === 1 && "Inventario General de Bienes"}
                    {selectedDoc === 2 && "Mantenimiento Preventivo (Laptop)"}
                    {selectedDoc === 3 && "Mantenimiento Preventivo (Desktop)"}
                  </span>
                </div>
              </div>

              {/* Map dynamically */}
              {selectedDoc === 1 && (
                <InventarioForm
                  sede={sede1}
                  setSede={setSede1}
                  fecha={fecha1}
                  setFecha={setFecha1}
                  motivo={motivo1}
                  setMotivo={setMotivo1}
                  referencia={referencia1}
                  setReferencia={setReferencia1}
                  equipos={equipos}
                  setEquipos={setEquipos}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerateInventario}
                  onLoadDemo={handleLoadDemoInventario}
                />
              )}

              {selectedDoc === 2 && (
                <MantLaptopForm
                  sede={sede2}
                  setSede={setSede2}
                  fecha={fecha2}
                  setFecha={setFecha2}
                  area={area2}
                  setArea={setArea2}
                  usuario={usuario2}
                  setUsuario={setUsuario2}
                  motivo={motivo2}
                  setMotivo={setMotivo2}
                  referencia={referencia2}
                  setReferencia={setReferencia2}
                  laptop_modelo={laptopModelo}
                  setLaptopModelo={setLaptopModelo}
                  laptop_serie={laptopSerie}
                  setLaptopSerie={setLaptopSerie}
                  laptop_hostname={laptopHostname}
                  setLaptopHostname={setLaptopHostname}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerateLaptop}
                  onLoadDemo={handleLoadDemoLaptop}
                />
              )}

              {selectedDoc === 3 && (
                <MantDesktopForm
                  sede={sede3}
                  setSede={setSede3}
                  fecha={fecha3}
                  setFecha={setFecha3}
                  area={area3}
                  setArea={setArea3}
                  usuario={usuario3}
                  setUsuario={setUsuario3}
                  motivo={motivo3}
                  setMotivo={setMotivo3}
                  referencia={referencia3}
                  setReferencia={setReferencia3}
                  cpu_modelo={cpuModelo}
                  setCpuModelo={setCpuModelo}
                  cpu_serie={cpuSerie}
                  setCpuSerie={setCpuSerie}
                  cpu_hostname={cpuHostname}
                  setCpuHostname={setCpuHostname}
                  monitor_marca={monitorMarca}
                  setMonitorMarca={setMonitorMarca}
                  monitor_modelo={monitorModelo}
                  setMonitorModelo={setMonitorModelo}
                  monitor_serie={monitorSerie}
                  setMonitorSerie={setMonitorSerie}
                  teclado_marca={tecladoMarca}
                  setTecladoMarca={setTecladoMarca}
                  teclado_modelo={tecladoModelo}
                  setTecladoModelo={setTecladoModelo}
                  teclado_serie={tecladoSerie}
                  setTecladoSerie={setTecladoSerie}
                  mouse_marca={mouseMarca}
                  setMouseMarca={setMouseMarca}
                  mouse_modelo={mouseModelo}
                  setMouseModelo={setMouseModelo}
                  mouse_serie={mouseSerie}
                  setMouseSerie={setMouseSerie}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerateDesktop}
                  onLoadDemo={handleLoadDemoDesktop}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Outer Branding Stamp */}
        <footer className="mt-16 text-center text-zinc-600 text-xs">
          <div>© {new Date().getFullYear()} Caja Municipal de Ahorro y Crédito de Chimbote & Trujillo.</div>
          <div className="mt-1 font-mono text-[10px]">Soporte TI — Generador XML de Plantillas Estructuradas</div>
        </footer>
      </main>
    </div>
  );
}
