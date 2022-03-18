import styled from 'styled-components';

const Container = styled.div`

`;

const TableFieldWrapper = styled.div`
    
    padding: 10px 30px;

    @media all and (max-width: 992px){
        padding: 10px 10px;
    }

    .table-box{
        height: 80vh;
        overflow: auto;
        border: 1px solid #309FFF40;

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
        background: #309FFF;
        color: white;
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

    .table-box .fiexed-header {
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
        background-color: #309FFF;
        border-radius: 10px;
    }
`;

export {
    Container,
    TableFieldWrapper
}