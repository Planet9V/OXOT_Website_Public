import { render, screen } from '@testing-library/react'
import ActiveProtocolsSidebar from '@/components/ActiveProtocolsSidebar'

describe('ActiveProtocolsSidebar', () => {
  it('renders protocol buttons', () => {
    render(<ActiveProtocolsSidebar />)
    expect(screen.getByText(/01_ACQUISITION_INTEL/i)).toBeInTheDocument()
    expect(screen.getByText(/02_COMMAND_LINK/i)).toBeInTheDocument()
    expect(screen.getByText(/03_STRATEGIC_ALIGNMENT/i)).toBeInTheDocument()
  })
})
