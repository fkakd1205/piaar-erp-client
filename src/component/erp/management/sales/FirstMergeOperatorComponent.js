import { useState } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../template/modal/CommonModalComponent';
import FisrtMergeHeaderSelectModalComponent from './FisrtMergeHeaderSelectModalComponent';
import FirstMergeHeaderAddModalComponent from './FirstMergeHeaderAddModalComponent';

const Container = styled.div`
    margin-top: 20px;
`;

const FlexWrapper = styled.div`
    padding: 0 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const ButtonBox = styled.div`
    .button-item{
        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;
        width: 150px;
        height: 34px;
        color:white;
        cursor: pointer;
    }
`;

const FirstMergeOperatorComponent = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [addModeOpen, setAddModeOpen] = useState(false);

    const _onModalOpen = () => {
        setModalOpen(true);
    }

    const _onModalClose = () => {
        setModalOpen(false);
        _onAddModeClose();
    }

    const _onAddModeOpen = () => {
        setAddModeOpen(true);
    }

    const _onAddModeClose = () => {
        setAddModeOpen(false);
    }

    const _onSubmit_createFirstMergeHeader = (body) => {
        props._onSubmit_createFirstMergeHeader(body)
    }

    return (
        <>
            <Container>
                <FlexWrapper>
                    <ButtonBox>
                        <button className='button-item' onClick={_onModalOpen}>1차 병합 헤더 선택</button>
                    </ButtonBox>
                </FlexWrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={modalOpen}
                maxWidth={addModeOpen ? 'lg' : 'xs'}
                onClose={_onModalClose}
            >
                <>
                    {modalOpen &&
                        <>
                            {!addModeOpen &&
                                <FisrtMergeHeaderSelectModalComponent
                                    _onAddModeOpen={_onAddModeOpen}
                                ></FisrtMergeHeaderSelectModalComponent>
                            }

                            {addModeOpen &&
                                <FirstMergeHeaderAddModalComponent
                                    _onAddModeClose={_onAddModeClose}
                                    _onSubmit_createFirstMergeHeader={_onSubmit_createFirstMergeHeader}
                                >
                                </FirstMergeHeaderAddModalComponent>
                            }
                        </>
                    }

                </>
            </CommonModalComponent>
        </>
    );
}
export default FirstMergeOperatorComponent;