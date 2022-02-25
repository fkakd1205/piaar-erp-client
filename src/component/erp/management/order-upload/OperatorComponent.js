import { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-wrap: wrap;
    
    color: white;
`;

const ControlBox = styled.div`
    padding: 10px 30px;

    .control-btn-item{
        font-size: 16px;
        font-weight: 600;
        width: 240px;
        padding: 10px;
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

        @media only screen and (max-width:992px){
            width: 100%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
            width: 100%;
        }

        @media only screen and (max-width:576px){
            width: 100%;
            font-size: 12px;
        }
    }

    @media only screen and (max-width:992px){
        padding: 10px 10px;
        width: 100%;
    }
`;

const OperatorComponent = (props) => {
    const fileUploaderRef = useRef();

    const _onFileUploaderOpen = () => {
        fileUploaderRef.current.click();
    }

    const _onUploadExcelFile = (e) => {
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

        props._onUploadExcelFile(formData);
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <ControlBox>
                        <button
                            className='control-btn-item'
                            type='button'
                            onClick={() => _onFileUploaderOpen()}
                        >엑셀 파일 업로드</button>
                        <input
                            ref={fileUploaderRef}
                            type="file"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onClick={(e) => e.target.value = ''}
                            onChange={(e) => _onUploadExcelFile(e)}
                            hidden
                        />
                    </ControlBox>
                    <ControlBox>
                        <button
                            className='control-btn-item'
                            type='button'
                            onClick={() => props._onStoreToOrderItem()}
                        >엑셀 파일 저장</button>
                    </ControlBox>
                </Wrapper>
            </Container>
        </>
    );
}
export default OperatorComponent;