'use client'

import React from 'react'
import { BarChart, 
  Bar, 
  Rectangle, 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
 } from 'recharts';

import {sampleWalletData} from '@/helpers/data'

export function UserBalanceChartAnalysis(){
    return (
            <ResponsiveContainer 
              width={'100%'} 
              //width={'99%'}
              //height={300}
              height={350}>
                {/* <AreaChart
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
                  tickFormatter={(value) => `K${value}`}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                    />
                <Tooltip />
                <Area type="monotone" name="total" dataKey="total" stackId="1" stroke="#ea580c" fill="#ea580c" />
                <Area type="monotone" name="incoming" dataKey="incoming" stackId="2" stroke="#16a34a" fill="#16a34a" />
                <Area type="monotone" name="outgoing" dataKey="outgoing" stackId="3" stroke="#4B49AC" fill="#4B49AC" />
                </AreaChart> */}
                <LineChart width={480} height={400} data={sampleWalletData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis 
                      dataKey="label" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
  //dataKey="label" 
  />
  <YAxis
                    tickFormatter={(value) => `KES${value}`}
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
  />
  <Tooltip />
  <Legend />
  <Line type="monotone" name="total" dataKey="total"  stroke="#ea580c" fill="#ea580c" />
  <Line type="monotone" name="incoming" dataKey="incoming" stroke="#16a34a" fill="#16a34a" />
  <Line type="monotone" name="outgoing" dataKey="outgoing"  stroke="#F00FDA" fill="#F00FDA" />
</LineChart>
            </ResponsiveContainer>
    )
}