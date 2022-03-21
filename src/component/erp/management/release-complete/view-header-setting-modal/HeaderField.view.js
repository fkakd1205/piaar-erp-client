import Ripple from "../../../../module/button/Ripple";
import { HeaderFieldWrapper } from "./ViewHeaderSettingModal.styled";

function Title({ element }) {
    return (
        <div className='title-box'>
            {element}
        </div>
    );
}

function Button({ onActionSaveAndModify }) {
    return (
        <div className='button-box'>
            <button
                type='button'
                className='button-el'
                onClick={() => onActionSaveAndModify()}
            >
                <div className='icon-box'>
                    <img className='icon-el' src='/assets/icon/add_icon.png' alt=''></img>
                </div>
                <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
            </button>
        </div>
    );
}
export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <Title
                element={'뷰 헤더 설정'}
            ></Title>
            <Button
                onActionSaveAndModify={props.onActionSaveAndModify}
            ></Button>
        </HeaderFieldWrapper>
    );
}