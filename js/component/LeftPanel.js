var React=require('react');
var LabelComponent=require('./LabelComponent');

var LeftPanel=React.createClass({
  handleGetEmail:function(labelId)
  {
    console.log('Inside LabelComponent');
    this.props.getEmailByLabel(labelId);
  },
  render:function()
  {
    var target=this.props.allLabelsData.map(function(d,i)
      {
        return(
          <li className="list-group-item" key={i}>
            <LabelComponent key={i} id={d.id} name={d.name} handleGetEmail={this.handleGetEmail.bind(this)}>{d.name}</LabelComponent>
          </li>
        );
      },this);
      //console.log(target);
      return(
        <div>
          {target}
        </div>
      );
  }
});
module.exports=LeftPanel
