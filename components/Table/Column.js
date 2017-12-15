import React from 'react';
import PropTypes from 'prop-types';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_TABLE_COLUMN = 'BAMBOO_TABLE_COLUMN';

const Column = () => null;

Column.propTypes = {
	title: PropTypes.node,
	render: PropTypes.func,
};

Column[BAMBOO_COMPONENT] = BAMBOO_TABLE_COLUMN;

export default Column;
