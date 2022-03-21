import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
`;

const Wrapper = styled.div`
    
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    align-items: center;

    .common-box{
        padding: 10px 30px;

        @media all and (max-width:992px){
            padding: 10px 10px;
        }
    }

    .title{
        font-size: 25px;
        font-weight: 700;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }

    .button-el{
        font-size: 16px;
        font-weight: 600;
        /* width: 240px; */
        padding: 10px 20px;
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

        @media all and (max-width:992px){
            font-size: 14px;
        }
    }
`;

export {
    Container,
    Wrapper,
    HeaderFieldWrapper
}