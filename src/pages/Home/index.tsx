import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
    return (

        <div className="header">
            <h1>
                <Link to="/register" id="text" >
                    Faça seu cadastro aqui!
                </Link>            
            </h1>          
        </div>

    )
}

export default Home;