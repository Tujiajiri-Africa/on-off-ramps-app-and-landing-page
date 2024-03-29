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
                <Area type="monotone" name="total" dataKey="total" stackId="1" stroke="#7DA0FA" fill="#7DA0FA" />
                <Area type="monotone" name="incoming" dataKey="incoming" stackId="2" stroke="#4B49AC" fill="#4B49AC" />
                <Area type="monotone" name="outgoing" dataKey="outgoing" stackId="3" stroke="#F3797E" fill="#F3797E" />
                </AreaChart>
            </ResponsiveContainer>
    )
}