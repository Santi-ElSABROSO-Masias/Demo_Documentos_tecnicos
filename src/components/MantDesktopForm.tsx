import React from "react";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  FileText, 
  Layers, 
  Monitor, 
  User, 
  Download, 
  RefreshCw,
  Award,
  Cpu,
  Keyboard,
  MousePointer
} from "lucide-react";

interface MantDesktopFormProps {
  sede: string;
  setSede: (v: string) => void;
  fecha: string;
  setFecha: (v: string) => void;
  area: string;
  setArea: (v: string) => void;
  usuario: string;
  setUsuario: (v: string) => void;
  motivo: string;
  setMotivo: (v: string) => void;
  referencia: string;
  setReferencia: (v: string) => void;
  // CPU
  cpu_modelo: string;
  setCpuModelo: (v: string) => void;
  cpu_serie: string;
  setCpuSerie: (v: string) => void;
  cpu_hostname: string;
  setCpuHostname: (v: string) => void;
  // Monitor
  monitor_marca: string;
  setMonitorMarca: (v: string) => void;
  monitor_modelo: string;
  setMonitorModelo: (v: string) => void;
  monitor_serie: string;
  setMonitorSerie: (v: string) => void;
  // Teclado
  teclado_marca: string;
  setTecladoMarca: (v: string) => void;
  teclado_modelo: string;
  setTecladoModelo: (v: string) => void;
  teclado_serie: string;
  setTecladoSerie: (v: string) => void;
  // Mouse
  mouse_marca: string;
  setMouseMarca: (v: string) => void;
  mouse_modelo: string;
  setMouseModelo: (v: string) => void;
  mouse_serie: string;
  setMouseSerie: (v: string) => void;
  isGenerating: boolean;
  onGenerate: (e: React.FormEvent) => void;
  onLoadDemo: () => void;
}

