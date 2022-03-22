import { useReducer, useState } from "react";
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";
import { useBackdropHook, BackdropHookComponent } from "../../../../hooks/backdrop/useBackdropHook";
import OperatorComponent from "./operator/Operator.component";
import PreviewTableComponent from "./preview-table/PreviewTable.component";

const ErpOrderUploadComponent = (props) => {
    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [excelDataList, dispatchExcelDataList] = useReducer(excelDataListReducer, initialExcelDataList);

    const __reqUploadExcelFile = async (formData) => {
        await erpOrderItemDataConnect().uploadExcelFile(formData)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchExcelDataList({
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

    const __reqCreateOrderItems = async function (params) {
        await erpOrderItemDataConnect().createList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchExcelDataList({
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

    const _onSubmit_uploadExcelFile = async (formData) => {
        onActionOpenBackdrop();
        await __reqUploadExcelFile(formData);
        onActionCloseBackdrop();
    }

    const _onSubmit_createOrderItems = async () => {
        onActionOpenBackdrop();
        await __reqCreateOrderItems(excelDataList);
        onActionCloseBackdrop();
    }

    return (
        <>
            <OperatorComponent
                _onSubmit_uploadExcelFile={(formData) => _onSubmit_uploadExcelFile(formData)}
                _onSubmit_createOrderItems={() => _onSubmit_createOrderItems()}
            ></OperatorComponent>
            <PreviewTableComponent
                excelDataList={excelDataList}
            ></PreviewTableComponent>

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    );
}

export default ErpOrderUploadComponent;

const initialExcelDataList = null;

const excelDataListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}