import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getDogs from "../../redux/action";
import NavBar from '../../components/navbar/NavBar';
import Card from "../../components/card/Card";
import style from "../home/Home.module.css";
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    // se elimina el parametro ele de la función handleClick
    function handleClick() {
        dispatch(getDogs());
    }

    return (
        <div className={`${style.title}`}>
            <Link to="/Form">Crear Perro</Link>
            <h1 className={`${style.second_title}`}>Cuatro Patas</h1>
            <h3>Bienvenidos</h3>
            <button onClick={handleClick}>
                volver a cargar los perros
            </button>
                <NavBar />
            {/* aca vienen los filtros */}
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="alive">vivo</option>
                    <option value="dead">muerto</option>
                </select>
                <select>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                </select>
                {/* se agrega una condición para manejar la situación en la que allDogs es undefined o null */}
                {allDogs && allDogs.map((ele) => {
                    return (
                        <div key={ele.id}>
                            <Link to={"/home/" + ele.id}>
                                <Card name={ele.name} image={ele.img} height={ele.height} weight={ele.weight} life_span={ele.life_span} />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;