export const MantDesktopForm: React.FC<MantDesktopFormProps> = ({
  sede,
  setSede,
  fecha,
  setFecha,
  area,
  setArea,
  usuario,
  setUsuario,
  motivo,
  setMotivo,
  referencia,
  setReferencia,
  cpu_modelo,
  setCpuModelo,
  cpu_serie,
  setCpuSerie,
  cpu_hostname,
  setCpuHostname,
  monitor_marca,
  setMonitorMarca,
  monitor_modelo,
  setMonitorModelo,
  monitor_serie,
  setMonitorSerie,
  teclado_marca,
  setTecladoMarca,
  teclado_modelo,
  setTecladoModelo,
  teclado_serie,
  setTecladoSerie,
  mouse_marca,
  setMouseMarca,
  mouse_modelo,
  setMouseModelo,
  mouse_serie,
  setMouseSerie,
  isGenerating,
  onGenerate,
  onLoadDemo,
}) => {
  return (
    <div className="space-y-6">
      {/* Action utilities bar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onLoadDemo}
          className="text-xs text-teal-400 hover:text-teal-300 font-semibold px-3 py-1.5 bg-[#14b8a6]/5 rounded border border-[#14b8a6]/20 transition flex items-center gap-1 cursor-pointer"
        >
          Cargar Datos Demo de Desktop
        </button>
      </div>

      <form onSubmit={onGenerate} className="space-y-6">
        {/* Section 1: Header Metadata */}
        <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-6">
            <Layers className="text-[#14b8a6] w-4 h-4" />
            <h2 className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">Datos Generales del Mantenimiento (Desktop)</h2>
          </div>

          <div className="grid grid-[#18181b] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Sede Operativa
              </label>
              <input
                type="text"
                required
                value={sede}
                onChange={(e) => setSede(e.target.value)}
                placeholder="Ej. TRUJILLO CENTRO"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Fecha
              </label>
              <input
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Área Solicitante
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ej. CREDITOS, CAJA CENTRAL..."
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Usuario Asignado
              </label>
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ej. MARIA CARMEN ROJAS"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Motivo / Tipo Acta
              </label>
              <input
                type="text"
                required
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej. Mantenimiento Preventivo"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Referencia de Contrato / Convenio
              </label>
              <input
                type="text"
                required
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej. CONTRATO N° 004-2023-CMAC-T"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Detailed Hardware Configuration (CPU + Periféricos) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CPU Setup Block */}
          <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-2">
              <Cpu className="text-[#14b8a6] w-4.5 h-4.5" />
              <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Unidad Central (CPU)</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Modelo de Procesador / CPU</label>
              <input
                type="text"
                required
                value={cpu_modelo}
                onChange={(e) => setCpuModelo(e.target.value)}
                placeholder="Ej. ThinkCentre M70s Core i5 12va"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">N° Serie de CPU</label>
                <input
                  type="text"
                  required
                  value={cpu_serie}
                  onChange={(e) => setCpuSerie(e.target.value)}
                  placeholder="Ej. S4KP329F"
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#2dd4bf] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Hostname en Red</label>
                <input
                  type="text"
                  required
                  value={cpu_hostname}
                  onChange={(e) => setCpuHostname(e.target.value)}
                  placeholder="Ej. PC-CRED-12"
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-zinc-300 placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
                />
              </div>
            </div>
          </section>

          {/* Monitor Setup Block */}
          <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-2">
              <Monitor className="text-[#14b8a6] w-4.5 h-4.5" />
              <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Pantalla / Monitor</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Marca</label>
                <input
                  type="text"
                  required
                  value={monitor_marca}
                  onChange={(e) => setMonitorMarca(e.target.value)}
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Modelo de Monitor</label>
                <input
                  type="text"
                  required
                  value={monitor_modelo}
                  onChange={(e) => setMonitorModelo(e.target.value)}
                  placeholder="Ej. ThinkVision E22-28"
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">N° Serie del Monitor</label>
              <input
                type="text"
                required
                value={monitor_serie}
                onChange={(e) => setMonitorSerie(e.target.value)}
                placeholder="Ej. VYF37391"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#2dd4bf] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
              />
            </div>
          </section>

          {/* Teclado Setup Block */}
          <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-2">
              <Keyboard className="text-[#14b8a6] w-4.5 h-4.5" />
              <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Teclado Corporativo</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Marca</label>
                <input
                  type="text"
                  required
                  value={teclado_marca}
                  onChange={(e) => setTecladoMarca(e.target.value)}
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Modelo Teclado</label>
                <input
                  type="text"
                  required
                  value={teclado_modelo}
                  onChange={(e) => setTecladoModelo(e.target.value)}
                  placeholder="Ej. Preferred Pro II"
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">N° Serie del Teclado</label>
              <input
                type="text"
                required
                value={teclado_serie}
                onChange={(e) => setTecladoSerie(e.target.value)}
                placeholder="Ej. SN-TECLA-4932"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#2dd4bf] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
              />
            </div>
          </section>

          {/* Mouse Setup Block */}
          <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-2">
              <MousePointer className="text-[#14b8a6] w-4.5 h-4.5" />
              <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Mouse Óptico</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Marca</label>
                <input
                  type="text"
                  required
                  value={mouse_marca}
                  onChange={(e) => setMouseMarca(e.target.value)}
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Modelo Mouse</label>
                <input
                  type="text"
                  required
                  value={mouse_modelo}
                  onChange={(e) => setMouseModelo(e.target.value)}
                  placeholder="Ej. Lenovo USB Optical Mouse"
                  className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">N° Serie de Mouse</label>
              <input
                type="text"
                required
                value={mouse_serie}
                onChange={(e) => setMouseSerie(e.target.value)}
                placeholder="Ej. SN-MOUSE-9938"
                className="bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#2dd4bf] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
              />
            </div>
          </section>
        </div>

        {/* Section 3: Submission Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#18181b] p-6 rounded-xl border border-[#27272a] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 rounded-lg text-[#14b8a6] hidden sm:block border border-[#27272a]">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f1f5f9]">¿Listo para descargar su acta para estación Desktop?</p>
              <p className="text-xs text-[#71717a]">Los datos se inyectarán en la plantilla Word en tiempo real.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 w-full sm:w-auto text-sm cursor-pointer shadow-lg uppercase ${
              isGenerating
                ? "bg-[#14b8a6]/50 text-[#042f2e]/60 border border-[#14b8a6]/20 cursor-not-allowed"
                : "bg-[#14b8a6] text-[#042f2e] hover:bg-teal-400 hover:-translate-y-0.5 shadow-[#14b8a6]/20 active:translate-y-0"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generando Documento...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generar Constancia Desktop (.docx)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
