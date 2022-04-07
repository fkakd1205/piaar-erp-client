import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
    `;

const OperatorFieldWrapper = styled.div`
    padding: 0 30px;
    
    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
    `;

const ControlWrapper = styled.div`
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    .title-box {
        font-size: 14px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

`;

const ButtonWrapper = styled.div`
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media all and (max-width:992px){
        margin-top: 0;
    }

    .button-box{
        margin-right: 5px;
        margin-top: 5px;
    }

    .button-box .button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 0;

        font-size: 14px;
        font-weight: 500;
        color: #000;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #2C73D2;
            border: 1px solid #2C73D2;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

    .button-box .warning-button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #ff605c;
        background: white;
        border-radius: 0;

        font-size: 14px;
        font-weight: 600;
        color: #ff605c;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #ff605c;
            border: 1px solid #ff605c;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

    .button-box .danger-button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #ff605c;
        background: #ff605c;
        border-radius: 0;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #ff605c;
            border: 1px solid #ff605c;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }
`;

export {
    Container,
    OperatorFieldWrapper,
    ControlWrapper,
    ButtonWrapper
}