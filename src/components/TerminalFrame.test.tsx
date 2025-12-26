import { render, screen } from '@testing-library/react'
import TerminalFrame from '@/components/TerminalFrame'

describe('TerminalFrame', () => {
  it('renders with monospaced border', () => {
    render(<TerminalFrame>Content</TerminalFrame>)
    const frame = screen.getByTestId('terminal-frame')
    expect(frame).toBeInTheDocument()
    expect(frame).toHaveClass('font-mono')
  })
})
