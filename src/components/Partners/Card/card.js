import React, { useState, useEffect } from 'react'
import { Container, IconButtons, IconDiv, CutomEditDetails, ChipsBox } from './styles'
import { Box, Chip, Grid, List, ListItem, Typography } from '@mui/material'
import deleteIcon from '../../../assets/delete_icon.svg'
import { useNavigate } from 'react-router-dom'
import { ModalDeletePartner } from '../ModalDeletePartner'
import { docType, formatCellphone, formatDocument, formatPhone } from '../../../utils'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'

export const PartnerCard = ({
  partner,
  handleReloadPage
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoriesData, setCategoriesData] = useState([])
  const navigate = useNavigate()
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false) }
  const handleReloadPageList = () => { handleReloadPage(true) }
  const { isAdm, partnerPage } = useAuth()

  async function getCategoryPartner() {
    const response = await api.GetCategoryOptions()

    let partnerCategories = !partner.categories?.includes(";") ? [partner.categories] :
      partner.categories?.split(";").map(categoryCode => parseInt(categoryCode))

    let categoriesByPartner = {}

    categoriesByPartner = partnerCategories.map(item => ({
      ...categoriesByPartner,
      ...response.categories.find(c => c.code === parseInt(item))
    }))

    setCategoriesData(categoriesByPartner)
  }

  useEffect(() => {
    getCategoryPartner()
  }, [])

  return (
    <React.Fragment>
      <Container>
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <Grid container spacing={3}>
            <Grid item xs={4} lg={4}>
              <Typography>
                Nome: <span>{partner.name}</span>
              </Typography>

              <Typography>
                Telefone: <span>{formatPhone(partner.phone)}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                {docType(partner.document)}: <span>{formatDocument(partner.document)}</span>
              </Typography>

              <Typography>
                Celular: <span>{formatCellphone(partner.cellphone)}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                E-mail: <span>{partner.email}</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: '3px' }}>
            <Grid item xs={4} lg={4}>
              <Typography>
                Logradouro: <span>{partner.street}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Número: <span>{partner.number}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Complemento: <span>{partner.complement}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Bairro: <span>{partner.district}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Cidade: <span>{partner.city}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Typography>
                Estado: <span>{partner.state}</span>
              </Typography>
            </Grid>
          </Grid>

          <ChipsBox>
            {
              categoriesData?.map((data) => {
                return (
                  <ListItem key={data.description}
                    sx={{
                      padding: '0px',
                      width: 'auto',
                      margin: '4px',
                    }}
                  >
                    <Chip
                      variant="filled"
                      color="info"
                      label={data.description}
                      sx={{
                        backgroundColor: '#003C73'
                      }}
                    />
                  </ListItem>
                )
              })
            }
          </ChipsBox>

        </Box>

        <IconDiv>
          {
            (isAdm || partnerPage.Viewer) && (
              <CutomEditDetails
                fontSize="large"
                onClick={() => { navigate(`/parceiros/${partner._id}`, { state: partner }) }}
              />
            )
          }

          {
            (isAdm || partnerPage.Exclusor) && (
              <IconButtons src={deleteIcon}
                onClick={() => { setOpenDeleteModal(true) }}
              />
            )
          }
        </IconDiv>
      </Container>

      <ModalDeletePartner
        open={openDeleteModal}
        partner={partner}
        handleClose={handleCloseDeleteModal}
        handleReloadPage={() => handleReloadPageList()}
      />

    </React.Fragment>
  )
}