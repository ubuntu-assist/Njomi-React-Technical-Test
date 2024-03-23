import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ILink } from '../types'
import Form from '../components/Form'
import server from '../__mocks__/handlers'

const setLinks = vi.fn()
const links: ILink[] = []

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(cleanup)

describe('Form component works correctly', () => {
  it('Form renders', () => {
    render(<Form setLinks={setLinks} links={links} />)
    const form = screen.getByTestId('form')
    expect(form).toBeDefined()
  })

  it('Input element has proper value after text was typed', () => {
    render(<Form setLinks={setLinks} links={links} />)
    const input = screen.getByPlaceholderText(
      /Shorten a link here../
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'testUrl.com' } })
    expect(input.value).toMatch('testUrl.com')
  })
})
