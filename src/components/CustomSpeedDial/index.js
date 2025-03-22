import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { CustomApproveIcon, CustomCancelIcon, CustomPDFIcon, CustomEditDraftIcon, CustomViewIcon, CustomDownloadIcon, CustomDeleteDraftIcon } from './styles';
import { ConfirmAction } from '../ConfirmAction';

export const CustomSpeedDial = ({ status = "", hasBudget = false, handleSelected = () => String }) => {
  const [open, setOpen] = React.useState(false)
  const [action, setAction] = React.useState('')
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getDowloadActionName = () => {
    if (status === 'Cancelada') return 'Baixar Histórico do Orçamento'

    if (status === 'Em Execução') return 'Baixar Orçamento Aprovado'

    return 'Baixar Orçamento'
  }

  const actions = [
    {
      icon: <CustomApproveIcon />,
      name: 'Finalizar Ordem de Serviço',
      show: status === 'Em Execução'
    },
    {
      icon: <CustomCancelIcon />,
      name: 'Cancelar Cotação',
      show: status === 'Em Aprovação'
    },
    {
      icon: <CustomApproveIcon />,
      name: 'Aprovar Orçamento',
      show: status === 'Em Aprovação' && hasBudget
    },
    {
      icon: <CustomPDFIcon />,
      name: 'Gerar Orçamento',
      show: status === 'Em Aprovação' && !hasBudget
    },
    {
      icon: <CustomDownloadIcon />,
      name: getDowloadActionName(),
      show: (
        status === 'Aprovada' ||
        status === 'Em Aprovação' ||
        status === 'Cancelada' ||
        status === 'Em Execução'
      ) && hasBudget
    },
    {
      icon: <CustomDeleteDraftIcon />,
      name: 'Deletar Rascunho',
      show: status === 'Em Rascunho'
    },
    {
      icon: <CustomEditDraftIcon />,
      name: 'Editar Rascunho',
      show: status === 'Em Rascunho'
    },
    {
      icon: <CustomViewIcon />,
      name: 'Ver Cotação',
      show: status !== 'Em Rascunho' && status !== 'Concluída'
    },
    {
      icon: <CustomViewIcon />,
      name: 'Ver Ordem de Serviço',
      show: status === 'Concluída'
    },
  ]

  return (
    <Box sx={{
      height: 240,
      transform: 'translateZ(0px)',
      flexGrow: 1,
      '& .MuiButtonBase-root': {
        width: '50px',
        height: '50px',
        color: '#FFFFFF',
        backgroundColor: '#003C73',
        '&:hover': {
          backgroundColor: '#005F89'
        }
      },
      '& .MuiSpeedDial-actions': {
        marginBottom: '-32px',
        '& span': {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#FFFFFF',
        },
      },
      '& .MuiSpeedDialAction-staticTooltip': {
        marginBottom: '-12px',
      },
      '& .MuiSpeedDialAction-staticTooltipLabel': {
        width: 'max-content',
        borderRadius: '10px',
        backgroundColor: '#003C73',
      }
    }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.filter(a => a.show).map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              console.log(action.name)
              if (
                action.name === 'Cancelar Cotação' ||
                action.name === 'Aprovar Orçamento' ||
                action.name === 'Deletar Rascunho'
              ) {
                setAction(action.name)
                setOpenConfirm(true)
              }
              else
                handleSelected(action.name)
            }}
          />
        ))}
      </SpeedDial>

      <ConfirmAction
        open={openConfirm}
        title={action}
        text={'Deseja seguir com a ação selecionada ?'}
        handleClose={() => { setOpenConfirm(false) }}
        returnDecision={(decision) => {
          setOpenConfirm(false)

          if (decision)
            handleSelected(action)
        }}
      />
    </Box>
  )
}