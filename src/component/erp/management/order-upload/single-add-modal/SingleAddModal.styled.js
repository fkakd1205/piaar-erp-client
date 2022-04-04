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
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 10px;

    .input-box:nth-of-type(1){
        margin-top: 0;
    }

    .input-box{
        margin-top: 20px;
    }

    .input-box .input-label{
        font-size: 12px;
        font-weight: 600;
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
`;


export {
    Container,
    PageHeaderFieldWrapper,
    PageContentFieldWrapper
}