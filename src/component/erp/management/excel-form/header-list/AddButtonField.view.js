import Ripple from "../../../../module/button/Ripple";
import { AddButtonFieldWrapper } from "./HeaderList.styled";

const AddButtonFieldView = (props) => {
    return (
        <>
            <AddButtonFieldWrapper>
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
            </AddButtonFieldWrapper>
        </>
    );
}
export default AddButtonFieldView;