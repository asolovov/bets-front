import React, {ReactNode, useEffect, useState} from "react";
import {connect, getSignerAddress} from "@/heplers/ethersHelpers";
import Link from "next/link";

const Navbar = ({links}: {links: ReactNode}) => {
    const [address, setAddress] = useState("-");

    useEffect(() => {
        getAndSetSignerAddress();
    })

    useEffect(() => {
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            window.ethereum.on("accountsChanged", getAndSetSignerAddress)
            return () =>
                // @ts-ignore
                window.ethereum.removeListener("accountsChanged", getAndSetSignerAddress)
        }

    }, [])

    const getAndSetSignerAddress = () => {
        getSignerAddress().then(r => {
            r && setAddress(r.substring(0, 4) + '...' + r.substring(r.length - 4, r.length));
        })
    }

    return (
        <header>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Bets</Link>
                    <button className="navbar-toggler m-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div aria-label="breadcrumb" className={"navbar-nav pt-lg-3 me-auto"}>
                            {links}
                        </div>
                        <p className={"text-white m-lg-3"}>Current address: {address}</p>
                        <button className={"btn btn-outline-light"} onClick={connect}>Connect</button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;