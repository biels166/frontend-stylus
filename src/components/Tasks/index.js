import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CustomAddTaskIcon, CustomBody, CustomBudgetIcon, CustomCard, CustomCompletedIcon, CustomDeliveryIcon, CustomFooter, CustomLocationIcon, CustomOthersIcon, CustomPaidIcon, DeleteTask, DiscardChanges, SaveChanges } from './styles';
import { CustomSwitch } from '../Switch';
import { DateInput } from './../DateInput/index';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import { ModalDeleteTask } from './ModalDeleteTask';
import { CustomToast } from '../Toast';
import api from '../../services/api';

export default function TaskCard({ task, handleReloadPageList = () => Boolean }) {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [reloadSwitch, setReloadSwitch] = React.useState(false)
  const [hasChange, setHasChange] = React.useState(false)
  const [form, setForm] = React.useState(task)
  const [disableButton, setDisableButton] = React.useState(false)
  const [infoToCustomToast, setInfoToCustomToast] = React.useState({})
  const [openToast, setOpenToast] = React.useState(false)

  const handleCloseToast = () => { setOpenToast(false) }

  const getIcon = React.useCallback((type, id) => {
    if (id === null)
      return <CustomAddTaskIcon fontSize='large' state={form?.state} />

    if (type) {
      const item = taskTypeList().filter(i => i.type === type)

      if (item.length === 0)
        return <CustomOthersIcon fontSize='large' state={form?.state} />

      return item[0]?.icon
    }

    return <CustomOthersIcon fontSize='large' state={form?.state} />
  }, [form?.type])

  const getBackground = React.useCallback(() => {
    switch (form?.state) {
      case 'Concluída': return '#90EE90';
      case 'Atrasada': return '#E9967A';
      case 'Próxima de Vencer': return '#7FFFD4';
      case 'Hoje': return '#F0E68C';
      case 'Em dia': return '#E0FFFF';
      case 'Nova Tarefa': return '#D3D3D3	';
      default: return '#E0FFFF';
    }
  }, [form])


  const taskTypeList = () => {
    return [
      {
        type: 'Compra de Insumos',
        icon: <CustomPaidIcon fontSize='large' state={form?.state} />
      },
      {
        type: 'Entrega',
        icon: <CustomDeliveryIcon fontSize='large' state={form?.state} />
      },
      {
        type: 'Visita / Reunião',
        icon: <CustomLocationIcon fontSize='large' state={form?.state} />
      },
      {
        type: 'Outros',
        icon: <CustomOthersIcon fontSize='large' state={form?.state} />
      },
      {
        type: 'Orçamento',
        icon: <CustomBudgetIcon fontSize='large' state={form?.state} />
      },
      {
        type: '',
        icon: <CustomOthersIcon fontSize='large' state={form?.state} />
      }
    ]
  }

  async function createOrUpdateTask() {
    setDisableButton(true)

    const response = task._id === null ? 
    await api.CreateTaskByUser(form) : await api.UpdateTask(form)
    
    if (response.success) {
      setTimeout(() => {
        handleReloadPageList(true)
      }, 3000)
    }

    setInfoToCustomToast({
      severity: response.status,
      info: response.message,
    })
    setOpenToast(true)
    setDisableButton(false)
  }

  React.useEffect(() => {
    setHasChange(task !== form)
  }, [form])

  return (
    <CustomCard state={form?.state}>
      <CardHeader
        state={form?.state}
        sx={{
          backgroundColor: getBackground()
        }}
        avatar={(
          <React.Fragment>
            {
              form?.status
                ? <CustomCompletedIcon fontSize='large' />
                : getIcon(form?.type, task._id)
            }

            <CustomSwitch
              initialState={form?.status}
              reload={reloadSwitch}
              handleOnChange={(status) => setForm({ ...form, status: status })}
            />
          </React.Fragment>
        )}
        title={(
          <TextField
            fullWidth
            variant='standard'
            required
            id="standard-required-title"
            label="Título"
            placeholder="digite o título da tarefa"
            value={form?.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value })
            }}
          />
        )}
        subheader={(
          <DateInput
            variant='standard'
            label='Data*'
            selectedDate={form?.date}
            valueCallback={(newDate) => setForm({ ...form, date: newDate })}
          />
        )}
      />
      <CardContent>
        <CustomBody>
          <Box
            display={'flex'}
            gap={'10px'}
            width={'100%'}
          >
            <Typography>
              Tipo da tarefa:
            </Typography>

            <Select
              variant='standard'
              labelId="select-outlined-label-type"
              value={form?.type}
              onChange={(evt) => {
                setForm({ ...form, type: evt.target.value })
              }}
              label="Tipo da tarefa*"
            >
              {
                taskTypeList().filter(t => t.type !== '').map(elem => (
                  <MenuItem
                    selected={elem.type === form?.type}
                    value={elem.type}
                  >
                    {elem.type}
                  </MenuItem>
                ))
              }
            </Select>
          </Box>

          <TextField
            fullWidth={true}
            variant='standard'
            required
            id="standard-required-description"
            label="Descrição"
            placeholder="descreva a tarefa"
            multiline
            maxRows={6}
            value={form?.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value })
            }}
          />

        </CustomBody>
        <CustomFooter>
          {task._id && (
            <DeleteTask
              onClick={() => setOpenDeleteModal(true)}
            >
              DELETAR
            </DeleteTask>
          )}

          {
            hasChange && (
              <React.Fragment>
                <DiscardChanges
                  disabled={disableButton}
                  onClick={() => {
                    setForm(task)
                    setHasChange(false)
                    setReloadSwitch(!reloadSwitch) //Não importa o valor, apenas o pulso para recarregar
                  }}
                >
                  CANCELAR
                </DiscardChanges>

                <SaveChanges
                  disabled={disableButton}
                  onClick={() => {
                    createOrUpdateTask()
                  }}
                >
                  SALVAR
                </SaveChanges>
              </React.Fragment>
            )
          }
        </CustomFooter>
      </CardContent>


      <ModalDeleteTask
        taskId={task._id}
        open={openDeleteModal}
        handleClose={() => { setOpenDeleteModal(false) }}
        handleReloadPage={(reload) => { handleReloadPageList(reload) }}

      />

      <CustomToast
        open={openToast}
        severity={infoToCustomToast.severity}
        info={infoToCustomToast.info}
        handleOnClose={handleCloseToast}
      />

    </CustomCard>
  )
}