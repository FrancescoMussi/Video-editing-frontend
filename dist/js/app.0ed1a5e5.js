(function(e){function t(t){for(var o,r,a=t[0],c=t[1],u=t[2],l=0,d=[];l<a.length;l++)r=a[l],s[r]&&d.push(s[r][0]),s[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var a=n[r];0!==s[a]&&(o=!1)}o&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},s={app:0},i=[];function a(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-109e4a26":"9e77aa0f","chunk-3cd648ac":"4ea3eef7","chunk-540ab112":"67e8a21b","chunk-2d0d6d35":"67085e8c"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-109e4a26":1,"chunk-3cd648ac":1,"chunk-540ab112":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-109e4a26":"9de96264","chunk-3cd648ac":"8277a9b6","chunk-540ab112":"f3cf2118","chunk-2d0d6d35":"31d6cfe0"}[e]+".css",s=c.p+o,i=document.getElementsByTagName("link"),a=0;a<i.length;a++){var u=i[a],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===s))return t()}var d=document.getElementsByTagName("style");for(a=0;a<d.length;a++){u=d[a],l=u.getAttribute("data-href");if(l===o||l===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||s,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){r[e]=0}));var o=s[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise(function(t,n){o=s[e]=[t,n]});t.push(o[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e),u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=s[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+r+")");i.type=o,i.request=r,n[1](i)}s[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"4ffd":function(e,t,n){e.exports=n.p+"img/logo.cf4cf3e7.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i={name:"App"},a=i,c=n("0c7c"),u=Object(c["a"])(a,r,s,!1,null,null,null),l=u.exports,d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loginContainer"},[n("section",{staticClass:"hero is-success is-fullheight"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container has-text-centered"},[n("div",{staticClass:"column is-4 is-offset-4"},[n("h3",{staticClass:"title has-text-grey"},[e._v("CameraApp")]),n("p",{staticClass:"subtitle has-text-grey"},[e._v("Please login to proceed.")]),n("div",{staticClass:"box"},[e._m(0),n("form",{on:{submit:function(t){return t.preventDefault(),e.loginSubmit(t)}}},[n("div",{staticClass:"field"},[n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"input is-large",attrs:{type:"email",placeholder:"Your Email",autofocus:""},domProps:{value:e.email},on:{blur:function(t){return e.$v.email.$touch()},input:function(t){t.target.composing||(e.email=t.target.value)}}}),!e.$v.email.required&&e.$v.email.$dirty?n("div",{staticClass:"invalid-feedback"},[e._v("\n                    The email is required\n                  ")]):e._e(),!e.$v.email.email&&e.$v.email.$dirty?n("div",{staticClass:"invalid-feedback"},[e._v("\n                    Please enter a valid email\n                  ")]):e._e()])]),n("div",{staticClass:"field"},[n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input is-large",attrs:{type:"password",placeholder:"Your Password"},domProps:{value:e.password},on:{blur:function(t){return e.$v.password.$touch()},input:function(t){t.target.composing||(e.password=t.target.value)}}}),!e.$v.password.required&&e.$v.password.$dirty?n("div",{staticClass:"invalid-feedback"},[e._v("\n                    The password is required\n                  ")]):e._e()])]),e.invalidCredentials?n("div",{staticClass:"invalid-feedback"},[e._v("\n                Invalid credentails. Please insert correct email and password\n                and try again.\n              ")]):e._e(),n("button",{staticClass:"button is-block is-primary is-large is-fullwidth",attrs:{type:"submit",disabled:e.buttonIsDisabled}},[e.buttonIsDisabled?n("v-icon",{staticClass:"iconSpinner mr5",attrs:{name:"spinner",pulse:""}}):e._e(),e._v("\n                Login\n              ")],1)])]),n("p",{staticClass:"has-text-grey"},[n("a",{on:{click:e.goToRegisterPage}},[e._v("Sign Up")])])])])])])])},p=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("figure",{staticClass:"avatar"},[o("img",{attrs:{src:n("4ffd")}})])}],h=n("b5ae"),m=n("0874"),v=n("786f");v["a"].init(),v["a"].setIcon("success","i",{class:"fa fa-check-circle"});var g={name:"Login",components:{"v-icon":m["a"]},data:function(){return{email:"",password:"",buttonIsDisabled:!1,invalidCredentials:!1}},computed:{registerSuccess:function(){return!!this.$route.params.registerSuccess}},validations:{email:{required:h["required"],email:h["email"]},password:{required:h["required"]}},created:function(){this.registerSuccess&&v["a"].success("You are succesfully registered.","",3e3)},methods:{goToRegisterPage:function(){this.$router.push({name:"register"})},loginSubmit:function(){var e=this;if(this.$v.$invalid)this.$v.email.$touch(),this.$v.password.$touch();else{this.buttonIsDisabled=!0;var t={email:this.email,password:this.password};this.$store.dispatch("login",t).then(function(t){console.log({response:t}),e.buttonIsDisabled=!1,e.invalidCredentials=!1,e.$router.push({name:"home"}),e.getUser()}).catch(function(t){console.log({error:t}),e.invalidCredentials=!0,e.buttonIsDisabled=!1,v["a"].error("Something went wrong.","",3e3)})}},getUser:function(){this.$store.dispatch("getUser").then(function(e){console.log({response:e})}).catch(function(e){console.log({error:e})})}}},b=g,w=Object(c["a"])(b,f,p,!1,null,"2bd608b6",null),y=w.exports;o["a"].use(d["a"]);var S=new d["a"]({routes:[{path:"/",name:"login",component:y,meta:{requiresVisitors:!0}},{path:"/register",name:"register",component:function(){return n.e("chunk-2d0d6d35").then(n.bind(null,"73cf"))},meta:{requiresVisitors:!0}},{path:"/home",name:"home",component:function(){return Promise.all([n.e("chunk-109e4a26"),n.e("chunk-3cd648ac")]).then(n.bind(null,"bb51"))},meta:{requiresAuth:!0}},{path:"/adminArea",name:"adminArea",component:function(){return Promise.all([n.e("chunk-109e4a26"),n.e("chunk-540ab112")]).then(n.bind(null,"5af5"))},meta:{requiresAuth:!0}}]}),k=(n("7f7f"),n("2f62")),C=n("bc3a"),_=n.n(C);o["a"].use(k["a"]),_.a.defaults.baseURL="http://restcli.denet.men/video_api/public/api";var $=new k["a"].Store({state:{token:window.localStorage.getItem("access_token")||null,userId:null,showVideoRecorder:!0,showStartRecordingButton:!0,showSuccessVideoRecorded:!1,showPlayer:!1,showButtonDelete:!1,showButtonSave:!1,showSuccessVideoDeleted:!1,showSuccessVideoSaved:!1,showFinalizeButton:!1,isRecording:!1,counter:15,completedSteps:0,videoOutput:{name:"",href:""},playerOptions:{height:"360",muted:!1,language:"en",playbackRates:[.7,1,1.5,2],poster:"/static/images/author.jpg"},videos:[],chunks:[],blobArray:[],currentBlob:null,videoId:1,baseUrl:"http://restcli.denet.men/video_api/public"},getters:{loggedIn:function(e){return null!==e.token}},mutations:{logout:function(e){e.token=null},setToken:function(e,t){e.token=t},setShowVideoRecorder:function(e,t){e.showVideoRecorder=t},setShowStartRecordingButton:function(e,t){e.showStartRecordingButton=t},setShowSuccessVideoRecorded:function(e,t){e.showSuccessVideoRecorded=t},setShowPlayer:function(e,t){e.showPlayer=t},setShowButtonDelete:function(e,t){e.showButtonDelete=t},setShowButtonSave:function(e,t){e.showButtonSave=t},setShowFinalizeButton:function(e,t){e.showFinalizeButton=t},setShowSuccessVideoDeleted:function(e,t){e.showSuccessVideoDeleted=t},setShowSuccessVideoSaved:function(e,t){e.showSuccessVideoSaved=t},setIsRecording:function(e,t){e.isRecording=t},setVideoOutput:function(e,t){e.videoOutput.name=t.name,e.videoOutput.href=t.href},setCounter:function(e,t){e.counter=t},counterDecrement:function(e){e.counter--},setCompletedSteps:function(e,t){e.completedSteps=t},completedStepsIncrement:function(e){e.completedSteps++},addVideo:function(e,t){e.videos.push(t)},removeVideo:function(e){e.videos.pop()},setPlayerOptions:function(e,t){e.playerOptions.sources=[],e.playerOptions.sources.push(t)},setPlayerSources:function(e,t){e.playerOptions.sources=t},setAutoplay:function(e){e.playerOptions.autoplay=!0},addChunk:function(e,t){e.chunks.push(t)},addBlob:function(e,t){e.blobArray.push(t)},setCurrentBlob:function(e,t){e.currentBlob=t},updateVideos:function(e,t){e.videos=t},videoIdIncrease:function(e){e.videoId++},setUserId:function(e,t){e.userId=t}},actions:{register:function(e,t){return _.a.post("/register",{first_name:t.firstName,last_name:t.lastName,email:t.email,password:t.password}).then(function(t){return e.commit("logout"),t}).catch(function(e){throw e})},login:function(e,t){return _.a.post("/login",{username:t.email,password:t.password}).then(function(t){var n=t.data.access_token;return window.localStorage.setItem("access_token",n),e.commit("setToken",n),t}).catch(function(e){throw e})},getUser:function(e){return _.a.defaults.headers.common["Authorization"]="Bearer "+e.state.token,_.a.get("/user").then(function(t){return e.commit("setUserId",t.data),t}).catch(function(e){throw e})},destroyTokens:function(e,t){return _.a.defaults.headers.common["Authorization"]="Bearer "+t,_.a.post("/logout").then(function(e){return window.localStorage.removeItem("access_token"),e}).catch(function(t){throw window.localStorage.removeItem("access_token"),e.commit("logout"),t})}}}),I=(n("d06d"),n("78a7"),n("f818"),n("92c6"),n("1dce")),P=n.n(I);o["a"].use(P.a),o["a"].config.productionTip=!0,S.beforeEach(function(e,t,n){e.matched.some(function(e){return e.meta.requiresAuth})?$.getters.loggedIn?n():n({name:"login"}):e.matched.some(function(e){return e.meta.requiresVisitors})&&$.getters.loggedIn?n({name:"home"}):n()}),new o["a"]({router:S,store:$,render:function(e){return e(l)}}).$mount("#app")},"78a7":function(e,t,n){}});
//# sourceMappingURL=app.0ed1a5e5.js.map