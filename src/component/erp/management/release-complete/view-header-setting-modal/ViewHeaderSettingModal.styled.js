import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 30px;
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .title-box{
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 700;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }

    .button-box{
        padding: 10px 20px;
    
        @media all and (max-width:992px){
            padding: 10px 10px;
        }
    }

    .button-box .button-el{
        position: relative;
        overflow: hidden;
        margin-left: 20px;
        
        width: 40px;
        height: 40px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        cursor: pointer;
        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .button-box .button-el .icon-box{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .button-box .button-el .icon-box .icon-el{
        width:100%;
    }
`;

const InfoTextFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .info-box{
        font-size: 14px;
        color: #2C73D2;
        word-break: keep-all;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

`;

const TableOperatorFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultTableFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box{
        overflow: auto;
        border: 1px solid #e1e1e1;

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #309FFF20;
        text-align: center;
        font-size: 12px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        }
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #f1f1f180;
        color: #888;
        padding: 10px;
        font-size: 14px;
    }

    .th-active{
        background: white;
        color: #444;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .table-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    .table-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .table-box::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }

`;

const CreateTableFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box{
        overflow: auto;
        border: 1px solid #e1e1e1;

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        background: 'white';
        color: '#444';
        padding: 10px;
        font-size: 14px;
    }
    
    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #309FFF20;
        text-align: center;
        font-size: 14px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        }
    }

    & .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .button-item{
        position: relative;
        
        width: 30px;
        height: 30px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .icon-item{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .icon-item img{
        width: 100%;
    }

    .input-item{
        text-align: center;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        padding: 10px 0;

        &:focus{
            outline: none;
        }
    }

    .table-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    .table-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .table-box::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }
`;


export {
    Container,
    HeaderFieldWrapper,
    InfoTextFieldWrapper,
    TableOperatorFieldWrapper,
    DefaultTableFieldWrapper,
    CreateTableFieldWrapper
}