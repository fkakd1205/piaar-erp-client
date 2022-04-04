import styled from 'styled-components';

const Container = styled.div`

`;

const TableFieldWrapper = styled.div`
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box{
        height: 300px;
        overflow: auto;
        border: 1px solid #e0e0e0;

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

    table .col-5-3 {
        width:50px;

        @media all and (max-width:992px){
            width:30px;
        }
    }

    table .col-15-13{
        width:150px;

        @media all and (max-width:992px){
            width:130px;
        }
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #c0c0c0;
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr{
        &:hover{
            background: #0000000a;
        }
    }

    table tbody .tr-active{
        background: #2C73D230 !important;
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
        
        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        }
    }

    .option-code-item{
        cursor: pointer;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .table-box .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        border-right: 1px solid #e0e0e060;
        box-shadow: 6px 0 10px -7px #e0e0e0;
    }

    .table-box .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        border-left: 1px solid #e0e0e060;
        box-shadow: -6px 0 10px -7px #e0e0e0;
    }

    .table-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .table-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .table-box::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    .fix-button-el{
        width: 25px;
        height: 25px;
        position: relative;

        padding: 0; 

        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 3px;

        cursor: pointer;

        &:hover{
            background: #2C73D2;
            border: 1px solid #2C73D2;

            & .fix-button-icon{
                opacity: 1;
                filter: invert(100%);
            }
        }

        @media all and (max-width: 992px){
            width: 18px;
            height: 18px;
        }
    }

    .fix-button-icon{
        width: 90%;
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
        opacity: 0.6;
    }
`;

const SelectorButtonFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .flex-box{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-collapse: collapse;

        .button-el:nth-of-type(2){
            margin-left: -1px;
        }
    }

    .button-el{
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        background: white;
        width: 100px;
        height: 30px;
        font-weight: 700;
        font-size: 12px;
        color:#000;

        cursor: pointer;

        &:hover{
            background: #e0e0e040;
        }
    }
`;

export {
    Container,
    TableFieldWrapper,
    SelectorButtonFieldWrapper
}