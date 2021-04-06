import React from "react";

const NavBar = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper gray darken-4">
                    <div className="row">
                        <div className="col s1">
                            <a href="/" className="brand-logo"> <img className="ml-5 hoverable" alt="Geek Cosmetics Logo" width="65" src="" />
                            </a>
                        </div>
                        <div className="col s11">
                            <label className="text-white">Geek Cosmetics</label>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;