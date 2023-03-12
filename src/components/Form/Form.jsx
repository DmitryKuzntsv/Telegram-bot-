import {React, useState} from 'react';
import './Form.css';
export const Form =()=>{
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('');
    return(
        <>
         <h3>Введите ваши данные:</h3>
         <input
         className='input'
         type = 'text'
         placeholder='Город'
        />
         <input
         className='input'
         type = 'text'
         placeholder='Улица'
         />
         <select className='select'>
            <option value={'legal'}>Физ.лицо</option>
            <option value={'legal'}>Юр.лицо</option>
         </select>
         </>
    )
}