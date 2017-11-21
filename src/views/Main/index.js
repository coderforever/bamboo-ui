import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Home from '../Home';
import withSideBar from '../Components';
import GridPage from '../Components/GridPage';
import ButtonPage from '../Components/ButtonPage';
import IconPage from '../Components/IconPage';
import SliderPage from '../Components/SliderPage';
import MenuPage from '../Components/MenuPage';
import GroupPage from '../Components/GroupPage';
import ModalPage from '../Components/ModalPage';
import NavPage from '../Components/NavPage';
import CurtainPage from '../Components/CurtainPage';
import ProgressPage from '../Components/ProgressPage';
import TooltipPage from '../Components/TooltipPage';
import DynamicNumberPage from '../Components/DynamicNumberPage';
import DynamicStringPage from '../Components/DynamicStringPage';
import AutoCompletePage from '../Components/AutoCompletePage';
import SelectPage from '../Components/SelectPage';
import TablePage from '../Components/TablePage';
import LabelPage from '../Components/LabelPage';
import DatePickerPage from '../Components/DatePickerPage';

import Navigation from '../../../components/Nav';

import styles from './index.scss';

const isProd = process.env.NODE_ENV === 'production';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	goPage = (path) => {
		const { history: { push } } = this.props;
		push(path);
	};

	render() {
		return (
			<div>
				<Navigation>
					<Navigation.Item>
						<Link to="/">Home</Link>
					</Navigation.Item>
					<Navigation.Item>
						<Link to="/grid">Components</Link>
					</Navigation.Item>
				</Navigation>

				<div id="content">
					<Route exact path="/" component={Home} />
					<Route path="/grid" component={withSideBar(GridPage)} />
					<Route path="/button" component={withSideBar(ButtonPage)} />
					<Route path="/icon" component={withSideBar(IconPage)} />
					<Route path="/slider" component={withSideBar(SliderPage)} />
					<Route path="/menu" component={withSideBar(MenuPage)} />
					<Route path="/group" component={withSideBar(GroupPage)} />
					<Route path="/modal" component={withSideBar(ModalPage)} />
					<Route path="/nav" component={withSideBar(NavPage)} />
					<Route path="/curtain" component={withSideBar(CurtainPage)} />
					<Route path="/progress" component={withSideBar(ProgressPage)} />
					<Route path="/tooltip" component={withSideBar(TooltipPage)} />
					<Route path="/dynamic_number" component={withSideBar(DynamicNumberPage)} />
					<Route path="/dynamic_string" component={withSideBar(DynamicStringPage)} />
					<Route path="/auto_complete" component={withSideBar(AutoCompletePage)} />
					<Route path="/select" component={withSideBar(SelectPage)} />
					<Route path="/table" component={withSideBar(TablePage)} />
					<Route path="/label" component={withSideBar(LabelPage)} />
					<Route path="/date_picker" component={withSideBar(DatePickerPage)} />
				</div>
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(connect()(cssModules(Main, styles)));
