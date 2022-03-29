import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
`;

const OperatorFieldWrapper = styled.div`
    padding: 0 30px;
    margin-top: 10px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const TitleWrapper = styled.div`
    padding: 0 30px;
    display: flex;
    align-items: center;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }

    .title-box{
        font-size: 18px;
        font-weight: 600;
    }

    .button-box{
        margin-left: 10px;
    }

    .button-el{
        overflow: hidden;
        position: relative;
        width: 80px;
        height: 25px;

        background: #fff;
        border: 1px solid #a1a1a1;
        border-radius: 2px;

        font-size: 12px;
        font-weight: 700;
        color: #555;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            background: #e1e1e160;
        }
    }

    .circle-button-el{
        position: relative;
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

        &:active{
            transform: scale(1);
            background: #ff3060ee;
            border: 1px solid #ff3060ee;
        }
    }

    .circle-button-icon-el{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .button-box{
        margin-top: 10px;
        margin-right: 10px;
    }

    .button-box .button-el{
        position: relative;
        overflow: hidden;
        width: 150px;
        height: 34px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 2px;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }

        @media all and (max-width:992px){
            font-size: 11px;
            height: 30px;
            width: 130px;
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
`;

export {
    Container,
    OperatorFieldWrapper,
    TitleWrapper,
    ButtonWrapper
}