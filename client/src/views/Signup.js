import { useState } from 'react';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');

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
									<label htmlFor="inputFirstName" className="form-label">
										First Name
									</label>
									<input
										type="text"
										className="form-control"
										id="inputFirstName"
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
									/>
								</div>
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
									Sign Up
									<img src="send-ico.svg" alt="signup" className="ms-2" />
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
