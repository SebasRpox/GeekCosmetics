import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const totalCompras = () =>{
    return(
        <>
            <NavBar />
            Aquí puedes ver el total de tu compra
            <Footer />
        </>
    )
}

export default withRouter(totalCompras); 