import { ILink } from '../types'
import { Dispatch, SetStateAction, useState } from 'react'

interface LinkComponentProps {
  link: ILink | undefined
  setLinks: Dispatch<SetStateAction<ILink[]>>
  setCopied: Dispatch<SetStateAction<string | undefined>>
  copied: string | undefined
}

const LinkComponent = ({
  link,
  setLinks,
  setCopied,
  copied,
}: LinkComponentProps) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const handleDelete = async (e: React.MouseEvent) => {
    setIsDeleted(true)
    setTimeout(removeLink, 580)
  }

  const removeLink = () => {
    setLinks((prev) => [...prev].filter((l) => l.key !== link?.key))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link?.shrtlnk as string)
      setCopied(link?.key)
    } catch {
      return
    }
  }

  const isCopied = copied === link?.key

  return (
    <div
      className={`bg-white ${
        isDeleted
          ? 'animate-scale-rev-sm md:animate-scale-rev'
          : 'animate-scale-y-sm md:animate-scale-y'
      } flex flex-col lg:flex-row py-4 px-10 w-[90%] lg:w-[85%] xl:w-[73%] lg:items-center lg:gap-5 rounded-md relative group`}
      data-testid='link'
    >
      <a className='truncate lg:max-w-[50%] py-2' href={link?.url}>
        {link?.url}
      </a>
      <a
        className='text-clr-cyan lg:ml-auto py-2 relative after:absolute after:top-0 after:h-[1px] after:opacity-25 after:bg-clr-Very-Dark-Violet after:-inset-x-10 lg:after:hidden'
        href={link?.shrtlnk}
      >
        {link?.shrtlnk}
      </a>
      <button
        onClick={handleCopy}
        className={`py-3 lg:w-24 mt-2 lg:mt-0 ${
          isCopied ? 'bg-clr-Dark-Violet' : 'bg-clr-cyan hover:bg-teal-200'
        } rounded-md text-white text-sm`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={handleDelete}
        className='absolute top-1/2 -translate-y-1/2 right-1 p-2 text-red-800 lg:hidden lg:group-hover:block opacity-50 hover:opacity-100'
      >
        X
      </button>
    </div>
  )
}

export default LinkComponent
