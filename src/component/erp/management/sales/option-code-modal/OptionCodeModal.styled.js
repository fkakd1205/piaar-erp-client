import styled from 'styled-components';

const Container = styled.div`
    
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .title-box{
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 700;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }
`;

const InputFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    .input-el{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        padding: 10px 5px;

        &:focus{
            outline: none;
        }
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

const ListFieldWrapper = styled.div`
    margin-top: 10px;
    min-height: 100px;
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

const ConfirmMessageFieldWrapper = styled.div`
    margin-top: 10px;
    white-space: pre-line;

    .flex-box { 
        display: flex;
        justify-content: space-between;
    }

    .button-el{
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
`;

export {
    Container,
    HeaderFieldWrapper,
    InputFieldWrapper,
    HeaderControlBox,
    ContentWrapper,
    InputBox,
    ListFieldWrapper,
    ConfirmMessageFieldWrapper
}