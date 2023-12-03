import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import EntryForm from './EntryForm';

const SummaryCard = () => {
	const { count, firstName, emptyList } = useContext(UserContext);

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12 shadow-md rounded">
					<div className="card border-secondary mt-5">
						<div className="card-header">
							<h4>Hello {firstName}! </h4>
							<h5>Welcome to MedTracker</h5>
						</div>
						<div className="card-body">
							<h6 className="card-title">
								MedTracker makes it easy for you to enter and track all medications you are currently taking. You can
								also set reminders when your medication dose is due so you are always up to date with your dosing
								schedule!{' '}
							</h6>
							<div>
								<h6 className="card-text">
									<p>Here is a list of your medications below. </p>
									<div className="row"></div>
								</h6>
								<h4>
									Total number of medications you are currently taking:{' '}
									<span className="badge bg-success ms-2">{count}</span>
								</h4>
								<div className="add-drug mt-5">
									<h5 className="mb-4 text-danger">
										<em>{!count && emptyList}</em>
									</h5>
									<p>
										<button
											type="button"
											className="btn btn-success mb-3"
											data-bs-toggle="collapse"
											data-bs-target="#drugEntry"
											aria-expanded="false"
											aria-controls="drugEntry">
											<img src="../plus.svg" alt="add" className="me-2" />
											Add New Drug
										</button>
									</p>
									<EntryForm id="drugEntry" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryCard;
