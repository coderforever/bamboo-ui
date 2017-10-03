import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';

export const BAMBOO_NAVIGATION_ITEM = 'BAMBOO_NAVIGATION_ITEM';

const Item = () => null;

Item.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,

	onClick: PropTypes.func,
};


Item.contextTypes = {
	navigationVertical: PropTypes.bool,
};

Item[BAMBOO_NAVIGATION_ITEM] = BAMBOO_NAVIGATION_ITEM;

export default Item;
