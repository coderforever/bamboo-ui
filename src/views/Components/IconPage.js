import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon,
} from '../../../components';

import { toString } from '../../utils/objectUtil';
import Select from "../../../components/Form/Select";

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			direct: 'right',
		};
	}

	render() {
		return (
			<div>
				<h1>图标</h1>
				<p>
					我们封装了来自
					<A href="http://fontawesome.io" target="_blank">Font Awesome</A>
					的图标，当然如果你有偏好也可以来使用自己的字体图标（例如
						<A href="http://iconfont.cn/" target="_blank">iconfont</A>
					）。
				</p>

				<h2>准备工作</h2>
				<p>
					Bamboo UI默认不会引入Font Awesome css文件，因而你需要自己在页面中引入：
				</p>
				<pre className="code">
					{'<link href="[你的资源路径]/font-awesome.min.css" rel="stylesheet">'}
				</pre>

				<h2>使用</h2>
				<p>
					<code>Icon</code>组件简单的对图标进行封装，因而你可以直接通过<code>name</code>属性来进行调用。
					带有旋转动画的图标通过添加<code>spin</code>属性调用。
				</p>
				<div className="measurement">
					<div className="preview">
						<Icon name="smile-o" />
						{' '}
						<Icon name="refresh" spin />
					</div>
					<pre className="code">
						{`
<Icon name="smile-o" />
<Icon name="refresh" spin />
`.trim()}
					</pre>
				</div>

				<h2>特殊的图标</h2>
				<p>
					为了防止您没有使用
					<A href="http://fontawesome.io" target="_blank">Font Awesome</A>
					图标而导致部分组件载入动画失效，
					我们内置了一些载入图标。
					您可以通过<code>Icon.Loading</code>来使用。
				</p>
				<div className="measurement">
					<div className="preview">
						<Icon.Loading />
						{' '}
						<Icon.Loading id={1} />
						{' '}
						<Icon.Loading id={2} />
						{' '}
						<Icon.Loading id={3} />
						{' '}
						<Icon.Loading id={4} />
					</div>

					<pre className="code">
						{`
<Icon.Loading />
<Icon.Loading id={1} />
<Icon.Loading id={2} />
<Icon.Loading id={3} />
<Icon.Loading id={4} />
`.trim()}
					</pre>
				</div>

				<p>
					此外，我们还提供了箭头图标。您可以通过<code>Icon.Caret</code>来使用。
				</p>
				<div className="measurement">
					<div className="preview">
						这是个
						<Icon.Caret direct={this.state.direct} />
						图标
					</div>

					<div className="form">
						<Form instance={this}>
							<Form.Field name="direct">
								{['right', 'left', 'up', 'down'].map(direct => (
									<Radio value={direct} key={direct}>
										{direct}
									</Radio>
								))}
							</Form.Field>
						</Form>
					</div>

					<pre className="code">
						{`<Icon.Caret direct="${this.state.direct}" />`}
					</pre>
				</div>

				<p>
					搜索图标：
				</p>
				<div className="measurement">
					<div className="preview">
						<Icon.Search />
					</div>

					<pre className="code">
						{'<Icon.Search />'}
					</pre>
				</div>
			</div>
		);
	}
}

GroupPage.propTypes = {
	history: PropTypes.object,
};

export default GroupPage;
