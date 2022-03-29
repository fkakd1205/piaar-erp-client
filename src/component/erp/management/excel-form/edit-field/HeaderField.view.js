import Ripple from "../../../../module/button/Ripple";
import { HeaderFieldWrapper } from "./EditField.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className='flex-box'>
                <div className='title-el'>
                    다운로드 엑셀 양식 설정
                </div>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionDeleteHeaderConfirmModalOpen}
                    >
                        <img
                            className='button-icon'
                            src='/assets/icon/delete_icon.png'
                            alt=''
                        ></img>
                        <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
                    </button>
                </div>
            </div>
        </HeaderFieldWrapper>
    );
}