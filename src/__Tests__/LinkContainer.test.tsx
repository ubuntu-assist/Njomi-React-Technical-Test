import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { ILink } from '../types'
import LinksContainer from '../components/LinksContainer'

const setLinks = vi.fn()
const links: ILink[] = [
  {
    key: 'test1',
    shrtlnk: 'shortlinktest1',
    url: 'originalLongLinkTestnumber1',
    index: 1,
  },
  {
    key: 'test2',
    shrtlnk: 'shortlinktest2',
    url: 'originalLongLinkTestnumber2',
    index: 2,
  },
]

const emptyLinks: ILink[] = []

afterEach(cleanup)

describe('Link container works properly', () => {
  it('When passed 0 links, no link element renders', () => {
    render(<LinksContainer links={emptyLinks} setLinks={setLinks} />)
    const allLinks = screen.queryAllByTestId('link')
    expect(allLinks.length).toEqual(0)
  })

  it('When passed 2 links, exactly 2 links renders', () => {
    render(<LinksContainer links={links} setLinks={setLinks} />)
    const allLinks = screen.getAllByTestId('link')
    expect(allLinks.length).toEqual(2)
  })
})
