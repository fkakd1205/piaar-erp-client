import styled from 'styled-components';

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

const FisrtMergeHeaderSelectModalComponent = (props) => {
    return (
        <>
            <Container>
                <HeaderWrapper>
                    <div></div>
                    <HeaderTitleBox>1차 병합 헤더 선택</HeaderTitleBox>
                    <div></div>
                </HeaderWrapper>
                <div style={{ textAlign: 'center', padding: '30px 0' }}>선택 가능한 헤더가 없습니다.</div>
                <ButtonBox>
                    <button className='button-item' onClick={props._onAddModeOpen}>NEW</button>
                </ButtonBox>
            </Container>
        </>
    );
}
export default FisrtMergeHeaderSelectModalComponent;