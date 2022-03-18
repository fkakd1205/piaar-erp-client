import Ripple from "../../../../module/button/Ripple";
import { DownloadButtonFieldWrapper } from "./ExcelDownloadModal.styled";

const DownloadButtonFieldView = (props) => {
    return (
        <>
            <DownloadButtonFieldWrapper>
                <button
                    type='button'
                    className='button-el'
                    onClick={props.onActionDownloadExcel}
                >
                    엑셀 내려받기
                    <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
                </button>
            </DownloadButtonFieldWrapper>
        </>
    );
}
export default DownloadButtonFieldView;