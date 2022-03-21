import { TableOperatorFieldWrapper } from "./ViewHeaderSettingModal.styled";

export default function TableOperatorFieldView(props){
    return (
        <TableOperatorFieldWrapper>
            {props.element}
        </TableOperatorFieldWrapper>
    );
}