import {
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  Switch
} from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { useStore } from 'redhooks'
import { getAccounts } from '../../../service/facebook'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateTeamDialog: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState()
  const { state } = useStore()

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props])

  useEffect(() => {
    getAccounts().then(value => {
      console.log(value)
    })
  }, [])

  //console.log(state.auth.currentUser)

  return (
    <Dialog
      isOpen={isOpen}
      className={Classes.DARK}
      icon='people'
      onClose={props.onClose}
      title='Créer une équipe'>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Nom de l'équipe"
          labelFor='name-input'
          labelInfo='(requis)'>
          <InputGroup id='name-input' />
        </FormGroup>
        <FormGroup
          label="Contenus à gérer par l'équipe"
          labelFor='pages'
          helperText="Seules les pages que votre compte gère s'affichent">
          {['page1', 'page2', 'page3'].map((page, k) => (
            <Switch id='page' label={page} key={k} />
          ))}
        </FormGroup>
      </div>
    </Dialog>
  )
}

export default CreateTeamDialog
