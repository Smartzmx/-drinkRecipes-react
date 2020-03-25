import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context, el cual te permite pasar props a cualquier componente
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y state 
// y siempre que se cree el context se debe definir el provider
// se le pasan props a provider, ya que se utilizarán como props.children
const CategoriasProvider = (props) => {

    // crear el state del Context
    const [categorias, guardarCategorias] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, []);

    return (
        <CategoriasContext.Provider
            // para pasar los argumentos para cualquier componente se definie como value
            // al colocar props.children todos los argumentos de cualquier 
            //componente estarán dentro de estos props
            value={{
                categorias
            }}
        >
            {props.children} 
            
        </CategoriasContext.Provider>
    )
}
export default CategoriasProvider;