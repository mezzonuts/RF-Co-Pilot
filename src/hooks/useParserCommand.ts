import { useState, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/core'

export interface ParseResult {
  status: 'success' | 'error'
  rows: number
  columns: string[]
  sample: Record<string, unknown>[]
}

export interface KPIResult {
  status: 'success' | 'error'
  action: string
  rows_processed: number
  result: Record<string, unknown>
}

export interface UseParserCommandState {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  data: ParseResult | KPIResult | null
}

/**
 * React hook untuk invoke Tauri command `parse_dt_file`.
 * 
 * Manages loading, error, dan success state saat parse CSV Drive Test.
 * 
 * Usage:
 * ```tsx
 * const { isPending, data, error } = useParserCommand();
 * const handleParse = () => {
 *   parseFile('path/to/file.csv', 'generic');
 * };
 * ```
 */
export function useParserCommand() {
  const [state, setState] = useState<UseParserCommandState>({
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  })

  const parseFile = useCallback(
    async (filePath: string, vendor: string = 'generic') => {
      setState({ isPending: true, isSuccess: false, isError: false, error: null, data: null })
      try {
        const result = (await invoke('parse_dt_file', {
          filePath,
          vendor,
        })) as ParseResult
        setState({
          isPending: false,
          isSuccess: true,
          isError: false,
          error: null,
          data: result,
        })
        return result
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        setState({
          isPending: false,
          isSuccess: false,
          isError: true,
          error: errorMsg,
          data: null,
        })
        throw err
      }
    },
    []
  )

  const computeKPI = useCallback(
    async (
      filePath: string,
      action: string = 'avg_kpi',
      vendor: string = 'generic'
    ) => {
      setState({ isPending: true, isSuccess: false, isError: false, error: null, data: null })
      try {
        const result = (await invoke('compute_kpi', {
          filePath,
          action,
          vendor,
        })) as KPIResult
        setState({
          isPending: false,
          isSuccess: true,
          isError: false,
          error: null,
          data: result,
        })
        return result
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        setState({
          isPending: false,
          isSuccess: false,
          isError: true,
          error: errorMsg,
          data: null,
        })
        throw err
      }
    },
    []
  )

  const reset = useCallback(() => {
    setState({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    })
  }, [])

  return {
    ...state,
    parseFile,
    computeKPI,
    reset,
  }
}

/**
 * Health check hook untuk memastikan Python sidecar available.
 */
export function useHealthCheck() {
  const [state, setState] = useState<{
    isPending: boolean
    isOk: boolean
    pythonExe: string | null
    error: string | null
  }>({
    isPending: false,
    isOk: false,
    pythonExe: null,
    error: null,
  })

  const check = useCallback(async () => {
    setState(prev => ({ ...prev, isPending: true }))
    try {
      // Try Tauri invoke first (native app mode)
      try {
        const result = (await invoke('health_check')) as {
          status: string
          python_executable?: string
          error?: string
        }
        if (result.status === 'ok') {
          setState({
            isPending: false,
            isOk: true,
            pythonExe: result.python_executable || null,
            error: null,
          })
          return
        }
      } catch (tauri_err) {
        // Fallback to API check (web mode)
        const apiRes = await fetch('/api/vault/tree', { method: 'GET' })
        if (apiRes.ok) {
          setState({
            isPending: false,
            isOk: true,
            pythonExe: null,
            error: null,
          })
          return
        }
        throw new Error('API check failed')
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setState({
        isPending: false,
        isOk: false,
        pythonExe: null,
        error: errorMsg,
      })
    }
  }, [])

  return { ...state, check }
}
