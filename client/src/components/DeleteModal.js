import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const DeleteModal = ({ id, drugName, ident }) => {
	//
	const { uid, drugList } = useContext(UserContext);
	//

	const handleDelete = () => {
		//
		const newList = drugList.filter((drug) => {
			return drug.drugId !== ident;
		});
		axios
			.patch('/api/user/delete', newList)
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
						<button type="button" className="btn btn-danger" onClick={handleDelete}>
							<a href={`/user/${uid}`} style={{ textDecoration: 'none', color: 'white' }}>
								Delete Drug
							</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
