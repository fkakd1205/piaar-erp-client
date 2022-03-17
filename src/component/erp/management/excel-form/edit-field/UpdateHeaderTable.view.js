import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import { UpdateHeaderTableBox, UpdateHeaderTableWrapper } from "./EditField.styled";

function Colgroup({ updateHeader }) {
    let details = [...updateHeader.headerDetail.details];

    return (
        <colgroup>
            {details.map((r, index) => {
                return (
                    <col key={index} width={'300px'}></col>
                );
            })}

        </colgroup>
    );
}

function TableHead({ updateHeader }) {
    let details = [...updateHeader.headerDetail.details];
    return (
        <thead>
            <tr>
                {details.map((r, index) => {
                    return (
                        <th
                            key={index}
                            scope="col"
                        >
                            <div>기준 항목 [<span style={{ color: '#e57474' }}>번호</span>][<span style={{ color: '#4d8ceb' }}>네임</span>]</div>
                            <div>[<span style={{ color: '#e57474' }}>{r.cellNumber}</span>][<span style={{ color: '#4d8ceb' }}>{r.originCellName}</span>]</div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    );
}

function TableBody({
    updateHeader,
    defaultHeaderList,
    onChangeOrderToLeft,
    onChangeOrderToRight,
    onChangeHeaderDetailValue,
    onOpenAddViewDetailModal,
    onCloseAddViewDetailModal,
    onAddViewDetail,
    onDeleteViewDetail
}) {
    let details = [...updateHeader.headerDetail.details];

    return (
        <tbody>
            <tr>
                {details.map((r, index) => {
                    return (
                        <td
                            key={index}
                            scope="col"
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <button className='button-item' onClick={() => onChangeOrderToLeft(index)}>
                                        <div className='icon-item'>
                                            <img className='icon-img' src='/assets/icon/left_arrow_icon.png'></img>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <input type='text' className='input-item' name='customCellName' value={r.customCellName} onChange={(e) => onChangeHeaderDetailValue(e, index)}></input>
                                </div>
                                <div>
                                    <button className='button-item' onClick={() => onChangeOrderToRight(index)}>
                                        <div className='icon-item'>
                                            <img className='icon-img' src='/assets/icon/right_arrow_icon.png'></img>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </td>
                    )
                })}
            </tr>
            <tr>
                {details.map((r, index) => {
                    if (r.matchedColumnName === 'unit') {
                        return (
                            <td
                                key={index}
                                scope="col"
                            >
                            </td>
                        )
                    }
                    return (
                        <td
                            key={index}
                            scope="col"
                        >
                            <div>
                                <div className='td-label'>고정값</div>
                                <input type='text' className='input-item' name='fixedValue' value={r.fixedValue} onChange={(e) => onChangeHeaderDetailValue(e, index)}></input>
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <div className='td-label'>병합 여부</div>
                                <CustomCheckbox
                                    checked={r.mergeYn === 'y'}
                                    name={'mergeYn'}
                                    size={'20px'}
                                    labelSize={'16px'}

                                    onChange={(e) => onChangeHeaderDetailValue(e, index)}
                                ></CustomCheckbox>
                            </div>
                        </td>
                    )
                })}
            </tr>
            <tr>
                {details.map((r, index) => {
                    if (r.matchedColumnName === 'unit') {
                        return (
                            <td
                                key={index}
                                scope="col"
                            >
                            </td>
                        )
                    }

                    return (
                        <td
                            key={index}
                            scope="col"
                            style={{ verticalAlign: 'top' }}
                        >
                            {r.mergeYn === 'y' &&
                                <div>
                                    <div>
                                        <div className='td-label'>구분자</div>
                                        <input type='text' className='input-item' name='splitter' value={r.splitter} onChange={(e) => onChangeHeaderDetailValue(e, index)}></input>
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <div className='td-label'>뷰 데이터</div>
                                        {r.viewDetails.map((viewDetail, viewDetailIndex) => {
                                            let originCellName = defaultHeaderList.filter(f => f.matchedColumnName === viewDetail.matchedColumnName)[0].originCellName;

                                            return (
                                                <div
                                                    key={viewDetailIndex}
                                                    className='flex-box'
                                                    style={{ justifyContent: 'space-between', padding: '5px 10px', marginTop: '10px', border: '1px solid #e9e9e9' }}
                                                >
                                                    <div style={{ fontWeight: '600' }}>{originCellName}</div>
                                                    <div>
                                                        <button
                                                            style={{ padding: '3px 8px', background: '#fb5858', border: '1px solid #fb5858', borderRadius: '3px', color: 'white', cursor: 'pointer' }}
                                                            onClick={() => onDeleteViewDetail(r, viewDetail.matchedColumnName)}
                                                        >삭제</button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div>
                                            <button
                                                style={{ padding: '3px 8px', background: '#2C73D2', border: '1px solid #2C73D2', borderRadius: '3px', color: 'white', cursor: 'pointer', marginTop: '10px' }}
                                                onClick={() => onOpenAddViewDetailModal(r)}
                                            >추가</button>
                                        </div>
                                    </div>

                                </div>
                            }
                        </td>
                    )
                })}
            </tr>
        </tbody>
    )

}
const UpdateHeaderTableView = (props) => {
    return (
        <>
            <UpdateHeaderTableWrapper>
                <UpdateHeaderTableBox>
                    <table
                        cellSpacing="0"
                    >
                        <Colgroup
                            updateHeader={props.updateHeader}
                        ></Colgroup>
                        <TableHead
                            updateHeader={props.updateHeader}
                        ></TableHead>
                        <TableBody
                            updateHeader={props.updateHeader}
                            defaultHeaderList={props.defaultHeaderList}

                            onChangeOrderToLeft={props.onChangeOrderToLeft}
                            onChangeOrderToRight={props.onChangeOrderToRight}
                            onChangeHeaderDetailValue={props.onChangeHeaderDetailValue}
                            onOpenAddViewDetailModal={props.onOpenAddViewDetailModal}
                            onCloseAddViewDetailModal={props.onCloseAddViewDetailModal}
                            onAddViewDetail={props.onAddViewDetail}
                            onDeleteViewDetail={props.onDeleteViewDetail}
                        ></TableBody>
                    </table>
                </UpdateHeaderTableBox>
            </UpdateHeaderTableWrapper>
        </>
    );
}
export default UpdateHeaderTableView;