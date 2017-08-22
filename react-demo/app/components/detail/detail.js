import React from 'react'
import {Table, Icon, Menu, Dropdown, Button} from 'antd';
import HeaderComponent from '../common/header.js'
import "../../css/page.css"

const { Column, ColumnGroup } = Table;



export default class DetailComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			articles: [],
			menus: []
		}
	}

	componentDidMount() {
		fetch('/detail.json')
			.then((response) => response.json())
			.then((json) => {
		   		this.setState({
		   			articles: json.data.articles,
		   			menus: json.data.menus
		   		})
			})

			.catch((ex) => {
				
			})
	}

	render() {
		const data = this.state.articles;
		const menu = (
		  <Menu>
		    <Menu.Item key="1" style={{width:100}}><span className="item item1"></span>招聘</Menu.Item>
		    <Menu.Item key="2"><span className="item item2"></span>提问</Menu.Item>
		    <Menu.Item key="3"><span className="item item3"></span>作品</Menu.Item>
		    <Menu.Item key="4"><span className="item item4"></span>分享</Menu.Item>
		    <Menu.Item key="5"><span className="item item5"></span>探讨</Menu.Item>
		    <Menu.Item key="6"><span className="item item6"></span>新闻</Menu.Item>
		  </Menu>
		);

		return(
			<div className="detail-mainer">
				<div className="main">
					<div className="wrap">
						<HeaderComponent />
					</div>
				</div>
				<div className="button">
					<Dropdown.Button overlay={menu}>
					    所有分类
				    </Dropdown.Button>
				    <Button type="primary" className="new-btn">最新</Button>
					<Button>分类</Button>
				</div>
				

				<Table dataSource={data}>
				    <Column
				        title="主题"
				        dataIndex="title"
				        key="title"
				    />
				    <Column
				        title="分类"
				        dataIndex="class"
				        key="class"
				    />
				   
				    <Column
				      	title="用户"
				      	key="username"
				     	render={(text, record) => (
					      	<a href="#" className="ant-dropdown-link">
				           		<img src={record.username}/>
				          	</a>
			          )}
				    />
				    <Column
				      	title="回复"
				      	dataIndex="answer"
				      	key="answer"
				    />
				     <Column
				      	title="浏览"
				      	dataIndex="browse"
				      	key="browse"
				    />
				    <Column
				      	title="活动"
				      	dataIndex="dataTime"
				      	key="dataTime"
				      
				    />
			    </Table>	
				
		</div>
		)
	}
}