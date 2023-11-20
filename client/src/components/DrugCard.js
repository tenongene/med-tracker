const DrugCard = () => {
	return (
		<div className="container">
			<div className="row">
				{/* //cards=================>>> */}
				<div className="col-4">
					<div className="card card border-secondary mt-4">
						<div className="card-body">
							<h4 className="card-title">Amlodipine 10mg</h4>
							<p className="card-text">Take 1 tablet by mouth daily</p>
							<p>
								5 <span className="ms-1">Refills Left</span>
							</p>
							<a href="/">
								<span className="badge bg-success">
									<i className="bi bi-bell p-2 pb-5"></i>
								</span>
							</a>

							<a href="/" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
								<span class="badge text-bg-primary ms-5">
									Blood Pressure<i className="bi bi-info-square ms-2"></i>
								</span>
							</a>
						</div>
					</div>
				</div>
				{/* //==========================>>> */}
			</div>
		</div>
	);
};

export default DrugCard;
