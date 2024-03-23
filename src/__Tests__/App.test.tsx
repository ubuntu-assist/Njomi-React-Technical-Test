import { describe, expect, it, afterEach, afterAll, beforeAll } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import server from '../__mocks__/handlers'
import App from '../App'

afterEach(cleanup)
beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Initial test', () => {
  it('App element initially renders without links container', () => {
    render(<App />)
    screen.getAllByPlaceholderText(
      /Shorten a link here../
    )[0] as HTMLInputElement
    screen.getAllByRole('button', {
      name: /shorten it/i,
    })[0] as HTMLButtonElement
    const linksContainer = screen.queryByTestId(/links-container/)
    expect(linksContainer).toBeFalsy()
    const linksArray = screen.queryAllByTestId('link')
    expect(linksArray).toHaveLength(0)
  })
})
