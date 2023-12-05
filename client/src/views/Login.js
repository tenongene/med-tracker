import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Form, redirect } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

//Axios instance
let accessToken;
export const axiosRequest = axios.create({
	// baseURL: 'http://localhost:3000',
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
});
//

const errorNotify = (input) => toast.error(input);
const successNotify = (input) => toast.success(input);

//
export const Login = () => {
	//
	const { email, password, setEmail, setPassword } = useContext(UserContext);

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
							{/* // */}
							{/* Action definition */}
							<Form className="p-3" method="POST" action="/">
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

//action from <Form> element
export const submitAction = async ({ request }) => {
	//
	let uid;
	try {
		const data = await request.formData();
		const payload = {
			email: data.get('inputEmail'),
			password: data.get('inputPassword'),
		};

		await axios
			.post('/api/user/login', payload)
			.then((response) => {
				accessToken = response.data.accessToken;
				uid = response.data.id;
				successNotify('User Logged In Successfully!');
				console.log(response);
			})
			.catch((error) => {
				error.response.data.msg ? errorNotify(error.response.data.msg) : errorNotify(error.response.data.error);
				console.log({ error: error.response.data.error, msg: error.response.data.msg });
				redirect('/user/undefined');
			});
	} catch (error) {
		console.log(error.message);
	}
	return redirect(`/user/${uid}`);
};
