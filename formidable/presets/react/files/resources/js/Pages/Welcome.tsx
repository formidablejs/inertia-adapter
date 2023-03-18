import { useState } from "react"

type WelcomeProps = {
	formidableVersion?: string
	nodeVersion?: string
}

export default function Welcome({ formidableVersion, nodeVersion }: WelcomeProps) {
	const [ counter, setCounter ] = useState(0)

	return (
		<div className="container">
			<div className="content">
				<div className="logo">
					<img src="/formidable.png" />
					<p>+</p>
					<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
				</div>

				<div className="welcome">
					<h4>Yey! You have successfully created a new Formidable project.</h4>
				</div>

				<div className="counter">
					<button onClick={() => setCounter(counter + 1)}>
						Clicked {counter} times
					</button>
				</div>

                <ul className="links">
					<li>
						<a href="https://formidablejs.org/"target="_blank" rel="noopener"> Formidable </a>
					</li>

					<li>
						<a href="https://react.dev/"target="_blank" rel="noopener"> React </a>
					</li>

					<li>
						<a href="https://github.com/formidablejs"target="_blank" rel="noopener"> Github </a>
					</li>

					<li>
						<a href="https://twitter.com/formidablejs"target="_blank" rel="noopener"> Twitter </a>
					</li>
				</ul>

				<div className="information">
					Formidable v{ formidableVersion ?? "undefined" } (Node { nodeVersion ?? "undefined" })
				</div>
			</div>
		</div>
	)
}
