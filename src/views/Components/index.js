import React from 'react';
import { Row, Col, Navigation } from '../../../components';
import { Link } from 'react-router-dom';

export default (Component) => {
	const $sidebar = (
		<Navigation vertical>
			<Navigation.Item>
				<Link to="/grid">Grid</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/button">Button</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/icon">Icon</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/slider">Slider</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/menu">Menu</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/group">Group</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/modal">Modal</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/nav">Navigation</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/curtain">Curtain</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/progress">Progress</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/tooltip">Tooltip</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/dynamic_number">Dynamic Number</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/dynamic_string">Dynamic String</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/auto_complete">Auto Complete</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/select">Select</Link>
			</Navigation.Item>
			<Navigation.Item>
				<Link to="/table">Table</Link>
			</Navigation.Item>
		</Navigation>
	);

	return () => (
		<Row>
			<Col xs="1/3" md="1/4" lg="1/5">
				{$sidebar}
			</Col>
			<Col xs="2/3" md="3/4" lg="4/5">
				<Component />
			</Col>
		</Row>
	);
};
