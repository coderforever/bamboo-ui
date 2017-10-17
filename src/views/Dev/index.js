import React from 'react';
import $ from 'jquery';

class Dev extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {

		return (
			<div>
				<section className="content-header">
					<h1>
						Dev
						<small>This is a dev page.</small>
					</h1>
				</section>
				<section className="content" />
			</div>
		);
	}
}

Dev.propTypes = {
};

export default Dev;
