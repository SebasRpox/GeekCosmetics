import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const RealizarCompra = () =>{
    return(
        <>
            <NavBar />
            Aquí puedes realizar tu compra
            <Footer />
        </>
    )
}

export default withRouter(RealizarCompra); 