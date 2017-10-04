import React from 'react';
import PropTypes from 'prop-types';

import { BAMBOO_FORM_RADIO } from './Radio';
import { BAMBOO_FORM_CHECKBOX } from './Checkbox';
import { BAMBOO_FORM_INPUT } from './Input';

import { mapChildrenForNode } from '../utils/componentUtil';
import { getValue, updateValue } from '../utils/pathUtil';

class Field extends React.Component {
	constructor() {
		super();
		this.state = {
			value: null,
		};
	}

	componentWillMount() {
		const { defaultValue } = this.props;
		this.setState({ value: defaultValue });
	}

	getPath = () => {
		const { formPath } = this.context;
		const { name } = this.props;

		return [...formPath, Array.isArray(name) ? name : [name]];
	};

	getValue = () => {
		const { formInstance, formPath } = this.context;
		const { name } = this.props;

		if (formInstance) {
			return getValue(formInstance, ['state', ...this.getPath()]);
		}
		return this.props.value || this.state.value;
	};

	getList = () => {
		const { formInstance } = this.context;
		const { children } = this.props;
		const myValue = this.getValue();

		return mapChildrenForNode(children, (node) => {
			const { props = {} } = node;

			if (node.type[BAMBOO_FORM_RADIO] === BAMBOO_FORM_RADIO) {
				// ==================== Radio ====================
				return React.cloneElement(node, {
					onClick: (...args) => {
						if (props.onClick) props.onClick(...args);

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), () => props.value)
							));
						} else {
							this.setState({ value: props.value });
						}
					},
					checked: myValue === props.value,
				});
			} else if (node.type[BAMBOO_FORM_CHECKBOX] === BAMBOO_FORM_CHECKBOX) {
				// ================== Check Box ==================
				return React.cloneElement(node, {
					onClick: (...args) => {
						if (props.onClick) props.onClick(...args);

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), value => !value)
							));
						} else {
							this.setState(({ value }) => ({ value: !value }));
						}
					},
					checked: myValue,
				});
			} else if (node.type[BAMBOO_FORM_INPUT] === BAMBOO_FORM_INPUT) {
				// ==================== Input ====================
				return React.cloneElement(node, {
					value: myValue,
					onChange: (...args) => {
						if (props.onChange) props.onChange(...args);

						const newVal = args[0].target.value;

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), () => newVal)
							));
						} else {
							this.setState({ value: newVal });
						}
					},
				});
			}

			// ==================== Rest =====================
			return React.cloneElement(node, {
				value: myValue,
				onChange: (...args) => {
					if (props.onChange) props.onChange(...args);

					const newVal = args[0].target.value;

					if (formInstance) {
						formInstance.setState(preState => (
							updateValue(preState, this.getPath(), () => newVal)
						));
					} else {
						this.setState({ value: newVal });
					}
				},
			});
		});
	};

	render() {
		const { name, title } = this.props;

		const list = this.getList();

		return (
			<div className="bmbp-form-field">
				<label htmlFor={name}>
					{title}
				</label>
				{list}
			</div>
		);
	}
}

Field.propTypes = {
	children: PropTypes.node,

	name: PropTypes.string,
	title: PropTypes.string,
	value: PropTypes.node,
	defaultValue: PropTypes.node,
};

Field.contextTypes = {
	formInstance: PropTypes.object,
	formPath: PropTypes.array,
};

export default Field;
