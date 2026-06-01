import React from "react";
import { motion } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  FileText, 
  Layers, 
  Monitor, 
  Trash, 
  Plus, 
  Trash2, 
  Download, 
  RefreshCw,
  ArrowLeft
} from "lucide-react";

interface EquipmentRow {
  id: string;
  serie: string;
  descripcion: string;
  ubicacion: string;
  estado: "OPERATIVO" | "INOPERATIVO" | "EN REPARACIÓN";
  observacion: string;
}

interface InventarioFormProps {
  sede: string;
  setSede: (v: string) => void;
  fecha: string;
  setFecha: (v: string) => void;
  motivo: string;
  setMotivo: (v: string) => void;
  referencia: string;
  setReferencia: (v: string) => void;
  equipos: EquipmentRow[];
  setEquipos: React.Dispatch<React.SetStateAction<EquipmentRow[]>>;
  isGenerating: boolean;
  onGenerate: (e: React.FormEvent) => void;
  onLoadDemo: () => void;
  onBack: () => void;
}

export const InventarioForm: React.FC<InventarioFormProps> = ({
  sede,
  setSede,
  fecha,
  setFecha,
  motivo,
  setMotivo,
  referencia,
  setReferencia,
  equipos,
  setEquipos,
  isGenerating,
  onGenerate,
  onLoadDemo,
  onBack,
}) => {

  const handleAddRow = () => {
    const newId = `row-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setEquipos((prev) => [
      ...prev,
      {
        id: newId,
        serie: "",
        descripcion: "",
        ubicacion: "",
        estado: "OPERATIVO",
        observacion: "",
      },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    setEquipos((prev) => prev.filter((row) => row.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof EquipmentRow, value: string) => {
    setEquipos((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleClearAll = () => {
    if (confirm("¿Estás seguro de que deseas vaciar toda la tabla de equipos?")) {
      setEquipos([]);
    }
  };

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
          Cargar Datos Demo de Inventario
        </button>
      </div>

      <form onSubmit={onGenerate} className="space-y-6">
        {/* Section 1: Header Metadata */}
        <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-4 mb-6">
            <Layers className="text-[#14b8a6] w-4 h-4" />
            <h2 className="text-xs font-bold tracking-wider text-[#a1a1aa] uppercase">Datos del Acta de Inventario</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                placeholder="Ej. CHIMBOTE, TRUJILLO..."
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Fecha de Registro
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
                <Briefcase className="w-3.5 h-3.5" />
                Motivo del Acta
              </label>
              <input
                type="text"
                required
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej. Inventario General, Entrega..."
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#52525b] tracking-widest uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Referencia
              </label>
              <input
                type="text"
                required
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej. CONTRATO N° 004-2023..."
                className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#14b8a6] text-sm rounded-lg px-3.5 py-2.5 text-[#e2e8f0] placeholder-[#52525b] outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Items Table List */}
        <section className="bg-[#18181b] rounded-xl border border-[#27272a] p-6 shadow-xl">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between border-b border-[#27272a] pb-4 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Monitor className="text-[#14b8a6] w-4 h-4" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#a1a1aa]">Equipos en Inventario</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  La columna de índice se calcula automáticamente según las filas ingresadas.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
              {equipos.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[44px] sm:min-h-0"
                >
                  <Trash className="w-3.5 h-3.5" />
                  Vaciar Tabla
                </button>
              )}
              
              <button
                type="button"
                onClick={handleAddRow}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-transparent border border-dashed border-[#3f3f46] text-[#a1a1aa] hover:text-[#f8fafc] hover:border-zinc-500 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[48px] sm:min-h-0 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ Añadir Nuevo Equipo</span>
              </button>
            </div>
          </div>

          {equipos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-[#27272a] rounded-xl bg-[#18181b]/30">
              <div className="p-3 bg-zinc-900 rounded-full text-zinc-400 mb-3 border border-[#27272a]">
                <Monitor className="w-8 h-8" />
              </div>
              <p className="text-zinc-300 font-medium">No hay equipos ingresados</p>
              <p className="text-zinc-500 text-xs text-center max-w-sm mt-1">
                Agrega equipos usando el botón superior o carga la plantilla de prueba al instante.
              </p>
              <div className="flex items-center gap-3 mt-4 w-full justify-center">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="px-6 py-3 bg-[#14b8a6] hover:bg-teal-400 text-[#042f2e] font-bold rounded-lg text-xs transition cursor-pointer shadow-lg shadow-teal-500/20 w-full sm:w-auto min-h-[48px] sm:min-h-0"
                >
                  Agregar Primer Equipo
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden lg:block overflow-x-auto rounded-lg border border-[#27272a]">
                <table className="min-w-full divide-y divide-[#27272a] text-left">
                  <thead className="bg-[#27272a] text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-3 py-3 w-16 text-center">Item</th>
                      <th scope="col" className="px-4 py-3 w-48">N° Serie</th>
                      <th scope="col" className="px-4 py-3">Descripción / Especificación</th>
                      <th scope="col" className="px-4 py-3 w-44">Ubicación / Oficina</th>
                      <th scope="col" className="px-4 py-3 w-44 text-center">Estado Físico</th>
                      <th scope="col" className="px-4 py-3">Observaciones</th>
                      <th scope="col" className="px-3 py-3 w-16 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] bg-[#18181b]/30 text-sm">
                    {equipos.map((row, index) => (
                      <tr key={row.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="px-3 py-4 text-center text-zinc-500 font-mono text-xs font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            value={row.serie}
                            onChange={(e) => handleUpdateRow(row.id, "serie", e.target.value)}
                            placeholder="Ej. MJ0K94MC"
                            className="w-full bg-[#09090b] border border-[#27272a] text-[#2dd4bf] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded px-2.5 py-1.5 outline-none transition uppercase font-mono font-semibold"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            value={row.descripcion}
                            onChange={(e) => handleUpdateRow(row.id, "descripcion", e.target.value)}
                            placeholder="Ej. ThinkCentre M80s Gen 3 Intel i7"
                            className="w-full bg-[#09090b] border border-[#27272a] text-[#e2e8f0] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded px-2.5 py-1.5 outline-none transition font-medium"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.ubicacion}
                            onChange={(e) => handleUpdateRow(row.id, "ubicacion", e.target.value)}
                            placeholder="Ej. CREDITOS, CAJA"
                            className="w-full bg-[#09090b] border border-[#27272a] text-[#e2e8f0] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded px-2.5 py-1.5 outline-none transition uppercase text-zinc-300"
                          />
                        </td>

                        <td className="px-4 py-3 text-center">
                          <select
                            value={row.estado}
                            onChange={(e) => handleUpdateRow(row.id, "estado", e.target.value as any)}
                            className={`w-full text-center px-2.5 py-1 text-xs font-bold rounded-full border bg-[#09090b] outline-none cursor-pointer transition ${
                              row.estado === "OPERATIVO"
                                ? "bg-[#14b8a6]/10 text-[#2dd4bf] border-[#14b8a6]/20"
                                : row.estado === "MANTENIMIENTO"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}
                          >
                            <option value="OPERATIVO" className="text-[#2dd4bf] bg-zinc-950 font-bold">OPERATIVO</option>
                            <option value="MANTENIMIENTO" className="text-amber-400 bg-zinc-950 font-bold">MANTENIMIENTO</option>
                            <option value="EN REPARACIÓN" className="text-rose-400 bg-zinc-950 font-bold">EN REPARACIÓN</option>
                          </select>
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.observacion}
                            onChange={(e) => handleUpdateRow(row.id, "observacion", e.target.value)}
                            placeholder="Ej. Sin detalles, daño severo"
                            className="w-full bg-[#09090b] border border-[#27272a] text-zinc-300 placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded px-2.5 py-1.5 outline-none transition"
                          />
                        </td>

                        <td className="px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(row.id)}
                            className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded transition cursor-pointer"
                            title="Eliminar Equipo"
                          >
                            <Trash2 className="w-4 h-4 inline-block align-middle" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="block lg:hidden space-y-4">
                {equipos.map((row, index) => (
                  <div key={row.id} className="bg-[#1c1c1e] border border-[#27272a] rounded-xl p-4 space-y-3.5 relative">
                    <div className="flex justify-between items-center border-b border-[#27272a]/50 pb-2">
                      <span className="text-xs font-mono font-bold text-[#14b8a6]">
                        EQUIPO #{String(index + 1).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg transition cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
                        title="Eliminar Equipo"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">N° Serie</label>
                        <input
                          type="text"
                          required
                          value={row.serie}
                          onChange={(e) => handleUpdateRow(row.id, "serie", e.target.value)}
                          placeholder="Ej. MJ0K94MC"
                          className="w-full bg-[#09090b] border border-[#27272a] text-[#2dd4bf] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded-lg px-3 py-2.5 outline-none transition uppercase font-mono font-semibold"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Descripción / Especificación</label>
                        <input
                          type="text"
                          required
                          value={row.descripcion}
                          onChange={(e) => handleUpdateRow(row.id, "descripcion", e.target.value)}
                          placeholder="Ej. ThinkCentre M80s Gen 3 Intel i7"
                          className="w-full bg-[#09090b] border border-[#27272a] text-[#e2e8f0] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded-lg px-3 py-2.5 outline-none transition font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Ubicación / Oficina</label>
                          <input
                            type="text"
                            value={row.ubicacion}
                            onChange={(e) => handleUpdateRow(row.id, "ubicacion", e.target.value)}
                            placeholder="Ej. CREDITOS, CAJA"
                            className="w-full bg-[#09090b] border border-[#27272a] text-[#e2e8f0] placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded-lg px-3 py-2.5 outline-none transition uppercase text-zinc-300 font-medium"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Estado Físico</label>
                          <select
                            value={row.estado}
                            onChange={(e) => handleUpdateRow(row.id, "estado", e.target.value as any)}
                            className={`w-full text-center py-2.5 text-xs font-bold rounded-lg border bg-[#09090b] outline-none cursor-pointer transition ${
                              row.estado === "OPERATIVO"
                                ? "bg-[#14b8a6]/10 text-[#2dd4bf] border-[#14b8a6]/20"
                                : row.estado === "MANTENIMIENTO"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}
                          >
                            <option value="OPERATIVO" className="text-[#2dd4bf] bg-zinc-950 font-bold">OPERATIVO</option>
                            <option value="MANTENIMIENTO" className="text-amber-400 bg-zinc-950 font-bold">MANTENIMIENTO</option>
                            <option value="EN REPARACIÓN" className="text-rose-400 bg-zinc-950 font-bold">EN REPARACIÓN</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Observaciones</label>
                        <input
                          type="text"
                          value={row.observacion}
                          onChange={(e) => handleUpdateRow(row.id, "observacion", e.target.value)}
                          placeholder="Ej. Sin detalles, daño severo"
                          className="w-full bg-[#09090b] border border-[#27272a] text-zinc-300 placeholder-[#52525b] focus:border-[#14b8a6] text-xs rounded-lg px-3 py-2.5 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Section 3: Submission Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#18181b] p-6 rounded-xl border border-[#27272a] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 rounded-lg text-[#14b8a6] hidden sm:block border border-[#27272a]">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f1f5f9]">¿Listo para descargar su acta de inventario general?</p>
              <p className="text-xs text-[#71717a]">Los datos se inyectarán en la plantilla Word en tiempo real.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#52525b]">Total Equipos</div>
              <div className="text-xl font-bold text-[#f1f5f9] tracking-tight">{String(equipos.length).padStart(2, "0")}</div>
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
                  <span>Generar Acta (.docx)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
