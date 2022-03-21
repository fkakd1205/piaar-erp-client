import { HeaderFieldWrapper } from "./Header.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className='common-box'>
                <div className='title'>주문 수집 관리</div>
            </div>
            <div className='common-box'>
                <div
                    className='button-el'
                    onClick={props.onActionOpenHeaderSettingModal}
                >뷰 헤더 설정</div>
            </div>
        </HeaderFieldWrapper>
    );
}