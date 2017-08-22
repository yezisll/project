import React from 'react';
import {Row, Col, Menu, Icon, Button, Input, Modal, Tabs, Form, notification} from 'antd'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Search = Input.Search;

class HeaderComponent extends React.Component {

	constructor(props) {
		super(props);
		let login = false;
		try{
			login = localStorage.login ? true : login

		}catch(e){}
		this.state = {
			categories: [],
			showModal: false,
			login: false,
			selectedKey: ""
		}
		this.handleSelect = this.handleSelect.bind(this);
		this.handleModelToggle = this.handleModelToggle.bind(this);		
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch('/category.json')
			.then((response) => response.json())
			.then((json) => {
		   		this.setState({
		   			categories: json.data.categories	
		   		})

			})
			.catch((ex) => {
				console.log("paring failed", ex);
			})
	}

	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      	if (!err) {
	      		//前端校验+ajax调用登录接口
	      		try{
	      			localStorage.login = "true"
	      		}catch(e){}
	        	notification.open({
			    	message: '登录成功',
			    	description: '欢迎登录React中文网',
			  	});
			
			this.setState({
				showModal: false,
				login: true
			})
	      }else{

	      }
	    });
	}
	
	handleSelect(params) {
		this.setState({
			selectedKey: params.key
		})
	}

	handleModelToggle() {
		this.setState({
			showModal: !this.state.showModal
		})
	}
	
	render() {
		// console.log(this.props.categories);
		const { getFieldDecorator } = this.props.form;
		return(
			<div>
				<Row >
			    	<Col span={3}>
			    		<Link to={"/"} className="logo">
				    		<img className="header-img" src={require("../../images/logo.svg")} />
				    		React
				    	</Link>
			    	</Col>
			    	<Col span={10}>
			    		<Menu mode="horizontal" onSelect={this.handleSelect} className="header-menu" selectedKeys={[this.state.selectedKey]}>
			    			{
			    				this.state.categories.map((value, key)=>{
			    					return (
			    						<Menu.Item key={value.id} className="menu-li">
			    							<Link to={"/detail/" + value.id}>
					          					{value.name}
					          				</Link>
					        			</Menu.Item>
					        		)
			    				})
			    			}

					    </Menu>
			    	</Col>
			    	<Col span={8}>
			    		<Search placeholder="搜索文档..." style={{ width: 200 }} onSearch={value => console.log(value)}/>
			    	</Col>
			    	<Col span={3}>
			    		{
			    			!this.state.login ? <Button type="primary" onClick={this.handleModelToggle} className="login">登陆 / 注册</Button>:
			    			<Button type="primary">退出</Button>
			    		}
			    	</Col>
			    </Row>
			     <Modal onCancel={this.handleModelToggle} footer={null} title="登陆 ／ 注册" visible={this.state.showModal}>
			       <Tabs type="card">
						<TabPane tab="登陆" key="1">
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
							        {getFieldDecorator('userName', {
							            rules: [{ required: true, message: '用户名不能为空' }],
							        })(
							            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请填写用户名" />
							        )}
						        </FormItem>
						        <FormItem>
						          	{getFieldDecorator('password', {
						           		rules: [{ required: true, message: '密码不能为空' }],
						          	})(
						            	<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
						          	)}
						        </FormItem>
						        <FormItem>
						          	<Button type="primary" htmlType="submit" className="login-form-button">
						           		登录
						          	</Button>
						        </FormItem>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">Content of Tab Pane 2</TabPane>
					</Tabs>
			    </Modal>
			</div>
		)
	}
}

export default Form.create()(HeaderComponent)