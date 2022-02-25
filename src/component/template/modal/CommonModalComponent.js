import { Dialog } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`

`;

const CommonModalComponent = (props) => {
    return (
        <>
            <Dialog
                open={props.open || false}
                fullWidth={props.fullWidth || true}
                maxWidth={props.maxWidth || 'xs'}
                onClose={() => props.onClose() || {}}
            >
                {props.children}
            </Dialog>
        </>
    );
}
export default CommonModalComponent;