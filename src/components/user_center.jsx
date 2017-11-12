import React from "react"
import {Link} from "react-router"
import {Row,Col,Tabs,Card, Upload, Icon, Modal } from "antd"
import axios from "axios"

const TabPane = Tabs.TabPane;
class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      comments:[],
      collections:[],
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }
  componentWillMount(){
    let userId = JSON.parse(localStorage.getItem("person_key")||"{}").userId
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response => {
        let data = response.data
        // console.log(data)
        this.setState({comments:data})
      })
      .catch(error => {
        console.log(error)
      })
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response => {
        let data = response.data
        console.log(data)
        this.setState({collections:data})
      })
      .catch(error => {
        console.log(error)
      })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  render () {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let {comments,collections} = this.state
    let commentsLiList = comments.length
      ?(
        comments.map((item,index) => {
          return (
            <li key = {index}>
              <Card title={`与${item.datetime}评论了${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                {item.Comments}
              </Card>
            </li>
          )
        })
      )
      :"暂时没有评论"
    let collectionsLiList = collections.length
    ?(
        collections.map((item,index) => {
          return (
            <li key={index}>
              <Card title = {item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                {item.Title}
              </Card>
            </li>
          )
        })
      ):"暂时没有任何收藏"
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <TabPane tab="我的评论" key="1">
                <ul>
                  {commentsLiList}
                </ul>
              </TabPane>
              <TabPane tab="我的收藏" key="2">
                <ul>
                  {collectionsLiList}
                </ul>
              </TabPane>
              <TabPane tab="上传图片" key="3">
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    multiple
                  >
                    {/*表示只能上传3张图片*/}
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

export default UserCenter;