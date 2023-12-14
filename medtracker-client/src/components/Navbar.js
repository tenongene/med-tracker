import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import toast from 'react-hot-toast';
//
const successNotify = (input) => toast.success(input);

const Navbar = () => {
	const { email } = useContext(UserContext);

	const handleLogout = () => {
		successNotify('User Logged Out!');
		localStorage.clear();
	};
	return (
		<nav className="navbar bg-info-subtle">
			<div className="container ">
				<img src="../mt3.jpg" className="object-fit-fill border rounded" height="100" width="100" alt="logo"></img>
				<a href="/home" style={{ textDecoration: 'none', color: 'darkcyan' }}>
					<h4 className="fw-bold ">
						<em>MedTracker</em>
					</h4>
				</a>
				<div>
					<p className="text-success">{email}</p>

					<a href="/" style={{ textDecoration: 'none' }} className="text-success">
						<button type="button" className="btn btn-sm btn-outline-success me-4 logout" onClick={handleLogout}>
							Logout
						</button>
					</a>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
