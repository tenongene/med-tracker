import axios from 'axios';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

// const deleteDrug = (id) => {
// 	axios
// 		.delete(`/api/drugs/${id}`)
// 		.then((response) => {
// 			console.log(response);
// 		})
// 		.catch((error) => {
// 			console.log(error.message);
// 		});
// };

const DrugCard = ({ drugName, drugInfo, strengthUnit, drugStrength, refillsLeft, directions, ident }) => {
	//
	const handleDelete = () => {
		axios
			.delete(`/api/drugs/${ident}`)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.message);
			});
		// deleteDrug(ident);
	};

	return (
		<div className="col-sm-12 col-md-6 col-lg-4 shadow-md rounded">
			<div className="card card border-secondary mt-4">
				<div className="card-body">
					<div className="edit-del">
						<button
							type="button"
							className="btn btn-outline-light shadow-none"
							data-bs-toggle="modal"
							data-bs-target="#edit">
							<img src="edit.svg" alt="edit" data-bs-placement="top" title="edit drug" />
						</button>
						<EditModal
							id="edit"
							ident={ident}
							drugName={drugName}
							drugInfo={drugInfo}
							strengthUnit={strengthUnit}
							drugStrength={drugStrength}
							refillsLeft={refillsLeft}
							directions={directions}
						/>
						<button
							type="button"
							className="btn btn-outline-light shadow-none"
							data-bs-toggle="modal"
							data-bs-target="#delete">
							<img src="trash.svg" alt="delete" data-bs-placement="top" title="delete drug" />
						</button>

						<DeleteModal id="delete" drugName={drugName} handleDelete={handleDelete} ident={ident} />
					</div>
					<h4 className="card-title mt-1">
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
							<img src="bell.svg" alt="reminder" />
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
