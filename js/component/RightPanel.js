var React=require('react');
var Message=require('./Message');

var RightPanel=React.createClass({
  getHTMLPart: function(arr)
  {
    for(var x = 0; x < arr.length; x++)
    {
      if(typeof arr[x].parts === 'undefined')
      {
        if(arr[x].mimeType === 'text/html')
        {
          return arr[x].body.data;
        }
      }
      else
      {
        return this.getHTMLPart(arr[x].parts);
      }
    }
    return '';
  },
  render:function()
  {
    var frm='';
    var subject='';
    var date='';
    var to='';
    var body='';
    var that=this;

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
              if(typeof d.payload.parts=='undefined')
              {
                body=d.payload.body.data;
              }
              else
              {
                body=that.getHTMLPart(d.payload);
                console.log(body);
              }
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
