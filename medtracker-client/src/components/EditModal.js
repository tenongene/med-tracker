import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
// import { Link } from 'react-router-dom';
import axios from 'axios';
const _ = require('lodash');
const capitalizer = (input, indices) => {
	input = input.split(' ');
	input = input.map((word) => (word.length <= indices ? word.toUpperCase() : _.capitalize(word)));
	input = input.join(' ');
	return input;
};

const EditModal = ({ drugId, id, drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions }) => {
	//
	const { drugList, email, setDrugList } = useContext(UserContext);

	//
	const handleSubmit = async (e) => {
		e.preventDefault();
		//
		const updatedDrug = {
			drugName: capitalizer(drugName, 2),
			strengthUnit: _.lowerCase(strengthUnit),
			directions: _.capitalize(directions),
			drugStrength: drugStrength,
			refillsLeft: refillsLeft,
			drugInfo: capitalizer(drugInfo, 4),
			drugId: drugId,
		};

		//find index and replace
		const drugIndex = drugList.findIndex((drug) => {
			return drug.drugId === drugId;
		});

		await axios
			.patch('/user/edit', { drugIndex, email, updatedDrug })
			.then((response) => {
				setDrugList(response.data.response.Attributes.drugList);
			})
			.catch((error) => {
				console.log(error.message);
			});
		//
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
							<label htmlFor={`drugName${drugId}`} className="form-label">
								Drug Name
							</label>
							<input
								type="text"
								className="form-control"
								id={`drugName${drugId}`}
								defaultValue={drugName}
								onChange={(e) => {
									drugName = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`drugStrength${drugId}`} className="form-label">
								Strength
							</label>
							<input
								type="text"
								className="form-control"
								id={`drugStrength${drugId}`}
								defaultValue={drugStrength}
								onChange={(e) => {
									drugStrength = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`strengthUnit${drugId}`} className="form-label">
								Unit
							</label>
							<input
								type="text"
								className="form-control"
								id={`strengthUnit${drugId}`}
								defaultValue={strengthUnit}
								onChange={(e) => {
									strengthUnit = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`directions${drugId}`} className="form-label">
								Directions
							</label>
							<input
								type="text"
								className="form-control"
								id={`directions${drugId}`}
								defaultValue={directions}
								onChange={(e) => {
									directions = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`refillsLeft${drugId}`} className="form-label">
								Refills
							</label>
							<input
								type="text"
								className="form-control"
								id={`refillsLeft${drugId}`}
								defaultValue={refillsLeft}
								onChange={(e) => {
									refillsLeft = e.target.value;
								}}
							/>
						</div>
						<div className="mb-1">
							<label htmlFor={`indications${drugId}`} className="form-label">
								Indication
							</label>
							<input
								type="text"
								className="form-control"
								id={`indications${drugId}`}
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
						{/* <Link to={`/user/${uid}`}> */}
						<button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleSubmit}>
							<img src="../save.svg" alt="save" className="me-2" />
							Save changes
						</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
