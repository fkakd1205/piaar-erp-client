import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ButtonWrapper>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenSalesConfirmModal}
                        >
                            판매 전환
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenOptionCodeModal}
                        >
                            옵션 코드 수정
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='circle-button-el'
                            onClick={props.onActionOpenDeleteConfirmModal}
                        >
                            <img className='circle-button-icon-el' src='/assets/icon/delete_icon.png' alt='delete button'></img>
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ButtonWrapper>
        </OperatorFieldWrapper>
    );
}