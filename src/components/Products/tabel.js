/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import {
  DataGrid,
  useGridApiRef,
  GridActionsCellItem,
  gridClasses,
} from '@mui/x-data-grid';
import { darken } from '@mui/material/styles';
import discardIcon from '../../assets/discard_changes.svg'
import disableDiscardIcon from '../../assets/discard_changes_disable.svg'
import deleteIcon from '../../assets/delete_icon.svg'
import SVG from 'react-inlinesvg'
import { AddButton, CancelButton } from './styles';
import api from '../../services/api';
import { Alert, Snackbar } from '@mui/material';


export default function ProductTable({ initialData, handleReloadPage }) {
  const apiRef = useGridApiRef();

  const processedRows = initialData?.rows?.flat()?.map(row => ({
    ...row,
    id: row._id
  }));

  const [rows, setRows] = React.useState(processedRows);
  const [hasUnsavedRows, setHasUnsavedRows] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const unsavedChangesRef = React.useRef({
    unsavedRows: {},
    rowsBeforeChange: {},
  });
  const [openToast, setOpenToast] = React.useState(false)
  const [registerStatus, setRegisterStatus] = React.useState('')
  const [registerInfo, setRegisterInfo] = React.useState('')

  const handleCloseToast = () => {
    setOpenToast(false)
  }
  
  const columns = React.useMemo(() => {
    return [
      {
        field: 'product',
        headerName: 'PRODUTO',
        width: 460,
        editable: true,
      },
      {
        field: 'value',
        headerName: 'VALOR (R$)',
        width: 120,
        editable: true,
      },
      {
        field: 'obs',
        headerName: 'OBSERVAÇÕES',
        width: 400,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'TIPO',
        width: 120,
        editable: false,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: ({ id, row }) => {
          return [
            <GridActionsCellItem
              icon={<SVG src={
                unsavedChangesRef.current.unsavedRows[id] === undefined ?
                disableDiscardIcon : discardIcon
              } />}
              label="Discard changes"
              disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
              onClick={() => {
                apiRef.current.updateRows([
                  unsavedChangesRef.current.rowsBeforeChange[id],
                ]);
                delete unsavedChangesRef.current.rowsBeforeChange[id];
                delete unsavedChangesRef.current.unsavedRows[id];
                setHasUnsavedRows(
                  Object.keys(unsavedChangesRef.current.unsavedRows).length > 0,
                );
              }}
            />,
            <GridActionsCellItem
              icon={<SVG src={deleteIcon} />}
              label="Delete"
              onClick={() => {
                unsavedChangesRef.current.unsavedRows[id] = {
                  ...row,
                  _action: 'delete',
                };
                if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
                  unsavedChangesRef.current.rowsBeforeChange[id] = row;
                }
                setHasUnsavedRows(true);
                apiRef.current.updateRows([row]); // to trigger row render
              }}
            />,
          ];
        },
      },
    ];
  }, [initialData?.columns, unsavedChangesRef, apiRef]);

  const processRowUpdate = React.useCallback((newRow, oldRow) => {
    const rowId = newRow.id;

    unsavedChangesRef.current.unsavedRows[rowId] = newRow;

    if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
      unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
    }
    setHasUnsavedRows(true);
    return newRow;
  }, []);

  async function updateProductOnDB(rowToUpdt) {
    rowToUpdt.forEach(async (row) => {
      let body = {
        product: `${row.product}`,
        value: `${row.value.toString().replace(",", ".")}`,
        obs: `${row.obs}`,
        isProduct: row.type === 'PRODUTO'
      }

      await api.put(`/product/${row._id}`, body)
        .then(
          response => {
            console.log(`${row.product} atualziado com sucesso`, response)
          }
        ).catch(erro => {
          setRegisterInfo(`Ocorreu um erro ao atualizar ${row.product}`)
          setRegisterStatus('error')
          console.log(`Ocorreu um erro ao atualizar ${row.product}`, erro)
        })
    });
  }

  async function deleteProductOnDB(rowToDlt) {
    rowToDlt.forEach(async (row) => {
      await api.delete(`/product/${row._id}`)
        .then(
          response => {
            console.log(`${row.product} deletado com sucesso`, response)
          }
        ).catch(erro => {
          console.log(`Ocorreu um erro ao deletar ${row.product}`, erro)
        })
    });
  }

  const discardChanges = React.useCallback(() => {
    setHasUnsavedRows(false);
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current.updateRows([row]);
    });
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
    };
  }, [apiRef]);

  const saveChanges = React.useCallback(async () => {
    try {
      setIsSaving(true);

      const rowsToDelete = Object.values(
        unsavedChangesRef.current.unsavedRows,
      ).filter((row) => row._action === 'delete');

      const rowsToSave = Object.values(
        unsavedChangesRef.current.unsavedRows,
      ).filter((row) => row._action !== 'delete');

      let erro = false
      let productname = ''

      if (rowsToSave.length > 0) {
        rowsToSave.forEach(row => {
          if (!erro) {
            erro = row.value.toString().replace(/[0-9.,]+/g, "").length > 0
            productname = row.product
          }
        })
      }

      if (!erro) {
        if (rowsToSave.length > 0) {
          await updateProductOnDB(rowsToSave)
        }

        if (rowsToDelete.length > 0) {
          await deleteProductOnDB(rowsToDelete)
        }

        setHasUnsavedRows(false);
        unsavedChangesRef.current = {
          unsavedRows: {},
          rowsBeforeChange: {},
        };
        setIsSaving(false);
        setRegisterStatus('success')
        setRegisterInfo('Alterações realizadas com sucesso')
        setOpenToast(true)

        setTimeout(() => {
          handleReloadPage(true);
        }, 2000)
      }
      else {
        setIsSaving(false);
        setRegisterInfo(`O valor do produto ${productname} é inválido`)
        setRegisterStatus('error')
        setOpenToast(true)
      }

    } catch (error) {
      setRegisterStatus('error')
      setRegisterInfo('Ocorreu um erro ao processar as alterações solicitadas')
      setOpenToast(true)
      setIsSaving(false);
    }
  }, [apiRef]);

  const getRowClassName = React.useCallback(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
    if (unsavedRow) {
      if (unsavedRow._action === 'delete') {
        return 'row--removed';
      }
      return 'row--edited';
    }
    return '';
  }, []);

  return (
    <>
      <div style={{ width: '1221px' }}>
        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'end' }}>
          <CancelButton
            disabled={!hasUnsavedRows || isSaving}
            onClick={discardChanges}
          >
            Cancelar Alterações
          </CancelButton>
          <AddButton
            disabled={!hasUnsavedRows || isSaving}
            onClick={saveChanges}
          >
            Salvar Alterações
          </AddButton>
        </div>
        <div style={{ height: 500 }}>
          <DataGrid
            hideFooter
            rows={rows}
            columns={columns}
            apiRef={apiRef}
            getRowId={(row) => row.id}
            disableColumnResize
            disableRowSelectionOnClick
            processRowUpdate={processRowUpdate}
            ignoreValueFormatterDuringExport
            cellEditMode="cell"
            onCellEditCommit={(params) => {
              const { id, field, value } = params;
              setRows((prevRows) =>
                prevRows.map((row) =>
                  row.id === id ? { ...row, [field]: value } : row
                )
              );
              setHasUnsavedRows(true);
              if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
                unsavedChangesRef.current.rowsBeforeChange[id] = rows.find(
                  (row) => row.id === id
                );
              }
              unsavedChangesRef.current.unsavedRows[id] = {
                ...rows.find((row) => row.id === id),
                [field]: value,
              };
            }}
            sx={{
              [`& .${gridClasses.row}.row--removed`]: {
                backgroundColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return 'rgba(255, 100, 100, 0.3)';
                  }
                  return darken('rgba(255, 100, 100, 1)', 0.7);
                },
              },
              [`& .${gridClasses.row}.row--edited`]: {
                backgroundColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return 'rgba(0, 95, 137, 0.2)';
                  }
                  return darken('rgba(0, 95, 137, 1)', 0.6);
                },
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#003C73 !important',
                border: '1px solid #E8EAED',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                justifyContent: 'center'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#FFFFFF !important',
                fontWeight: 'bold !important',
                fontFamily: 'sans-serif',
                fontSize: '16px'
              },
              '& .MuiDataGrid-row': {
                backgroundColor: '#FFFFFF',
              },
              '& .MuiDataGrid-cell': {
                border: '1px solid #E8EAED',
              },
              '& .MuiDataGrid-filler': {
                backgroundColor: '#E8EAED',
              },
              '& .MuiDataGrid-scrollbar': {
                width: '0px'
              },

            }}
            loading={isSaving}
            getRowClassName={getRowClassName}
          />
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={`${registerStatus}`}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {registerInfo}
        </Alert>
      </Snackbar>
    </>
  );
}
