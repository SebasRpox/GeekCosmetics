import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
//Components
import NavBar from "../components/navbar";
import Footer from "../components/footer";
//DatePicker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
//Peticiones
import axios from "axios";
//LocalStorage
import { getFromStorage, setInStorage } from "../utils/storage";
//Image Space
import SpaceImg from "../images/cosmetics-total.jpg";

var subtotal;

const RealizarCompra = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [fullArticulos, setFullArticulos] = useState([]);
    const [articulos, setArticulos] = useState([]);
    const [numOrden, setNumOrden] = useState([]);
    const [cantidad, setCantidad] = useState([]);
    const [precio, setPrecio] = useState([]);
    const [nombre, setNombre] = useState([]);
    const [articulo, setArticulo] = useState([]);

    //submit de pruebas
    const submitData = (e) => {
        e.preventDefault();
        console.log("¡¡Datos enviados!!")
    }

    var lista;
    function obtenerReporte(){
        lista = localStorage.getItem("localReport");
        console.log("reporte obtener: "+lista);
        setFullArticulos(lista);
    }

    useEffect(() => {
        obtenerReporte();
        console.log("full: ", fullArticulos)
        console.log("articulos: ", articulos)
        subtotal = cantidad * precio;
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
    function guardarReporte(){
        let lista = {
            orden: orden,
            nombre: nombre,
            articulo: articulo,
            cantidad: cantidad,
            precio: precio,
            subtotal: subtotal
        }
        localStorage.setItem("localReport", JSON.stringify(lista));
    }
    const agregarReporte = () => {
        try {
            
            axios
                .post("http://localhost:5001/addNumOrden")
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            setStartDate(new Date());
            setNombre([]);
            setCantidad([]);
            setArticulo([]);
            subtotal = 0;
            form.reset();
            console.log("valores reseteados")
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarOrden = () => {
        try {
            console.log("Eliminado");
        } catch (err) {
            console.log(err)
        }
    }

    const form = document.getElementById("form");

    return (
        <>
            <NavBar />
            <div className="row">
                <div className="col s6">
                    <h4 className="center">Formulario de compra</h4>
                    <form id="form" onSubmit={submitData} className="col s12">
                        <div className="row">
                            <label htmlFor="disabled">Número de orden</label>
                            <div className="input-field col s12">
                                <input disabled value={orden} id="disabled" type="text" Name="validate" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="name" type="text" className="validate" name="nombre" onChange={(e) => { setNombre(e.target.value) }} data-length="10" />
                                <label htmlFor="name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="fecha">Fecha</label>
                            <div className="input-field col s12">
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
                                <select onChange={(e) => {
                                    const array = e.target.value.split(",");
                                    setArticulo(array[0]);
                                    setPrecio(array[1]);
                                }} className="browser-default">
                                    <option disabled selected>Choose your option</option>
                                    {articulos.map(articulo => {
                                        return (
                                            <option key={articulo.id} value={[articulo.descripcion, articulo.precio]}>{articulo.descripcion}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="cantidad" type="number" className="validate" onChange={(e) => { setCantidad(e.target.value) }} data-length="10" />
                                <label htmlFor="cantidad">Cantidad</label>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="subtotal">Subtotal</label>
                            <div className="input-field col s12">
                                <input disabled id="subtotal" type="number" className="validate" value={subtotal} data-length="10" />
                            </div>
                        </div>
                        <button
                            className="btn waves-effect waves-light mx-auto d-block pink darken-4 hoverable"
                            type="submit"
                            name="submitData"
                            onClick={() => { guardarReporte() }}
                        >
                            Enviar
                      <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
                <div className="col s6">
                    <h4 className="center">Detalles de factura</h4>
                    <table className="striped highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Artículo</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Borrar artículo</th>
                            </tr>
                        </thead>
                        <tbody>
                           {fullArticulos.map(item=>{
                               console.log(item)
                           })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(RealizarCompra);