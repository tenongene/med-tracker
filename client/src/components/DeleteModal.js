import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const DeleteModal = ({ id, drugName, drugId }) => {
	//
	const { uid, drugList, email } = useContext(UserContext);
	//
	const handleDelete = async () => {
		//
		//find index and replace
		const drugIndex = drugList.findIndex((drug) => {
			return drug.M.drugId.S === drugId;
		});

		try {
			await axios
				.patch('/api/user/delete', { drugIndex, email })
				.then((response) => {
					return response;
				})
				.catch((error) => {
					throw Error(error);
				});
		} catch (error) {
			console.log(error.message);
		}

		return redirect(`/user/${uid}`);
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
						<a href={`/user/${uid}`}>
							<button type="button" className="btn btn-danger" onClick={handleDelete}>
								Delete Drug
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
