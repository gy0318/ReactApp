import React from "react"
import {Link} from "react-router"
import axios from "axios"
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from "antd"
import logo from "../images/logo.png"

import "../componentCss/pc.css"

const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item;
class NewsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:null,
      userId:null,
      key:"toutiao",
      isShow:false
    }
  }
  componentWillMount(){
    let username = JSON.parse(localStorage.getItem("person_key") || "{}").username
    this.setState({username})
  }
  changeKey = ({item,key}) => {
    // console.log(key)
    if(key === "register"){
      this.setState({isShow:true})
      this.props.form.resetFields()
    }
    this.setState ({key})
  }
  handleShow = (isShow) => {
    this.setState({isShow})
  }
  // handleChange = () => {
  //   this.props.form.resetFields()
  // }
  handleSubmit = (isRegister,event) => {
    // console.log(isRegister,event)
    event.preventDefault()
    let action = isRegister ? "register" : "login"
    let {username,password,r_username,r_password,r_comfirmpassword} = this.props.form.getFieldsValue()
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_comfirmpassword}`
    axios.get(url)
      .then(response => {
        let data = response.data
        if(isRegister){
          message.success('注册成功')
        }else{
          if(data){
            message.success("恭喜您，登录成功")
            this.setState({
              username:data.NickUserName,
              userId:data.UserId
            })
            let {username,userId} = this.state
            let obj = {username,userId}
            localStorage.setItem("person_key",JSON.stringify(obj))
          }else{
            message.error("登录失败")
          }
        }
      })
      .catch( error => {
        console.log(error)
      })
    this.setState({isShow:false})
  }
  handleOut = () => {
    this.setState({
      username:null,
      userId:null
    })
    localStorage.removeItem("person_key")
  }
  render () {
    let {username,key,isShow} = this.state
    let {getFieldDecorator} = this.props.form
    let UserItem = username?
      (
        <MenuItem className="register" key="login">
          <Button type="primary">{username}</Button>&nbsp;
          <Button type="dashed"><Link to="/user_center">个人中心</Link></Button>&nbsp;
          <Button onClick={this.handleOut}>退出</Button>
        </MenuItem>
      ):
      (
        <MenuItem className="register" key="register">
          <Icon type="appstore"/>
          登录/注册
        </MenuItem>
      )
    return (
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <div className="logo">
              <img src={logo} alt=""/>
              <span>ReactNews</span>
            </div>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" selectedKeys={[key]} onClick={this.changeKey}>
              <MenuItem key="toutiao">
                <Icon type="appstore" />
                头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore" />
                社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore" />
                国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore" />
                国外
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore" />
                娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore" />
                体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore" />
                科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore" />
                时尚
              </MenuItem>
              {UserItem}
            </Menu>
            <Modal title="用户中心"visible={isShow}  okText="关闭"
            onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
              <Tabs onChange = {() => {this.props.form.resetFields()}}>
                <TabPane tab="登录" key="1">
                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                      <FormItem label="用户名">
                        {getFieldDecorator('username')(
                          <Input type="text" placeholder="请输入用户名" />
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('password')(
                          <Input type="password" placeholder="请输入密码" />
                        )}
                      </FormItem>
                      <Button htmlType="submit" type="primary">登录</Button>
                    </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('r_username')(
                        <Input type="text" placeholder="请输入用户名" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_password')(
                        <Input type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>
                    <FormItem label="确认密码">
                      {getFieldDecorator('r_comfirmpassword')(
                        <Input type="password" placeholder="请再次输入密码" />
                      )}
                    </FormItem>
                    <Button htmlType="submit" type="primary">注册</Button>
                  </Form>

                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
    );
  }
}


export default Form.create()(NewsHeader);