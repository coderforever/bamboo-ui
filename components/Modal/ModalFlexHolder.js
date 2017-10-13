import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

class ModalFlexHolder extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
		};
	}

	showDialog = (config) => {
		this.setState(({ list }) => ({
			list: [...list, {
				visible: true,
				config,
			}],
		}));
	};

	hideDialog = (index) => {
		this.setState(({ list }) => {
			const newList = list.concat();
			const newDialog = {
				...list[index],
				visible: false,
			};
			newList[index] = newDialog;

			return { list: newList };
		});
	};

	removeDialog = (index) => {
		this.setState(({ list }) => {
			const dialog = list[index];
			return {
				list: list.filter(d => d !== dialog),
			};
		});
	};

	render() {
		const { list } = this.state;

		return (
			<div>
				{list.map((dialog, index) => {
					const { config, visible } = dialog;
					const { onClose, onConfirm } = this.props;

					return (
						<Modal
							key={index}
							{...config}

							visible={visible}
							onClose={() => {
								this.hideDialog(index);
							}}
							onClosed={() => {
								this.removeDialog(index);
							}}
						/>
					);
				})}
			</div>
		);
	}
}

ModalFlexHolder.propTypes = {
};

export default ModalFlexHolder;
