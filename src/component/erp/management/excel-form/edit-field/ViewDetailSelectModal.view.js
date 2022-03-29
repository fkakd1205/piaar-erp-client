import Ripple from "../../../../module/button/Ripple";
import { ViewDetailSelectBox } from "./EditField.styled";

const ViewDetailSelectModal = (props) => {
    return (
        <>
            <div>
                {props.defaultHeaderList.map((r, index) => {
                    return (
                        <ViewDetailSelectBox
                            key={index}
                            onClick={() => props.onAddViewDetail(r.matchedColumnName)}
                        >
                            {r.originCellName}
                            <Ripple color={'#e1e1e1'} duration={1000} />
                        </ViewDetailSelectBox>
                    )
                })}
            </div>
        </>
    );
}
export default ViewDetailSelectModal;