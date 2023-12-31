
//

const Footer = () => {
	return (
		<footer className="footer bg-info-subtle ">
			<div className="row justify-content-center container-lg"></div>
			<div className="text-center mt-5">
				<p className="fw-bold mb-1" style={{ textDecoration: 'none', color: 'darkcyan', fontSize: '16px' }}>
					<em>React Full Stack Application by T. Enongene (DevProjects Challenge) &copy; 2023</em>
				</p>
				<p className="fw-bold mb-1" style={{ textDecoration: 'none', color: 'darkcyan', fontSize: '16px' }}>
					<em>Frontend: AWS Amplify Serverless, linked to Github repository for CI/CD.</em>
				</p>
				<p className="fw-bold ms-2" style={{ textDecoration: 'none', color: 'darkcyan', fontSize: '16px' }}>
					<em>Backend: NodeJS/Express API with AWS DynamoDB. Deployment: AWS Serverless with Lambda Function</em>
				</p>
			</div>
		</footer>
	);
};
export default Footer;
