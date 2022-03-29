import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 30px;
`;

const PageHeaderFieldWrapper = styled.div`
    position:sticky;
    top:0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding:10px;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;

    .title-el{
        font-size: 18px;
        font-weight: 600;
    }

    .button-box{

    }

    .button-el{
        overflow: hidden;
        position: relative;
        width:30px;
        height:30px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 50%;

        cursor:pointer;

        &:hover{
            transform: scale(1.02);
        }
    }

    .button-icon{
        width:100%;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
`;

const PageContentFieldWrapper = styled.div`
    padding: 0 10px;
    margin-top: 10px;

    .input-box{
        margin-top: 20px;
    }

    .input-box .input-label{
        font-size: 11px;
        font-weight: 600;
    }

    .input-box .input-el{
        width:100%;
        height: 34px;

        box-sizing: border-box;
        padding:0 5px;
        margin-top: 5px;

        border:1px solid #d0d0d0;

        &:focus{
            outline: none;
            border:1px solid #2C73D2;
        }
    }
`;


export {
    Container,
    PageHeaderFieldWrapper,
    PageContentFieldWrapper
}