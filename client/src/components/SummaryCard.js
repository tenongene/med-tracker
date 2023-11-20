const SummaryCard = () => {
	return (
		<div className="container">
			<div className="card border-secondary mt-5">
				<div className="card-header">
					<h4>Hello Bryson! </h4>
					<h5>Welcome to MedTracker</h5>
				</div>
				<div className="card-body">
					<h6 className="card-title">
						MedTracker makes it easy for you to enter and track all medications you are currently taking. You can also
						set reminders when your medication dose is due so you are always up to date with your dosing schedule!{' '}
					</h6>
					<div>
						<h6 className="card-text">
							<p>Here is a list of your medications below. </p>
							<div className="row"></div>
							<p></p>
							<h4>
								Total number of medications you are currently taking: <span class="badge bg-success ms-2">{5}</span>
							</h4>
						</h6>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryCard;
