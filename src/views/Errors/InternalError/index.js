import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import error from '../../../assets/error_person.png'
import { BoxHomeIcon, CustomHomeIcon, ImageContainer, TextContainer } from './styles';
import InternalError from '../../../assets/message-InternalServerError.jpg'

function InternalErrorPage() {
    const navigate = useNavigate()
    const handleRedirect = () => {
        setTimeout(() => {
            navigate('/home')
        }, 700)
    }

    return (
        <React.Fragment>
            <TextContainer>
                <img src={InternalError} />
            </TextContainer>

            <BoxHomeIcon>
                <CustomHomeIcon
                    titleAccess={'Voltar para a página inicial'}
                    onClick={handleRedirect}
                />
            </BoxHomeIcon>

            <ImageContainer>
                <img src={error} />
            </ImageContainer>
        </React.Fragment>
    )
}

export default InternalErrorPage