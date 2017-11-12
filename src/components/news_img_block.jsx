import React from "react"
import {Link} from "react-router"
import PropTypes from 'prop-types';
import axios from "axios"
import {Card} from "antd"

import "../componentCss/news_img.css"
class NewsImgBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsArr : []
    }
  }
  componentWillMount() {
    let {type, count} = this.props
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        let data = response.data
        this.setState({newsArr:data})
      })
      .catch(error => {
        console.log(error)
      })
  }
  render () {
    let {title,type,count,width,imgWidth} = this.props
    // console.log(this.props.imgWidth)
    let {newsArr}= this.state
    let newsList = newsArr.length
      ?(
        newsArr.map((item,index) => {
          return (
           <div className="newsImg" key={index}>
             <Link to ={`/news_detail/${item.uniquekey}`}>
               <div>
                 <img style = {{width:imgWidth}} src={item.thumbnail_pic_s} alt=""/>
               </div>
               <div style={{width:imgWidth}}>
                 <h3>{item.title}</h3>
                 <p>{item.author_name}</p>
               </div>
             </Link>
           </div>
          )
        })
      )
        :"暂时没有新闻推送"
    return (
      <div>
        <Card style={{width}} title={title}>
          {newsList}
          </Card>
      </div>
    );
  }
}
NewsImgBlock.propTypes = {
  title:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  width:PropTypes.string.isRequired,
  imgWidth:PropTypes.string.isRequired,
  count:PropTypes.number.isRequired,
};

export default NewsImgBlock;
