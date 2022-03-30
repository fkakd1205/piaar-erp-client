import styled from 'styled-components';

const Container = styled.div`

`;

const HeaderFieldWrapper = styled.div`
    position: sticky;
    top: 0;

    padding: 10px 10px;

    background: white;
    border-bottom: 1px solid #e1e1e1;

    .flex-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title-box{
        font-size: 18px;
        font-weight: 600;
    }

    .button-box{
        .button-el:nth-of-type(2){
            margin-left: 10px;
        }
    }

    .button-el{
        position: relative;
        overflow: hidden;
        width: 80px;
        height: 30px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 2px;

        color:white;
        font-size: 14px;
        font-weight: 600;

        cursor: pointer;

        transition: 0.4s;

        @media all and (max-width:992px){
            font-size: 13px;
            width: 60px;
        }
    }

    .button-el:disabled{
        cursor:not-allowed;
    }
`;

const ContentFieldWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 10px;

    .input-box:nth-of-type(1){
        margin-top: 0;
    }

    .input-box{
        margin-top: 20px;
    }

    .input-box .input-el{
        box-sizing: border-box;
        width: 100%;
        height: 40px;

        margin-top: 5px;
        padding: 0 5px;

        border: 1px solid #e0e0e0;
        border-radius: 2px;

        &:focus{
            outline: none;
        }
    }

    .input-box .input-label{
        font-size: 12px;
        font-weight: 600;
    }

    .input-box .readonly{
        cursor: not-allowed;
        background:#e0e0e060;
    }
`;

const TipFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 10px;

    font-size: 12px;
    font-weight: 600;
    color:#2C73D2;
`;

export {
    Container,
    HeaderFieldWrapper,
    ContentFieldWrapper,
    TipFieldWrapper
}