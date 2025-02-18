import '@testing-library/jest-dom'
import { beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

beforeAll(() => {
  // Mock window.fetch
  global.fetch = vi.fn()
})

afterAll(() => {
  cleanup()
  vi.restoreAllMocks()
})
