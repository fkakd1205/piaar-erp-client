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
        overflow: hidden;
        position: relative;
        font-size: 16px;
        font-weight: 600;
        padding: 10px 20px;
        color: #444;
        vertical-align: middle;
        border:1px solid #e0e0e0;
        border-radius: 3px;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            background-color: #2C73D2;
            border:1px solid #2C73D2;
            color:#fff;
            transition: 0.2s;
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