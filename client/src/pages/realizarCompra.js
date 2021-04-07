import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RealizarCompra = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [articulos, setArticulos] = useState([]);
    const [numOrden, setNumOrden] = useState([]);
    const [cantidad, setCantidad] = useState([]);
    const [precio, setPrecio] = useState();
    const [fullArticulos] = useState([]);
    const [datos, setDatos] = useState({
        nombre: ""
    });

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        console.log("datos enviados!!")
    }

    useEffect(() => {
        axios
            .get("http://localhost:5001/articulos")
            .then((res) => {
                console.log(res);
                setArticulos(res.data);
            })
            .catch((err) => {
                console.log(err)
            })

        axios
            .get("http://localhost:5001/numOrden")
            .then((res) => {
                console.log(res);
                setNumOrden(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    });

    const orden = numOrden.length + 1;
    let subtotal = cantidad && precio > 0 ? cantidad * precio : 0;

    const actualizarTodosLosProductos = () => {
        try {
            fullArticulos.push({
                id_Orden: orden,
                nombre: datos.nombre,
                fecha: startDate,
                cantidad: cantidad,
                //subtotal: subtotal,
                //id_Producto: id_Producto
            });
            //setId_producto(0);
            //setPrecio('');
            //setNombre('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavBar />
            <div className="row">
                <div className="col s6">
                    <form onSubmit={submitData} className="col s12">
                        <div className="row">
                            <label for="disabled">Número de orden</label>
                            <div className="input-field col s12">
                                <input disabled value="1" id="disabled" type="text" Name="validate" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="name" type="text" className="validate" name="nombre" onChange={handleChange} data-length="10" />
                                <label htmlFor="name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="fecha">Fecha</label>
                            <div class="input-field col s12">
                                <DatePicker selected={startDate}
                                    readOnly
                                    locale="es-CO"
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    dateFormat="Pp" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="articulo">Artículo</label>
                            <div className="input-field col s12">
                                <select className="browser-default">
                                    <option value="" disabled selected>Choose your option</option>
                                    {articulos.map(articulo => {
                                        return (
                                            <option key={articulo.id} value={articulo.id}>{articulo.descripcion}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="cantidad" type="number" className="validate" data-length="10" />
                                <label htmlFor="cantidad">Cantidad</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input disabled id="subtotal" type="number" className="validate" data-length="10" />
                                <label htmlFor="subtotal">Subtotal</label>
                            </div>
                        </div>
                        <button
                      className="btn waves-effect waves-light mx-auto d-block pink darken-4 hoverable"
                      type="submit"
                      name="submitData"
                    >
                      Enviar
                      <i className="material-icons right">send</i>
                    </button>
                    </form>
                </div>
                
                <div className="col s6">
                    Detalles factura
                    <br/>
                    {fullArticulos.map((item) => {
                                return (
                                    <h5 width="10%">{item.nombre}</h5>                                 
                                )
                            })}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default withRouter(RealizarCompra);