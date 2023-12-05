import Navbar from './Navbar';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {
	//
	const { error } = useContext(UserContext);
	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col-sm-12 shadow-md rounded">
						<div className="card border-secondary mt-5">
							<div className="card-header">
								<h4>
									<i className="bi bi-exclamation-triangle me-3 text-danger"></i>Application Error!{' '}
								</h4>
							</div>
							<div className="card-body">
								<h6 className="card-title">
									{/* <img src="../public/danger.svg" alt="" /> */}
									{error}

									<p className="mt-4">
										<button className="mt-4 btn btn-outline-secondary">
											<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
												Login
											</Link>
										</button>
									</p>
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorBoundary;
