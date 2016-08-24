var React=require('react');
var ModalMessage=require('./ModalMessage');

var Message=React.createClass({
  render:function()
  {
    return(
      <div>
        <a href="#" className="list-group-item list-group-item-warning" data-toggle="modal" data-target="#myModal">
          <div className="row">
            <div className="col-lg-4">
                {this.props.frm}
            </div>
            <div className="col-lg-5">
              {this.props.subject}
            </div>
            <div className="col-lg-3">
              {this.props.date}
            </div>
          </div>
        </a>
        <ModalMessage />
      </div>
    );
  }
});
module.exports=Message
