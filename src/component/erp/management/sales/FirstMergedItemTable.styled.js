import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
`;

const TableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 10px 10px;
    }
`;

const TableBox = styled.div`
    height: 500px;
	overflow: auto;
    border: 1px solid #309FFF40;

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

    table tbody .tr-active{
        background: #309FFF40;
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
        background-color: #309FFF;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const OperatorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    gap: 10px;

    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ButtonBox = styled.div`
    .common-btn-item{
        position:relative;
        overflow: hidden;
        width: 100px;
        height: 34px;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.03);
        }

        &:active{
            transform: scale(1);
            background: #2C73D2ee;
            border: 1px solid #2C73D2ee;
        }
    }

    .delete-btn-item{
        position: relative;
        width: 34px;
        height: 34px;

        background: #ff3060;
        border: 1px solid #ff3060;
        border-radius: 50%;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.03);
        }

        &:active{
            transform: scale(1);
            background: #ff3060ee;
            border: 1px solid #ff3060ee;
        }
    }

    .delete-icon-item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 22px;
    }
`;

export {
    Container,
    TableWrapper,
    TableBox,
    OperatorWrapper,
    ButtonWrapper,
    ButtonBox
}