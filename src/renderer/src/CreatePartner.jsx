import { useEffect } from "react";
import { Link } from "react-router";
import './assets/main.css'

export default function CreatePartner() {
   useEffect(() => { document.title = 'Создать партнера' }, [])
   async function submitHandler(e) {
    e.preventDefault();
    const partner = {
        type: e.target.type.value,
        name: e.target.name.value,
        rating: e.target.rating.value,
        ceo: e.target.ceo.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
        email: e.target.email.value
    }
    await window.api.createPartner(partner);
    document.querySelector('form').reset()
   }
    
    return <div className='form'>
    <Link to={'/'}><button>{'Назад'}</button></Link>
    <h1>Создать партнера</h1>

    <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="name">Наименование:</label>
        <input type="text" id="name" required />
        <label htmlFor="type">Тип партнера:</label>
        <select name="" id="type">
            <option value="ООО">ООО</option>
            <option value="ЗАО">ЗАО</option>
            <option value="ОАО">ОАО</option>
            <option value="ПАО">ПАО</option>
        </select>
        <label htmlFor="rating">Рейтинг:</label>
        <input type="number" id="rating" step="1" min="0" max="100" required />
        <label htmlFor="address">Адрес:</label>
        <input type="text" id="address" required />
        <label htmlFor="ceo">ФИО Директора:</label>
        <input type="text" id="ceo" required />
        <label htmlFor="phone">Телефон:</label>
        <input type="tel" id="phone" required />
        <label htmlFor="email">Email компании:</label>
        <input type="email" id="email" required />
        <button className="add-partner" type="submit">Добавить партнера</button>
    </form>
</div>
}
