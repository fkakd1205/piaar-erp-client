import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
`;

const Wrapper = styled.div`
    
`;

const ControlButtonFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 30px;
    height: auto;

    display: flex;
    flex-wrap: wrap;
    
    color: white;

    @media only screen and (max-width:992px){
        padding: 0 10px;
    }

    .button-box{

        padding-right: 10px;
        
        @media only screen and (max-width:992px){
            /* padding: 10px 10px; */
            /* width: 100%; */
        }
    }

    .button-el{
        font-size: 14px;
        font-weight: 600;
        width: 180px;
        padding: 10px;
        color: #000;
        vertical-align: middle;
        background: white;
        border-radius: 2px;
        border: 1px solid #e0e0e0;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            background: #2C73D2;
            border: 1px solid #2C73D2;
            color: #fff;
            transition: 0.2s;
            transform: scale(1.03);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 130px;
            font-size: 12px;
        }
    }
`;

const ControlButtonBox = styled.div`
    padding: 10px 30px;

    .control-btn-item{
        font-size: 16px;
        font-weight: 600;
        width: 240px;
        padding: 10px;
        color: white;
        vertical-align: middle;
        background-color: #2C73D2;
        border-radius: 20px;
        border: none;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            transition: 0.2s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 100%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
            width: 100%;
        }

        @media only screen and (max-width:576px){
            width: 100%;
            font-size: 12px;
        }
    }

    @media only screen and (max-width:992px){
        padding: 10px 10px;
        width: 100%;
    }
`;

export {
    Container,
    Wrapper,
    ControlButtonBox,
    ControlButtonFieldWrapper
}