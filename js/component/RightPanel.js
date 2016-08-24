var React=require('react');
var Message=require('./Message');

var RightPanel=React.createClass({
  render:function()
  {
    var frm='';
    var subject='';
    var date='';
    var to='';
    var body='';
    console.log(this.props.completeMessages);
    var messages=this.props.completeMessages.map(function(d,i)
            {
              for(var i=0;i<d.payload.headers.length;i++)
              {
                if(d.payload.headers[i].name==='From')
                  frm = 'From: '+d.payload.headers[i].value;
                if(d.payload.headers[i].name==='Subject')
                  subject = 'Subject: '+d.payload.headers[i].value;
                if(d.payload.headers[i].name==='Date')
                  date = d.payload.headers[i].value;
                if(d.payload.headers[i].name==='To')
                  to = d.payload.headers[i].value;
              }
              body = d.payload.body.data;
              return(
                <Message frm={frm} subject={subject} date={date} to={to} body={body}/>
              );
            });
    return(
      <div>
        {messages}
      </div>
    );
  }
});

module.exports=RightPanel
