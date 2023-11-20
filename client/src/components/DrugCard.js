const DrugCard = ({ drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions }) => {
	return (
		<div className="col-sm-12 col-md-6 col-lg-4">
			<div className="card card border-secondary mt-4">
				<div className="card-body">
					<h4 className="card-title">
						{drugName}{' '}
						<span className="ms-2">
							{drugStrength}
							{strengthUnit}
						</span>
					</h4>
					<p className="card-text">{directions}</p>
					<p>
						<span className="ms-1">{refillsLeft} refills</span>
					</p>
					<a href="/">
						<span className="badge bg-success">
							<i className="bi bi-bell p-2 pb-5"></i>
						</span>
					</a>

					<a href="/" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
						<span className="badge text-bg-primary ms-5">
							{drugInfo}
							<i className="bi bi-info-square ms-2"></i>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default DrugCard;
