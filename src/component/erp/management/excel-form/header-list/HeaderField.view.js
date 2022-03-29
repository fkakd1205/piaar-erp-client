import Ripple from "../../../../module/button/Ripple";
import { HeaderFieldWrapper } from "./HeaderList.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className='flex-box'>
                <div className='title-el'>엑셀 양식 생성 및 선택</div>
                <button
                    type='button'
                    className='add-button'
                    onClick={props.onActionAddModalOpen}
                >
                    <img
                        src='/assets/icon/add_icon.png'
                        className='add-button-icon'
                    ></img>
                    <Ripple
                        color={'#e1e1e160'}
                        duration={1000}
                    ></Ripple>
                </button>
            </div>
        </HeaderFieldWrapper>
    );
}