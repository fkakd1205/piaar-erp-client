import { ButtonBox, ButtonWrapper, OperatorFieldWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ButtonWrapper>
                <ButtonBox>
                    <button
                        type='button'
                        className='common-btn-item'
                        onClick={props.onActionReleaseCheckedOrderItemListAll}
                    >전체 선택 해제</button>
                </ButtonBox>
            </ButtonWrapper>
            <ButtonWrapper>
                <ButtonBox>
                    <button
                        type='button'
                        className='common-btn-item'
                        onClick={props.onActionOpenSalesConfirmModal}
                    >판매 전환</button>
                </ButtonBox>
                <ButtonBox>
                    <button
                        type='button'
                        className='common-btn-item'
                        onClick={props.onActionOpenOptionCodeModal}
                    >옵션 코드 수정</button>
                </ButtonBox>
                <ButtonBox>
                    <button
                        type='button'
                        className='delete-btn-item'
                        onClick={props.onActionOpenDeleteConfirmModal}
                    >
                        <img className='delete-icon-item' src='/assets/icon/delete_icon.png' alt='delete button'></img>
                    </button>
                </ButtonBox>
            </ButtonWrapper>
        </OperatorFieldWrapper>
    );
}