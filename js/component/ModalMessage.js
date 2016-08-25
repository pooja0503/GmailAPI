var React=require('react');

var ModalMessage=React.createClass({
  render:function()
  {
    return(
      <div aria-hidden="true" id="myModalMessageDetail" className="modal fade" tabIndex="-1" aria-labelledby="myModalLabel" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">x</button>
              <h4 className="modal-title">Message Details</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-2">
                  <label>From: </label>
                </div>
                <div className="col-lg-10">
                  <label>{this.props.frm}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <label>To: </label>
                </div>
                <div className="col-lg-10">
                  <label>{this.props.to}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <label>Subject: </label>
                </div>
                <div className="col-lg-10">
                  <label>{this.props.subject}</label>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-body">
                  {this.props.body}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports=ModalMessage
