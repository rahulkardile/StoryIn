import{r as n,b as u,c as p,j as e,L as f,_ as o,d as h,e as g}from"./index-_pMZagxt.js";import{O as j}from"./OAuth-ZPQZ-rA5.js";import"./firebase-enSJFrA3.js";const v=()=>{const[r,d]=n.useState({}),[l,t]=n.useState(!1),m=u(),i=p(),c=a=>{d({...r,[a.target.id]:a.target.value})},x=async a=>{a.preventDefault(),t(!0);const s=await(await fetch("/api/user/get",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).json();s.success===!1||!s?(t(!1),o.error(s.message)):(o.success(`Welcome Back ${s.name}`),i(h(s)),t(!1),s.status===!0&&i(g()),m("/")),t(!1)};return e.jsxs("main",{className:"sm:max-w-[500px] w-[85%] flex flex-col gap-3 justify-center items-center m-auto mt-14 mb-28",children:[e.jsxs("div",{className:"w-full flex justify-center flex-col",children:[e.jsx("h1",{className:"text-black font-bold portrait:text-center text-xl sm:text-3xl",children:"Welcome Back!"}),e.jsxs("p",{className:"text-xs sm:text-sm portrait:text-center tracking-wider",children:[" ","Welcome Back! Please enter your details"]})]}),e.jsxs("form",{onSubmit:x,className:"w-full flex justify-center sm:items-start items-center sm:justify-start flex-col gap-6",children:[e.jsxs("div",{className:"sm:w-full w-[79%]",children:[e.jsx("p",{className:"text-gray-950",children:"Email"}),e.jsx("input",{type:"email",className:"p-[10px] w-[100%] sm:w-[75%] text-sm rounded border-gray-700 border-[1px]",required:!0,placeholder:"email",id:"email",onChange:c})]}),e.jsxs("div",{className:"sm:w-full w-[79%]",children:[e.jsx("p",{className:"text-gray-950",children:"Password"}),e.jsx("input",{type:"password",className:"p-[10px] w-[100%] sm:w-[75%]  text-sm rounded border-gray-700 border-[1px]",required:!0,placeholder:"password",id:"password",onChange:c})]}),e.jsx("button",{type:"submit",className:"bg-black text-white font-semibold p-[10px]  w-[80%] sm:w-[75%]  rounded-md  duration-300 ease-in-out hover:scale-105",disabled:l,children:"Login"})]}),e.jsxs("div",{className:"sm:w-full w-[79%] flex portrait:items-center flex-col gap-3",children:[e.jsx(j,{loading:l}),e.jsxs("p",{children:["Don't Have an account ?",e.jsxs(f,{to:"/register",className:"font-semibold",children:[" ","Register"]})]})]})]})};export{v as default};
