import { useState } from 'react';

const EntryForm = () => {
	////
	const [drugName, setDrugName] = useState('');
	const [drugStrength, setDrugStrength] = useState('');
	const [strengthUnit, setStrengthUnit] = useState('');
	const [directions, setDirections] = useState('');
	const [refillsLeft, setRefillsLeft] = useState('');
	const [indication, setIndication] = useState('');

	return (
		<div>
			<p>
				<button
					type="button"
					className="btn btn-success"
					data-bs-toggle="collapse"
					data-bs-target="#drugEntry"
					aria-expanded="false"
					aria-controls="drugEntry">
					<i className="bi bi-plus-lg me-2"></i>Add New Drug
				</button>
			</p>

			<div className="collapse show" id="drugEntry">
				<div className="card card-body">
					{/* / */}
					{/* =====================FORM========================= */}

					<form>
						<div className="mb-3">
							<label htmlFor="drug-name" className="form-label">
								{drugName}
							</label>
							<input type="text" className="form-control" id="drug-name" />
						</div>
						<div className="row">
							<div className="col mb-3">
								<label htmlFor="drug-strength" className="form-label">
									{drugStrength}
								</label>
								<input type="text" className="form-control" id="drug-strength" />
							</div>
							<div className="col mb-3">
								<label htmlFor="strength-unit" className="form-label">
									{strengthUnit}
								</label>
								<input type="text" className="form-control" id="units" />
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="directions" className="form-label">
								{directions}
							</label>
							<input type="text" className="form-control" id="directions" />
						</div>
						<div className="mb-3">
							<label htmlFor="refills" className="form-label">
								{refillsLeft}
							</label>
							<input type="text" className="form-control" id="refills" />
						</div>
						<div className="mb-3">
							<label htmlFor="indication" className="form-label">
								{indication}
								<i
									className="bi bi-info-circle ms-2"
									data-bs-placement="top"
									title="What is this medication treating?"></i>
							</label>
							<input type="text" className="form-control" id="indication" />
						</div>

						<a href="/">
							<button type="submit" className="btn btn-success">
								Submit
								<i class="bi bi-caret-right ps-2"></i>
							</button>
						</a>
					</form>

					{/* ====================^^^^^^^^========================= */}
				</div>
			</div>
		</div>
	);
};

export default EntryForm;
