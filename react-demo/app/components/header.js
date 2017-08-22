import React from 'react'
import {Link} from 'react-router'

export default class HeaderComponent extends React.Component {

	render() {

		// const style = {
		// 	color: "red"
		// }

		return (
			<div>
				<div><Link to="/">首页</Link></div>
				<div><Link to="/detail">详情页</Link></div>
			</div>
		)
	}

}