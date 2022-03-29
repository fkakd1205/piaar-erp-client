import { ControlButtonFieldWrapper } from "./Operator.styled";

function Button({ element, onClick, style }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='button'
                onClick={() => onClick()}
                style={style}
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
                        element={'단건 등록'}
                        onClick={props.onActionOpenSingleAddModal}
                    ></Button>
                    <Button
                        element={'엑셀 대량 등록'}
                        onClick={props.onActionOpenFileUploader}
                    ></Button>
                    <Button
                        element={'엑셀 양식 다운'}
                        onClick={props.onActionDownloadSampleForm}
                    ></Button>
                </div>
                <div className='flex-box'>
                    <Button
                        element={'데이터 저장'}
                        onClick={props.onActionSaveExcelData}
                        style={{ background: '#2C73D2', border: '1px solid #2C73D2', color: 'white' }}
                    ></Button>
                </div>
            </div>
        </ControlButtonFieldWrapper>
    );
}