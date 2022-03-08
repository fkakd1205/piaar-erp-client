import { useState, useReducer, useMemo } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../template/modal/CommonModalComponent';
import FisrtMergeHeaderSelectModalComponent from './FisrtMergeHeaderSelectModal.component';
import FirstMergeHeaderAddModalComponent from './FirstMergeHeaderAddModal.component';
import FirstMergeHeaderEditModalComponent from './FirstMergeHeaderEditModal.component';
import Ripple from '../../../template/button/Ripple';

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

const FirstMergeOperatorComponent = (props) => {
    const [updateHeaderState, dispatchUpdateHeaderState] = useReducer(updateHeaderStateReducer, initialUpdateHeaderState);

    const [modalOpen, setModalOpen] = useState(false);
    const [addModeOpen, setAddModeOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const _onModalOpen = () => {
        setModalOpen(true);
    }

    const _onModalClose = () => {
        setModalOpen(false);
        _onAddModeClose();
        _onEditModalClose();
    }

    const _onAddModeOpen = () => {
        setAddModeOpen(true);
    }

    const _onAddModeClose = () => {
        setAddModeOpen(false);
    }

    const _onEditModalOpen = (data) => {
        dispatchUpdateHeaderState({
            type: 'INIT_DATA',
            payload: data
        })
        setEditModalOpen(true);
    }

    const _onEditModalClose = () => {
        setEditModalOpen(false);
    }

    const _onSelectHeader = (data) => {
        props._onChangeFirstMergeHeaderState(data);
        _onModalClose();
    }

    const _onSubmit_createFirstMergeHeader = (body) => {
        props._onSubmit_createFirstMergeHeader(body)
        _onAddModeClose();
    }

    const _onSubmit_deleteFirstMergeHeader = (id) => {
        props._onSubmit_deleteFirstMergeHeader(id);
    }

    const _onSubmit_updateFirstMergeHeader = (body) => {
        props._onSubmit_updateFirstMergeHeader(body);
        _onEditModalClose();
    }

    return (
        <>
            <Container>
                <FlexWrapper>
                    <ButtonBox>
                        <div className='button-label'>1차 병합 헤더 선택</div>
                    </ButtonBox>
                </FlexWrapper>
                <FlexWrapper className='justify-between'>
                    <ButtonBox>
                        <button
                            className='button-item'
                            onClick={_onModalOpen}
                        >
                            {props.firstMergeHeaderState?.title ? props.firstMergeHeaderState?.title : '1차 병합 헤더 선택'}
                            <Ripple color={'#2C73D2'} duration={1000}></Ripple>
                        </button>
                    </ButtonBox>
                </FlexWrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={modalOpen}
                maxWidth={addModeOpen || editModalOpen ? 'lg' : 'xs'}
                onClose={_onModalClose}
            >
                <>
                    {modalOpen &&
                        <>
                            {(!addModeOpen && !editModalOpen) &&
                                <FisrtMergeHeaderSelectModalComponent
                                    firstMergeHeaderListState={props.firstMergeHeaderListState}

                                    _onSubmit_deleteFirstMergeHeader={_onSubmit_deleteFirstMergeHeader}
                                    _onAddModeOpen={_onAddModeOpen}
                                    _onEditModalOpen={_onEditModalOpen}
                                    _onSelectHeader={_onSelectHeader}
                                ></FisrtMergeHeaderSelectModalComponent>
                            }

                            {addModeOpen &&
                                <FirstMergeHeaderAddModalComponent
                                    _onAddModeClose={_onAddModeClose}
                                    _onSubmit_createFirstMergeHeader={_onSubmit_createFirstMergeHeader}
                                >
                                </FirstMergeHeaderAddModalComponent>
                            }

                            {editModalOpen &&
                                <FirstMergeHeaderEditModalComponent
                                    updateHeaderState={updateHeaderState}

                                    _onEditModeClose={_onEditModalClose}
                                    _onSubmit_updateFirstMergeHeader={_onSubmit_updateFirstMergeHeader}
                                >
                                </FirstMergeHeaderEditModalComponent>
                            }
                        </>
                    }

                </>
            </CommonModalComponent>
        </>
    );
}

export default FirstMergeOperatorComponent;

const initialUpdateHeaderState = null;

const updateHeaderStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}