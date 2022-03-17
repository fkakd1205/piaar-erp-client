import styled from 'styled-components';
import Ripple from '../../../module/button/Ripple';

const Container = styled.div`

`;

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
`;

const HeaderTitleBox = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;

    @media all and (max-width:992px){
        padding: 10px 10px;
        font-size: 16px;
    }
`;

const ButtonBox = styled.div`
    .button-item{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 38px;
        background: white;
        border: 1px solid white;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const ListWrapper = styled.div`
`;

const ListBox = styled.div`
    padding: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover{
        background: #e1e1e160;
    }

    .flex-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .justify-between{
        justify-content: space-between;
    }

    .flex-gap{
        gap:5px
    }

    .button-item{
        position: relative;
        overflow: hidden;
        padding: 3px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
`;

export {
    Container,
    HeaderWrapper,
    HeaderTitleBox,
    ButtonBox,
    ListWrapper,
    ListBox
}