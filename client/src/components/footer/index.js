const Footer = () => {
    return (
        <footer id="footer" className="container py-4 text-body">

            <div className="border-top ">
                <div className="mb-3 d-flex flex-columnflex-wrap align-items-center justify-content-center text-body">
                    <div className="text-secondary">© 2025 Cheng Shi | Khoury College of Computer Sciences @ Northeastern University</div>
                    {/* icon */}
                    <div id="title" href="/" className="ms-auto title fs-3 d-flex align-items-center mt-2 mb-lg-0 text-body text-decoration-none p-2">
                        <i className="bi bi-braces-asterisk " style={{ color: "cornflowerblue" }}></i>
                    </div>
                </div>
            </div>

        </footer >

    )
}

export default Footer;