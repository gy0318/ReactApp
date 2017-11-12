import React from "react"
import {Row,Col} from "antd"

import "../componentCss/pc.css"
class NewsFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="footer">
        <Row span={24}>
          <Col>
            &copy;2016 ReactNews. All Rights Reserved
          </Col>
        </Row>
      </div>
    );
  }
}


export default NewsFooter;