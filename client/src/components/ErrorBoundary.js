import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {
	// const error = useRouteError();

	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col-sm-12 shadow-md rounded">
						<div className="card border-secondary mt-5">
							<div className="card-header">
								<h4>Application Error! </h4>
							</div>
							<div className="card-body">
								<h6 className="card-title">
									Something Went Wrong. Please <Link to="/">Login</Link> again to restart application.
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
