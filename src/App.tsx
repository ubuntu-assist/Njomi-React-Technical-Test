import {
  LinksContainer,
  Footer,
  Boost,
  ThirdSection,
  SecSection,
  Form,
  FirstSection,
  Header,
} from './components'
import useLocalStorage from './hooks/useLocalStorage'
import { ILink } from './types'

const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<ILink[]>('shortened-links', [])

  return (
    <div className='font-main text-lg' data-testid='main-div'>
      <Header />
      <FirstSection />
      <Form setLinks={setLinks} links={links} />
      {links && links?.length > 0 && (
        <LinksContainer links={links} setLinks={setLinks} />
      )}
      <SecSection />
      <ThirdSection />
      <Boost />
      <Footer />
    </div>
  )
}

export default App
