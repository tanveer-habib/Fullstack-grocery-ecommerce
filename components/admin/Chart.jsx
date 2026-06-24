"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppContext } from "@/context/AppContext.js";
import { useEffect } from 'react';

const data = [
    { date: "3/4/26", orders: 2 },
    { date: "4/4/26", orders: 15 },
    { date: "5/4/26", orders: 7 },
    { date: "6/4/26", orders: 10 },
    { date: "7/4/26", orders: 5 },
    { date: "8/4/26", orders: 12 },
    { date: "10/4/26", orders: 22 },
    { date: "11/4/26", orders: 29 },
    { date: "12/4/26", orders: 22 },
    { date: "13/4/26", orders: 28 },
    { date: "14/4/26", orders: 31 },
    { date: "15/4/26", orders: 42 },
    { date: "16/4/26", orders: 32 },
    { date: "17/4/26", orders: 22 },
    { date: "18/4/26", orders: 29 },
    { date: "19/4/26", orders: 32 },
    { date: "20/4/26", orders: 28 },
    { date: "21/4/26", orders: 31 },
    { date: "22/4/26", orders: 22 },
    { date: "23/4/26", orders: 38 },
    { date: "24/4/26", orders: 42 },
    { date: "25/4/26", orders: 55 },
    { date: "26/4/26", orders: 62 },
    { date: "27/4/26", orders: 85 },
    { date: "28/4/26", orders: 82 },
    { date: "29/4/26", orders: 102 }
]

const Chart = () => {
    /* const { adminOrders, getAdminOrders } = useAppContext();
    let data = [];

    if (adminOrders.length > 0) {
        const obj = {};
        adminOrders.map((order) => {
            const formatedDate = new Date(order.createdAt).toLocaleDateString().split("/").slice(0, 2).concat(new Date(order.createdAt).getFullYear().toString().slice(2)).join("/");
            if (obj[formatedDate]) {
                obj[formatedDate] += 1;
            } else {
                obj[formatedDate] = 1;
            };
        });
        data = Object.entries(obj).map(([date, orders]) => (
            { date, orders }
        ));
        console.log(data);
    }

    useEffect(() => {
        getAdminOrders();
    }, []); */

    return (
        <AreaChart style={{ width: '100%', maxHeight: '55vh', aspectRatio: 1.618 }} responsive data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis width="auto" />
            <XAxis dataKey="date" />
            <Tooltip />
            <Area type="monotone" dataKey="orders" strokeWidth={2} stroke="#00d52c" fill="#00d52c" fillOpacity={0.3} />
        </AreaChart>
    )
}

export default Chart;