import { ILink } from '../types'
import LinkComponent from './LinkComponent'
import { Dispatch, SetStateAction, useState } from 'react'

interface LinksContainerProps {
  links: ILink[]
  setLinks: Dispatch<SetStateAction<ILink[]>>
}

const LinksContainer = ({ links, setLinks }: LinksContainerProps) => {
  const [copied, setCopied] = useState<string | undefined>('')

  return (
    <div
      className='gap-4 bg-clr-main-bg place-items-center pt-6 flex flex-col'
      data-testid='links-container'
    >
      {links &&
        links.length > 0 &&
        links.map((link) => (
          <LinkComponent
            link={link}
            key={link.key}
            setLinks={setLinks}
            copied={copied}
            setCopied={setCopied}
          />
        ))}
    </div>
  )
}

export default LinksContainer
