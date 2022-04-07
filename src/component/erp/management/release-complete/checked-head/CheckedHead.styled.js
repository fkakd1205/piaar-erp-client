import styled from 'styled-components';

const Container = styled.div`
    margin-top: 30px;
`;

const TitleFieldWrapper = styled.div`
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

const ButtonFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    /* justify-content: flex-end; */

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        padding: 0;
        width: 110px;
        height: 30px;

        border: 1px solid #2C73D2;
        background: #2C73D2;
        border-radius: 0;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }

        @media all and (max-width:992px){
            width: 80px;
            font-size: 11px;
        }
    }
`;

export {
    Container,
    TitleFieldWrapper,
    ButtonFieldWrapper
}