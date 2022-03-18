import { useRef } from "react";
import ControlButtonFieldView from "./ControlButtonField.view";
import { Container, Wrapper } from "./Operator.styled";

function Layout({ children }) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}

const OperatorComponent = (props) => {
    const fileUploaderRef = useRef();

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

        var formData = new FormData();
        formData.append('file', files[0]);

        props._onSubmit_uploadExcelFile(formData);
    }

    const onActionSaveExcelData = () => {
        props._onSubmit_createOrderItems()
    }

    return (
        <>
            <Layout>
                <input
                    ref={fileUploaderRef}
                    type="file"
                    accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onClick={(e) => e.target.value = ''}
                    onChange={(e) => onActionUploadExcelFile(e)}
                    hidden
                />
                <ControlButtonFieldView
                    onActionOpenFileUploader={onActionOpenFileUploader}
                    onActionSaveExcelData={onActionSaveExcelData}
                ></ControlButtonFieldView>
            </Layout>
        </>
    );
}

export default OperatorComponent;