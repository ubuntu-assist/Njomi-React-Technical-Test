import LinkComponent from '../components/LinkComponent'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { vi, describe, it, afterEach } from 'vitest'
import { ILink } from '../types'

afterEach(cleanup)

let link: ILink = {
  key: 'code',
  shrtlnk: '12345.pl',
  url: 'http://098765434.pl',
  index: 1,
}

describe('Link component', () => {
  it('Element renders with all fields', async () => {
    let setLinks = vi.fn()
    let setCopied = vi.fn()
    render(
      <LinkComponent
        copied='null'
        setLinks={setLinks}
        setCopied={setCopied}
        link={link}
      />
    )
    screen.getByText('http://098765434.pl')
    screen.getByText('12345.pl')
  })

  it('Interactions with buttons', async () => {
    let setLinks = vi.fn()
    let setCopied = vi.fn()
    render(
      <LinkComponent
        copied='null'
        setLinks={setLinks}
        setCopied={setCopied}
        link={link}
      />
    )
    const linkComponent = screen.getByTestId('link')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.click(copyButton)
    fireEvent.mouseOver(linkComponent)
  })
})
