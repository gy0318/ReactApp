import React from 'react'
import {Link} from "react-router"
import {Card} from "antd"
import PropTypes from 'prop-types';
import axios from "axios"
import '../componentCss/news_container.css'
class NewsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsArr:[]
    }
  }
  componentWillMount(){
    let {type,count} = this.props
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        let data = response.data
        this.setState({newsArr:data})
      })
  }
  render () {
    let {newsArr} = this.state
    let newsList = newsArr.length
      ?(
        newsArr.map((item,index) => {
          return (
            <li key={index}>
              <Link to={`/news_detail/${item.uniquekey}`}>
                {item.title}
              </Link>
            </li>
          )
        })
      )
      :"暂时没有新闻推送"
    return (
      <ul className="news_tab">
        <Card>
          {newsList}
        </Card>
      </ul>
    );
  }
}
NewsBlock.propTypes = {
  type:PropTypes.string.isRequired,
  count:PropTypes.number.isRequired,
};

export default NewsBlock;