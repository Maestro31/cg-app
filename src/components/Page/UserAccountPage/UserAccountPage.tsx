import { Tab, Tabs } from '@blueprintjs/core'
import React from 'react'
import { PageContent } from '../../sharedComponents'
import AccountPanel from './AccountPanel'

const UserAccountPage: React.ComponentType<any> = () => {
  return (
    <PageContent>
      <Tabs vertical large>
        <Tab id='compte' title='Mon compte' panel={<AccountPanel />} />
      </Tabs>
    </PageContent>
  )
}

export default UserAccountPage
