import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as D,i as I}from"./assets/vendor-77e16229.js";function g(t){I.error({title:"Error",message:t,position:"topRight"})}document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("datetime-picker"),n=document.getElementById("start-btn"),a=document.getElementById("days"),d=document.getElementById("hours"),i=document.getElementById("minutes"),o=document.getElementById("seconds");function s(e){return e<=new Date?(g("Please choose a date in the future"),!1):!0}function u(e){t.disabled=!0,n.disabled=!0;const r=setInterval(f,1e3);function f(){const l=e-new Date;if(l<=0){clearInterval(r),a.textContent="00",d.textContent="00",i.textContent="00",o.textContent="00",t.disabled=!1,n.disabled=!1;return}const{days:h,hours:y,minutes:E,seconds:C}=p(l);a.textContent=c(h),d.textContent=c(y),i.textContent=c(E),o.textContent=c(C)}}D(t,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const r=e[0];s(r)&&(n.disabled=!1)}}),n.addEventListener("click",function(){const e=new Date(t.value);s(e)&&u(e)})});function p(t){const o=Math.floor(t/864e5),s=Math.floor(t%864e5/36e5),u=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:o,hours:s,minutes:u,seconds:m}}function c(t){return t<10?`0${t}`:t}
//# sourceMappingURL=commonHelpers.js.map
