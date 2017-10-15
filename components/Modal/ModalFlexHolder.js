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

	lockDialog = (index, lock = true) => {
		this.setState(({ list }) => {
			const newList = list.concat();
			newList[index] = {
				...list[index],
				lock,
			};

			return { list: newList };
		});
	};

	hideDialog = (index) => {
		this.setState(({ list }) => {
			const newList = list.concat();
			newList[index] = {
				...list[index],
				visible: false,
			};

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
					const { config, visible, lock } = dialog;
					const { onClose, onConfirm } = config;

					const closeWrapper = (func) => {
						let ret;
						if (func) ret = func();

						this.lockDialog(index, true);

						Promise.resolve(ret).then((close) => {
							if (close === false) {
								this.lockDialog(index, false);
								return;
							}

							this.hideDialog(index);
						}).catch(() => {
							this.lockDialog(index, false);
						});
					};

					const props = {
						onClose: () => {
							closeWrapper(onClose);
						},
						onClosed: () => {
							this.removeDialog(index);
						},
					};

					if (onConfirm) {
						props.onConfirm = () => {
							closeWrapper(onConfirm);
						};
					}

					return (
						<Modal
							key={index}
							{...config}

							visible={visible}
							lock={lock}
							{...props}
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
