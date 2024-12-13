import * as React from 'react';
import { StylusImage, ImageContainer, TextContainer, TextImage } from './styles'
import ImgStylus from '../../assets/logoStylus_White.svg'
import goodBye from '../../assets/despedida-logoutText.png'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useCredentials'
import { CustomLinearProgress } from '../../components/CustomLinearProgress';
import { useAuth } from '../../context/AuthContext';

function LogoutUser() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogoutRedirect = () => {
        setTimeout(() => {
            logout(navigate)
        }, 3000)
    }

    return (
        <React.Fragment>

            <ImageContainer>
                <StylusImage src={ImgStylus} />
            </ImageContainer>

            <CustomLinearProgress
                handleCompleteProgress={handleLogoutRedirect}
            />

            <TextContainer>
                <TextImage src={goodBye} />
            </TextContainer>

        </React.Fragment>  
    )
}

export default LogoutUser