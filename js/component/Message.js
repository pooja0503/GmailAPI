var React=require('react');
var ModalMessage=require('./ModalMessage');

var Message=React.createClass({
  getInitialState:function()
  {
    return({showModal:false});
  },
  handleModal:function()
  {
    var that=this;
    console.log("Clicked");
    that.setState({showModal:true});
    that.state.showModal=true;

    //console.log("State:"+that.state.showModal);
  },
  render:function()
  {
    var self=this;
    return(
      <div>
        <a href="#myModalMessageDetail" className="list-group-item list-group-item-warning" data-toggle="modal" onClick={this.handleModal}>
          <div className="row">
            <div className="col-lg-4">
                {this.props.frm}
            </div>
            <div className="col-lg-5">
              {this.props.subject}
            </div>
            <div className="col-lg-3">
              {this.props.date}{this.state.showModal}
            </div>
          </div>
        </a>
        {self.state.showModal?<ModalMessage frm={this.props.frm} to={this.props.to} subject={this.props.subject} body={this.props.body}/>:null}
      </div>
    );
  }
});
module.exports=Message
