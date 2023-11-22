import axios from 'axios';
const _ = require('lodash');

const EditModal = ({ id, drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions, ident }) => {
	//
	const handleSubmit = () => {
		//
		const updatedDrug = {
			drugName: _.capitalize(drugName),
			strengthUnit: _.lowerCase(strengthUnit),
			directions: _.capitalize(directions),
			drugStrength: drugStrength,
			refillsLeft: refillsLeft,
			drugInfo: _.capitalize(drugInfo),
		};
		console.log(updatedDrug);

		axios
			.patch(`/api/drugs/${ident}`, updatedDrug)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="modal fade" tabIndex="-1" id={id} aria-labelledby="modal-title" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title" id="modal-title">
							Edit Drug
						</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						{/* =================EDIT MODAL FORM ====================== */}
						<div className="mb-1">
							<label htmlFor="drugName" className="form-label">
								Drug Name
							</label>
							<input
								type="text"
								className="form-control"
								id="drugName"
								defaultValue={drugName}
								onChange={(e) => {
									drugName = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor="drugStrength" className="form-label">
								Strength
							</label>
							<input
								type="text"
								className="form-control"
								id="drugStrength"
								defaultValue={drugStrength}
								onChange={(e) => {
									drugStrength = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor="strengthUnit" className="form-label">
								Unit
							</label>
							<input
								type="text"
								className="form-control"
								id="strengthUnit"
								defaultValue={strengthUnit}
								onChange={(e) => {
									strengthUnit = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor="directions" className="form-label">
								Directions
							</label>
							<input
								type="text"
								className="form-control"
								id="directions"
								defaultValue={directions}
								onChange={(e) => {
									directions = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor="refillsleft" className="form-label">
								Refills
							</label>
							<input
								type="text"
								className="form-control"
								id="refillsLeft"
								defaultValue={refillsLeft}
								onChange={(e) => {
									refillsLeft = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor="indication" className="form-label">
								Indication
							</label>
							<input
								type="text"
								className="form-control"
								id="indication"
								defaultValue={drugInfo}
								onChange={(e) => {
									drugInfo = e.target.value;
								}}
							/>
						</div>

						{/* =====================^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^======================== */}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
						<button type="button" className="btn btn-success" onClick={handleSubmit}>
							<img src="save.svg" alt="save" className="me-2" />
							<a href="/">Save changes</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
