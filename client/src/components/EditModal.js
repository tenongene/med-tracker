import axios from 'axios';
const _ = require('lodash');

const EditModal = ({ ident, id, drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions }) => {
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
							<label htmlFor={`drugName${ident}`} className="form-label">
								Drug Name
							</label>
							<input
								type="text"
								className="form-control"
								id={`drugName${ident}`}
								defaultValue={drugName}
								onChange={(e) => {
									drugName = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`drugStrength${ident}`} className="form-label">
								Strength
							</label>
							<input
								type="text"
								className="form-control"
								id={`drugStrength${ident}`}
								defaultValue={drugStrength}
								onChange={(e) => {
									drugStrength = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`strengthUnit${ident}`} className="form-label">
								Unit
							</label>
							<input
								type="text"
								className="form-control"
								id={`strengthUnit${ident}`}
								defaultValue={strengthUnit}
								onChange={(e) => {
									strengthUnit = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`directions${ident}`} className="form-label">
								Directions
							</label>
							<input
								type="text"
								className="form-control"
								id={`directions${ident}`}
								defaultValue={directions}
								onChange={(e) => {
									directions = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`refillsLeft${ident}`} className="form-label">
								Refills
							</label>
							<input
								type="text"
								className="form-control"
								id={`refillsLeft${ident}`}
								defaultValue={refillsLeft}
								onChange={(e) => {
									refillsLeft = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`indications${ident}`} className="form-label">
								Indication
							</label>
							<input
								type="text"
								className="form-control"
								id={`indications${ident}`}
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
							<img src="../save.svg" alt="save" className="me-2" />
							<a href="/" style={{ textDecoration: 'none', color: 'white' }}>
								Save changes
							</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
