import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const TitleBox = styled.div`
    padding: 10px 10px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`;

const MessageBox = styled.div`
    padding: 30px 10px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const ButtonBox = styled.div`
    .button-item{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background:#e1e1e160;
        }
    }
`;

const ConfirmModalComponent = ({ open, fullWidth, maxWidth, onConfirm, onClose, title, message, ...props }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        setButtonDisabled(false);
    }, [open])

    const _onConfirm = () => {
        setButtonDisabled(true);
        onConfirm();
    }

    return (
        <>
            <Dialog
                open={open || false}
                fullWidth={fullWidth || true}
                maxWidth={maxWidth || 'xs'}
                onClose={() => onClose() || {}}
            >
                <TitleBox>
                    {title || '확인메세지'}
                </TitleBox>
                <MessageBox>
                    {message || '정말로 판매 전환 하시겠습니까?'}
                </MessageBox>
                <ButtonWrapper>
                    <ButtonBox>
                        <button
                            className='button-item'
                            style={{ color: '#d15120' }}
                            onClick={() => onClose() || {}}
                        >취소</button>
                    </ButtonBox>
                    <ButtonBox>
                        <button
                            className='button-item'
                            style={{ color: '#2d7ed1' }}
                            onClick={_onConfirm}
                            disabled={buttonDisabled}
                        >확인</button>
                    </ButtonBox>
                </ButtonWrapper>
            </Dialog>
        </>
    );
}
export default ConfirmModalComponent;