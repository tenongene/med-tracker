import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { User } from './User';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const errorNotify = (input) => toast.error(input);
const successNotify = (input) => toast.success(input);

//
export const Login = () => {
	//
	const {
		email,
		password,
		setEmail,
		setPassword,
		setUid,
		setDrugList,
		setCount,
		accessToken,
		setAccessToken,
		setFirstName,
	} = useContext(UserContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('/user/login', { email, password })
			.then((response) => {
				console.log(response);
				setUid(response.data.id);
				setDrugList(response.data.drugList);
				setAccessToken(response.data.accessToken);
				setFirstName(response.data.user);
				setCount(response.data.drugList.length);
				successNotify('User Logged In Successfully!');
				window.localStorage.setItem('accessToken', `${response.data.accessToken}`);
			})
			.catch((error) => {
				console.log({ error: error.response.data.error, msg: error.response.data.msg });
				error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
			});
	};

	return (
		<>
			{' '}
			{accessToken ? (
				<User />
			) : (
				<div className="container ">
					<div className="row justify-content-center ">
						<div className="col-sm-12 col-md-8 col-lg-10">
							<div className="card-login border border-info-subtle rounded-4 shadow-lg">
								<div className="container">
									<div className="row">
										<img src="mt3.jpg" className="entryLogo" alt="logo" />

										<div className="col  align-self-center">
											<a href="/">
												<h1 className="fw-bold d-inline-flex m-5" style={{ textDecoration: 'none', color: 'darkcyan' }}>
													<em>MedTracker</em>
												</h1>
											</a>

											<h5 className="pt-2">
												<em>Manage and track all your medications seamlessly!</em>
											</h5>
										</div>
									</div>
								</div>
								<div className="card-body">
									<form className="p-3" onSubmit={handleSubmit}>
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
													<a href="/signup">Sign Up</a>
												</span>
											</h6>
										</div>
									</form>
									<Toaster className="col-10" />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
