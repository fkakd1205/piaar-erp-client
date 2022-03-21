import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import { DefaultTableFieldWrapper } from "./ViewHeaderSettingModal.styled";

function Colgroup({ defaultHeaderDetails }) {
    return (
        <colgroup>
            {defaultHeaderDetails.map((r, index) => {
                return (
                    <col key={index} width={'120px'}></col>
                );
            })}

        </colgroup>
    );
}

function TableHead({
    defaultHeaderDetails,
    isCheckedOne,
    onActionCheckHeaderDetail
}) {
    return (
        <thead>
            <tr>
                {defaultHeaderDetails.map((r, index) => {
                    let checked = isCheckedOne(r.matchedColumnName);
                    return (
                        <th
                            key={index}
                            scope="col"
                            className={`${checked ? 'th-active' : ''}`}
                        >
                            <CustomCheckbox
                                checked={checked}
                                size={'20px'}
                                labelSize={'16px'}

                                onChange={() => onActionCheckHeaderDetail(r)}
                            ></CustomCheckbox>
                        </th>
                    )
                })}
            </tr>
            <tr>
                {defaultHeaderDetails.map((r, index) => {
                    let checked = isCheckedOne(r.matchedColumnName);
                    return (
                        <th
                            key={index}
                            scope="col"
                            className={`${checked ? 'th-active' : ''}`}
                            onClick={() => onActionCheckHeaderDetail(r)}
                            style={{ cursor: 'pointer' }}
                        >{r.originCellName}</th>
                    )
                })}
            </tr>
        </thead>
    );
}
export default function DefaultTableFieldView(props) {
    return (
        <DefaultTableFieldWrapper>
            <div className='table-box'>
                <table
                    cellSpacing="0"
                >
                    <Colgroup
                        defaultHeaderDetails={props.defaultHeaderDetails}
                    ></Colgroup>
                    <TableHead
                        defaultHeaderDetails={props.defaultHeaderDetails}
                        isCheckedOne={props.isCheckedOne}

                        onActionCheckHeaderDetail={props.onActionCheckHeaderDetail}
                    ></TableHead>
                </table>
            </div>
        </DefaultTableFieldWrapper>
    );
}