import React, {useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const TotalCompras = () => {

    

    return (
        <>
            <NavBar />
            Aquí puedes ver el total de tu compra
            <Footer />
        </>
    )
}

export default withRouter(TotalCompras);