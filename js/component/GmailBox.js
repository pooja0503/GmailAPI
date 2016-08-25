var React = require('react');
var LeftPanel=require('./LeftPanel');
var RightPanel=require('./RightPanel');
var loadedData = false;
var GmailBox = React.createClass({
 getInitialState: function()
   {
     return({allLabelsData:[],completeMessages:[]});
   },
 gmailLogin: function()
 {
   var acToken, tokenType, expiresIn;
   var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
   var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
   var CLIENTID    =   '238770194091-2pk4t0moksnmum51sf3vrg1ab9mc0lre.apps.googleusercontent.com';
   var REDIRECT    =   'http://localhost:8080';
   var TYPE        =   'token';
   var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
   var win         =   window.open(_url, "windowname1", 'width=800, height=600');

   var pollTimer   =   window.setInterval(function()
   {

       try
       {
           if (win.document.URL.indexOf(REDIRECT) != -1)
           {
               window.clearInterval(pollTimer);
               var url =   win.document.URL;
               acToken =   gup(url, 'access_token');
               tokenType = gup(url, 'token_type');
               expiresIn = gup(url, 'expires_in');
               localStorage.setItem('gToken',acToken);
               localStorage.setItem('gTokenType',tokenType);
               localStorage.setItem('gExprireIn',expiresIn);
               function gup(url, name) {
                   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                   var regexS = "[\\#&]"+name+"=([^&#]*)";
                   var regex = new RegExp( regexS );
                   var results = regex.exec( url );
                   if( results == null )
                       return "";
                   else
                       return results[1];
               }
               win.close();
           }
       }
       catch(e)
       {
         console.log(e);
       }
   }, 500);
   this.allLabels();
 },


 allLabels: function()
 {
     console.log('Before:' + loadedData);
     var accessToken = localStorage.getItem('gToken');
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/labels?key={AIzaSyACK1EveB40U-ec0aHfe6xKlN-BltiJGG8}',
      dataType: 'json',
      type: 'GET',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {
        loadedData=true;
        this.setState({allLabelsData:data.labels});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });

 },

 getEmailByLabel: function(labelId)
 {
   var accToken=localStorage.getItem('gToken');
   $.ajax({
     url:'https://www.googleapis.com/gmail/v1/users/me/messages?includeSpamTrash=false&labelIds='+labelId+'&maxResults=7&key={AIzaSyACK1EveB40U-ec0aHfe6xKlN-BltiJGG8}',
     dataType:'json',
     type:'GET',
     beforeSend:function(request)
     {
       request.setRequestHeader("Authorization", "Bearer "+accToken);
     },
     success:function(data)
     {
       var messg=[];
       for(var i=0;i<data.messages.length;i++)
       {
         messg.push(this.getCompleteMessage(data.messages[i].id));
       }
       //console.log(messg);
       this.setState({completeMessages:messg});
     }.bind(this),
     error:function(xhr, status, err)
     {
       console.error(err.toString());
     }.bind(this)
   });
 },

 getCompleteMessage: function(id)
 {
   var accToken=localStorage.getItem('gToken');
   var d=$.ajax({
     url:'https://www.googleapis.com/gmail/v1/users/me/messages/'+id+'?key={AIzaSyACK1EveB40U-ec0aHfe6xKlN-BltiJGG8}',
     dataType:'json',
     type:'GET',
     async:false,
     beforeSend:function(request)
     {
       request.setRequestHeader("Authorization","Bearer "+accToken);
     },
     success:function(data)
     {
       //console.log(data);
     }.bind(this),
     error:function(xhr,status,err)
     {
       console.error(err.toString());
     }.bind(this)
   }).responseJSON;
   //console.log(d);
   return d;
 },

 render:function()
 {
   var leftPanel;
   var rightPanel;
   console.log('inside rendor...');
   console.log(loadedData);
   if(loadedData){
     console.log(loadedData);
     leftPanel =  <LeftPanel allLabelsData={this.state.allLabelsData} getEmailByLabel={this.getEmailByLabel}/>
     rightPanel=  <RightPanel completeMessages={this.state.completeMessages}/>;
   }

     return(
       <div className="GmailBox">
           <div className="container-fluid">
             <div className="row">
                 <div className="col-lg-1">
                  <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-left">SignIn123</button>
                  </div>
                  <div className="col-lg-8 pull-right">
                    <h2>ReactMails</h2>
                  </div>
              </div>
               <div className="row">
                   <div className="col-lg-3">
                      <ul className="list-group">
                        {leftPanel}
                      </ul>
                    </div>
                   <div className="col-lg-9">
                      <div className="list-group">
                        {rightPanel}
                      </div>
                   </div>
               </div>
         </div>
     </div>
     );
 }
 });

module.exports = GmailBox;
