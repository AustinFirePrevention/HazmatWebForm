import { describe, it, vi, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import App from '../src/App'
import { MaterialsProvider } from '../src/helpers/MaterialsContext'
import '../src/i18n.ts'


vi.mock('../src/helpers/FeeProcessor', () => ({
  useFees: () => ({
    fees: { total: 100 },
    calculateFees: () => ({ total: 100 })
  })
}))

vi.mock('../src/helpers/MaterialsContext', async () => {
  const actual = await vi.importActual('../src/helpers/MaterialsContext')
  return {
    ...actual,
    useMaterials: () => ({
      materials: [],
      uncollapseIncompleteMaterialsAndThrow: vi.fn()
    })
  }
})

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main form elements', () => {
    render(
      <MaterialsProvider>
        <App />
      </MaterialsProvider>
    )

    expect(screen.getByRole('heading', { name: 'Aboveground Hazardous Materials Permit Application' })).toBeInTheDocument()
    expect(screen.getByLabelText(/I am a third party/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('shows third party form when checkbox is checked', () => {
    render(
      <MaterialsProvider>
        <App />
      </MaterialsProvider>
    )

    const checkbox = screen.getByLabelText(/I am a third party/)
    fireEvent.click(checkbox)

    expect(screen.getByText('Requesting Party')).toBeInTheDocument()
  })

  it('handles file upload', () => {
    render(
      <MaterialsProvider>
        <App />
      </MaterialsProvider>
    )

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    const input = screen.getByLabelText('Facilities Storage Map:')

    fireEvent.change(input, { target: { files: [file] } })
  })

  // it('handles form submission for new permit', async () => {
  //   global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })

  //   render(
  //     <MaterialsProvider>
  //       <App />
  //     </MaterialsProvider>
  //   )

  //   const form = screen.getByTestId('form')
  //   fireEvent.submit(form)

  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalled()
  //   })
  // })

  it('shows error toast when submitting without materials', async () => {
    render(
      <MaterialsProvider>
        <App />
      </MaterialsProvider>
    )

    const form = screen.getByTestId('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText('Please add chemicals to your application.')).toBeInTheDocument()
    })
  })

  // it('shows success modal after successful submission', async () => {
  //   global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })

  //   render(
  //     <MaterialsProvider>
  //       <App />
  //     </MaterialsProvider>
  //   )

  //   // Mock materials data to prevent validation error
  //   vi.mocked(global.fetch).mockImplementationOnce(() => Promise.resolve({ ok: true } as Response))

  //   const submitButton = screen.getByRole('button', { name: 'Submit' })
  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(screen.getByRole('dialog')).toBeInTheDocument()
  //   })
  // })
})
