import React from "react"
import NewsHeader from "./news_header"
import NewsFooter from "./news_footer"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <NewsHeader/>
        {this.props.children}
        <NewsFooter/>
      </div>
    );
  }
}

export default App;