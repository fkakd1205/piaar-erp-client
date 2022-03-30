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

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth
 * @param {function} props.onClose
 * @returns 
 */
const CommonModalComponent = ({ open, fullWidth, maxWidth, onClose, children }) => {
    return (
        <>
            <CustomDialog
                open={open || false}
                fullWidth={fullWidth || true}
                maxWidth={maxWidth || 'xs'}
                onClose={() => onClose() || {}}
            >
                {children}
            </CustomDialog>
        </>
    );
}
export default CommonModalComponent;