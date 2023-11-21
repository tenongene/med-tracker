import { useState } from 'react';
import axios from 'axios';

const EntryForm = () => {
	////
	const [drugName, setDrugName] = useState('');
	const [drugStrength, setDrugStrength] = useState('');
	const [strengthUnit, setStrengthUnit] = useState('');
	const [directions, setDirections] = useState('');
	const [refillsLeft, setRefillsLeft] = useState('');
	const [indication, setIndication] = useState('');

	const handleSubmit = () => {
		const newDrug = {
			drugName: drugName,
			strengthUnit: strengthUnit,
			directions: directions,
			drugStrength: drugStrength,
			refillsLeft: refillsLeft,
			drugInfo: indication,
		};

		axios
			.post('/api/drugs', newDrug)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});

		setDrugName('');
		setDirections('');
		setDrugStrength('');
		setRefillsLeft('');
		setStrengthUnit('');
		setIndication('');

		console.log(newDrug);
	};

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
								Drug Name
							</label>
							<input
								type="text"
								className="form-control"
								id="drug-name"
								value={drugName}
								onChange={(e) => {
									setDrugName(e.target.value);
									console.log(e.target.value);
								}}
							/>
						</div>
						<div className="row">
							<div className="col mb-3">
								<label htmlFor="drug-strength" className="form-label">
									Strength
								</label>
								<input
									type="text"
									className="form-control"
									id="drug-strength"
									value={drugStrength}
									onChange={(e) => {
										setDrugStrength(e.target.value);
										console.log(e.target.value);
									}}
								/>
							</div>
							<div className="col mb-3">
								<label htmlFor="strength-unit" className="form-label">
									Unit
								</label>
								<input
									type="text"
									className="form-control"
									id="units"
									value={strengthUnit}
									onChange={(e) => {
										setStrengthUnit(e.target.value);
										console.log(e.target.value);
									}}
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="directions" className="form-label">
								Directions
							</label>
							<input
								type="text"
								className="form-control"
								id="directions"
								value={directions}
								onChange={(e) => {
									setDirections(e.target.value);
									console.log(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="refills" className="form-label">
								Refills
							</label>
							<input
								type="text"
								className="form-control"
								id="refills"
								value={refillsLeft}
								onChange={(e) => {
									setRefillsLeft(e.target.value);
									console.log(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="indication" className="form-label">
								Indication
								<i
									className="bi bi-info-circle ms-2"
									data-bs-placement="top"
									title="What is this medication treating?"></i>
							</label>
							<input
								type="text"
								className="form-control"
								id="indication"
								value={indication}
								onChange={(e) => {
									setIndication(e.target.value);
									console.log(e.target.value);
								}}
							/>
						</div>

						<a href="/">
							<button type="submit" className="btn btn-success" onClick={handleSubmit}>
								Submit
								<i className="bi bi-caret-right ps-2"></i>
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
