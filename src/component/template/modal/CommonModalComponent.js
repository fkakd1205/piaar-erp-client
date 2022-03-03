import { Dialog } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`

`;

const CustomDialog = styled(Dialog)`
    .MuiPaper-root::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .MuiPaper-root::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .MuiPaper-root::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }
`;

const CommonModalComponent = (props) => {
    return (
        <>
            <CustomDialog
                open={props.open || false}
                fullWidth={props.fullWidth || true}
                maxWidth={props.maxWidth || 'xs'}
                onClose={() => props.onClose() || {}}
            >
                {props.children}
            </CustomDialog>
        </>
    );
}
export default CommonModalComponent;