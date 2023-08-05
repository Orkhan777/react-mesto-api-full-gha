import React from 'react';
import { Link } from "react-router-dom";
import notFound from '../images/error404.png'

function NotFound() {
  return (
    <div className='not-found'>
        <img className='not-found__image' src={notFound} alt="Ошибка 404" />
        <Link to="/" name="На главную страницу" className='not-found__link'>Вернуться на главную страницу</Link>
    </div>
  )
}

export default NotFound;