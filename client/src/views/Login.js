import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Form } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//
const Login = () => {
	const { email, password, setEmail, setPassword } = useContext(UserContext);
	//

	return (
		<div className="container ">
			<div className="row justify-content-center ">
				<div className="col-sm-12 col-md-8 col-lg-10">
					<div className="card-login border border-info-subtle rounded-4 shadow-lg">
						<div className="container">
							<div className="row">
								<img src="mt3.jpg" className="entryLogo" alt="logo" />

								<div className="col  align-self-center">
									<h1 className="fw-bold d-inline-flex m-5" style={{ textDecoration: 'none', color: 'darkcyan' }}>
										<em>MedTracker</em>
									</h1>
									<h5 className="pt-2">
										<em>Manage and track all your medications seamlessly!</em>
									</h5>
								</div>
							</div>
						</div>
						<div className="card-body">
							<Form className="p-3" method="POST" action="/user">
								{' '}
								<div className="mb-3">
									<label htmlFor="inputEmail" className="form-label">
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										id="inputEmail"
										aria-describedby="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										name="inputEmail"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="inputPassword" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="inputPassword"
										autoComplete="password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										name="inputPassword"
									/>
								</div>
								<button type="submit" className="btn btn-success mt-3">
									Log in
									<img src="send-ico.svg" alt="signup" className="ms-2" />
								</button>
								<div className="signup mt-5">
									<h6>
										New to MedTracker?{' '}
										<span className="ms-3">
											<a href="/signup">Signup</a>
										</span>
									</h6>
								</div>
							</Form>

							<Toaster className="col-10" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
