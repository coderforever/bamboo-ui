import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

const Input = props => (
	<input
		className="bmbo-form-control"
		{...props}
	/>
);

Input.propTypes = {};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
