import styled from 'styled-components';

const Container = styled.div`
    width: 30%;

    @media all and (max-width: 992px){
        width: 100%;
    }
`;

const Wrapper = styled.div`
    overflow: hidden;
    border:1px solid #e1e1e1;
    border-radius: 3px;
`;

const HeaderFieldWrapper = styled.div`
    padding: 10px;
    border-bottom:1px solid #e1e1e1;

    .flex-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .title-el{
        font-size:16px; 
        font-weight:600;
        border-radius: 3px;    
    }

    .add-button{
        overflow: hidden;
        position: relative;
        width: 30px;
        height: 30px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 50%;

        cursor: pointer;
    }

    .add-button-icon{
        width: 23px;
        height: 23px;

        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
`;

const TitleFieldWrapper = styled.div`
    font-size:16px; 
    font-weight:600;
    border-radius: 3px;
`;

const ItemListWrapper = styled.div`
    overflow: hidden;

    .item-none-box{
        padding: 40px 0;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
    }

    .item-list-box{
        overflow: auto;
        max-height: 200px;

        &::-webkit-scrollbar{
            background: #e1e1e130;
            height:3px;
            width: 5px;
        }

        &::-webkit-scrollbar-track{
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #00000020;
            border-radius: 10px;
        }
    }

    .item {
        overflow: hidden;
        position: relative;

        padding: 10px;

        font-size: 16px;
        font-weight: 600;

        cursor: pointer;
        &:hover{
            background: #e1e1e160;
        }
    }

    .item-active {
        background: #2C73D2 !important;
        color: #fff !important;
    }
`;

const AddButtonFieldWrapper = styled.div`
    text-align: center;

    .add-button{
        overflow: hidden;
        position: relative;
        width: 30px;
        height: 30px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 50%;

        cursor: pointer;
    }

    .add-button-icon{
        width: 23px;
        height: 23px;

        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
`;

const AddModalWrapper = styled.div`
    .title-box{
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 1px solid #e1e1e1;
    }

    .content-box{
        margin-top: 10px;
        padding: 0 10px;
    }

    .content-box .input-box .input-label{
        font-size: 12px;
        font-weight: 600;
    }

    .content-box .input-box .input-el{
        width: 100%;
        box-sizing: border-box;
        margin-top: 5px;
        padding: 10px 5px;
        border: 1px solid #e1e1e1;

        &:focus{
            outline: none;
        }
    }

    .footer-box{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-bottom: 10px;
        padding:0 10px;
    }

    .footer-box .button-el{
        position: relative;
        overflow: hidden;
        width: 60px;
        height: 30px;
        margin-left: 10px;
        background: white;
        border: 1px solid #00000000;
        border-radius: 3px;
        font-weight: 600;
        color:#555;

        cursor:pointer;
    }
`;

export {
    Container,
    Wrapper,
    TitleFieldWrapper,
    ItemListWrapper,
    AddButtonFieldWrapper,
    AddModalWrapper,
    HeaderFieldWrapper
}