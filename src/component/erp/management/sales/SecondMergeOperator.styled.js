import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;

    .justify-between{
        justify-content: space-between;
    }
`;

const FlexWrapper = styled.div`
    padding: 0 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const ButtonBox = styled.div`
    .button-label{
        margin-bottom: 5px;
        font-size: 12px;
        color:#444;
        font-weight: 600;
    }

    .button-item{
        position: relative;
        overflow: hidden;
        background: white;
        border: 1px solid #2C73D2;
        border-radius: 5px;
        width: 200px;
        min-height: 34px;
        font-size: 13px;
        color:#444;
        font-weight: 600;
        cursor: pointer;
    }

    .fill-button-item{
        position: relative;
        overflow: hidden;
        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;
        width: 200px;
        min-height: 34px;
        font-size: 13px;
        color:white;
        font-weight: 600;
        cursor: pointer;
    }
`;

export {
    Container,
    FlexWrapper,
    ButtonBox
}