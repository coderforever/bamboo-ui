import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Field from './Field';

class Form extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getChildContext() {
		const { path = [] } = this.props;

		return {
			formInstance: this.getInstance(),
			formPath: Array.isArray(path) ? path : [path],
			onFormChanged: this.onFormChanged,
		};
	}

	onFormChanged = () => {
		const { onChanged } = this.props;
		if (onChanged) onChanged();
	};

	getInstance = () => this.props.instance || this;

	render() {
		const { children, className, ...props } = this.props;

		delete props.instance;
		delete props.path;
		delete props.onChanged;

		return (
			<div className={classNames('bmbo-form', className)} {...props}>
				{children}
			</div>
		);
	}
}

Form.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	instance: PropTypes.object,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	onChanged: PropTypes.func,
};

Form.childContextTypes = {
	formInstance: PropTypes.object,
	formPath: PropTypes.array,
	onFormChanged: PropTypes.func,
};

Form.Field = Field;

export default Form;
