(this.webpackJsonpcodejaadoo=this.webpackJsonpcodejaadoo||[]).push([[0],{28:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return CodeSnippetRunner}));var _styles_css__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(40),_styles_css__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);function CodeSnippetRunner(_ref){var code=_ref.code,runCallback=_ref.runCallback,printFunctionStr='const print = (...items) => {\n      Array.prototype.forEach.call(items, (item) => {\n      if(item instanceof Array) {\n        item = "[ " + item.map((a) => {\n          if(typeof a === "string") { return "\'" + a.replace("\'", "\\\'") + "\'"; }\n          else { return a; }\n        }).reduce((acc, a) => {\n          return acc + ", " + a;\n        }) + " ]";\n      }\n      document.getElementById("output").appendChild(document.createTextNode(item));\n      document.getElementById("output").appendChild(document.createTextNode(" "));\n    });\n    document.getElementById("output").appendChild(document.createTextNode("\\n"));\n  };';return console.log(printFunctionStr+"\n"+code),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{id:"code-runner",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button",{onClick:function onClick(){eval(printFunctionStr+"\n"+code),"function"===typeof runCallback&&runCallback()},children:"Run Code"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("pre",{id:"output"})]})}},37:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(26),i=n(25),l=n(4),c=(n(37),n.p+"static/media/closed-treasure-chest.32351da1.png"),s=n(1);function u(e){var t=e.spells,n=e.handler,r=e.setClicked,a=o.a.useRef(null);return o.a.useEffect((function(){r&&"function"===typeof r&&t.forEach((function(e){return r(e)&&n(e,{target:a.current})}))}),[r,t,n,a]),Object(s.jsx)("div",{style:{position:"fixed",top:0,left:0,width:"100%",backgroundColor:"rgba(75,0,255,0.5)",overflow:"auto",padding:"5px"},children:Object(s.jsxs)("span",{style:{whiteSpace:"nowrap"},children:["Available Code Spells:",(t||[]).map((function(e){return Object(s.jsx)("button",{onClick:function(t){return n&&n(e,t)},style:{margin:"5px 5px"},ref:"function"===typeof r&&r(e)?a:null,children:e},e)}))]})})}var d=n.p+"static/media/open-treasure-chest-empty.svg.2a02895f.png",p=n.p+"static/media/lock.55b3f1d2.png",g=n.p+"static/media/wizard-walking-forward.f140a331.gif",h=n(9);function b(e){var t,n=e.currentLevel,r=e.levels,a=e.spells,i=(null===r||void 0===r?void 0:r.slice(0,n))||[],b=(null===r||void 0===r?void 0:r.slice(n))||[],j=o.a.useState(null),x=Object(l.a)(j,2),f=x[0],m=x[1];return Object(s.jsxs)("div",{style:{},onClick:function(){return m(null)},children:[Object(s.jsx)(u,{spells:a||["print"]}),null!=f?(t=f,t.index<=n?Object(s.jsx)("div",{style:{position:"fixed",width:"100%",backgroundColor:"rgba(127, 127, 255, 0.75)",borderRadius:"20px"},children:Object(s.jsx)(h.a,{to:"/".concat("treasure"===f.type?"treasure/".concat(f.num):"level/".concat(f.num)),style:{color:"black",textDecoration:"none",display:"flex",justifyContent:"center",padding:"50px 0"},children:"treasure"===f.type?"Click to collect treasure":"Click to Start Level ".concat(f.num)})}):Object(s.jsxs)("div",{style:{position:"fixed",width:"100%",backgroundColor:"rgba(200, 200, 200, 0.5)",borderRadius:"20px",padding:"10px 0"},children:[Object(s.jsx)("img",{src:p,alt:"Locked",width:"100"}),Object(s.jsx)("p",{style:{marginTop:0},children:"You need to successfully complete previous levels before you can access this."})]})):"",i.map((function(e,t){return Object(s.jsx)("div",{style:{borderRadius:"30px",width:"50px",height:"50px",backgroundColor:"gold",textAlign:"center",marginLeft:"auto",marginRight:"auto",marginTop:"10px"},id:e.index,onClick:function(t){console.log(t.currentTarget.id),m(e),t.stopPropagation()},children:"treasure"===e.type?Object(s.jsx)("img",{src:d,width:"40",alt:"open treasure chest"}):"Level ".concat(e.num)})})),Object(s.jsx)("div",{children:Object(s.jsx)("img",{src:g,alt:"The wizard walks forward!",width:"53"})}),b.map((function(e,t){return Object(s.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(s.jsx)("div",{style:{fontWeight:"bold",color:"#084"},children:0===t&&"Click to proceed \u27a1\ufe0f"}),Object(s.jsx)("div",{style:{borderRadius:"30px",width:"50px",height:"50px",backgroundColor:"#dddddd",textAlign:"center",marginTop:"10px"},id:e.index,onClick:function(t){console.log(t.currentTarget.id),m(e),t.stopPropagation()},children:"treasure"===e.type?Object(s.jsx)("img",{src:c,width:"40",alt:"open treasure chest"}):Object(s.jsx)("span",{children:"Level ".concat(null===e||void 0===e?void 0:e.num)})}),Object(s.jsx)("div",{style:{fontWeight:"bold",color:"#084"},children:0===t&&"\u2b05\ufe0f Click to proceed"})]})})),Object(s.jsx)(h.a,{to:"/",children:"Go back"})]})}var j=n(3),x=n(27),f=n.n(x),m=function(e){return e.replace(/\s\s+/g," ")};function v(e){var t,n,r=e.startInTextMode,a=e.tutorialStep,i=e.currentAnswer,c=e.selectedElement,u=e.answerBlockData,d=e.currentStreak,p=e.setCurrentAnswer,g=e.answer,h=o.a.useState(!!r),b=Object(l.a)(h,2),j=b[0],x=b[1],f=o.a.useState([]),v=Object(l.a)(f,2),O=v[0],_=v[1],y=m(g)===m(i),k=m(g).startsWith(m(i)),w=y?"green":k?"white":"red";o.a.useEffect((function(){!function(e){var t=[],n=m(e);u.forEach((function(e){return e.used=!1}));for(var r=u.findIndex((function(e){return n.startsWith(e.value)})),o=0;-1!==r&&o<u.length;o++)t.push(r),u[r].used=!0,n=n.substring(u[r].value.length),r=u.findIndex((function(e){return n.startsWith(e.value)&&!e.used}));_(t),p(e)}(i)}),[j,u]);var C=function(e,t){j?(p(i.endsWith(e)?i.slice(0,-e.length):i+e),x(!1)):p(O.reduce((function(e,t){return u[t].used?e+u[t].value:e}),"")+e)};return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h3",{children:"Answer:\xa0"}),j?Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("label",{children:Object(s.jsx)("textarea",{id:"answer",readOnly:0!==a,value:i,cols:40,rows:1,ref:4===a||8===a?c:null,style:{maxWidth:"95%",backgroundImage:d>=3&&"url('/fire.gif')",backgroundSize:"10% 20px",backgroundColor:w,backgroundRepeat:"repeat-x",backgroundPosition:"100% 100%",fontSize:"xx-large",fontWeight:"bold",padding:"20px 5px",fontFamily:"courier, monospace",resize:"none",borderRadius:"10px"},onChange:function(e){var t=e.target.value,n=[],r=t;u.forEach((function(e){return e.used=!1}));for(var o=u.findIndex((function(e){return r.startsWith(e.value)})),a=0;-1!==o&&a<u.length;a++)n.push(o),u[o].used=!0,r=r.substring(u[o].value.length),o=u.findIndex((function(e){return r.startsWith(e.value)&&!e.used}));_(n),p(t,e.target)},autoFocus:!0})})}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{id:"answerBlock",children:[Object(s.jsx)("label",{children:Object(s.jsx)("textarea",{id:"answer",readOnly:!0,ref:4===a||8===a?c:null,style:{maxWidth:"95%",visibility:"hidden",display:"none",color:"white",width:null===(t=document.getElementById("blockAnswerDiv"))||void 0===t?void 0:t.getBoundingClientRect().width,height:null===(n=document.getElementById("blockAnswerDiv"))||void 0===n?void 0:n.getBoundingClientRect().height,backgroundImage:d>=3&&"url('/fire.gif')",backgroundSize:"10% 20px",backgroundRepeat:"repeat-x",backgroundPosition:"100% 100%",fontSize:"xx-large",fontWeight:"bold",padding:"20px 5px",fontFamily:"courier, monospace",resize:"none",borderRadius:"10px"},onChange:function(e){p(e.target.value,e.target)},onClick:function(e){for(var t,n=0,r="",o=null===(t=u[O[n]])||void 0===t?void 0:t.value;g.startsWith(r+o)&&n<O.length;){var a;r+=o,n++,o=null===(a=u[O[n]])||void 0===a?void 0:a.value}O.slice(n).forEach((function(e){return u[e].used=!1})),p(r),x(!0)},autoFocus:!0})}),Object(s.jsx)("div",{style:{top:"50%",left:"50%",width:"95%",backgroundColor:w,border:"2px solid black",backgroundImage:d>=3&&"url('/fire.gif')",backgroundSize:"10% 20px",backgroundRepeat:"repeat-x",backgroundPosition:"100% 100%",fontSize:"xx-large",fontWeight:"bold",padding:"20px 5px",fontFamily:"courier, monospace",borderRadius:"10px"},id:"block-answer-div",onClick:function(){x(!0),setTimeout((function(){var e=document.getElementById("answer");e.setSelectionRange(g.length,g.length),e.style.height="",e.style.height=e.scrollHeight-40+"px"}),0)},children:O.map((function(e,t){var n,r;return Object(s.jsx)("button",{onClick:function(n){console.log(i,g),console.log(O),x(!1),u[e].used=!1,_(O.slice(0,t).concat(O.slice(t+1))),C("",n.target),n.stopPropagation()},style:{fontFamily:"monospace",fontSize:"large",maxWidth:"95%",overflow:"auto"},disabled:!(null!==(n=u[e])&&void 0!==n&&n.used),children:null===(r=u[e])||void 0===r?void 0:r.value})}))})]}),Object(s.jsx)("br",{}),Object(s.jsx)("br",{})]}),Object(s.jsx)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",maxWidth:"95%"},children:u.map((function(e,t){return Object(s.jsx)("button",{onClick:function(n){console.log(t,O),_(O.concat(t)),C(e.value,n.target),e.used=!0},style:{fontFamily:"monospace",minWidth:0},disabled:e.used,children:e.used?(n=" ",r=e.value.length,Array(r).fill(n).join("")):e.value});var n,r}))}),Object(s.jsx)("hr",{})]})}function O(e){var t=e.totalQuestions,n=e.numRemaining,r=Math.round(100*Math.max((t-n)/t,0));return Object(s.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",width:"95%",fontSize:"small",marginBottom:"10px",background:"linear-gradient(to right, #6c0 "+r+"%, #ccc 0%",border:"2px solid black",borderRadius:"10px",minHeight:"10px",transition:"1s"},children:[Math.max(t-n,0),"/",t]})}var _=function(e){return e.replace(/\s\s+/g," ")};function y(e){e.spells;var t=e.setClearedLevel,n=Object(j.n)().level,r=["","Click on a spell once to add its text to your answer.","You can also click on buttons in the problems to add their text. Uh oh! The answer box turned red. This means it's not correct.","No worries, we can click on the button again to remove this code.","Let's type in a space and quotes in the input. Still red.","OK, let's get a hint. Click on this button to remove all incorrect code and find out the next two symbols. This means we'll have to answer one more problem. Oh well, more practice for our wizard.","That's right, we forgot the open parenthesis.","Let's now click on the button again to reinstate the text.","Finally, let's add the remaining quotation marks and closing parenthesis to complete our answer. Yay, it turned green and the text disappeared, so this means we were correct!","That's all there is to it. Type in code and use the buttons to add code as you please. You can also get the full answer by clicking this button. But this means three more problems to solve."],a=o.a.useState({type:"foo",problems:[{description:"Loading...",questionArgs:[],answer:"-",answerArgs:[]}]}),i=Object(l.a)(a,2),c=i[0],u=i[1],d=o.a.useState(!1),p=Object(l.a)(d,2),g=p[0],b=p[1],x=o.a.useState(0),m=Object(l.a)(x,2),y=m[0],k=m[1],w=o.a.useState([]),C=Object(l.a)(w,2),S=C[0],E=C[1],R=o.a.useState(""),T=Object(l.a)(R,2),B=T[0],I=T[1],A=o.a.useState([]),W=Object(l.a)(A,2),M=W[0],L=W[1],P=o.a.useState(!1),D=Object(l.a)(P,2),F=D[0],z=D[1],q=o.a.useState(0),U=Object(l.a)(q,2),K=U[0],H=U[1],N=o.a.useState(0),J=Object(l.a)(N,2),Y=J[0],G=J[1],Q=o.a.useState({x:0,y:0}),V=Object(l.a)(Q,2),X=V[0],Z=V[1],$=o.a.useRef(null);o.a.useEffect((function(){console.log($.current,""),$.current&&je($.current.innerText,$.current)}),[$,Y]),o.a.useEffect((function(){void 0!=n&&(console.log("level".concat(n,".json")),fetch("/level".concat(n,".json")).then((function(e){return e.json()})).then((function(e){return u(e)})))}),[n]);var ee=o.a.useState(!1),te=Object(l.a)(ee,2),ne=te[0],re=te[1],oe=o.a.useState(1/0),ae=Object(l.a)(oe,2),ie=ae[0],le=ae[1];o.a.useEffect((function(){var e=Math.floor(Math.random()*c.problems.length),n=c.problems[e],r=n.questionArgs,o=n.answerArgs,a=c.problems[e].questionArgs.map((function(e){return Math.floor(Math.random()*e.length)}));console.log("A",e,a),k(e),E(a),L(f.a.shuffle(c.problems[e].answerBlocks||[]).map((function(e,t){return{value:e.replace(/%([0-9]+)/g,(function(e,t){return o[t-1][a[t-1]]})).replace(/%([0-9]+)/g,(function(e,t){return r[t-1][a[t-1]]})),used:!1}}))),ie===1/0&&"foo"!==(null===c||void 0===c?void 0:c.type)?(console.log(c),le(c.numToClear||5)):ie>0&&g?(le(ie-1),z(!1)):0===ie&&t(),b(!1),re(!1)}),[c,g]);var ce,se,ue=c.problems[y],de=ue.questionArgs,pe=ue.answerArgs,ge=ue.answer.replace(/%([0-9]+)/g,(function(e,t){return pe[t-1][S[t-1]]})).replace(/%([0-9]+)/g,(function(e,t){return de[t-1][S[t-1]]})),he=_(ge),be=_(B),je=function(e,t){Y>0&&null!==t&&void 0!==t&&t.getBoundingClientRect()&&(Z({x:t.getBoundingClientRect().x+t.getBoundingClientRect().width/2,y:t.getBoundingClientRect().y+t.getBoundingClientRect().height/2}),t.style.animation="buttonBlink 500ms 5",t.style.backgroundColor="rgb(239, 239, 239)"),4!==Y&&5!==Y&&Y<8?I(B.endsWith(e)?B.slice(0,-e.length):B+e):4===Y?I(B+' "'):5===Y?(console.log("5",Y),I(B.slice(0,-2)+'("')):8===Y&&I(B+'")')},xe=ue.description.replace(/%([0-9]+)/g,(function(e,t){return de[t-1][S[t-1]]})).replace(/___+/,be.substring(0,100)+(ce="_",se=Math.max(he.length-be.length,0),Array(se).fill(ce).join(""))).split(/<pre>|<\/pre>/g).map((function(e,t){return t%2===0?e:Object(s.jsx)("pre",{children:e})})).map((function(e,t){return"string"===typeof e?e.split(/<h3>|<\/h3>/g).map((function(e,t){return t%2===0?e:Object(s.jsx)("h3",{children:e})})):e})).flat().map((function(e,t){return"string"===typeof e?e.split(/<codeButton>|<\/codeButton>/g).map((function(e,t){return t%2===0?e:Object(s.jsx)("button",{onClick:function(e){return je(e.target.innerText,e.target)},disabled:0!==Y&&2!==Y&&3!==Y&&7!==Y,ref:2===Y||3===Y||7===Y?$:null,children:e})})):e}));return o.a.useEffect((function(){var e=document.getElementById("answer");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length),e.style.height="",e.style.height=e.scrollHeight-40+"px",he&&he===be?(e.style.backgroundColor="green",setTimeout((function(){b(!0),I(""),e.style.backgroundColor="",F||H(K+1)}),1e3)):he.startsWith(be)?e.style.backgroundColor="":(e.style.backgroundColor="red",H(0)))}),[be,he,Y]),Object(s.jsxs)("div",{style:{marginTop:"-55px",marginBottom:"20px"},children:[Y>0?Object(s.jsxs)("div",{style:{position:"absolute",top:X.y,left:X.x-10,textAlign:"left"},children:[Object(s.jsx)("span",{role:"img",ariaLabel:"pointer",style:{fontSize:"xx-large"},children:"\ud83d\udc46"}),Object(s.jsxs)("div",{id:"tutorial-directions",style:{backgroundColor:"rgb(255, 255, 205, 1)",maxWidth:"100px",minHeight:"50px",overflow:"hidden",position:"relative",left:"10px",top:"-10px",padding:"5px",transition:"1s"},children:[r[Y],Object(s.jsxs)("button",{onClick:function(){return G((Y+1)%r.length)},style:{marginTop:"20px",fontWeight:"strong",display:"block"},children:["Click"," ",Y<r.length-1?"for the next step":"to finish"]})]})]}):"",ie>0?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(O,{totalQuestions:Math.max(ie,(null===c||void 0===c?void 0:c.numToClear)||5),numRemaining:ie}),Object(s.jsx)("div",{style:{fontSize:"large"},children:xe}),Object(s.jsx)("label",{style:{display:"none"},children:Object(s.jsx)("textarea",{id:"answerOld",readOnly:0!==Y,value:B,cols:40,rows:1,ref:4===Y||8===Y?$:null,style:{maxWidth:"95%",backgroundImage:K>=3&&"url('/fire.gif')",backgroundSize:"10% 20px",backgroundRepeat:"repeat-x",backgroundPosition:"100% 100%",fontSize:"xx-large",fontWeight:"bold",padding:"20px 5px",fontFamily:"courier, monospace",resize:"none",borderRadius:"10px"},onChange:function(e){I(e.target.value)},autoFocus:!0})}),Object(s.jsx)(v,{startInTextMode:!1,tutorialStep:Y,currentAnswer:B,selectedElement:$,answerBlockData:M,currentStreak:K,setCurrentAnswer:I,answer:ge,handleCodeButtonClick:je}),Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{style:{position:"fixed",left:0,bottom:0,width:"100%",borderTop:"1px solid grey",background:"#ccc"},children:[Object(s.jsx)("button",{onClick:function(){re(!ne),z(!0),F||(le(Math.min(ie+3,(null===c||void 0===c?void 0:c.numToClear)+1||5)),H(0))},ref:9===Y?$:null,disabled:0!==Y&&9!==Y,children:ne?"Hide answer":"Show answer (-3 progress)"}),Object(s.jsx)("div",{style:{display:ne?"block":"none"},children:ge}),Object(s.jsx)("p",{children:Object(s.jsx)(h.a,{to:"/map",onClick:function(e){return window.confirm("Are you sure? If you return to the map, you'll need to start this level from the beginning.")||e.preventDefault()},children:"Quit, and go back to the level map!"})})]})]}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{style:{color:"green"},children:"SUCCESS! Leveled Up!"}),Object(s.jsx)(h.a,{to:"/map",children:"Go back to the map!"})]})]})}var k=n(28),w=n.p+"static/media/open-treasure-chest-gold.svg.8c7a6d8b.png";function C(e){var t=e.spells,n=e.setSpells,r=e.isOpened,a=e.setOpened,i=Object(j.n)().level,d=void 0===i?0:i,p=r(d),g=o.a.useState(null),b=Object(l.a)(g,2),x=b[0],f=b[1],m=o.a.useState(!1),v=Object(l.a)(m,2),O=v[0],_=v[1];return o.a.useEffect((function(){console.log("/treasure".concat(d,".json")),fetch("/treasure".concat(d,".json")).then((function(e){return e.json()})).then((function(e){return f(e)}))}),[d]),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(u,{spells:t,disabled:!0}),p?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{children:null===x||void 0===x?void 0:x.openedHeading}),Object(s.jsx)("p",{children:Object(s.jsx)("img",{src:w,alt:"Open treasure chest with gold",width:"100"})}),Object(s.jsx)("p",{children:null===x||void 0===x?void 0:x.description}),(null===x||void 0===x?void 0:x.usage)&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h3",{children:"Example usage:"}),Object(s.jsx)("pre",{children:x.usage})]}),(null===x||void 0===x?void 0:x.output)&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h3",{children:"Output from spell:"}),Object(s.jsx)(k.a,{code:x.usage,runCallback:function(){return _(!0)}})]}),Object(s.jsx)(h.a,{to:"/map",style:{animation:O?"textBlink 500ms 3":"",backgroundColor:O?"gold":"white"},children:"Go forward"})]}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{children:null===x||void 0===x?void 0:x.closedHeading}),Object(s.jsx)("img",{src:c,style:{width:"200px",height:"auto"},alt:"treasure",onClick:function(e){x&&(a(!0),t.includes(null===x||void 0===x?void 0:x.treasure)||n(t.concat(null===x||void 0===x?void 0:x.treasure)))}}),Object(s.jsx)("h2",{children:"Click the box above to open!"})]})]})}var S=n(11);function E(){var e=function(e){return x.findIndex((function(t){return"treasure"===t.type&&t.num===parseInt(e,10)}))<d},t=o.a.useState(JSON.parse(localStorage.getItem("spells"))||[]),n=Object(l.a)(t,2),r=n[0],a=n[1],c=o.a.useState(parseInt(localStorage.getItem("currentLevel"),10)||0),u=Object(l.a)(c,2),d=u[0],p=u[1],g=o.a.useState([{type:"treasure",num:0},{type:"level",num:1},{type:"treasure",num:1},{type:"level",num:2},{type:"treasure",num:2},{type:"level",num:3},{type:"treasure",num:3},{type:"level",num:4},{type:"treasure",num:4},{type:"level",num:5},{type:"treasure",num:5}].map((function(e,t){return Object(i.a)(Object(i.a)({},e),{},{index:t})}))),h=Object(l.a)(g,2),x=h[0];h[1];function f(){console.log("CL",d),localStorage.setItem("currentLevel",d+1),p(d+1)}return o.a.useEffect((function(){localStorage.setItem("spells",JSON.stringify(r))}),[r]),Object(s.jsx)("div",{className:"App",style:{marginTop:"45px"},children:Object(s.jsx)(S.a,{children:Object(s.jsxs)(j.c,{children:[Object(s.jsx)(j.a,{path:"/",exact:!0,element:Object(s.jsx)(C,{spells:r,setSpells:a,isOpened:e,setOpened:f})}),Object(s.jsx)(j.a,{path:"/codejaadoo",exact:!0,element:Object(s.jsx)(C,{spells:r,setSpells:a,isOpened:e,setOpened:f})}),Object(s.jsx)(j.a,{path:"/map",exact:!0,element:Object(s.jsx)(b,{levels:x,currentLevel:d,spells:r})}),Object(s.jsx)(j.a,{path:"/level/:level",exact:!0,element:Object(s.jsx)(y,{spells:r,setClearedLevel:f})}),Object(s.jsx)(j.a,{path:"/treasure/:level",exact:!0,element:Object(s.jsx)(C,{spells:r,setSpells:a,isOpened:e,setOpened:f})})]})})})}var R=document.getElementById("root");Object(a.createRoot)(R).render(Object(s.jsx)(r.StrictMode,{children:Object(s.jsx)(E,{})}))}},[[41,1,2]]]);
//# sourceMappingURL=main.b3d35e2d.chunk.js.map