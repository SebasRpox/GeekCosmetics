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
/* Actualización: no uso localStorage porque manda error con 
funciones (se intentó corregir con diversos cambios y no funcionó) */
import { getFromStorage, setInStorage } from "../utils/storage";
import * as $ from "jquery";
import { Formik,Field, Form } from "formik";
import * as Yup from "yup";

var subtotal;
var suma;

const RealizarCompra = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [fullArticulos] = useState([]);
    const [articulos, setArticulos] = useState([]);
    const [numOrden, setNumOrden] = useState([]);
    const [cantidad, setCantidad] = useState([]);
    const [precio, setPrecio] = useState([]);
    const [nombre, setNombre] = useState([]);
    const [articulo, setArticulo] = useState([]);
    const [reporte, setReporte] = useState([]);
    const [subtotals, setSubtotals] = useState([]);
    const [iva, setIva] = useState([]);
    const [total, setTotal] = useState([]);
    const [existencia, setExistencia] = useState([]);

    useEffect(() => {
        sumaSubtotals();
        subtotal = cantidad * precio;
        axios
            .get("http://localhost:5001/articulos")
            .then((res) => {
                setArticulos(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        axios
            .get("http://localhost:5001/numOrden")
            .then((res) => {
                setNumOrden(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get("http://localhost:5001/obtenerOrden")
            .then((res) => {
                setReporte(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        axios
            .get("http://localhost:5001/subtotal")
            .then((res) => {
                setSubtotals(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    });

    const validate = Yup.string().max(15, "Debe contener 15 caracteres o menos").required("Required")
    .matches(/^[A-Za-z]+$/, "Only enter letters");

    const orden = (numOrden.length + 1) - 1;
    const sumaSubtotals = () => {
        suma = subtotals.reduce(function (acc, el) {
            if (el.subtotal > 0) {
                return acc + el.subtotal;
            } else {
                return acc;
            }
        }, 0)
        var calIVA = suma * 0.19;
        setIva(calIVA);
        setTotal(suma + calIVA);
    }

    const finalizar = () => {
        try {
            axios.post(`http://localhost:5001/addReportTotal`, {
                subtotal: suma,
                iva: iva,
                total: total
            }).
                then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const comprobarExistencia = () => {
        cantidad > existencia ? cantidad = existencia : cantidad = existencia;
        $("#option").attr("readOnly", "readOnly");
    }

    const agregarReporte = (values) => {
        try {
            axios.post(`http://localhost:5001/addReport`, {
                orden: orden,
                nombre: values.name,
                articulo: articulo,
                cantidad: cantidad,
                subtotal: subtotal
            }).
                then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err);
                });
            fullArticulos.push(
                {
                    orden: orden,
                    nombre: nombre,
                    articulo: articulo,
                    cantidad: cantidad,
                    precio: precio,
                    subtotal: subtotal
                }
            )
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
        } catch (err) {
            console.log(err);
        }
    }

    const eliminarOrden = (numOrden) => {
        try {
            axios
                .delete(`http://localhost:5001/eliminarOrden/${numOrden}`)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const form = document.getElementById("form");

    return (
        <>
            <NavBar />
            <Formik
                initialValues={{
                  name: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  agregarReporte(values);
                }}
              >
                <Form>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                  <button type="submit">Submit</button>
                </Form>
              </Formik>

            <div className="row">
                <div className="col s6">
                    <h4 className="center">Formulario de compra</h4>
                    <form id="form" className="col s12">
                        <div className="row">
                            <label htmlFor="disabled">Número de orden</label>
                            <div className="input-field col s12">
                                <input disabled value={orden} id="disabled" type="text" Name="validate" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="name" type="text" className="validate" name="name" onChange={(e) => { setNombre(e.target.value) }} data-length="15" />
                                <label htmlFor="name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="fecha">Fecha</label>
                            <div className="input-field col s12">
                                <DatePicker selected={startDate}
                                    readOnly
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
                                    setExistencia(array[2]);
                                }} className="browser-default">
                                    <option disabled selected>Choose your option</option>
                                    {articulos.map(articulo => {
                                        return (
                                            <option key={articulo.id} value={[articulo.descripcion, articulo.precio, articulo.existencia]}>{articulo.descripcion}</option>
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
                            onClick={() => { agregarReporte() }}
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
                            {reporte.map(item => {
                                return (
                                    <tr>
                                        <td>{item.articulo}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.subtotal}</td>
                                        <td><button onClick={() => { eliminarOrden(item.numOrden) }}>Eliminar</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <h6>Subtotal: {suma}</h6>
                    <h6>Total IVA: {iva}</h6>
                    <h6>Total: {total}</h6>
                    <button
                        className="btn waves-effect waves-light mx-auto d-block pink darken-4 hoverable"
                        type="submit"
                        name="submitData"
                        onClick={() => { finalizar() }}
                    >
                        Finalizar compra
                      <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default withRouter(RealizarCompra);