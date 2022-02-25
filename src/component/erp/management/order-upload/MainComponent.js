import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import OperatorComponent from './OperatorComponent';
import BackdropLoadingComponent from '../../../template/loading/BackdropLoadingComponent';
import UploadedDataTableComponent from './UploadedDataTableComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialUploadedExcelDataState = null;

const uploadedExcelDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const MainComponent = (props) => {
    const [uploadedExcelDataState, dispatchUploadedExcelDataState] = useReducer(uploadedExcelDataStateReducer, initialUploadedExcelDataState);

    const [backdropLoadingOpen, setBackdropLoadingOpen] = useState(false);

    const __reqUploadExcelFile = async (formData) => {
        await erpOrderItemDataConnect().uploadExcelFile(formData)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchUploadedExcelDataState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.')
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqOnStoreToOrderItem = async function (params) {
        await erpOrderItemDataConnect().createList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchUploadedExcelDataState({
                        type: 'CLEAR'
                    })
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.')
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const _onUploadExcelFile = async (formData) => {
        _onBackdropLoadingOpen();
        await __reqUploadExcelFile(formData);
        _onBackdropLoadingClose();
    }

    const _onStoreToOrderItem = async () => {
        _onBackdropLoadingOpen();
        await __reqOnStoreToOrderItem(uploadedExcelDataState);
        _onBackdropLoadingClose();
    }

    const _onBackdropLoadingOpen = () => {
        setBackdropLoadingOpen(true);
    }

    const _onBackdropLoadingClose = () => {
        setBackdropLoadingOpen(false);
    }

    return (
        <>
            <Container>
                <OperatorComponent
                    _onUploadExcelFile={(formData) => _onUploadExcelFile(formData)}
                    _onStoreToOrderItem={() => _onStoreToOrderItem()}
                ></OperatorComponent>
                <UploadedDataTableComponent
                    uploadedExcelDataState={uploadedExcelDataState}
                ></UploadedDataTableComponent>
            </Container>

            {/* Backdrop Loading */}
            <BackdropLoadingComponent
                open={backdropLoadingOpen}

                onClose={() => { ; }}
            ></BackdropLoadingComponent>
        </>
    );
}
export default MainComponent;