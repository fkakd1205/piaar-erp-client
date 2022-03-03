import { useReducer, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    
`;

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
`;

const HeaderTitleBox = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;

    @media all and (max-width:992px){
        padding: 10px 10px;
        font-size: 16px;
    }
`;

const HeaderControlBox = styled.div`
    padding: 10px 20px;

    @media all and (max-width:992px){
        padding: 10px 10px;
    }

    .button-item{
        position: relative;
        margin-left: 20px;
        
        width: 40px;
        height: 40px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        cursor: pointer;
        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .icon-item{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .icon-item img{
        width: 100%;
    }
`;

const ContentWrapper = styled.div`
    margin-bottom: 50px;
    min-height: 400px;
`;

const InputBox = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    .input-item{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        padding: 10px 5px;

        &:focus{
            outline: none;
        }
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
    white-space: pre-line;

    .flex-box { 
        display: flex;
        justify-content: space-between;
    }

    .control-button-item{
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

        &:disabled{
            cursor: not-allowed;
        }
    }

    .highlight{
        font-weight : bold; 
        color:#FF0000;
    }

    .button-item{
        padding: 10px 20px;
        text-align: left;
        width: 100%;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const HighlightedText = ({ text, query }) => {
    if (query !== '' && text.includes(query)) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={index}>{part}</mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }

    return text;
};

const initialSelectedProductOptionState = null;
const selectedProductOptionStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const OptionCodeModalComponent = (props) => {
    const [selectedProductOption, dispatchSelectedProductOption] = useReducer(selectedProductOptionStateReducer, initialSelectedProductOptionState);
    const [inputValue, setInputValue] = useState('');
    const [confirmModeOpen, setConfirmModeOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const _onConfirmModeOpen = (data) => {
        dispatchSelectedProductOption({
            type: 'SET_DATA',
            payload: data
        })
        setConfirmModeOpen(true);
    }

    const _onConfirmModeClose = () => {
        dispatchSelectedProductOption({
            type: 'CLEAR'
        })
        setConfirmModeOpen(false);
        setButtonDisabled(false);
    }

    const _onConfirm = () => {
        setButtonDisabled(true);
        props.onConfirm(selectedProductOption.option.code)
    }

    return (
        <>
            <Container>
                <HeaderWrapper>
                    <HeaderTitleBox>옵션 코드 수정</HeaderTitleBox>
                </HeaderWrapper>
                {!confirmModeOpen &&
                    <ContentWrapper>
                        <InputBox>
                            <input type='text' className='input-item' placeholder='옵션코드, 상품명, 옵션명을 입력해주세요.' value={inputValue || ''} onChange={e => setInputValue(e.target.value)}></input>
                        </InputBox>
                        <ButtonWrapper>
                            {props.productOptionListState?.map(r => {
                                if (r.option.managementName.includes(inputValue) || r.option.code.includes(inputValue) || r.product.managementName.includes(inputValue)) {
                                    return (
                                        <button key={r.option.id} className='button-item' onClick={() => _onConfirmModeOpen(r)}>
                                            <HighlightedText
                                                text={`[${r.option.code}]\n[${r.product.managementName}]\n[${r.option.managementName}]`}
                                                query={inputValue}
                                            />
                                        </button>
                                    );
                                }
                            })}
                        </ButtonWrapper>
                        {(!props.productOptionListState || props.productOptionListState?.length <= 0) &&
                            <ButtonWrapper>
                                <div style={{ fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>선택 가능한 옵션이 없습니다.</div>
                                <div style={{ fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>상품 및 옵션을 먼저 등록해 주세요.</div>
                            </ButtonWrapper>
                        }
                    </ContentWrapper>
                }

                {confirmModeOpen &&
                    <>
                        <div style={{ textAlign: 'center', marginTop: '10px', padding: '30px 0', fontSize: '14px', fontWeight: '600' }}>
                            <div>변경될 옵션 코드 : [{selectedProductOption?.option.code}]</div>
                            <div>[{props.checkedItemListState?.length}]건 데이터를 정말로 수정 하시겠습니까?</div>
                        </div>
                        <ButtonWrapper>
                            <div className='flex-box'>
                                <button className='control-button-item' style={{ color: '#d15120' }} onClick={_onConfirmModeClose}>취소</button>
                                <button className='control-button-item' style={{ color: '#2d7ed1' }} onClick={_onConfirm} disabled={buttonDisabled}>확인</button>
                            </div>
                        </ButtonWrapper>
                    </>
                }
            </Container>
        </>
    );
}
export default OptionCodeModalComponent;