import styled from "styled-components";

const Container = styled.div`
    width: 70%;
`;

const Wrapper = styled.div`
    margin-left: 10px;
    padding-bottom: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
`;

const TitleWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    .title{
        font-size: 18px;
        font-weight: 600;
    }
`;

const DefaultHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

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

    & .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
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

const UpdateHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const UpdateHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

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
            /* background: #309FFF40; */
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle;
        /* border-bottom: 1px solid #e1e1e1; */
        text-align: center;
        font-size: 14px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            /* background: #309FFF80;
            color: white; */
            font-weight: 600;
        }
    }

    td .td-label{
        font-size: 14px;
        color: #444;
        margin-bottom: 5px;
    }

    td .flex-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
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

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
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

const ViewDetailSelectBox = styled.div`
    position: relative;
    overflow: hidden;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
    /* border-bottom: 1px solid #f1f1f1; */
    &:hover{
        background: #e1e1e160;
    }
`;

const DeleteButtonFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;

    .button-el{
        overflow: hidden;
        position: relative;
        width:40px;
        height:40px;

        background: #ff3060;
        border: 1px solid #ff306000;
        border-radius: 50%;

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
        }
    }

    .button-icon{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 26px;
        height: 26px;

    }
`;

const UpdateButtonFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;

    .button-el{
        overflow: hidden;
        position: relative;
        width:150px;
        height:40px;

        background: #2C73D2;
        border: 1px solid #2C73D200;
        border-radius: 3px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
        }
    }
`;

export {
    Container,
    Wrapper,
    TitleWrapper,
    DefaultHeaderTableWrapper,
    DefaultHeaderTableBox,
    UpdateHeaderTableWrapper,
    UpdateHeaderTableBox,
    ViewDetailSelectBox,
    DeleteButtonFieldWrapper,
    UpdateButtonFieldWrapper
}