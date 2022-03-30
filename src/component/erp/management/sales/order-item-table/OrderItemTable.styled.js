import styled from 'styled-components';

const Container = styled.div`

`;

const TableFieldWrapper = styled.div`
    /* margin-top: 10px; */
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

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #c0c0c0;
        color: #000;
        font-weight: 700;
        padding: 10px 3px;
        font-size: 12px;
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
        position:relative;
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

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
        z-index:11;
    }
    
    .table-box .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        border-right: 1px solid #e0e0e060;
        box-shadow: 6px 0 10px -7px #e0e0e0;
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
`;

const SelectorButtonFieldWrapper = styled.div`
    margin-top: 10px;
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

const TipFieldWrapper = styled.div`
    margin-top: 20px;
    padding:0 30px;

    font-size: 14px;

    @media all and (max-width:992px){
        padding:0 10px;
        font-size: 12px;
    }

    .highlight{
        display: inline-block;
        position:relative;
        font-weight: 700;
    }

    .highlight:after{
        content:"";
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: 10px;
        display: inline-block;
        background: #b9c2e160;
    }
`;
export {
    Container,
    TableFieldWrapper,
    SelectorButtonFieldWrapper,
    TipFieldWrapper
}