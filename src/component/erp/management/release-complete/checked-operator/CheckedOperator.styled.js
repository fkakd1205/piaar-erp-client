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

    .button-box .circle-button-el{
        position: relative;
        overflow: hidden;
        width: 34px;
        height: 34px;

        background: #ff3060;
        border: 1px solid #ff3060;
        border-radius: 50%;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.03);
        }

        @media all and (max-width:992px){
            width: 30px;
            height: 30px;
        }
    }

    .button-box .circle-button-el .circle-button-icon-el{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    @media all and (max-width:992px){
        margin-top: 0;
    }
`;

export {
    Container,
    OperatorFieldWrapper,
    ControlWrapper,
    ButtonWrapper
}