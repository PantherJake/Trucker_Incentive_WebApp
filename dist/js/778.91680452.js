"use strict";(self["webpackChunktruck_incentive_program"]=self["webpackChunktruck_incentive_program"]||[]).push([[778],{4001:function(e,t,n){n.d(t,{o:function(){return E}});var r=n(40),o=new r.k("I18n"),i=function(){function e(e){this._options=null,this._lang=null,this._dict={},this._options=Object.assign({},e),this._lang=this._options.language,!this._lang&&"undefined"!==typeof window&&window&&window.navigator&&(this._lang=window.navigator.language),o.debug(this._lang)}return e.prototype.setLanguage=function(e){this._lang=e},e.prototype.get=function(e,t){if(void 0===t&&(t=void 0),!this._lang)return"undefined"!==typeof t?t:e;var n=this._lang,r=this.getByLanguage(e,n);return r||(n.indexOf("-")>0&&(r=this.getByLanguage(e,n.split("-")[0])),r||("undefined"!==typeof t?t:e))},e.prototype.getByLanguage=function(e,t,n){if(void 0===n&&(n=null),!t)return n;var r=this._dict[t];return r?r[e]:n},e.prototype.putVocabulariesForLanguage=function(e,t){var n=this._dict[e];n||(n=this._dict[e]={}),Object.assign(n,t)},e.prototype.putVocabularies=function(e){var t=this;Object.keys(e).map((function(n){t.putVocabulariesForLanguage(n,e[n])}))},e}(),a=n(7429),u=new r.k("I18n"),c=null,s=null,E=function(){function e(){}return e.configure=function(t){return u.debug("configure I18n"),t?(c=Object.assign({},c,t.I18n||t),e.createInstance(),c):c},e.getModuleName=function(){return"I18n"},e.createInstance=function(){u.debug("create I18n instance"),s||(s=new i(c))},e.setLanguage=function(t){return e.checkConfig(),s.setLanguage(t)},e.get=function(t,n){return e.checkConfig()?s.get(t,n):"undefined"===typeof n?t:n},e.putVocabulariesForLanguage=function(t,n){return e.checkConfig(),s.putVocabulariesForLanguage(t,n)},e.putVocabularies=function(t){return e.checkConfig(),s.putVocabularies(t)},e.checkConfig=function(){return s||(s=new i(c)),!0},e}();a.dQ.register(E)},8035:function(e,t,n){n.d(t,{T:function(){return a}});var r,o,i=n(819);(function(e){e["BACK_TO_SIGN_IN"]="Back to Sign In",e["CHANGE_PASSWORD_ACTION"]="Change",e["CHANGE_PASSWORD"]="Change Password",e["CODE_LABEL"]="Verification code",e["CODE_PLACEHOLDER"]="Enter code",e["CONFIRM_SIGN_UP_CODE_LABEL"]="Confirmation Code",e["CONFIRM_SIGN_UP_CODE_PLACEHOLDER"]="Enter your code",e["CONFIRM_SIGN_UP_HEADER_TEXT"]="Confirm Sign up",e["CONFIRM_SIGN_UP_LOST_CODE"]="Lost your code?",e["CONFIRM_SIGN_UP_RESEND_CODE"]="Resend Code",e["CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT"]="Confirm",e["CONFIRM_SMS_CODE"]="Confirm SMS Code",e["CONFIRM_TOTP_CODE"]="Confirm TOTP Code",e["CONFIRM"]="Confirm",e["CREATE_ACCOUNT_TEXT"]="Create account",e["EMAIL_LABEL"]="Email Address *",e["EMAIL_PLACEHOLDER"]="Enter your email address",e["FORGOT_PASSWORD_TEXT"]="Forgot your password?",e["LESS_THAN_TWO_MFA_VALUES_MESSAGE"]="Less than two MFA types available",e["NEW_PASSWORD_LABEL"]="New password",e["NEW_PASSWORD_PLACEHOLDER"]="Enter your new password",e["NO_ACCOUNT_TEXT"]="No account?",e["USERNAME_REMOVE_WHITESPACE"]="Username cannot contain whitespace",e["PASSWORD_REMOVE_WHITESPACE"]="Password cannot start or end with whitespace",e["PASSWORD_LABEL"]="Password *",e["PASSWORD_PLACEHOLDER"]="Enter your password",e["PHONE_LABEL"]="Phone Number *",e["PHONE_PLACEHOLDER"]="(555) 555-1212",e["QR_CODE_ALT"]="qrcode",e["RESET_PASSWORD_TEXT"]="Reset password",e["RESET_YOUR_PASSWORD"]="Reset your password",e["SELECT_MFA_TYPE_HEADER_TEXT"]="Select MFA Type",e["SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT"]="Verify",e["SEND_CODE"]="Send Code",e["SUBMIT"]="Submit",e["SETUP_TOTP_REQUIRED"]="TOTP needs to be configured",e["SIGN_IN_ACTION"]="Sign In",e["SIGN_IN_HEADER_TEXT"]="Sign in to your account",e["SIGN_IN_TEXT"]="Sign in",e["SIGN_IN_WITH_AMAZON"]="Sign in with Amazon",e["SIGN_IN_WITH_AUTH0"]="Sign in with Auth0",e["SIGN_IN_WITH_AWS"]="Sign in with AWS",e["SIGN_IN_WITH_FACEBOOK"]="Sign in with Facebook",e["SIGN_IN_WITH_GOOGLE"]="Sign in with Google",e["SIGN_OUT"]="Sign Out",e["SIGN_UP_EMAIL_PLACEHOLDER"]="Email",e["SIGN_UP_HAVE_ACCOUNT_TEXT"]="Have an account?",e["SIGN_UP_HEADER_TEXT"]="Create a new account",e["SIGN_UP_PASSWORD_PLACEHOLDER"]="Password",e["SIGN_UP_SUBMIT_BUTTON_TEXT"]="Create Account",e["SIGN_UP_USERNAME_PLACEHOLDER"]="Username",e["SKIP"]="Skip",e["SUCCESS_MFA_TYPE"]="Success! Your MFA Type is now:",e["TOTP_HEADER_TEXT"]="Scan then enter verification code",e["TOTP_LABEL"]="Enter Security Code:",e["TOTP_ISSUER"]="AWSCognito",e["TOTP_SETUP_FAILURE"]="TOTP Setup has failed",e["TOTP_SUBMIT_BUTTON_TEXT"]="Verify Security Token",e["TOTP_SUCCESS_MESSAGE"]="Setup TOTP successfully!",e["UNABLE_TO_SETUP_MFA_AT_THIS_TIME"]="Failed! Unable to configure MFA at this time",e["USERNAME_LABEL"]="Username *",e["USERNAME_PLACEHOLDER"]="Enter your username",e["VERIFY_CONTACT_EMAIL_LABEL"]="Email",e["VERIFY_CONTACT_HEADER_TEXT"]="Account recovery requires verified contact information",e["VERIFY_CONTACT_PHONE_LABEL"]="Phone Number",e["VERIFY_CONTACT_SUBMIT_LABEL"]="Submit",e["VERIFY_CONTACT_VERIFY_LABEL"]="Verify",e["ADDRESS_LABEL"]="Address",e["ADDRESS_PLACEHOLDER"]="Enter your address",e["NICKNAME_LABEL"]="Nickname",e["NICKNAME_PLACEHOLDER"]="Enter your nickname",e["BIRTHDATE_LABEL"]="Birthday",e["BIRTHDATE_PLACEHOLDER"]="Enter your birthday",e["PICTURE_LABEL"]="Picture URL",e["PICTURE_PLACEHOLDER"]="Enter your picture URL",e["FAMILY_NAME_LABEL"]="Family Name",e["FAMILY_NAME_PLACEHOLDER"]="Enter your family name",e["PREFERRED_USERNAME_LABEL"]="Preferred Username",e["PREFERRED_USERNAME_PLACEHOLDER"]="Enter your preferred username",e["GENDER_LABEL"]="Gender",e["GENDER_PLACEHOLDER"]="Enter your gender",e["PROFILE_LABEL"]="Profile URL",e["PROFILE_PLACEHOLDER"]="Enter your profile URL",e["GIVEN_NAME_LABEL"]="First Name",e["GIVEN_NAME_PLACEHOLDER"]="Enter your first name",e["ZONEINFO_LABEL"]="Time zone",e["ZONEINFO_PLACEHOLDER"]="Enter your time zone",e["LOCALE_LABEL"]="Locale",e["LOCALE_PLACEHOLDER"]="Enter your locale",e["UPDATED_AT_LABEL"]="Updated At",e["UPDATED_AT_PLACEHOLDER"]="Enter the time the information was last updated",e["MIDDLE_NAME_LABEL"]="Middle Name",e["MIDDLE_NAME_PLACEHOLDER"]="Enter your middle name",e["WEBSITE_LABEL"]="Website",e["WEBSITE_PLACEHOLDER"]="Enter your website",e["NAME_LABEL"]="Full Name",e["NAME_PLACEHOLDER"]="Enter your full name",e["PHOTO_PICKER_TITLE"]="Picker Title",e["PHOTO_PICKER_HINT"]="Ancillary text or content may occupy this space here",e["PHOTO_PICKER_PLACEHOLDER_HINT"]="Placeholder hint",e["PHOTO_PICKER_BUTTON_TEXT"]="Button",e["IMAGE_PICKER_TITLE"]="Add Profile Photo",e["IMAGE_PICKER_HINT"]="Preview the image before upload",e["IMAGE_PICKER_PLACEHOLDER_HINT"]="Tap to image select",e["IMAGE_PICKER_BUTTON_TEXT"]="Upload",e["PICKER_TEXT"]="Pick a file",e["TEXT_FALLBACK_CONTENT"]="Fallback Content",e["CONFIRM_SIGN_UP_FAILED"]="Confirm Sign Up Failed",e["SIGN_UP_FAILED"]="Sign Up Failed"})(r||(r={})),function(e){e["CHATBOT_TITLE"]="ChatBot Lex",e["TEXT_INPUT_PLACEHOLDER"]="Write a message",e["VOICE_INPUT_PLACEHOLDER"]="Click mic to speak",e["CHAT_DISABLED_ERROR"]="Error: Either voice or text must be enabled for the chatbot",e["NO_BOT_NAME_ERROR"]="Error: Bot name must be provided to ChatBot"}(o||(o={}));var a=Object.assign(Object.assign(Object.assign({},r),i.A),o)},778:function(e,t,n){n.r(t),n.d(t,{amplify_s3_album:function(){return S}});n(7658),n(3408),n(4590);var r,o=n(4916),i=n(40),a=n(1814),u=n(4001),c=n(9815),s=n(8035),E=n(4171),l=n(780),f=n(3463),_=function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function a(e){try{c(r.next(e))}catch(t){i(t)}}function u(e){try{c(r["throw"](e))}catch(t){i(t)}}function c(e){e.done?n(e.value):o(e.value).then(a,u)}c((r=r.apply(e,t||[])).next())}))},d=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(e){return function(t){return c([e,t])}}function c(i){if(n)throw new TypeError("Generator is already executing.");while(a)try{if(n=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(o=a.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}},p=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r},h=new Uint8Array(16);function T(){if(!r&&(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(h)}var A=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function y(e){return"string"===typeof e&&A.test(e)}for(var g=[],m=0;m<256;++m)g.push((m+256).toString(16).substr(1));function L(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase();if(!y(n))throw TypeError("Stringified UUID is invalid");return n}function I(e,t,n){e=e||{};var r=e.random||(e.rng||T)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var o=0;o<16;++o)t[n+o]=r[o];return t}return L(r)}var O=":host{--overlay-bg-color:rgba(0, 0, 0, 0.15)}.album-container{-webkit-box-sizing:border-box;box-sizing:border-box;max-width:100%;margin:0 auto;padding:0 2rem}.grid-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-1rem -1rem;padding-bottom:3rem}.grid-item{position:relative;-ms-flex:1 0 22rem;flex:1 0 22rem;-ms-flex-positive:1;flex-grow:1;margin:1rem;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}amplify-s3-image{--width:22rem;--height:20rem;border-radius:5px;-o-object-fit:cover;object-fit:cover}.img-overlay{display:none;width:100%;height:21rem;position:absolute;top:0;left:0;background-color:var(--overlay-bg-color)}.grid-item:hover .img-overlay{display:block}",C=new i.k("S3Album"),S=function(){function e(e){var t=this;(0,o.r)(this,e),this.contentType="binary/octet-stream",this.level=c.A.Public,this.picker=!0,this.pickerText=s.T.PICKER_TEXT,this.albumItems=[],this.imgArr={},this.list=function(){return _(t,void 0,void 0,(function(){var e,t,n,r,o,i,a,u;return d(this,(function(c){switch(c.label){case 0:if(e=this,t=e.path,n=void 0===t?"":t,r=e.level,o=e.track,i=e.identityId,C.debug("Album path: "+n),!l.Ke||"function"!==typeof l.Ke.list)throw new Error(E.d);c.label=1;case 1:return c.trys.push([1,3,,4]),[4,l.Ke.list(n,{level:r,track:o,identityId:i})];case 2:return a=c.sent(),this.marshal(a),[3,4];case 3:return u=c.sent(),C.warn(u),[3,4];case 4:return[2]}}))}))},this.marshal=function(e){e.forEach((function(e){var n=e.key.toLowerCase(),r=n.split(".")[1];f.i.has(r)&&(!e.contentType||e.contentType&&"binary/octet-stream"===e.contentType)&&(e.contentType=t.getContentType(e))}));var n=e.filter((function(e){return e.contentType&&e.contentType.startsWith("image/")})),r=t.filter?t.filter(n):n;r=t.sort?t.sort(r):r,t.albumItems=r,C.debug("album items",t.albumItems),t.constructImgArray(t.albumItems)},this.constructImgArray=function(e){e.map((function(e){t.imgArr[""+e["key"]]=e["key"]}))},this.handlePick=function(e){return _(t,void 0,void 0,(function(){var t,n,r,o,i,a,u,c,s,E;return d(this,(function(l){switch(l.label){case 0:t=e.target.files[0],n=this,r=n.path,o=void 0===r?"":r,i=n.level,a=n.track,u=n.fileToKey,c=o+(0,f.c)(t,u),l.label=1;case 1:return l.trys.push([1,3,,4]),[4,(0,f.p)(c,t,i,a,t["type"],C)];case 2:return l.sent(),[3,4];case 3:throw s=l.sent(),C.error(s),new Error(s);case 4:return Object.keys(this.imgArr).includes(c)?(this.albumItems=p(this.albumItems),this.imgArr[c]=c+"-"+I()):(E=p(this.albumItems,this.filter?this.filter([{key:c}]):[{key:c}]),this.albumItems=this.sort?this.sort(E):E),[2]}}))}))}}return e.prototype.getContentType=function(e){return(0,a.rI)(e.key,"image/*")},e.prototype.componentWillLoad=function(){this.list()},e.prototype.render=function(){var e=this;return(0,o.h)("div",null,(0,o.h)("div",{class:"album-container"},(0,o.h)("div",{class:"grid-row"},this.albumItems.map((function(t){return(0,o.h)("div",{class:"grid-item",key:"key-"+t.key},(0,o.h)("amplify-s3-image",{key:e.imgArr[t.key],imgKey:t.key,level:e.level,path:e.path,identityId:e.identityId,track:e.track,handleOnError:e.handleOnError,handleOnLoad:e.handleOnLoad}),(0,o.h)("span",{class:"img-overlay"}))})))),this.picker&&(0,o.h)("amplify-picker",{pickerText:u.o.get(this.pickerText),inputHandler:function(t){return e.handlePick(t)},acceptValue:"image/*"}))},e}();S.style=O},4171:function(e,t,n){n.d(t,{A:function(){return T},C:function(){return c},E:function(){return o},N:function(){return f},P:function(){return l},T:function(){return y},U:function(){return A},a:function(){return g},b:function(){return a},c:function(){return d},d:function(){return _},e:function(){return p},f:function(){return h},g:function(){return s},h:function(){return E},i:function(){return i},j:function(){return u},k:function(){return r}});var r="username",o="email",i="code",a="phone",u="password",c="country-dial-code-select",s="+1",E="amplify-auth-source",l="Phone number can not be empty",f="No Auth module found, please ensure @aws-amplify/auth is imported",_="No Storage module found, please ensure @aws-amplify/storage is imported",d="No Interactions module found, please ensure @aws-amplify/interactions is imported",p="User has not set up software token mfa",h="User has not verified software token mfa",T="auth",A="UI Auth",y="ToastAuthError",g="AuthStateChange"},3463:function(e,t,n){n.d(t,{a:function(){return l},c:function(){return c},g:function(){return s},i:function(){return u},p:function(){return f}});n(7658);var r=n(4171),o=n(780),i=function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function a(e){try{c(r.next(e))}catch(t){i(t)}}function u(e){try{c(r["throw"](e))}catch(t){i(t)}}function c(e){e.done?n(e.value):o(e.value).then(a,u)}c((r=r.apply(e,t||[])).next())}))},a=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(e){return function(t){return c([e,t])}}function c(i){if(n)throw new TypeError("Generator is already executing.");while(a)try{if(n=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(o=a.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}},u=new Set(["apng","bmp","gif","ico","cur","jpg","jpeg","jfif","pjpeg","pjp","png","svg","tif","tiff","webp"]),c=function(e,t){var n=e.name,r=e.size,o=e.type,i=encodeURI(n);return t&&(i="string"===typeof t?t:"function"===typeof t?t({name:n,size:r,type:o}):encodeURI(JSON.stringify(t)),i||(i="empty_key")),i.replace(/\s/g,"_")},s=function(e,t,n,u,c){return i(void 0,void 0,void 0,(function(){var i,s;return a(this,(function(a){switch(a.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.get)throw new Error(r.d);a.label=1;case 1:return a.trys.push([1,3,,4]),[4,o.Ke.get(e,{level:t,track:n,identityId:u})];case 2:return i=a.sent(),c.debug("Storage image get",i),[2,i];case 3:throw s=a.sent(),new Error(s);case 4:return[2]}}))}))},E=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n("Failed to read file!"),r.abort()},r.readAsText(e)}))},l=function(e,t,n,u,c){return i(void 0,void 0,void 0,(function(){var i,s,l;return a(this,(function(a){switch(a.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.get)throw new Error(r.d);a.label=1;case 1:return a.trys.push([1,4,,5]),[4,o.Ke.get(e,{download:!0,level:t,track:n,identityId:u})];case 2:return i=a.sent(),c.debug(i),[4,E(i["Body"])];case 3:return s=a.sent(),[2,s];case 4:throw l=a.sent(),new Error(l);case 5:return[2]}}))}))},f=function(e,t,n,u,c,s){return i(void 0,void 0,void 0,(function(){var i,E;return a(this,(function(a){switch(a.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.put)throw new Error(r.d);a.label=1;case 1:return a.trys.push([1,3,,4]),[4,o.Ke.put(e,t,{contentType:c,level:n,track:u})];case 2:return i=a.sent(),s.debug("Upload data",i),[3,4];case 3:throw E=a.sent(),new Error(E);case 4:return[2]}}))}))}},9815:function(e,t,n){var r;n.d(t,{A:function(){return r}}),function(e){e["Public"]="public",e["Private"]="private",e["Protected"]="protected"}(r||(r={}))}}]);
//# sourceMappingURL=778.91680452.js.map