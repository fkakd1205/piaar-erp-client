import { dateToYYYYMMDDhhmmss } from '../../../../../utils/dateFormatUtils';
import InfiniteScrollObserver from '../../../../module/observer/InfiniteScrollObserver';
import { TableFieldWrapper } from './CheckedOrderItemTable.styled';

function CorrectIcon() {
    return (
        <img
            src='/assets/icon/correct_icon.png'
            style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            alt=""
            loading='lazy'
        ></img>
    );
}

function FailedIcon() {
    return (
        <img
            src='/assets/icon/failed_icon.png'
            style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            alt=""
            loading='lazy'
        ></img>
    );
}

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <colgroup>
                        <col className='col-5-3'></col>
                        {props.viewHeader?.headerDetail.details?.map((r, index) => {
                            return (
                                <col key={index} className='col-15-13'></col>
                            );
                        })}
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                className="fixed-header fixed-col-left"
                                style={{ cursor: 'pointer', zIndex: '12' }}
                            >
                                재고 반영
                            </th>
                            {props.viewHeader?.headerDetail.details?.map((r, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">{r.customCellName}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {props.checkedOrderItemList &&
                            <>
                                {props.checkedOrderItemList?.slice(0, props.viewSize).map((r1, rowIndex) => {
                                    return (
                                        <tr
                                            key={rowIndex}
                                        >
                                            <td className={`fixed-col-left`}>
                                                {r1.stockReflectYn === 'y' &&
                                                    <CorrectIcon />
                                                }
                                                {r1.stockReflectYn === 'n' &&
                                                    <FailedIcon />
                                                }
                                            </td>
                                            {props.viewHeader?.headerDetail.details?.map(r2 => {
                                                let matchedColumnName = r2.matchedColumnName;
                                                if (matchedColumnName === 'createdAt') {
                                                    return (
                                                        <td key={r2.cellNumber}>{dateToYYYYMMDDhhmmss(r1[matchedColumnName] || new Date())}</td>
                                                    )
                                                }
                                                return (
                                                    <td key={r2.cellNumber}>{r1[matchedColumnName]}</td>
                                                )
                                            })}
                                        </tr>
                                    )

                                })}
                            </>
                        }
                    </tbody>
                </table>
                <InfiniteScrollObserver
                    elementTagType={'div'}
                    totalSize={props.checkedOrderItemList.length}
                    startOffset={0}
                    endOffset={props.viewSize}
                    fetchData={props.onActionfetchMoreOrderItems}
                    loadingElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            로딩중...
                        </p>
                    }
                    endElementTag={
                        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#444' }}>
                            마지막 데이터 입니다.
                        </p>
                    }
                />
            </div>
        </TableFieldWrapper>
    );
}