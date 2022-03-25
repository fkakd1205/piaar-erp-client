import { ControlButtonFieldWrapper } from "./Operator.styled";

function Button({ element, onClick }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='button'
                onClick={() => onClick()}
            >{element}</button>
        </div>
    );
}

export default function ControlButtonFieldView(props) {
    return (
        <ControlButtonFieldWrapper>
            <div className='flex-box' style={{ justifyContent: 'space-between' }}>
                <div className='flex-box'>
                    <Button
                        element={'엑셀 파일 업로드'}
                        onClick={props.onActionOpenFileUploader}
                    ></Button>
                    <Button
                        element={'엑셀 파일 저장'}
                        onClick={props.onActionSaveExcelData}
                    ></Button>
                </div>
                <div className='flex-box'>
                    <Button
                        element={'엑셀 양식 다운'}
                        onClick={props.onActionDownloadSampleForm}
                    ></Button>
                </div>
            </div>
        </ControlButtonFieldWrapper>
    );
}