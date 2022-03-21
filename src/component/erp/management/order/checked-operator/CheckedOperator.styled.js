import styled from 'styled-components';

const Container = styled.div`
    margin-top: 20px;
`;

const OperatorFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    gap: 10px;
    margin-top: 10px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const TitleBox = styled.div`
    padding: 0 30px;
    font-size: 18px;
    font-weight: 600;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ButtonBox = styled.div`
    .common-btn-item{
        width: 100px;
        height: 34px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.03);
        }

        &:active{
            transform: scale(1);
            background: #2C73D2ee;
            border: 1px solid #2C73D2ee;
        }
    }

    .delete-btn-item{
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

    .delete-icon-item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;
    }
`;

export {
    Container,
    OperatorFieldWrapper,
    TitleBox,
    ButtonWrapper,
    ButtonBox
}