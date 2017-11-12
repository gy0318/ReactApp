import React from "react"
import {Link} from "react-router"
import {Row,Col,Carousel,Tabs} from "antd"
import NewsImgBlock from "./news_img_block"
import NewsBlock from "./news_block"
import ReactProduct from "./react_product"
import carousel_1 from "../images/carousel_1.jpg"
import carousel_2 from "../images/carousel_2.jpg"
import carousel_3 from "../images/carousel_3.jpg"
import carousel_4 from "../images/carousel_4.jpg"

import "../componentCss/news_container.css"
import "../componentCss/news_img.css"
const TabPane = Tabs.TabPane
class NewsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="news_container">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="leftContainer">
              <Carousel autoplay>
                <div className="carousel"><img src={carousel_1} alt=""/></div>
                <div className="carousel"><img src={carousel_2} alt=""/></div>
                <div className="carousel"><img src={carousel_3} alt=""/></div>
                <div className="carousel"><img src={carousel_4} alt=""/></div>
              </Carousel>
              <div>
                <NewsImgBlock type="guoji" count={6} title="国际新闻" width ="400px" imgWidth="115px"/>
              </div>
            </div>
            <Tabs className="news_center">
              <TabPane tab="娱乐新闻" key="2">
                <NewsBlock type="yule" count={25}/>
              </TabPane>
              <TabPane tab="科技新闻" key="1">
                <NewsBlock type="keji" count={25}/>
              </TabPane>
            </Tabs>
            <Tabs className="reactProduct">
              <TabPane tab="ReactProduct">
                <ReactProduct/>
              </TabPane>
            </Tabs>
            <div className="footer_news">
              <NewsImgBlock type="keji" count={8} title = "科技新闻" width="100%" imgWidth="115px"/>
              <NewsImgBlock type="yule" count={16} title = "娱乐新闻" width="100%" imgWidth="115px"/>
            </div>

          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

export default NewsContainer;