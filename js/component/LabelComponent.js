var React=require('react');

var LabelComponent=React.createClass({
  handleClick:function()
  {
    this.props.handleGetEmail(this.props.id);
  },
  render:function()
  {
    return(
      <a id={this.props.id} name={this.props.name} href="#" onClick={this.handleClick}>{this.props.name}</a>
    );
  }
});
module.exports=LabelComponent
