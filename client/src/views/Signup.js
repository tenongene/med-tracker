import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const successNotify = (input) => toast.success(input);
const errorNotify = (input) => toast.error(input);

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [passMatch, setPassMatch] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== passMatch) {
			errorNotify('Passwords do not match!');
			setPassMatch('');
		}
		axios
			.post('/api/user/signup', { firstName, email, password })
			.then((response) => {
				successNotify(response.data.msg);
				localStorage.setItem('user', JSON.stringify(response));
				console.log(response);
			})
			.catch((error) => {
				error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
				console.log({ error: error.response.data.error, msg: error.response.data.msg });
				console.log(error.message);
			});

		setEmail('');
		setPassword('');
		setFirstName('');
		setPassMatch('');
	};

	return (
		<div className="container ">
			<div className="row justify-content-center ">
				<div className="col-sm-12 col-md-8 col-lg-10">
					<div className="card border border-info-subtle rounded-4 shadow-lg">
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
							<form className="p-3" onSubmit={handleSubmit}>
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
										autoComplete="email"
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
										autoComplete="current-password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="passmatch" className="form-label">
										Re-enter Password
									</label>
									<input
										type="password"
										className="form-control"
										id="passmatch"
										autoComplete="new-password"
										onChange={(e) => setPassMatch(e.target.value)}
										value={passMatch}
									/>
								</div>
								<p className="text-danger">{passMatch === password ? '' : 'Passwords do not match!'}</p>
								<button type="submit" className="btn btn-success mt-3" onSubmit={handleSubmit} id="signup-trigger">
									Sign Up
									<img src="send-ico.svg" alt="signup" className="ms-2" />
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<Toaster />
		</div>
	);
};

export default Signup;
