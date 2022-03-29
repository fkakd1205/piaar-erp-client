import { useReducer, useRef } from "react";
import ButtonFieldView from "./ButtonField.view";
import FileUploaderFieldView from "./FileUploaderField.view";
import TitleFieldView from "./TitleField.view";
import { Container, SampleDownloadFieldWrapper } from "./WaybillModal.styled";

function SampleDownloadField({ onActionDownloadWaybillExcelSample }) {
    return (
        <SampleDownloadFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={onActionDownloadWaybillExcelSample}
            >
                양식 다운로드
            </button>
        </SampleDownloadFieldWrapper>
    );
}
const WaybillModalComponent = (props) => {
    const fileUploaderRef = useRef();

    const [uploadFile, dispatchUploadFile] = useReducer(uploadFileReducer, initialUploadFile);

    const onActionOpenFileUploader = () => {
        fileUploaderRef.current.click();
    }

    const onActionUploadExcelFile = (e) => {
        if (e.target.files.length === 0) {
            alert('업로드하실 엑셀 파일을 선택해 주세요.');
            return;
        }

        let files = e.target.files;
        let file = files[0];

        if (file.size > 1024 * 1024 * 10) {
            alert('10MB 이하 파일만 등록할 수 있습니다.\n\n' + '현재 파일 크기 : ' + (Math.round(file[0].size / 1024 / 1024 * 100) / 100) + 'MB');
            return;
        }

        // var formData = new FormData();
        // formData.append('file', files[0]);
        dispatchUploadFile({
            type: 'SET_DATA',
            payload: file
        })
    }

    const onActionConfirm = () => {
        if (!uploadFile) {
            alert('엑셀을 먼저 업로드 해주세요.');
            return;
        }

        props.onActionRegisterWaybill(uploadFile);
    }

    return (
        <>
            <Container>
                <TitleFieldView
                    title={'운송장 일괄 등록'}
                ></TitleFieldView>
                <SampleDownloadField
                    onActionDownloadWaybillExcelSample={props.onActionDownloadWaybillExcelSample}
                ></SampleDownloadField>
                <FileUploaderFieldView
                    uploadFile={uploadFile}

                    onActionOpenFileUploader={onActionOpenFileUploader}
                ></FileUploaderFieldView>
                <ButtonFieldView
                    onActionCloseWaybillModal={props.onActionCloseWaybillModal}
                    onActionConfirm={onActionConfirm}
                ></ButtonFieldView>
            </Container>
            <input
                ref={fileUploaderRef}
                type="file"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onClick={(e) => e.target.value = ''}
                onChange={(e) => onActionUploadExcelFile(e)}
                hidden
            ></input>
        </>
    );
}
export default WaybillModalComponent;

const initialUploadFile = null;

const uploadFileReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialUploadFile;
    }
}