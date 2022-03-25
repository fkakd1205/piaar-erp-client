import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 100px;
`;

const TableFieldWrapper = styled.div`
    
    padding: 10px 30px;

    @media all and (max-width: 992px){
        padding: 10px 10px;
    }

    .table-box{
        height: 80vh;
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
        background:#fff;
        color: #000;
        padding: 10px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #e0e0e0;
    }

    table tbody tr{
        &:hover{
            background: #0000000a;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #000;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        }
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
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
        background:#00000010;
        border-radius: 10px;
    }
`;

export {
    Container,
    TableFieldWrapper
}