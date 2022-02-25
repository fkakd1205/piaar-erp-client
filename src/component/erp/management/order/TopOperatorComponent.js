import { useState } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../template/modal/CommonModalComponent';
import HeaderSettingModalComponent from './HeaderSettingModalComponent';

const Container = styled.div`
    margin-top: 10px;
`;

const BoardWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BoardBox = styled.div`
    padding: 10px 30px;
    .title{
        font-size: 25px;
        font-weight: 700;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }

    .control-btn-item{
        font-size: 16px;
        font-weight: 600;
        /* width: 240px; */
        padding: 10px 20px;
        color: white;
        vertical-align: middle;
        background-color: #2C73D2;
        border-radius: 20px;
        border: none;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            transition: 0.2s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media all and (max-width:992px){
            font-size: 14px;
        }
    }

    @media all and (max-width:992px){
        padding: 10px 10px;
    }
`;

const TopOperatorComponent = (props) => {
    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);

    const _onHeaderSettingModalOpen = () => {
        setHeaderSettingModalOpen(true);
    }

    const _onHeaderSettingModalClose = () => {
        setHeaderSettingModalOpen(false);
    }

    const _onSubmitModifiedHeader = (headerDetails) => {
        props._onSubmitModifiedHeader(headerDetails);
        _onHeaderSettingModalClose();
    }

    return (
        <>
            <Container>
                <BoardWrapper>
                    <BoardBox>
                        <div className='title'>주문 수집 관리</div>
                    </BoardBox>
                    <BoardBox>
                        <div
                            className='control-btn-item'
                            onClick={() => _onHeaderSettingModalOpen()}
                        >뷰 헤더 설정</div>
                    </BoardBox>
                </BoardWrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={headerSettingModalOpen}
                maxWidth={'lg'}

                onClose={() => _onHeaderSettingModalClose()}
            >
                <HeaderSettingModalComponent
                    headerState={props.headerState}

                    _onSubmitModifiedHeader={_onSubmitModifiedHeader}
                ></HeaderSettingModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default TopOperatorComponent;