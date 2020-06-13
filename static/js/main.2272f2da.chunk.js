(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{19:function(e,t,a){e.exports=a(35)},24:function(e,t,a){},25:function(e,t,a){},28:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(7),r=a.n(i),o=(a(24),a(2)),l=a(3),c=a(5),p=a(4),m=a(14),u=a.n(m),h=(a(25),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"login-bg"},s.a.createElement("div",{className:"login"},s.a.createElement("h1",null,"Spotify Wrapped++"),s.a.createElement("p",null,"Want to view your top tracks and artists but don't want to wait until December for Spotify Wrapped? Now you can with Spotify Wrapped++!"),s.a.createElement("a",{href:"https://peaceful-fortress-73033.herokuapp.com/login"},s.a.createElement("button",{className:"spotify-btn"},"Log in with Spotify"))))}}]),a}(s.a.Component)),f=a(8),g=a.n(f),y=a(11),d=a(15),b=a(9),E=(a(27),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"createSelectItems",value:function(){for(var e=[],t=50;t>=10;t--)e.push(s.a.createElement("option",{key:t,value:t},t));return e}},{key:"render",value:function(){return s.a.createElement("form",{className:"modal-body",onSubmit:this.props.createPlaylist},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"playlistName"},"Playlist Name"),s.a.createElement("input",{type:"text",className:"form-control",id:"playlistName",placeholder:this.props.title,value:this.props.playlistName,onChange:this.props.onChange,required:!0})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"playlistDescription"},"Playlist Description"),s.a.createElement("textarea",{className:"form-control",id:"playlistDescription",value:this.props.playlistDescription,onChange:this.props.onChange})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"exampleFormControlSelect2"},"Playlist Size"),s.a.createElement("select",{className:"form-control",id:"exampleFormControlSelect2",value:this.props.playlistSize,size:this.props.dropdownSize,onFocus:this.props.onFocus,onBlur:this.props.onBlur,onChange:this.props.sizeChange},this.createSelectItems())),s.a.createElement("div",{id:"submit"},s.a.createElement("button",{type:"submit",id:"submit-btn",className:"spotify-btn"},"Create Playlist")))}}]),a}(s.a.Component)),v=(a(28),"A playlist of my top tracks created by Spotify Rewind++"),S=function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).createPlaylist=function(){var e=Object(y.a)(g.a.mark((function e(t){var a,s;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return document.getElementById("submit-btn").innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...',t.preventDefault(),a=null,s=null,e.next=6,n.props.spotifyApi.getMe().then((function(e){a=e.id}));case 6:return e.next=8,n.props.spotifyApi.createPlaylist(a,{name:n.state.playlistName,description:n.state.playlistDescription}).then((function(e){s=e.id}));case 8:return e.next=10,n.props.spotifyApi.getMyTopTracks({time_range:n.props.timeRange,limit:n.state.playlistSize}).then((function(e){return e.items.map((function(e){return e.uri}))})).then((function(e){n.props.spotifyApi.addTracksToPlaylist(s,e).then((function(){n.props.spotifyApi.getPlaylist(s).then((function(e){n.setState({justCreated:!0}),document.getElementsByClassName("modal-content")[0].firstElementChild.firstElementChild.textContent="Playlist Created!",document.getElementById("new-playlist-image").src=e.images[0].url,document.getElementById("open-playlist").href=e.external_urls.spotify}))}))}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.resetForm=function(){document.getElementById("modal-title").textContent="Playlist Details",n.setState({playlistName:"",playlistDescription:v,playlistSize:"50",justCreated:!1,modalShow:!1})},n.onChange=function(e){return n.setState(Object(d.a)({},e.target.id,e.target.value))},n.onFocus=function(){n.setState({dropdownSize:10})},n.onBlur=function(){n.setState({dropdownSize:1})},n.sizeChange=function(e){e.target.blur(),n.setState({playlistSize:e.target.value})},n.state={dropdownSize:1,playlistSize:"50",playlistName:"",playlistDescription:v,justCreated:!1,modalShow:!1},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{type:"button",className:"spotify-btn control",onClick:function(){return e.setState({modalShow:!0})},disabled:this.props.itemType},"Create Playlist"),s.a.createElement(b.a,{show:this.state.modalShow,onHide:this.resetForm},s.a.createElement(b.a.Header,{className:"modal-header text-center"},s.a.createElement("h5",{id:"modal-title"},"Playlist Details"),s.a.createElement("button",{type:"button",className:"close",onClick:this.resetForm},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),!this.state.justCreated&&s.a.createElement(b.a.Body,{className:"modal-content"},s.a.createElement(E,{title:this.props.title,dropdownSize:this.state.dropdownSize,playlistSize:this.state.playlistSize,playlistName:this.state.playlistName,playlistDescription:this.state.playlistDescription,createPlaylist:this.createPlaylist,onChange:this.onChange,onFocus:this.onFocus,onBlur:this.onBlur,sizeChange:this.sizeChange})),this.state.justCreated&&s.a.createElement(s.a.Fragment,null,s.a.createElement(b.a.Body,{className:"modal-content"},s.a.createElement("h2",{className:"text-center mt-3"},this.state.playlistName),s.a.createElement("img",{id:"new-playlist-image",alt:"".concat(this.state.playlistName," Cover")})),s.a.createElement(b.a.Footer,null,s.a.createElement("a",{href:"/#",id:"open-playlist",target:"_blank",rel:"noopener noreferrer"},s.a.createElement("button",{className:"spotify-btn"},"Open Playlist")),s.a.createElement("button",{onClick:this.resetForm,type:"button",className:"spotify-btn-2"},"Close")))))}}]),a}(s.a.Component),k=function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"btn-group control","data-toggle":"buttons"},s.a.createElement("button",{className:"btn list-sizing active",onClick:this.props.changeListSize,value:"large",id:"ls-1"},s.a.createElement("input",{type:"radio",name:"options",defaultChecked:!0})),s.a.createElement("button",{className:"btn list-sizing",onClick:this.props.changeListSize,value:"medium",id:"ls-2"},s.a.createElement("input",{type:"radio",name:"options"})),s.a.createElement("button",{className:"btn list-sizing",onClick:this.props.changeListSize,value:"small",id:"ls-3"},s.a.createElement("input",{type:"radio",name:"options"})))}}]),a}(s.a.Component),N=(a(31),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"controls"},s.a.createElement("div",{className:"toggle control"},s.a.createElement("p",{className:"toggle-label"},"Tracks"),s.a.createElement("input",{type:"checkbox",onChange:this.props.toggleItems}),s.a.createElement("p",{className:"toggle-label"},"Artists")),s.a.createElement("select",{className:"spotify-btn-2 control",value:this.props.timeRange,onChange:this.props.changeTimeRange},s.a.createElement("option",{value:"short_term"},"4 Weeks"),s.a.createElement("option",{value:"medium_term"},"6 Months"),s.a.createElement("option",{value:"long_term"},"All Time")),s.a.createElement(S,{itemType:this.props.itemType,timeRange:this.props.timeRange,spotifyApi:this.props.spotifyApi,title:"My ".concat(this.props.title[0].substring(5)," - ").concat(this.props.title[1])}),s.a.createElement(k,{changeListSize:this.props.changeListSize}))}}]),a}(s.a.Component)),C=a(17),z=a(18),w=(a(32),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).getGenres=function(){var t=Object(z.a)(e.props.itemInfo.genres),a="";if(t.length>0){a+=t[0].replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}));var n,s=Object(C.a)(t.slice(1));try{for(s.s();!(n=s.n()).done;){var i=n.value;a+=", ".concat(i.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})))}}catch(r){s.e(r)}finally{s.f()}}return a},e}return Object(l.a)(a,[{key:"render",value:function(){return this.props.itemType?s.a.createElement("div",{className:"list-group-item ".concat(this.props.listSize)},s.a.createElement("p",{className:"rank ".concat(this.props.listSize)},this.props.itemInfo.rank,"."," "),s.a.createElement("a",{href:this.props.itemInfo.link,target:"_blank",className:"link ".concat(this.props.listSize),rel:"noopener noreferrer"},this.props.itemInfo.name),s.a.createElement("img",{src:this.props.itemInfo.image,className:"list-image ".concat(this.props.listSize),alt:this.props.itemInfo.name}),s.a.createElement("br",null),s.a.createElement("p",{className:"info ".concat(this.props.listSize," genres")},this.getGenres())):s.a.createElement("div",{className:"list-group-item ".concat(this.props.listSize)},s.a.createElement("p",{className:"rank ".concat(this.props.listSize)},this.props.itemInfo.rank,"."," "),s.a.createElement("a",{href:this.props.itemInfo.link,target:"_blank",className:"link ".concat(this.props.listSize),rel:"noopener noreferrer"},this.props.itemInfo.name)," ",s.a.createElement("a",{href:this.props.itemInfo.albumLink,target:"_blank",rel:"noopener noreferrer"},s.a.createElement("img",{src:this.props.itemInfo.artwork,className:"list-image ".concat(this.props.listSize),alt:this.props.itemInfo.album})),s.a.createElement("br",null),s.a.createElement("a",{href:this.props.itemInfo.artistLink,target:"_blank",className:"info ".concat(this.props.listSize),rel:"noopener noreferrer"},this.props.itemInfo.artist))}}]),a}(s.a.Component)),j=(a(33),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).getHeader=function(){var e="Your Top ";switch(e+=n.state.itemType?"Artists":"Tracks",n.state.timeRange){case"short_term":return[e,"Last 4 Weeks"];case"medium_term":return[e,"Last 6 Months"];case"long_term":return[e,"All Time"];default:return"error"}},n.getTracks=function(){return n.props.spotifyApi.getMyTopTracks({time_range:n.state.timeRange,limit:"50"}).then((function(e){var t=[];return e.items.forEach((function(e,a){var n={name:e.name,artist:e.artists[0].name,artistLink:e.artists[0].external_urls.spotify,artwork:e.album.images[0].url,album:e.album.name,albumLink:e.album.external_urls.spotify,link:e.external_urls.spotify,rank:a+1};t.push(n)})),t}))},n.getArtists=function(){return n.props.spotifyApi.getMyTopArtists({time_range:n.state.timeRange,limit:"50"}).then((function(e){var t=[];return e.items.forEach((function(e,a){var n={name:e.name,image:e.images[0].url,link:e.external_urls.spotify,genres:e.genres.slice(0,3),rank:a+1};t.push(n)})),t}))},n.toggleItems=function(){var e=!n.state.itemType;e?n.getArtists().then((function(t){n.setState({itemType:e,items:t})})):n.getTracks().then((function(t){n.setState({itemType:e,items:t})}))},n.changeTimeRange=function(){var e=Object(y.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({timeRange:t.target.value});case 2:n.state.itemType?n.getArtists().then((function(e){n.setState({items:e})})):n.getTracks().then((function(e){n.setState({items:e})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.changeListSize=function(e){var t=e.target.value;Array.from(document.getElementsByClassName(n.state.listSize)).forEach((function(e){e.classList.replace(n.state.listSize,t)})),n.setState({listSize:t})},n.state={itemType:!1,items:[],timeRange:"short_term",listSize:"large"},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.getTracks().then((function(t){return e.setState({items:t})}))}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("header",null,s.a.createElement("h1",null,this.getHeader()[0]),s.a.createElement("h2",null,this.getHeader()[1])),s.a.createElement(N,{itemType:this.state.itemType,timeRange:this.state.timeRange,listSize:this.state.listSize,toggleItems:this.toggleItems,changeTimeRange:this.changeTimeRange,changeListSize:this.changeListSize,spotifyApi:this.props.spotifyApi,title:this.getHeader()}),s.a.createElement("div",{className:"body"},s.a.createElement("div",{className:"container pb-5 list-group"},this.state.items.map((function(t,a){return s.a.createElement(w,{itemType:e.state.itemType,listSize:e.state.listSize,itemInfo:t,key:a})})))))}}]),a}(s.a.Component)),O=(a(34),function(e){Object(c.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(o.a)(this,a);var n=(e=t.call(this)).getHashParams().access_token;return e.state={loggedIn:!!n,spotifyApi:new u.a},n&&e.state.spotifyApi.setAccessToken(n),e}return Object(l.a)(a,[{key:"getHashParams",value:function(){for(var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);e=a.exec(n);)t[e[1]]=decodeURIComponent(e[2]);return t}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},!this.state.loggedIn&&s.a.createElement(h,null),this.state.loggedIn&&s.a.createElement(j,{spotifyApi:this.state.spotifyApi}))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.2272f2da.chunk.js.map