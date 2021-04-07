import React from "react";

const NavBar = () => {
    return (
        <>
            <nav className="pink darken-3">
                <div className="nav-wrapper gray darken-4">
                    <a className="hoverable" href="/" className="brand-logo">Geek Cosmetics</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a className="hoverable" href="/purchase">Realizar compra</a></li>
                            <li><a className="hoverable" href="/total">Total compras</a></li>
                        </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar;