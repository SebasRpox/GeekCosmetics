import React from "react";
import { withRouter } from "react-router-dom";
import NavBarHome from "../components/navbarHome";
import Footer from "../components/footer";
import PurchaseImg from "../images/cosmetics-purchase.jpg";
import TotalImg from "../images/cosmetics-total.jpg";

const Inicio = () => {
    return (
        <>  
            <NavBarHome />
            <h1 className="center">Sebastian Restrepo Zambrano</h1>
            <h2 className="center">Backend Developer</h2>
            <div className="row center">
                <div className="col s6">
                    <div className="card">
                        <div className="card-image">
                            <img alt="purchase page" src={PurchaseImg} />
                            <span className="card-title black-text"><strong> Realiza tu compra </strong></span>
                        </div>
                        <div className="card-content">
                            <p>Aquí puedes elegir tus artículos preferidos, darle un vistazo y comparar precios</p>
                        </div>
                        <div className="card-action hoverable">
                            <a className="pink-text" href="/purchase">Realizar Compra<i className="material-icons right">send</i></a>
                        </div>
                    </div>
                </div>

                <div className="col s6">
                    <div className="card">
                        <div className="card-image">
                            <img alt="total page" src={TotalImg} />
                            <span className="card-title"><strong> Mira el total de tus compras </strong></span>
                        </div>
                        <div className="card-content">
                            <p>Aquí puedes ver a detalle todas tus compras. IVA incluido</p>
                        </div>
                        <div className="card-action hoverable">
                            <a className="red-text" href="/total">Total Compra<i className="material-icons right">send</i></a>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default withRouter(Inicio);