import React, { useEffect, useState } from "react";
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback} from "react";


const products = [
    {id: '1', title: 'Мем-картинка', price: 100, description: 'Так называемый "Мем", картинка содержащая смешную, интересную или иную информацию.', img: 'https://melmagazine.com/wp-content/uploads/2021/09/image6-1.png'},
    {id: '2', title: 'Видео-мем', price: 150, description: 'Мем, в видео формате.', img: 'https://cs13.pikabu.ru/post_img/2022/12/12/10/1670866827152949237.jpg'},
    {id: '3', title: 'Сигма-мем', price: 200, description: 'Мем, содержащий идею о сегрегации мужчин в различные классы, Сигма один из таковых классов, данные мужчины не считают общественное мнение востребованным, а являются просто обычными молчаливыми парнями.', img: 'https://preview.redd.it/jopur0ujhbz71.jpg?auto=webp&s=6e444b643b95f81333d3a59e7330ff67cedd4d30'},
    {id: '4', title: 'Gachimuch-мем', price: 300, description: 'Мем, продвигающий идею о иерархии мужчин в Gym и Dungeon, хоть это и является конкурентной средой, обстановка между мужчинами всегда дружеская.', img: 'https://cs12.pikabu.ru/post_img/2022/12/01/5/1669875809138876162.jpg'},
    {id: '5', title: 'Топор Патрика Бейтмена', price: 1000, description: 'Топор, из небезызвестного фильма "Американский психопат".', img: 'https://assets1.ignimgs.com/2020/04/14/american-psycho-1586888892837_160w.jpg?width=1280'},
    {id: '6', title: 'Плесень и Липовый мёд', price: 0, description: 'Ленин.', img: 'https://sun9-79.userapi.com/impf/c855732/v855732563/118e9e/96tH4ypMdAU.jpg?size=510x594&quality=96&sign=cd5de52524d990bcb66b460c872cce6f&type=album'},
    {id: '7', title: 'Куртка Райана Гослинга из фильма Драйв', price: 10000, description: 'Куртка, которую носил Райан Гослинг в фильме "Драйв".', img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81Frb+AVGZL._AC_UL1500_.jpg'},
    {id: '8', title: 'Инженер из TF2', price: 1500, description: 'Услуги профессионального инженера-электрика-сантехника-слесаря.', img: 'https://ru.meming.world/images/ru/thumb/9/9d/The_Engineer.jpg/300px-The_Engineer.jpg'},
    {id: '9', title: 'Ломтик июльского неба', price: 10, description: 'Кому нужен?.', img: 'https://sun9-39.userapi.com/impg/JOz6RGjAi1u317wrCyHCy7ZdL8uZdZipz1TwzQ/4chmxRYjaJo.jpg?size=604x546&quality=95&sign=79422bebc4f1415c8a64e6be6209b77e&type=album'},
    {id: '10', title: 'Шляпа и очки Хайзенберга', price: 10, description: '', img: 'https://ih1.redbubble.net/image.1545962059.4327/st,small,507x507-pad,600x600,f8f8f8.jpg'},
    {id: '11', title: 'Сол Гудман', price: 1500, description: '"Попали за решётку? Лучше звоните Солу!"', img: 'https://i1.sndcdn.com/avatars-BXxKWtmO7grsLXOk-xp1VGw-t240x240.jpg'},

]
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
export  const ProductList =()=>{

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])


    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return() =>{
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alredyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if(alredyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
     }
    

     
    return(
        <div className='list'>
        
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                    />
            ))}

        </div>
    );
}  
            

