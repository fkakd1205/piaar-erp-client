import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`

`;

const BackdropLoadingComponent = (props) => {
    return (
        <>
            <Container>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.open}
                    onClick={() => props.onClose()}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </>
    );
}
export default BackdropLoadingComponent;