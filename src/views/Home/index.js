import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { A } from '../../../components';

import styles from './index.scss';

class Home extends React.Component {
	render() {
		return (
			<div>
				<h1>
					Bamboo UI
					<small> (dev)</small>
				</h1>
				<p className="lead">
					使用全新CSS及HTML特性构建的React现代游览器组件库。
					（启发自
					<A href="http://getbootstrap.com/" target="_blank">Bootstrap</A>
					，
					<A href="https://ant.design" target="_blank">ANT Design</A>
					）
				</p>

				<hr />

				<p>
					如果你想开发一款全新的web而不用考虑旧版游览器兼容性，
					那么赶紧开始吧！
				</p>

				<h2>
					自适应尺寸
				</h2>
				<p>
					我们为组件提供了<code>size</code>属性让你方便调整大小。
					此外，组件基于<code>em</code>单位为标准，
					因为你可以很方便的通过修改<code>font-size</code>
					来自定义大小。
				</p>

				<h2>
					更改主题
				</h2>
				<p>
					Bamboo UI通过CSS变量定义了7种颜色类型：
					<code>deprecated</code>,
					<code>primary</code>,
					<code>info</code>,
					<code>success</code>,
					<code>warning</code>,
					<code>danger</code>和
					<code>forbid</code>。
				</p>
				<p>
					如果你希望自定义颜色，你可以直接在CSS文件中改写这些变量而不需要重新编译：
				</p>
				<pre className="code">
					{`
body {
	--bmbo-duration-fast: 0.15s;
	--bmbo-duration: 0.25s;
	--bmbo-duration-mid: 0.4s;
	--bmbo-duration-slow: 1s;
	--bmbo-duration-slow-db: 2s;
	--bmbo-duration-turtle: 3s;

	--bmbo-lead: #374249;
	--bmbo-lead-active: #45A7B9;

	--bmbo-component-spacing: 5px;

	--bmbo-weak: $weak;
	--bmbo-deprecated: $deprecated;
	--bmbo-primary: $primary;
	--bmbo-info: $info;
	--bmbo-success: $success;
	--bmbo-warning: $warning;
	--bmbo-danger: $danger;
	--bmbo-forbid: $forbid;

	--bmbo-weak-light: lighten($weak, 10%);
	--bmbo-deprecated-light: lighten($deprecated, 10%);
	--bmbo-primary-light: lighten($primary, 10%);
	--bmbo-info-light: lighten($info, 10%);
	--bmbo-success-light: lighten($success, 10%);
	--bmbo-warning-light: lighten($warning, 7%);
	--bmbo-danger-light: lighten($danger, 10%);
	--bmbo-forbid-light: lighten($forbid, 10%);

	--bmbo-weak-dark: darken($weak, 10%);
	--bmbo-deprecated-dark: darken($deprecated, 10%);
	--bmbo-primary-dark: darken($primary, 10%);
	--bmbo-info-dark: darken($info, 10%);
	--bmbo-success-dark: darken($success, 10%);
	--bmbo-warning-dark: darken($warning, 10%);
	--bmbo-danger-dark: darken($danger, 10%);
	--bmbo-forbid-dark: darken($forbid, 10%);

	--bmbo-disabled-opacity: 0.5;

	--bmbo-xs: 12px;
	--bmbo-sm: 13px;
	--bmbo-md: 14px;
	--bmbo-lg: 18px;
	--bmbo-xl: 25px;

	--bmbo-padding-xs: 0 0.3em;
	--bmbo-padding-sm: 0.2em 0.6em;
	--bmbo-padding-md: 0.3em 0.8em;
	--bmbo-padding-lg: 0.3em 1em;
	--bmbo-padding-xl: 0.3em 2em;

	--bmbo-input-padding-xs: 0 0.1em;
	--bmbo-input-padding-sm: 0.2em 0.2em;
	--bmbo-input-padding-md: 0.3em 0.3em;
	--bmbo-input-padding-lg: 0.3em 0.3em;
	--bmbo-input-padding-xl: 0.3em 0.3em;

	--bmbo-color: #333;
	--bmbo-color-dim: #767676;
	--bmbo-color-light: #FFF;
	--bmbo-color-weak: #666;

	--bmbo-border: $border;
	--bmbo-border-dim: lighten($border, 15%);
	--bmbo-bac: #EEE;
	--bmbo-bac-dark: #DDD;

	--bmbo-gap: 15px;
	--bmbo-gap-small: 10px;

	--bmbo-shadow: 0 1px 3px rgba(#000, 0.1);

	--bmbo-component-margin: 15px;
}
					`.trim()}
				</pre>
			</div>
		);
	}
}

Home.propTypes = {
	filter: PropTypes.string,
	dispatch: PropTypes.func,
};

const mapState = ({ app: { filter } }) => ({
	filter,
});

export default connect(mapState)(cssModules(Home, styles));
