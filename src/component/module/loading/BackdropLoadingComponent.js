import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`

`;

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @returns 
 */
const BackdropLoadingComponent = ({ open, onClose }) => {
    return (
        <>
            <Container>
                <Backdrop
                    sx={{
                        color: '#000',
                        zIndex: (theme) => theme.zIndex.drawer + 9999
                    }}
                    style={{background:'#ffffff30'}}
                    open={open}
                    onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </>
    );
}
export default BackdropLoadingComponent;