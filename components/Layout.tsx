import React, {ReactNode} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({children, links}: {children: ReactNode, links: ReactNode}) => {
    return (
        <>
            <Navbar links={links}/>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;