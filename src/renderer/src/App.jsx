import { useEffect, useState } from 'react'
import electronLogo from './assets/logo.png'
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
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
      <img className='page-logo' src={electronLogo} alt="logo" /></div>
      <h1>Партнеры</h1>
     <ul className='partner-list'>
      {partners.map((partner) => {
        return <li className='partner-card' key={partner.id} onClick={() => { navigate('/update', {state: {partner}})}}>
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

     <Link to={'/create'}><button className='add-partner'>Создать партнера</button></Link>
    </>
  )
}

export default App

