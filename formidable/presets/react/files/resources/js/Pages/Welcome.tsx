type WelcomeProps = {
	formidableVersion?: string
	nodeVersion?: string
}

export default function Welcome({ formidableVersion, nodeVersion }: WelcomeProps) {
	return (
		<div className="container">
			<div className="content">
				<div className="logo">
					<img src="/formidable.png" />
				</div>

				<div className="welcome">
					<h4>Yey! You have successfully created a new Formidable project.</h4>
				</div>

				<div className="information">
					Formidable v{ formidableVersion ?? "undefined" } (Node { nodeVersion ?? "undefined" })
				</div>
			</div>
		</div>
	)
}
