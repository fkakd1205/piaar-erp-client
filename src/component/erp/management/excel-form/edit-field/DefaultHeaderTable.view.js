import { DefaultHeaderTableBox, DefaultHeaderTableTh, DefaultHeaderTableWrapper } from './EditField.styled';
import CustomCheckbox from '../../../../module/checkbox/CustomCheckbox';
function Colgroup({ defaultHeaderList }) {
    return (
        <colgroup>
            {defaultHeaderList.map((r, index) => {
                return (
                    <col key={index} width={'140px'}></col>
                );
            })}

        </colgroup>
    );
}

function TableHead({ defaultHeaderList, isCheckedOne, onCheckHeaderOne }) {
    return (
        <thead>
            <tr>
                {defaultHeaderList.map((r, index) => {
                    let isChecked = isCheckedOne(r.matchedColumnName);
                    return (
                        <th
                            key={index}
                            scope="col"
                            checked={isChecked}
                            className={`${isChecked ? 'th-active' : ''}`}
                        >
                            <CustomCheckbox
                                checked={isChecked}
                                size={'20px'}
                                labelSize={'16px'}

                                onChange={() => onCheckHeaderOne(r)}
                            ></CustomCheckbox>
                        </th>
                    )
                })}
            </tr>
            <tr>
                {defaultHeaderList.map((r, index) => {
                    let isChecked = isCheckedOne(r.matchedColumnName);
                    return (
                        <th
                            key={index}
                            scope="col"
                            className={`${isChecked ? 'th-active' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => onCheckHeaderOne(r)}
                        >
                            {r.originCellName}
                        </th>
                    )
                })}
            </tr>
        </thead>
    );
}

function DefaultHeaderTableView(props) {
    return (
        <>
            <DefaultHeaderTableWrapper>
                <DefaultHeaderTableBox>
                    <table
                        cellSpacing="0"
                    >
                        <Colgroup
                            defaultHeaderList={props.defaultHeaderList}
                        ></Colgroup>
                        <TableHead
                            defaultHeaderList={props.defaultHeaderList}

                            isCheckedOne={props.isCheckedOne}
                            onCheckHeaderOne={props.onCheckHeaderOne}
                        ></TableHead>
                    </table>
                </DefaultHeaderTableBox>
            </DefaultHeaderTableWrapper>
        </>
    );
}
export default DefaultHeaderTableView;