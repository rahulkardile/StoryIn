import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const Admin = () => {
  const data = [
    { name: "Page A", uv: 420, pv: 6400, a: 5520, b: 400, amt: 300 },
    { name: "Page A", uv: 520, pv: 3400, a:820, b: 6400, amt: 3400 },
    { name: "Page A", uv: 40, pv: 240, a: 3220, b: 300, amt: 2400 },
  ];

  return (
    <div className="my-7 flex justify-center items-center flex-col gap-9">

    <h1 className="border-b-[1px] w-[320px] text-center border-black">
      Admin Dashboard
    </h1>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="a" stroke="#82ca9d" />
        <Line type="monotone" dataKey="b" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Admin;
