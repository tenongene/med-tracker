const DrugCard = ({ drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions }) => {
	return (
		<div className="col-sm-12 col-md-6 col-lg-4 shadow-md rounded">
			<div className="card card border-secondary mt-4">
				<div className="card-body">
					<div className="edit-del">
						<a href="/edit">
							<img src="edit.svg" alt="edit" data-bs-placement="top" title="edit drug" />
						</a>
						<span className="ms-2 me-2 text-white">|</span>
						<a href="/delete">
							<img src="trash.svg" alt="delete" data-bs-placement="top" title="delete drug" />
						</a>
					</div>
					<h4 className="card-title mt-3">
						{drugName}{' '}
						<span className="ms-2">
							{drugStrength}
							{strengthUnit}
						</span>
					</h4>
					<p className="card-text">{directions}</p>
					<p>
						<span className="ms-1">{refillsLeft} refills left</span>
					</p>
					<a href="/">
						<span className="badge bg-success tt" data-bs-placement="top" title="set reminder">
							<i className="bi bi-bell p-2 pb-5"></i>
						</span>
					</a>
					<a href="/" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
						<span className="badge text-bg-primary ms-5" data-bs-placement="top" title="click for drug information">
							{drugInfo}
							<i className="bi bi-info-circle ms-2"></i>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default DrugCard;
