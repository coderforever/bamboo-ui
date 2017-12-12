import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_FORM_RADIO } from './Radio';
import { BAMBOO_FORM_CHECKBOX } from './Checkbox';
import { BAMBOO_FORM_INPUT } from './Input';

import { mapChildrenForNode, BAMBOO_COMPONENT } from '../utils/componentUtil';
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
		const { formInstance } = this.context;

		if (formInstance) {
			return getValue(formInstance, ['state', ...this.getPath()]);
		}
		return this.props.value || this.state.value;
	};

	getList = () => {
		const { formInstance, onFormChanged } = this.context;
		const { title, children } = this.props;
		const myValue = this.getValue();

		return mapChildrenForNode(children, (node) => {
			const { props = {} } = node;

			if (node.type[BAMBOO_COMPONENT] === BAMBOO_FORM_RADIO) {
				// ==================== Radio ====================
				const nodeValue = props.value !== undefined ? props.value : props.children;

				return React.cloneElement(node, {
					'aria-label': props.ariaLabel || title,
					onClick: (...args) => {
						if (props.onClick) props.onClick(...args);

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), () => nodeValue)
							), onFormChanged);
						} else {
							this.setState({ value: nodeValue }, onFormChanged);
						}
					},
					checked: myValue === nodeValue,
				});
			} else if (node.type[BAMBOO_COMPONENT] === BAMBOO_FORM_CHECKBOX) {
				// ================== Check Box ==================
				return React.cloneElement(node, {
					'aria-label': props.ariaLabel || title,
					onClick: (...args) => {
						if (props.onClick) props.onClick(...args);

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), value => !value)
							), onFormChanged);
						} else {
							this.setState(({ value }) => ({ value: !value }), onFormChanged);
						}
					},
					checked: myValue,
				});
			} else if (node.type[BAMBOO_COMPONENT] === BAMBOO_FORM_INPUT) {
				// ==================== Input ====================
				return React.cloneElement(node, {
					value: props.value !== undefined ? props.value : myValue,
					'aria-label': props.ariaLabel || title,
					onChange: (...args) => {
						if (props.onChange) props.onChange(...args);

						let newVal = args[0].target.value;

						if (props.type === 'number') newVal = Number(newVal);

						if (formInstance) {
							formInstance.setState(preState => (
								updateValue(preState, this.getPath(), () => newVal)
							), onFormChanged);
						} else {
							this.setState({ value: newVal }, onFormChanged);
						}
					},
				});
			}

			// ==================== Rest =====================
			return React.cloneElement(node, {
				value: myValue,
				'aria-label': props.ariaLabel || title,
				onChange: (...args) => {
					if (props.onChange) props.onChange(...args);

					const newVal = args[0].target.value;

					if (formInstance) {
						formInstance.setState(preState => (
							updateValue(preState, this.getPath(), () => newVal)
						), onFormChanged);
					} else {
						this.setState({ value: newVal }, onFormChanged);
					}
				},
			});
		});
	};

	render() {
		const { name, title, className, ...props } = this.props;

		delete props.value;
		delete props.defaultValue;

		const list = this.getList();

		return (
			<div className={classNames('bmbp-form-field', className)} {...props}>
				{title !== undefined &&
					<label htmlFor={name}>
						{title}
					</label>
				}
				{list}
			</div>
		);
	}
}

Field.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	name: PropTypes.string,
	title: PropTypes.string,
	value: PropTypes.node,
	defaultValue: PropTypes.node,
};

Field.contextTypes = {
	formInstance: PropTypes.object,
	formPath: PropTypes.array,
	onFormChanged: PropTypes.func,
};

export default Field;
