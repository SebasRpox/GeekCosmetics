import React, {useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
//Peticiones
import axios from "axios";
//Componentes
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const TotalCompras = () => {

    //estados
    const [reporte, setReporte] = useState([]);
    const [total, setTotal] = useState([]);

    //renderizar
    useEffect(()=>{
        axios
            .get("http://localhost:5001/obtenerOrden")
            .then((res) => {
                console.log(res);
                setReporte(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        axios
            .get("http://localhost:5001/total")
            .then((res) => {
                console.log(res);
                setTotal(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <>
            <NavBar />
            <h2 className="center">Total compras</h2>
            <table className="striped highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Artículo</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reporte.map(item => {
                                return (
                                    <tr>
                                        <td>{item.articulo}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.subtotal}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {total.map(item=>{
                        return(
                            <div className="center">
                            <h6> <strong> Subtotal: </strong>{item.subtotal}</h6>
                            <h6> <strong>Total IVA: </strong>{item.iva}</h6>
                            <h6> <strong>Subtotal: </strong>{item.total}</h6>
                            </div>
                        )
                    })}
            <Footer />
        </>
    )
}

export default withRouter(TotalCompras);