import React from 'react'
import {Row, Col, Menu, Button, Tabs, Input, Card} from 'antd';
import {Link} from 'react-router'
import HeaderComponent from '../common/header.js'
import "../../css/page.css"

const TabPane = Tabs.TabPane;
export default class IndexComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			advantage: [],
			mainerContent: [],
			code: [],
			card: [],
			cardContent1: [],
			cardContent2: [],
			cardContent3: [],
			cardContent4: [],
		}
	}

	componentDidMount() {
		fetch('/index.json')
			.then((response) => response.json())
			.then((json) => {
		   		this.setState({
		   			advantage: json.data.advantage,
		   			mainerContent: json.data.mainerContent,
		   			code: json.data.code,
		   			card: json.data.card,
		   			cardContent1: json.data.cardContent1,
		   			cardContent2: json.data.cardContent2,
		   			cardContent3: json.data.cardContent3,
		   			cardContent4: json.data.cardContent4	
		   		})

			})
			.catch((ex) => {
				console.log("paring failed", ex);
			})
	}

	callback(key) {
	  console.log(key);
	}

	
	render() {
		return (
			<div className="react">
				<div className="main">
					<div className="wrap">
						<HeaderComponent />
					</div>
				</div>
				<div className="banner">
					<div className="wrap">
					      <div className="banner-content">
					      	<strong className="banner-text">React</strong>
					      	<div className="banner-minitext">用于构建用户界面的JavaScript库</div>
					      	<div className="banner-unit"><Button type="primary">开始使用</Button><Button type="primary">Take the Tutorial</Button></div>
					      </div> 
					</div>
				</div>
				<div className="react-advantage">
					<Row>
						{
							this.state.advantage.map((value, index) => {
		    					return (
		    						<Col span={8} key={value.id}>
				          				<h3 className="advantage-title">{value.title}</h3>
				          				<p className="content advantage-content1">{value.content1}</p>
				          				<p className="content advantage-content2">{value.content2}</p>
				        			</Col>
				        		)
				    		})
						}
				    </Row>
				</div>
				<div className="mainer">
					{
						this.state.mainerContent.map((value, index)=>{
	    					return (
	    						<div key={value.id} className="mainer-con">
			          				<h3 className="mainer-title">{value.title}</h3>
			          				<p className="mainer-content">{value.content}</p>
			          				<Tabs onChange={this.callback} type="card" className="mainer-code">
			          				{
			          					this.state.code.map((value, index)=>{
			          						return (
			          							
												    <TabPane tab={value.codeTitle} key={value.id}>
												    	<p>{value.codeContent1}</p>
												    	<p>{value.codeContent2}</p>
												    	<p>{value.codeContent3}</p>
												    	<p>{value.codeContent4}</p>
												    	<p>{value.codeContent5}</p>
												    	<p>{value.codeContent6}</p>
												    </TabPane>
			          						)
				          				
										})
			          				}
			          				</Tabs>
			        			</div>
			        		)
			    		})
					}
				</div>
				<footer className="footer">
					<div className="footer-link">
						<Row>
							<Col span={6}>
								<Card title="文档" bordered={false} noHovering="true" style={{ width: 300 , background: "#2D2D2D", color: "#fff"}}>
								{
									this.state.cardContent1.map((value, index)=>{
										return(
											<p key={value.id} className="link-content">{value.content}</p>
										)
										
									})
								}
							    </Card>
							</Col>
							<Col span={6}>
								<Card title="使用教程" bordered={false} noHovering="true" style={{ width: 300 , background: "#2D2D2D", color: "#fff"}}>
								{
									this.state.cardContent2.map((value, index)=>{
										return(
											<p key={value.id} className="link-content">{value.content}</p>
										)
										
									})
								}
							    </Card>
							</Col>
							<Col span={6}>
								<Card title="交流与分享" bordered={false} noHovering="true" style={{ width: 300 , background: "#2D2D2D", color: "#fff"}}>
								{
									this.state.cardContent3.map((value, index)=>{
										return(
											<p key={value.id} className="link-content">{value.content}</p>
										)
										
									})
								}
							    </Card>
							</Col>
							<Col span={6}>
								<Card title="网络日志" bordered={false} noHovering="true" style={{ width: 300 , background: "#2D2D2D", color: "#fff"}}>
								{
									this.state.cardContent4.map((value, index)=>{
										return(
											<p key={value.id} className="link-content">{value.content}</p>
										)
										
									})
								}
							    </Card>
							</Col>
					    </Row>
					    <div className="footer-bottom">
					    	<img className="footer-img" src={require("../../images/oss_logo.png")}/>
					    </div>
					    <div className="footer-mark">Copyright © 2017 Facebook Inc.</div>
					</div>

				</footer>
			
			</div>
		)
	}

}
