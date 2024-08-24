import{r as o,a as p,j as s,L as c,N as n,_ as i}from"./index-o8-be8Tz.js";import{F as u}from"./index-a4Qv4tzW.js";const f="https://firebasestorage.googleapis.com/v0/b/storyin-64d8b.appspot.com/o/assets%2FCover.jpg?alt=media&token=8e4ddda0-d60f-41f9-9170-aa09e255738b",g=()=>{const[t,d]=o.useState([{_id:"",poster:"",title:"",user:{name:""}}]);console.log(t);const[r,x]=o.useState([{_id:"",poster:"",title:"",user:{name:""}}]),{status:m}=p(e=>e.user);return o.useEffect(()=>{const e=new AbortController,a=async()=>{const l=await(await fetch("/api/audio-book/get",{signal:e.signal})).json();l.success===!0?d(l.data):i.error("problem")};return(async()=>{const l=await(await fetch("/api/audio-book/trending",{signal:e.signal})).json();l.success===!0?x(l.data):i.error("problem")})(),a(),()=>e.abort()},[]),s.jsxs("section",{className:"h-full w-full",children:[s.jsxs("div",{className:"sm:h-[40%] w-full relative flex items-center gap-2 flex-col",children:[s.jsx("div",{className:"h-[100%] absolute overflow-hidden w-full",children:s.jsx("img",{src:f,className:"object-cover",alt:"img"})}),s.jsxs("div",{style:{boxShadow:"5px -70px 60px black inset"},className:"relative mt-7 sm:mt-[340px] flex flex-col gap-3 w-full",children:[s.jsx("h1",{className:"ml-14 portrait:ml-8 text-2xl sm:text-5xl text-orange-500 font-bold",children:"Audiobooks"}),s.jsx("p",{className:"ml-14 portrait:ml-8 text-xs portrait:line-clamp-3 sm:text-base text-white max-w-[590px]",children:"Get unlimited access to the world of audiobooks - where new content awaits you every day. Step into a limitless audio adventure with over 400,000+ titles, waiting to be discovered."}),m===!1?s.jsx(c,{to:"/subscription",className:"p-3 bg-white mx-14 flex justify-center text-black max-w-52 mb-5 rounded-lg text-base font-bold hover:opacity-80",children:"Subscribe Now"}):s.jsx("p",{className:"sm:mb-9"})]})]}),s.jsxs("div",{className:"max-w-[1300px] ml-8 m-auto mt-3",children:[s.jsxs(c,{className:"underline text-sm font-semibold flex items-center text-orange-500",to:"/",children:["Home",s.jsx(u,{className:"text-gray-600"})]}),s.jsxs("section",{className:"mr-8 my-3",children:[t.length>0?s.jsx(s.Fragment,{children:s.jsxs("section",{className:" max-w-[1200px] flex flex-col gap-4 m-auto mb-9",children:[s.jsx("div",{className:"ml-6 mt-2",children:s.jsx("h1",{className:"font-semibold text-xl",children:"New On StoryIn"})}),s.jsx("div",{id:"scroll",className:"overflow-auto whitespace-nowrap mb-3",children:t.map((e,a)=>s.jsx(n,{img:`${e==null?void 0:e.poster}`,id:e==null?void 0:e._id,author:e==null?void 0:e.user.name,bookName:e==null?void 0:e.title},a))})]})}):s.jsxs("section",{className:" max-w-[1200px] flex flex-col gap-4 m-auto mb-9",children:[s.jsx("div",{className:"ml-6 mt-2",children:s.jsx("h1",{className:"font-semibold text-xl",children:"New On StoryIn"})}),s.jsx("div",{id:"scroll",className:"overflow-auto m-auto whitespace-nowrap my-9",children:s.jsx("h2",{children:"Loading . . . "})})]}),s.jsx("section",{className:"mr-8 my-3",children:r.length>0?s.jsx(s.Fragment,{children:s.jsxs("section",{className:" max-w-[1200px] flex flex-col gap-4 m-auto mb-9",children:[s.jsx("div",{className:"ml-6 mt-2",children:s.jsx("h1",{className:"font-semibold text-xl",children:"Stories to start with"})}),s.jsx("div",{id:"scroll",className:"overflow-auto whitespace-nowrap mb-3",children:r.map((e,a)=>s.jsx(n,{img:`${e==null?void 0:e.poster}`,id:e==null?void 0:e._id,author:e==null?void 0:e.user.name,bookName:e==null?void 0:e.title},a))})]})}):s.jsxs("section",{className:" max-w-[1200px] flex flex-col gap-4 m-auto mb-9",children:[s.jsx("div",{className:"ml-6 mt-2",children:s.jsx("h1",{className:"font-semibold text-xl",children:"Stories to start with"})}),s.jsx("div",{id:"scroll",className:"overflow-auto m-auto whitespace-nowrap my-9",children:s.jsx("h2",{children:"Loading . . . "})})]})})]})]})]})};export{g as default};