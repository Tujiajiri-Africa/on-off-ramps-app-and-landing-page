import React from 'react'
import {MainUserDashboard} from '@/components/ui/dashboard/index'
import { UserWallet } from '@/components/ui/dashboard/user-wallet';

export default async function Page() {
  return (
      <>
        <MainUserDashboard />

        {/* <UserWallet /> */}
      </>
  );
}