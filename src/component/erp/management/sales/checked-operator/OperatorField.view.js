import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper, ControlWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    데이터 일괄 처리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenOptionCodeModal}
                        >
                            옵션 코드 변경
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenReleaseOptionCodeModal}
                        >
                            출고 옵션 코드 변경
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ControlWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    상태 관리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenReleaseConfirmModal}
                        >
                            출고 전환
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenSalesConfirmModal}
                        >
                            판매 취소
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='danger-button-el'
                            onClick={props.onActionOpenDeleteConfirmModal}
                        >
                            영구 삭제
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ControlWrapper>
        </OperatorFieldWrapper>
    );
}