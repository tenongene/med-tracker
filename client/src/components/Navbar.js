const Navbar = () => {
	return (
		<nav className="navbar bg-info-subtle">
			<div className="container">
				<img src="mt3.jpg" className="object-fit-fill border rounded" height="100" width="100" alt="logo"></img>
				<a href="/" style={{ textDecoration: 'none', color: 'darkcyan' }}>
					<h4 className="fw-bold">
						<em>MedTracker</em>
					</h4>
				</a>
				<img src="profile.svg" alt="profile-icon" height="40" width="40" />
			</div>
		</nav>
	);
};

export default Navbar;
