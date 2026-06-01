import React from "react";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  FileText, 
  Layers, 
  Laptop, 
  User, 
  Download, 
  RefreshCw,
  Award,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

interface MantLaptopFormProps {
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
  laptop_modelo: string;
  setLaptopModelo: (v: string) => void;
  laptop_serie: string;
  setLaptopSerie: (v: string) => void;
  laptop_hostname: string;
  setLaptopHostname: (v: string) => void;
  isGenerating: boolean;
  onGenerate: (e: React.FormEvent) => void;
  onLoadDemo: () => void;
  onBack: () => void;
}

export const MantLaptopForm: React.FC<MantLaptopFormProps> = ({
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
  laptop_modelo,
  setLaptopModelo,
  laptop_serie,
  setLaptopSerie,
  laptop_hostname,
  setLaptopHostname,
  isGenerating,
  onGenerate,
  onLoadDemo,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      {/* Volver button and Action utilities bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-[#27272a]/40 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#14b8a6] transition cursor-pointer min-h-[44px] px-3 -ml-3 rounded-lg hover:bg-zinc-900/40 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Selector</span>
        </button>
        
        <button
          type="button"
          onClick={onLoadDemo}
          className="text-xs text-teal-400 hover:text-teal-300 font-semibold px-3 py-1.5 bg-[#14b8a6]/5 rounded border border-[#14b8a6]/20 transition flex items-center justify-center gap-1 cursor-pointer min-h-[44px] sm:min-h-0 w-full sm:w-auto"
        >
          Cargar Datos Demo de Laptop
        </button>
      </div>

      <form onSubmit={onGenerate} className="space-y-6">
        {/* Section 1: Header Metadata */}
        <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-6">
            <Layers className="text-[#14b8a6] w-4 h-4" />
            <h2 className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">Datos Generales del Mantenimiento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                placeholder="Ej. TRUJILLO CENTRAL"
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
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
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] outline-none transition"
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
                placeholder="Ej. RECURSOS HUMANOS, OPERACIONES..."
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
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
                placeholder="Ej. JUAN PEREZ RUIZ"
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Motivo / Tipo Control
              </label>
              <input
                type="text"
                required
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej. Mantenimiento Preventivo"
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Referencia de Contrato / Orden
              </label>
              <input
                type="text"
                required
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej. CONTRATO N° 004-2023-CMAC-T"
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Fixed laptop specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-6">
                <Laptop className="text-[#14b8a6] w-4 h-4" />
                <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Especificación Física de Laptop</h2>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Modelo de Laptop</label>
                  <input
                    type="text"
                    required
                    value={laptop_modelo}
                    onChange={(e) => setLaptopModelo(e.target.value)}
                    placeholder="Ej. Lenovo ThinkPad L14 Gen 4"
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Número de Serie (S/N)</label>
                  <input
                    type="text"
                    required
                    value={laptop_serie}
                    onChange={(e) => setLaptopSerie(e.target.value)}
                    placeholder="Ej. PF4AK39M"
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#2dd4bf] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase">Hostname Asociado</label>
                  <input
                    type="text"
                    required
                    value={laptop_hostname}
                    onChange={(e) => setLaptopHostname(e.target.value)}
                    placeholder="Ej. LAP-HR-04"
                    className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition font-mono font-semibold uppercase text-zinc-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Checklist preview card */}
          <section className="bg-[#18181b]/60 rounded-xl border border-[#27272a] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-4">
                <Award className="text-[#14b8a6] w-4 h-4" />
                <h2 className="text-sm font-bold tracking-wider text-[#a1a1aa] uppercase">Checklist del Documento (Fijo)</h2>
              </div>
              <p className="text-xs text-[#71717a] mb-4 leading-relaxed">
                El protocolo estándar de mantenimiento preventivo CMAC se inyecta por defecto en su acta de salida final. No requiere ingreso manual:
              </p>
              <div className="space-y-2.5 text-xs text-[#e2e8f0]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                  <span>Desarmado integral y soplado / remoción de polvo.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                  <span>Limpieza profunda de coolers de ventilación.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                  <span>Cambio de grasa refrigerante o pasta térmica en la CPU.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                  <span>Sanetizado del teclado, descansamanos y panel LCD.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14b8a6]" />
                  <span>Auditoría de espacio e índice de disco y caché.</span>
                </div>
              </div>
            </div>

            <div className="bg-[#14b8a6]/5 rounded-lg border border-[#14b8a6]/15 p-3.5 mt-6 text-center">
              <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">Certificado de Soporte TI</span>
            </div>
          </section>
        </div>

        {/* Section 3: Submission Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#18181b] p-6 rounded-xl border border-[#27272a] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 rounded-lg text-[#14b8a6] hidden sm:block border border-[#27272a]">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f1f5f9]">¿Listo para descargar su acta de mantenimiento para laptop?</p>
              <p className="text-xs text-[#71717a]">Los datos se inyectarán en la plantilla Word en tiempo real.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 w-full sm:w-auto text-base sm:text-sm cursor-pointer shadow-lg uppercase min-h-[48px] sm:min-h-0 ${
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
                <span>Generar Constancia (.docx)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
