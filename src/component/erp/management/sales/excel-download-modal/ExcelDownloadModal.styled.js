import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const TitleContainer = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;
    .title-box{
        font-size: 18px;
        font-weight: 600;

    }
`;

const CombineOperatorsWrapper = styled.div`
    .flex-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .button-item{
        overflow: hidden;
        position: relative;

        margin-right: 10px;
        width: 120px;
        height: 34px;

        background: #fff;
        border: 1px solid #444;
        border-radius: 3px;

        font-size: 12px;
        font-weight: 600;
        color: #444;

        cursor: pointer;

        &:hover{
            background: #444;
            color: white;
        }
    }
`;

const TableWrapper = styled.div`

`;

const TableBox = styled.div`
    height: 300px;
	overflow: auto;
    border: 1px solid #77777740;

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
        /* background: #309FFF; */
        background: #777777;
        color: white;
        padding: 10px;
        font-size: 12px;
    }

    table tbody tr{
        /* &:hover{
            background: #309FFF40;
        } */
    }

    table tbody .tr-active{
        background: #309FFF40;
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #77777740;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        /* &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        } */
    }

    .option-code-item{
        cursor: pointer;
    }

    .checkbox-item{
        cursor: pointer;
    }

    & .fiexed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #777777;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

export {
    Container,
    TitleContainer,
    CombineOperatorsWrapper,
    TableWrapper,
    TableBox
}