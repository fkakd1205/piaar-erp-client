import { ConfirmMessageFieldWrapper } from "./OptionCodeModal.styled";

export default function ConfirmMessageField(props) {
    return (
        <ConfirmMessageFieldWrapper>
            <div style={{ textAlign: 'center', marginTop: '10px', padding: '30px 0', fontSize: '14px', fontWeight: '600' }}>
                <div>변경될 옵션 코드 : [{props.selectedProductOption?.option.code}]</div>
                <div>[{props.checkedOrderItemList?.length}]건 데이터를 정말로 수정 하시겠습니까?</div>
            </div>
            <div className='flex-box'>
                <button
                    className='button-el'
                    style={{ color: '#d15120' }}
                    onClick={props.onActionCloseConfirmModal}
                >
                    취소
                </button>
                <button
                    className='button-el'
                    style={{ color: '#2d7ed1' }}
                    onClick={props.onActionConfirm}
                    disabled={props.buttonDisabled}
                >
                    확인
                </button>
            </div>
        </ConfirmMessageFieldWrapper>
    );
}