import { renderHook, act } from '@testing-library/react'
import { usePrintPdf } from '@/hooks/usePrintPdf'

// Mock functions
const setOpenMock = jest.fn()
const toastMock = jest.fn()
const openMock = jest.fn()
const createObjectURLMock = jest.fn(() => 'mock-url')
const revokeObjectURLMock = jest.fn()

// Mocks for dependencies
jest.mock('@/components/GeneratingPdfModal', () => ({
  usePdfGeneratingModalState: () => ({
    setOpen: setOpenMock,
  }),
}))

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}))

describe('usePrintPdf', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    window.open = openMock
    global.URL.createObjectURL = createObjectURLMock
    global.URL.revokeObjectURL = revokeObjectURLMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful PDF generation', async () => {
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' })
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob,
    })

    const { result } = renderHook(() => usePrintPdf())

    await act(async () => {
      await result.current.handlePrintPdf('https://simplicv.com/')
    })

    expect(setOpenMock).toHaveBeenCalledWith(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://simplicv.com/' }),
    })
    expect(createObjectURLMock).toHaveBeenCalledWith(mockBlob)
    expect(openMock).toHaveBeenCalledWith('mock-url', '_self')
    expect(setOpenMock).toHaveBeenCalledWith(false)
  })
})
