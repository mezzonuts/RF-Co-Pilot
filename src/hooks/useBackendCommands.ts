import { useState, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/core'

const isTauri = typeof window !== 'undefined' && Boolean((window as any).__TAURI_INTERNALS__ || (window as any).__TAURI__)

// ── DB ──
export function useDbCommands() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const insertCell = useCallback(async (cellData: Record<string, unknown>) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('db_insert_cell', { cellData })
      }
      return { success: true, cell: cellData }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  const queryByBand = useCallback(async (band: string) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('db_query_cells_by_band', { band }) as { cells: unknown[] }
      }
      return {
        cells: [
          { cell_id: 'JKT_1023_2', band: band || 'B3', frequency: 1800, pci: 148, rsrp: -92, azimuth: 120, tilt: 3 },
          { cell_id: 'JKT_1018_1', band: band || 'B3', frequency: 1800, pci: 148, rsrp: -85, azimuth: 0, tilt: 4 },
          { cell_id: 'JKT_1015_1', band: band || 'B1', frequency: 2100, pci: 210, rsrp: -89, azimuth: 240, tilt: 2 },
        ]
      }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  const insertDtLogs = useCallback(async (logs: Record<string, unknown>[]) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('db_insert_dt_logs', { logs }) as { count: number }
      }
      return { count: logs.length }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, insertCell, queryByBand, insertDtLogs }
}

// ── Qdrant ──
export function useQdrantSearch() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchSimilarKpi = useCallback(async (kpiSample: Record<string, unknown>, limit = 5) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('qdrant_search_similar_kpi', { kpiSample, limit }) as { results: unknown[] }
      }
      const res = await fetch(`/api/vault/search?q=${encodeURIComponent(String(kpiSample.cell || 'RSRP'))}&limit=${limit}`)
      const j = await res.json()
      return { results: Array.isArray(j) ? j : j?.results || [] }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, searchSimilarKpi }
}

// ── Reporting ──
export function useReporting() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportReport = useCallback(async (outputPath: string, format: 'pdf' | 'excel', kpiSummary?: Record<string, unknown>) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('export_report', { outputPath, format, kpiSummary }) as { path: string }
      }
      const endpoint = format === 'excel' ? '/api/export/excel' : '/api/export/pptx'
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`Export failed: HTTP ${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = format === 'excel' ? 'Cluster_C1_KPI.xlsx' : 'Cluster_C1_Report.pptx'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => { URL.revokeObjectURL(url); a.remove() }, 1000)
      return { path: a.download }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, exportReport }
}

// ── QGIS ──
export function useQgisExport() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportQgis = useCallback(async (csvPath: string, qgsPath: string) => {
    setPending(true); setError(null)
    try {
      if (isTauri) {
        return await invoke('export_qgis_project', { csvPath, qgsPath })
      }
      return { success: true, path: qgsPath || 'cluster_c1.qgs' }
    }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, exportQgis }
}

