var React = require('react');

var ComposeMessage=React.createClass({
  getInitialState:function()
  {
    return({messageTo:'',messageSub:'',messageBody:''});
  },
  handleMessageTo:function(e)
  {
    this.setState({messageTo:e.target.value});
  },
  handleMessageSub:function(e)
  {
    this.setState({messageSub:e.target.value});
  },
  handleMessageBody:function(e)
  {
    this.setState({messageBody:e.target.value});
  },
  sendMessage:function(to,sub,body)
  {
    this.props.handleSendMessage(this.state.messageTo,this.state.messageSub,this.state.messageBody);
  },
  render:function()
  {
    var that = this;
    return(
      <div>
        <a data-toggle="modal" href="#myModal" className="btn btn-primary btn-large" role="button">Compose Message</a>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">x</button>
                <h4 className="modal-title">Compose Message</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-2">
                    <label>To: </label>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" className="form-control" id="txtTo" value={this.state.messageTo} onChange={this.handleMessageTo}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <label>Subject: </label>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" className="form-control" id="txtSubject" value={this.state.messageSub} onChange={this.handleMessageSub}/>
                  </div>
                </div>
                <br />
                <div className="row">
                    <textarea className="form-control" rows="5" id="comment"  value={this.state.messageBody} onChange={this.handleMessageBody}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <div className="col-lg-6">
                  <button type="button" className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                </div>
                <div className="col-lg-6">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports=ComposeMessage
