"use strict";(self["webpackChunktruck_incentive_program"]=self["webpackChunktruck_incentive_program"]||[]).push([[602],{4001:function(e,n,t){t.d(n,{o:function(){return _}});var r=t(40),o=new r.k("I18n"),i=function(){function e(e){this._options=null,this._lang=null,this._dict={},this._options=Object.assign({},e),this._lang=this._options.language,!this._lang&&"undefined"!==typeof window&&window&&window.navigator&&(this._lang=window.navigator.language),o.debug(this._lang)}return e.prototype.setLanguage=function(e){this._lang=e},e.prototype.get=function(e,n){if(void 0===n&&(n=void 0),!this._lang)return"undefined"!==typeof n?n:e;var t=this._lang,r=this.getByLanguage(e,t);return r||(t.indexOf("-")>0&&(r=this.getByLanguage(e,t.split("-")[0])),r||("undefined"!==typeof n?n:e))},e.prototype.getByLanguage=function(e,n,t){if(void 0===t&&(t=null),!n)return t;var r=this._dict[n];return r?r[e]:t},e.prototype.putVocabulariesForLanguage=function(e,n){var t=this._dict[e];t||(t=this._dict[e]={}),Object.assign(t,n)},e.prototype.putVocabularies=function(e){var n=this;Object.keys(e).map((function(t){n.putVocabulariesForLanguage(t,e[t])}))},e}(),u=t(7429),a=new r.k("I18n"),c=null,E=null,_=function(){function e(){}return e.configure=function(n){return a.debug("configure I18n"),n?(c=Object.assign({},c,n.I18n||n),e.createInstance(),c):c},e.getModuleName=function(){return"I18n"},e.createInstance=function(){a.debug("create I18n instance"),E||(E=new i(c))},e.setLanguage=function(n){return e.checkConfig(),E.setLanguage(n)},e.get=function(n,t){return e.checkConfig()?E.get(n,t):"undefined"===typeof t?n:t},e.putVocabulariesForLanguage=function(n,t){return e.checkConfig(),E.putVocabulariesForLanguage(n,t)},e.putVocabularies=function(n){return e.checkConfig(),E.putVocabularies(n)},e.checkConfig=function(){return E||(E=new i(c)),!0},e}();u.dQ.register(_)},8035:function(e,n,t){t.d(n,{T:function(){return u}});var r,o,i=t(819);(function(e){e["BACK_TO_SIGN_IN"]="Back to Sign In",e["CHANGE_PASSWORD_ACTION"]="Change",e["CHANGE_PASSWORD"]="Change Password",e["CODE_LABEL"]="Verification code",e["CODE_PLACEHOLDER"]="Enter code",e["CONFIRM_SIGN_UP_CODE_LABEL"]="Confirmation Code",e["CONFIRM_SIGN_UP_CODE_PLACEHOLDER"]="Enter your code",e["CONFIRM_SIGN_UP_HEADER_TEXT"]="Confirm Sign up",e["CONFIRM_SIGN_UP_LOST_CODE"]="Lost your code?",e["CONFIRM_SIGN_UP_RESEND_CODE"]="Resend Code",e["CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT"]="Confirm",e["CONFIRM_SMS_CODE"]="Confirm SMS Code",e["CONFIRM_TOTP_CODE"]="Confirm TOTP Code",e["CONFIRM"]="Confirm",e["CREATE_ACCOUNT_TEXT"]="Create account",e["EMAIL_LABEL"]="Email Address *",e["EMAIL_PLACEHOLDER"]="Enter your email address",e["FORGOT_PASSWORD_TEXT"]="Forgot your password?",e["LESS_THAN_TWO_MFA_VALUES_MESSAGE"]="Less than two MFA types available",e["NEW_PASSWORD_LABEL"]="New password",e["NEW_PASSWORD_PLACEHOLDER"]="Enter your new password",e["NO_ACCOUNT_TEXT"]="No account?",e["USERNAME_REMOVE_WHITESPACE"]="Username cannot contain whitespace",e["PASSWORD_REMOVE_WHITESPACE"]="Password cannot start or end with whitespace",e["PASSWORD_LABEL"]="Password *",e["PASSWORD_PLACEHOLDER"]="Enter your password",e["PHONE_LABEL"]="Phone Number *",e["PHONE_PLACEHOLDER"]="(555) 555-1212",e["QR_CODE_ALT"]="qrcode",e["RESET_PASSWORD_TEXT"]="Reset password",e["RESET_YOUR_PASSWORD"]="Reset your password",e["SELECT_MFA_TYPE_HEADER_TEXT"]="Select MFA Type",e["SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT"]="Verify",e["SEND_CODE"]="Send Code",e["SUBMIT"]="Submit",e["SETUP_TOTP_REQUIRED"]="TOTP needs to be configured",e["SIGN_IN_ACTION"]="Sign In",e["SIGN_IN_HEADER_TEXT"]="Sign in to your account",e["SIGN_IN_TEXT"]="Sign in",e["SIGN_IN_WITH_AMAZON"]="Sign in with Amazon",e["SIGN_IN_WITH_AUTH0"]="Sign in with Auth0",e["SIGN_IN_WITH_AWS"]="Sign in with AWS",e["SIGN_IN_WITH_FACEBOOK"]="Sign in with Facebook",e["SIGN_IN_WITH_GOOGLE"]="Sign in with Google",e["SIGN_OUT"]="Sign Out",e["SIGN_UP_EMAIL_PLACEHOLDER"]="Email",e["SIGN_UP_HAVE_ACCOUNT_TEXT"]="Have an account?",e["SIGN_UP_HEADER_TEXT"]="Create a new account",e["SIGN_UP_PASSWORD_PLACEHOLDER"]="Password",e["SIGN_UP_SUBMIT_BUTTON_TEXT"]="Create Account",e["SIGN_UP_USERNAME_PLACEHOLDER"]="Username",e["SKIP"]="Skip",e["SUCCESS_MFA_TYPE"]="Success! Your MFA Type is now:",e["TOTP_HEADER_TEXT"]="Scan then enter verification code",e["TOTP_LABEL"]="Enter Security Code:",e["TOTP_ISSUER"]="AWSCognito",e["TOTP_SETUP_FAILURE"]="TOTP Setup has failed",e["TOTP_SUBMIT_BUTTON_TEXT"]="Verify Security Token",e["TOTP_SUCCESS_MESSAGE"]="Setup TOTP successfully!",e["UNABLE_TO_SETUP_MFA_AT_THIS_TIME"]="Failed! Unable to configure MFA at this time",e["USERNAME_LABEL"]="Username *",e["USERNAME_PLACEHOLDER"]="Enter your username",e["VERIFY_CONTACT_EMAIL_LABEL"]="Email",e["VERIFY_CONTACT_HEADER_TEXT"]="Account recovery requires verified contact information",e["VERIFY_CONTACT_PHONE_LABEL"]="Phone Number",e["VERIFY_CONTACT_SUBMIT_LABEL"]="Submit",e["VERIFY_CONTACT_VERIFY_LABEL"]="Verify",e["ADDRESS_LABEL"]="Address",e["ADDRESS_PLACEHOLDER"]="Enter your address",e["NICKNAME_LABEL"]="Nickname",e["NICKNAME_PLACEHOLDER"]="Enter your nickname",e["BIRTHDATE_LABEL"]="Birthday",e["BIRTHDATE_PLACEHOLDER"]="Enter your birthday",e["PICTURE_LABEL"]="Picture URL",e["PICTURE_PLACEHOLDER"]="Enter your picture URL",e["FAMILY_NAME_LABEL"]="Family Name",e["FAMILY_NAME_PLACEHOLDER"]="Enter your family name",e["PREFERRED_USERNAME_LABEL"]="Preferred Username",e["PREFERRED_USERNAME_PLACEHOLDER"]="Enter your preferred username",e["GENDER_LABEL"]="Gender",e["GENDER_PLACEHOLDER"]="Enter your gender",e["PROFILE_LABEL"]="Profile URL",e["PROFILE_PLACEHOLDER"]="Enter your profile URL",e["GIVEN_NAME_LABEL"]="First Name",e["GIVEN_NAME_PLACEHOLDER"]="Enter your first name",e["ZONEINFO_LABEL"]="Time zone",e["ZONEINFO_PLACEHOLDER"]="Enter your time zone",e["LOCALE_LABEL"]="Locale",e["LOCALE_PLACEHOLDER"]="Enter your locale",e["UPDATED_AT_LABEL"]="Updated At",e["UPDATED_AT_PLACEHOLDER"]="Enter the time the information was last updated",e["MIDDLE_NAME_LABEL"]="Middle Name",e["MIDDLE_NAME_PLACEHOLDER"]="Enter your middle name",e["WEBSITE_LABEL"]="Website",e["WEBSITE_PLACEHOLDER"]="Enter your website",e["NAME_LABEL"]="Full Name",e["NAME_PLACEHOLDER"]="Enter your full name",e["PHOTO_PICKER_TITLE"]="Picker Title",e["PHOTO_PICKER_HINT"]="Ancillary text or content may occupy this space here",e["PHOTO_PICKER_PLACEHOLDER_HINT"]="Placeholder hint",e["PHOTO_PICKER_BUTTON_TEXT"]="Button",e["IMAGE_PICKER_TITLE"]="Add Profile Photo",e["IMAGE_PICKER_HINT"]="Preview the image before upload",e["IMAGE_PICKER_PLACEHOLDER_HINT"]="Tap to image select",e["IMAGE_PICKER_BUTTON_TEXT"]="Upload",e["PICKER_TEXT"]="Pick a file",e["TEXT_FALLBACK_CONTENT"]="Fallback Content",e["CONFIRM_SIGN_UP_FAILED"]="Confirm Sign Up Failed",e["SIGN_UP_FAILED"]="Sign Up Failed"})(r||(r={})),function(e){e["CHATBOT_TITLE"]="ChatBot Lex",e["TEXT_INPUT_PLACEHOLDER"]="Write a message",e["VOICE_INPUT_PLACEHOLDER"]="Click mic to speak",e["CHAT_DISABLED_ERROR"]="Error: Either voice or text must be enabled for the chatbot",e["NO_BOT_NAME_ERROR"]="Error: Bot name must be provided to ChatBot"}(o||(o={}));var u=Object.assign(Object.assign(Object.assign({},r),i.A),o)},602:function(e,n,t){t.r(n),t.d(n,{amplify_s3_image_picker:function(){return l}});t(7658);var r=t(4916),o=t(40),i=t(4001),u=t(9815),a=t(8035),c=(t(1146),t(3463)),E=function(e,n,t,r){function o(e){return e instanceof t?e:new t((function(n){n(e)}))}return new(t||(t=Promise))((function(t,i){function u(e){try{c(r.next(e))}catch(n){i(n)}}function a(e){try{c(r["throw"](e))}catch(n){i(n)}}function c(e){e.done?t(e.value):o(e.value).then(u,a)}c((r=r.apply(e,n||[])).next())}))},_=function(e,n){var t,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(e){return function(n){return c([e,n])}}function c(i){if(t)throw new TypeError("Generator is already executing.");while(u)try{if(t=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(o=u.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(e,u)}catch(a){i=[6,a],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}},s=new o.k("S3ImagePicker"),l=function(){function e(e){var n=this;(0,r.r)(this,e),this.contentType="binary/octet-stream",this.level=u.A.Public,this.headerTitle=a.T.IMAGE_PICKER_TITLE,this.headerHint=a.T.IMAGE_PICKER_HINT,this.placeholderHint=a.T.IMAGE_PICKER_PLACEHOLDER_HINT,this.buttonText=a.T.IMAGE_PICKER_BUTTON_TEXT,this.handlePick=function(e){return E(n,void 0,void 0,(function(){var n,t,r,o,i,u,a,E,l,f;return _(this,(function(_){switch(_.label){case 0:n=this,t=n.path,r=void 0===t?"":t,o=n.level,i=n.track,u=n.identityId,a=n.fileToKey,E=r+(0,c.c)(e,a),_.label=1;case 1:return _.trys.push([1,4,,5]),[4,(0,c.p)(E,e,o,i,e["type"],s)];case 2:return _.sent(),l=this,[4,(0,c.g)(E,o,i,u,s)];case 3:return l.src=_.sent(),[3,5];case 4:throw f=_.sent(),s.error(f),new Error(f);case 5:return[2]}}))}))}}return e.prototype.render=function(){return(0,r.h)(r.H,null,(0,r.h)("slot",{name:"photo-picker"},(0,r.h)("amplify-photo-picker",{previewSrc:this.src,handleClick:this.handlePick,headerTitle:i.o.get(this.headerTitle),headerHint:i.o.get(this.headerHint),placeholderHint:i.o.get(this.placeholderHint),buttonText:i.o.get(this.buttonText)})))},e}()},4171:function(e,n,t){t.d(n,{A:function(){return L},C:function(){return c},E:function(){return o},N:function(){return l},P:function(){return s},T:function(){return p},U:function(){return h},a:function(){return I},b:function(){return u},c:function(){return T},d:function(){return f},e:function(){return A},f:function(){return d},g:function(){return E},h:function(){return _},i:function(){return i},j:function(){return a},k:function(){return r}});var r="username",o="email",i="code",u="phone",a="password",c="country-dial-code-select",E="+1",_="amplify-auth-source",s="Phone number can not be empty",l="No Auth module found, please ensure @aws-amplify/auth is imported",f="No Storage module found, please ensure @aws-amplify/storage is imported",T="No Interactions module found, please ensure @aws-amplify/interactions is imported",A="User has not set up software token mfa",d="User has not verified software token mfa",L="auth",h="UI Auth",p="ToastAuthError",I="AuthStateChange"},3463:function(e,n,t){t.d(n,{a:function(){return s},c:function(){return c},g:function(){return E},i:function(){return a},p:function(){return l}});t(7658);var r=t(4171),o=t(1146),i=function(e,n,t,r){function o(e){return e instanceof t?e:new t((function(n){n(e)}))}return new(t||(t=Promise))((function(t,i){function u(e){try{c(r.next(e))}catch(n){i(n)}}function a(e){try{c(r["throw"](e))}catch(n){i(n)}}function c(e){e.done?t(e.value):o(e.value).then(u,a)}c((r=r.apply(e,n||[])).next())}))},u=function(e,n){var t,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(e){return function(n){return c([e,n])}}function c(i){if(t)throw new TypeError("Generator is already executing.");while(u)try{if(t=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(o=u.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(e,u)}catch(a){i=[6,a],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}},a=new Set(["apng","bmp","gif","ico","cur","jpg","jpeg","jfif","pjpeg","pjp","png","svg","tif","tiff","webp"]),c=function(e,n){var t=e.name,r=e.size,o=e.type,i=encodeURI(t);return n&&(i="string"===typeof n?n:"function"===typeof n?n({name:t,size:r,type:o}):encodeURI(JSON.stringify(n)),i||(i="empty_key")),i.replace(/\s/g,"_")},E=function(e,n,t,a,c){return i(void 0,void 0,void 0,(function(){var i,E;return u(this,(function(u){switch(u.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.get)throw new Error(r.d);u.label=1;case 1:return u.trys.push([1,3,,4]),[4,o.Ke.get(e,{level:n,track:t,identityId:a})];case 2:return i=u.sent(),c.debug("Storage image get",i),[2,i];case 3:throw E=u.sent(),new Error(E);case 4:return[2]}}))}))},_=function(e){return new Promise((function(n,t){var r=new FileReader;r.onload=function(){n(r.result)},r.onerror=function(){t("Failed to read file!"),r.abort()},r.readAsText(e)}))},s=function(e,n,t,a,c){return i(void 0,void 0,void 0,(function(){var i,E,s;return u(this,(function(u){switch(u.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.get)throw new Error(r.d);u.label=1;case 1:return u.trys.push([1,4,,5]),[4,o.Ke.get(e,{download:!0,level:n,track:t,identityId:a})];case 2:return i=u.sent(),c.debug(i),[4,_(i["Body"])];case 3:return E=u.sent(),[2,E];case 4:throw s=u.sent(),new Error(s);case 5:return[2]}}))}))},l=function(e,n,t,a,c,E){return i(void 0,void 0,void 0,(function(){var i,_;return u(this,(function(u){switch(u.label){case 0:if(!o.Ke||"function"!==typeof o.Ke.put)throw new Error(r.d);u.label=1;case 1:return u.trys.push([1,3,,4]),[4,o.Ke.put(e,n,{contentType:c,level:t,track:a})];case 2:return i=u.sent(),E.debug("Upload data",i),[3,4];case 3:throw _=u.sent(),new Error(_);case 4:return[2]}}))}))}},9815:function(e,n,t){var r;t.d(n,{A:function(){return r}}),function(e){e["Public"]="public",e["Private"]="private",e["Protected"]="protected"}(r||(r={}))}}]);
//# sourceMappingURL=602.dc712d3f.js.map