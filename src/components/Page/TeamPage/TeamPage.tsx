import { Alert, Button, ButtonGroup, Classes, HTMLTable, Intent } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'redhooks';
import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../../../redux/Auth/authReducer';
import { AppState } from '../../../redux/reducers';
import { getTeamsByOwner, removeTeam } from '../../../redux/Team/teamActions';
import { TeamState } from '../../../redux/Team/teamReducer';
import CreateTeamDialog from './CreateTeamDialog';
import * as S from './styles';

interface StateProps {
  authProps: AuthState
  teamProps: TeamState
}

interface DispatchProps {
  getTeamsByOwner: typeof getTeamsByOwner
  removeTeam: typeof removeTeam
}

type Props = StateProps & DispatchProps

const TeamPage: React.FC<Props> = props => {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false)
  const [teamUidForDeletion, setTeamUidForDeletion] = useState('')
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false)

  const { currentUser } = props.authProps

  const { getTeamsByOwner } = props

  useEffect(() => {
    currentUser && getTeamsByOwner(currentUser.uid)
  }, [currentUser, getTeamsByOwner])

  const { teams } = props.teamProps

  const handleRemoveTeam = (uid: string) => {
    setTeamUidForDeletion(uid)
    setIsOpenDeleteAlert(true)
  }

  const handleEditTeam = (uid: string) => {
    console.log('[edit]:', uid)
  }

  const handleDeleteAlertCancel = () => {
    setIsOpenDeleteAlert(false)
    setTeamUidForDeletion('')
  }

  const handleDeleteAlertConfirm = () => {
    console.log('[remove]:', teamUidForDeletion)
    setIsOpenDeleteAlert(false)
    props.removeTeam(teamUidForDeletion)
  }

  const handleCreateDialogClose = () => {
    setCreateDialogIsOpen(false)
  }


  return (
    <S.Content>
      <Button
        text='Créer une équipe'
        icon='add'
        large
        onClick={() => setCreateDialogIsOpen(true)}
      />
      {teams && (
        <HTMLTable
          striped
          interactive
          bordered
          style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <td>Nom de l'équipe</td>
              <td>Membres</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(teams).map(k => (
              <tr key={k}>
                <td>{teams[k].name}</td>
                <td>
                  {teams[k].members &&
                    Object.values(teams[k].members).join(', ')}
                </td>
                <td>
                  <ButtonGroup>
                    <Button icon='edit' onClick={() => handleEditTeam(k)} />
                    <Button
                      intent={Intent.DANGER}
                      icon='trash'
                      onClick={() => handleRemoveTeam(k)}
                    />
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      )}
      <CreateTeamDialog
        isOpen={createDialogIsOpen}
        onClose={handleCreateDialogClose}
      />
      <Alert
        className={Classes.DARK}
        cancelButtonText='Annuler'
        confirmButtonText='Supprimer'
        icon='trash'
        intent={Intent.DANGER}
        isOpen={isOpenDeleteAlert}
        onCancel={handleDeleteAlertCancel}
        onConfirm={handleDeleteAlertConfirm}>
        <p>
          Attention! La suppression de l'équipe est irréversible, les pages ne
          pourront plus être gérées par l'équipe et tous les accès seront
          révoqués. Souhaitez-vous tout de même continuer ?
        </p>
      </Alert>
    </S.Content>
  )
}

const mapStateToProps = (state: AppState) => ({
  teamProps: state.team,
  authProps: state.auth
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, any>
) => {
  return {
    getTeamsByOwner: (uid: string) => dispatch(getTeamsByOwner(uid)),
    removeTeam: (uid: string) => dispatch(removeTeam(uid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)
