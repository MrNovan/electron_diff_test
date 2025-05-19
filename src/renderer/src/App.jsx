import { useEffect, useState } from 'react'
import electronLogo from './assets/electron.svg'

function App() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await window.api.getPartners();
      setPartners(res);
    })()
  }, [])


  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <h1>Партнеры</h1>
      {partners.map((partner) => {
        return <li>{partner.organization_type} | {partners.name}
        {partner.ceo}
        {partner.phone}
        Рейтинг: {partner.rating}
        </li>
      })}
    </>
  )
}

export default App

