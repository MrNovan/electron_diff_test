import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router";
import './assets/main.css'

export default function UpdatePartner() {
    useEffect(() => { document.title = 'Обновить партнера' }, [])
    const location = useLocation();
    const [partner, setPartner] = useState(location.state.partner);

    async function submitHandler(e) {
        e.preventDefault();
        const updPartner = {
            id: partner.id,
            type: e.target.type.value,
            name: e.target.name.value,
            rating: e.target.rating.value,
            ceo: e.target.ceo.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            email: e.target.email.value
        }
        await window.api.updatePartner(updPartner);
        setPartner(updPartner);
        document.querySelector('form').reset()
    }

    return <div className='form'>
    <Link to={'/'}><button>{'Назад'}</button></Link>
    <h1>Обновить партнера</h1>

    <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="name">Наименование:</label>
        <input type="text" id="name" required defaultValue={partner.name}/>
        <label htmlFor="type">Тип партнера:</label>
        <select name="" id="type" required defaultValue={partner.type}>
            <option value="ООО">ООО</option>
            <option value="ЗАО">ЗАО</option>
            <option value="ОАО">ОАО</option>
            <option value="ПАО">ПАО</option>
        </select>
        <label htmlFor="rating">Рейтинг:</label>
        <input type="number" id="rating" step="1" min="0" max="100" required defaultValue={partner.rating}/>
        <label htmlFor="address">Адрес:</label>
        <input type="text" id="address" required defaultValue={partner.address}/>
        <label htmlFor="ceo">ФИО Директора:</label>
        <input type="text" id="ceo" required defaultValue={partner.ceo}/>
        <label htmlFor="phone">Телефон:</label>
        <input type="tel" id="phone" required defaultValue={partner.phone}/>
        <label htmlFor="email">Email компании:</label>
        <input type="email" id="email" required defaultValue={partner.email}/>
        <button className="add-partner" type="submit">Обновить партнера</button>
    </form>
</div>
}
