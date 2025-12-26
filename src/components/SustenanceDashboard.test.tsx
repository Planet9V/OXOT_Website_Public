import { render, screen, fireEvent, act } from '@testing-library/react'
import SustenanceDashboard from './SustenanceDashboard'
import { vi, describe, it, expect } from 'vitest'

// Mock ResizeObserver which is used by Recharts
class ResizeObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock as any

// Mock IntersectionObserver which is used by Framer Motion
class IntersectionObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}
global.IntersectionObserver = IntersectionObserverMock as any

describe('SustenanceDashboard', () => {
    it('renders the mission statement', () => {
        render(<SustenanceDashboard />)
        expect(screen.getByText(/Reliable Energy, Clean Water, and Healthy Food/i)).toBeInTheDocument()
    })

    it('renders the Executive Brief tab by default', () => {
        render(<SustenanceDashboard />)
        expect(screen.getByText(/Executive Brief/i)).toBeInTheDocument()
        expect(screen.getByText(/The Reactive Trap/i)).toBeInTheDocument()
    })

    it('can switch to Math Models tab and see EPSS model', async () => {
        render(<SustenanceDashboard />)
        const mathTab = screen.getByRole('button', { name: /Math Models/i })
        
        await act(async () => {
            fireEvent.click(mathTab)
        })

        expect(await screen.findByText(/Ising Dynamics/i)).toBeInTheDocument()
        expect(screen.getByText(/EPSS Predictor \(v4\)/i)).toBeInTheDocument()
        expect(screen.getByText(/P\(Exploit\) = 1 \/ \(1 \+ e\^-\(β₀ \+ ΣβᵢXᵢ\)\)/i)).toBeInTheDocument()
    })
})
