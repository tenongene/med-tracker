import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const DeleteModal = ({ id, drugName, drugId }) => {
	//
	const { drugList, email, setDrugList } = useContext(UserContext);
	//
	const handleDelete = async (e) => {
		e.preventDefault();

		//find index to delete
		const drugIndex = drugList.findIndex((drug) => {
			return drug.drugId === drugId;
		});

		await axios
			.patch('/user/delete', { drugIndex, email })
			.then((response) => {
				setDrugList(response.data.response.Attributes.drugList);
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
							Delete confirmation
						</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p> Are you sure you want to delete {drugName}?</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
						{/* <Link to={`/user/${uid}`}> */}
						<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>
							Delete Drug
						</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
