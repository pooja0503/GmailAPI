var React=require('react');
var ReactDOM=require('react-dom');
var NavBar=require('./component/NavBar');
var GmailBox=require('./component/GmailBox');

var Parent=React.createClass({
  render: function()
  {
    return(
    <div className="container" id="content">
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <GmailBox />
      </div>
    </div>
   );
  }
});
ReactDOM.render(<Parent/>,document.getElementById('app'));
