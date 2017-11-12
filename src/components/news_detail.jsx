import React from "react"
import {Row,Col,BackTop} from "antd"
import axios from "axios"
import NewsComments from "./news_comments"
import NewsImgBlock from "./news_img_block"
import "../componentCss/news_img.css"
class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news:null
    }
  }
  componentWillMount(){
    let newsId = this.props.params.newsId
    this.getNews(newsId)
  }
  componentWillReceiveProps(nextProps){
    let newsId = nextProps.params.newsId
    this.getNews(newsId)
  }
  getNews =(newsId) => {
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        let data = response.data
        this.setState({news:data.pagecontent})
      })
  }

  render () {
    let {news} = this.state
    return (
      <div>
        {/*NewsDetail...{this.props.params.newsId}*/}
        <Row>
          <Col span={1}></Col>
          <Col span={16}>
            <div dangerouslySetInnerHTML={{__html:news}}></div>
            <NewsComments newsId={this.props.params.newsId}/>
            <BackTop visibilityHeight={500}>
              <div className="ant-back-top-inner">UP</div>
            </BackTop>
          </Col>
          <Col span={6}>
            <NewsImgBlock title="科技新闻" type="keji" count={10} width="340px" imgWidth="120px"/>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

export default NewsDetail;