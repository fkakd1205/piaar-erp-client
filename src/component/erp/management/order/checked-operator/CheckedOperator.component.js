import { useState } from "react";
import Ripple from "../../../../module/button/Ripple";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import ExcelDownloadModalComponent from "../excel-download-modal/ExcelDownloadModal.component";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import { Container, TitleWrapper } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [downloadExcelModalOpen, setDownloadExcelModalOpen] = useState(false);

    const onActionReleaseCheckedOrderItemListAll = () => {
        props._onAction_releaseCheckedOrderItemListAll();
    }

    const onActionOpenSalesConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setSalesConfirmModalOpen(true);
    }

    const onActionCloseSalesConfirmModal = () => {
        setSalesConfirmModalOpen(false);
    }

    const onActionConfirmSales = () => {
        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                salesYn: 'y',
                salesAt: new Date()
            }
        })
        props._onSubmit_changeSalesYnForOrderItemList(data);
        onActionCloseSalesConfirmModal();
    }

    const onActionOpenDeleteConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setDeleteConfirmModalOpen(true);
    }

    const onActionCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const onActionConfirmDelete = () => {
        props._onSubmit_deleteOrderItemList(props.checkedOrderItemList);
        onActionCloseDeleteConfirmModal();
    }

    const onActionOpenOptionCodeModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setOptionCodeModalOpen(true);
    }

    const onActionCloseOptionCodeModal = () => {
        setOptionCodeModalOpen(false);
    }

    const onActionChangeOptionCode = (optionCode) => {
        let data = [...props.checkedOrderItemList];
        data = data.map(r => {
            return {
                ...r,
                optionCode: optionCode
            }
        })
        props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
        onActionCloseOptionCodeModal();
    }

    const onActionOpenDownloadExcelModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setDownloadExcelModalOpen(true);
    }

    const onActionCloseDownloadExcelModal = () => {
        setDownloadExcelModalOpen(false);
    }

    const onActionDownloadExcel = (selectedExcelHeader, downloadOrderItemList) => {
        props._onSubmit_downloadOrderItemsExcel(selectedExcelHeader, downloadOrderItemList);
    }

    return (
        <>
            <Container>
                <TitleWrapper>
                    <div className='title-box'>
                        선택된 데이터 ({props.checkedOrderItemList?.length || 0})
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={onActionReleaseCheckedOrderItemListAll}
                        >
                            전체 해제
                            <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
                        </button>
                    </div>
                </TitleWrapper>
                <OperatorFieldView
                    onActionReleaseCheckedOrderItemListAll={onActionReleaseCheckedOrderItemListAll}
                    onActionOpenSalesConfirmModal={onActionOpenSalesConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                    onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                    onActionOpenDownloadExcelModal={onActionOpenDownloadExcelModal}
                ></OperatorFieldView>
            </Container>

            {/* Modal */}
            <ConfirmModalComponent
                open={salesConfirmModalOpen}
                title={'판매 전환 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 판매 전환 하시겠습니까?`}

                onConfirm={onActionConfirmSales}
                onClose={onActionCloseSalesConfirmModal}
            ></ConfirmModalComponent>
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 삭제 하시겠습니까?`}

                onConfirm={onActionConfirmDelete}
                onClose={onActionCloseDeleteConfirmModal}
            ></ConfirmModalComponent>
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeOptionCode(optionCode)}
                ></OptionCodeModalComponent>
            </CommonModalComponent>

            {/* 엑셀 다운로드 모달 */}
            <CommonModalComponent
                open={downloadExcelModalOpen}
                maxWidth={'lg'}

                onClose={onActionCloseDownloadExcelModal}
            >
                <ExcelDownloadModalComponent
                    viewHeader={props.viewHeader}
                    checkedOrderItemList={props.checkedOrderItemList}
                    downloadExcelList={props.downloadExcelList}

                    onActionDownloadExcel={onActionDownloadExcel}
                ></ExcelDownloadModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default CheckedOperatorComponent;