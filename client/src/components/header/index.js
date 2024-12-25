import "./index.css";
import React, { useState } from "react";
import { logoutUser } from "../../services/userService";


const Header = ({ user, search, setQuesitonPage, setPage, setLogin, login,visual}) => {
	const [val, setVal] = useState(search);


	return (
		<>
			<header id="hearder" className="p-3 text-body">

				<div className="container border-bottom ">
					<div className="mb-3 d-flex flex-wrap align-items-center justify-content-center text-body justify-content-lg-start ">
						{/* Title */}
						<a id="title" href="/" className="title fs-3 d-flex align-items-center mb-2 mb-lg-0 text-body text-decoration-none">
							<div style={{ fontSize: "2rem", fontFamily: "'Times New Roman', Times, serif", }}>
								Geek<i className="bi bi-braces-asterisk" style={{ color: "cornflowerblue" }}></i>Dock
							</div>
						</a>

						{/* Search bar */}
						<form className="col-12 col-lg-auto ms-3 ms-lg-3 mb-3 mb-lg-0 me-3 me-lg-3 " role="search">
							<input
								id="searchBar"
								type="search"
								className="form-control  mr-sm-2"
								placeholder="Search..."
								aria-label="Search"
								value={val}
								onChange={(e) => {
									setVal(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										setQuesitonPage(e.target.value, "Search Results");
									}
								}}
							/>
						</form>

						{/* if no user is logged in, show login and sign-up buttons */}
						{!(login && user) && (
							<div className="ms-auto text-end ">
								<button
									type="button"
									// set classanme to btn base on visual state
									className={`btn btn-sm btn-${visual === 'dark' ? 'dark' : 'secondary'} me-2`}
									onClick={() => { setPage("login") }}
								>Log In</button>
								<button
									type="button"
									className="btn btn-sm btn-primary"
									onClick={() => { setPage("register") }}
								>Sign Up</button>
							</div>
						)}

						{/* if user is logged in, show user's name and logout button */}
						{(login && user) && (
							<div className="ms-auto text-end">
								<div className="dropdown text-end">
									<a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
										<img src={user.profile_pic_url} alt="mdo" width="32" height="32" className="rounded-circle"></img>
									</a>
									<ul className="dropdown-menu text-small">
										<li><a className="dropdown-item" href="#"><i className="bi bi-gear-wide-connected me-2"></i>Settings</a></li>
										<li><a className="dropdown-item" onClick={() => setPage("profile")}><i className="bi bi-person-circle me-2"></i>Profile</a></li>
										<li><hr className="dropdown-divider"></hr></li>
										<li><a className="dropdown-item text-body" onClick={() => { logoutUser(); setLogin(false); setPage("home") }}>
											<i className="bi bi-chevron-bar-right me-2"></i>Sign out</a>
										</li>
									</ul>
								</div>
							</div>
						)}

					</div>
				</div>

			</header >

		</>
	);
};

export default Header;
