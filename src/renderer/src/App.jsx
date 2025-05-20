import { useEffect, useState } from 'react'
import electronLogo from './assets/logo.png'

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
     <div className='page-heading'>
      <img className='page-logo' src={electronLogo} alt="logo" />
      <h1>Партнеры</h1>
     </div>
     <ul className='partner-list'>
      {partners.map((partner) => {
        return <li className='partner-card' key={partner.id}>
          <div className='partner-data'>
            <p className='card-heading'>{partner.organization_type} | {partner.name}</p>
            <div className='partner-data-info'>
              <p>{partner.ceo}</p>
              <p>{partner.phone}</p>
              <p>Рейтинг: {partner.rating}</p>
            </div>
          </div>
          <div className='partner-sale partner-data card-heading'>
            {partner.discount}%
          </div>
        </li>
      })}
     </ul>
    </>
  )
}

export default App

