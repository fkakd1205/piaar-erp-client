import { useState } from "react";
import Ripple from "../../../../module/button/Ripple";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ExcelDownloadModalComponent from "../excel-download-modal/ExcelDownloadModal.component";
import { ButtonFieldWrapper, Container, TitleFieldWrapper } from "./CheckedHead.styled";

function TitleField({
    checkedOrderItemList,
    onActionReleaseCheckedOrderItemListAll
}) {
    return (
        <TitleFieldWrapper>
            <div className='title-box'>
                선택된 데이터 ({checkedOrderItemList?.length || 0})
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
        </TitleFieldWrapper>
    );
}

function ButtonField({
    onActionOpenDownloadExcelModal
}) {
    return (
        <ButtonFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={onActionOpenDownloadExcelModal}
            >
                엑셀 다운로드
                <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
            </button>
        </ButtonFieldWrapper>
    );
}
const CheckedHeadComponent = (props) => {
    const [downloadExcelModalOpen, setDownloadExcelModalOpen] = useState(false);

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
                <TitleField
                    checkedOrderItemList={props.checkedOrderItemList}
                    onActionReleaseCheckedOrderItemListAll={props._onAction_releaseCheckedOrderItemListAll}
                />
                <ButtonField
                    onActionOpenDownloadExcelModal={onActionOpenDownloadExcelModal}
                />
            </Container>

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
export default CheckedHeadComponent;