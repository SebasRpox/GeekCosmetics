import React from "react";
import { withRouter } from "react-router-dom";
import Footer from "../components/footer";

const Inicio = () =>{
    return(
        <>
            Desarrollador: Sebastian Restrepo Zambrano

            <Footer />
        </>
    )
}

export default withRouter(Inicio); 