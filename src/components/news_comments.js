import React from "react"
import axios from "axios"
import {Card,Form,Input,Button,Row,Col,message,notification} from "antd"
const FormItem = Form.Item;
class NewsComments extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      comments:[]
    }
  }
  componentWillReceiveProps(nextProps){
    let newsId = nextProps.newsId
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        let data = response.data
        let comments = data.map((item,index) => {
          return {
            username:item.UserName,
            comment:item.Comments,
            dateTime :item.datetime
          }
        })
        this.setState({comments})
      })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let comment = this.props.form.getFieldValue('comment')
    let userId = JSON.parse(localStorage.getItem("person_key") ||"{}").userId
    if(!userId){
      message.warning('请先登录');
      return
    }
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${this.props.newsId}&commnet=${comment}`
    axios.get(url)
      .then(response => {
          message.success('恭喜您，评论成功')
          this.props.form.resetFields()
      })
      .catch(error => {
        console.log(error)
      })
  }
  handleCollection = () => {
    let userId = JSON.parse(localStorage.getItem("person_key")|| "{}").userId
    if(!userId){
      message.warn("请先登录")
      return
    }
    let url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${this.props.newsId}`
    axios.get(url)
      .then(response => {
        notification["success"]({
          message: 'news',
          description: '收藏成功',
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
  render () {
    let {getFieldDecorator} = this.props.form
    let {comments} = this.state
    let lisList = comments.length
      ?(
        comments.map((item,index) => {
          return (
            <li key={index}>
              <Card title={item.username} extra={item.dateTime}>
                {item.comment}
              </Card>
            </li>
          )
        })
      ):"暂时没有任何评论"
    // let {newsId} = this.props
    return (
      <div>
        <ul>
          {lisList}
        </ul>
        <Form onSubmit={this.handleSubmit} >
          <FormItem label="您的评论:" labelCol={{span: 2, offset: 11}}>
            {getFieldDecorator('comment')(
              <Input style={{resize:"none"}} type="textarea" placeholder="请输入您的评论"/>
            )}
          </FormItem>
          <Row>
            <Col span={6} push={10}>
              <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;
              <Button type="primary" onClick={this.handleCollection}>收藏文章</Button>
            </Col>
          </Row>
        </Form>
      </div>

    );
  }
}

export default Form.create()(NewsComments);