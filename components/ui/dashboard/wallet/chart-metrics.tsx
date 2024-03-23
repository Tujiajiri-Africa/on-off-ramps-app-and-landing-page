'use client'

import React from 'react'
import { BarChart, Bar, Rectangle, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {sampleWalletData} from '@/helpers/data'

export function UserBalanceChartAnalysis(){
    return (
            <ResponsiveContainer 
              width={'100%'} 
              //width={'99%'}
              //height={300}
              height={350}>
                <AreaChart
                width={500}
                height={400}
                data={sampleWalletData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="label" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                    />
                <Tooltip />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="incoming" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="outgoing" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
            </ResponsiveContainer>
    )
}