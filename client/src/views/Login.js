import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<div className="container ">
			<div className="row justify-content-center ">
				<div className="col-sm-12 col-md-8 col-lg-10">
					<div className="card">
						<div>
							<img src="mt3.jpg" className="entryLogo" alt="logo" />
							<h2>MedTracker</h2>
						</div>
						<div className="card-body">
							<form>
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
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
								</div>
								<button type="submit" className="btn btn-success" onSubmit={handleSubmit}>
									Log in
									<img src="send-ico.svg" alt="signup" className="ms-2" />
								</button>
								<div className="signup mt-5">
									<h6>
										New to MedTracker?{' '}
										<span className="ms-3">
											<a href="/signup">
												<button type="submit" className="btn btn-sm btn-success">
													Signup
													<img src="send-ico.svg" alt="signup" className="ms-2" />
												</button>
											</a>
										</span>
									</h6>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
