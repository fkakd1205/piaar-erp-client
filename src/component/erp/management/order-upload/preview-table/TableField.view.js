import { TableFieldWrapper } from "./PreviewTable.styled";

export default function TableFieldView(props) {
    return (
        <TableFieldWrapper>
            <div className='table-box'>
                <table cellSpacing="0">
                    <colgroup>
                        <col width={'50px'}></col>
                        {props.erpOrderUploadDefaultHeader.map((r, index) => {
                            return (
                                <col key={index} width={'300px'}></col>
                            );
                        })}

                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                className="fixed-header fixed-col"
                                style={{ zIndex: '12' }}
                            >
                                삭제
                            </th>
                            {props.erpOrderUploadDefaultHeader.map((data, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">{data.originCellName}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.excelDataList?.map((rowData, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    <td
                                        className="fixed-col"
                                    >
                                        <button
                                            type='button'
                                            className='delete-button-el'
                                            onClick={(e)=>props.onActionDeleteDataOne(e, rowIndex)}
                                        >
                                            <img
                                                className='delete-button-icon'
                                                src='/assets/icon/delete_icon.png'
                                                alt=""
                                            ></img>
                                        </button>
                                    </td>
                                    <td>{rowData.uniqueCode}</td>
                                    <td>{rowData.prodName}</td>
                                    <td>{rowData.optionName}</td>
                                    <td>{rowData.unit}</td>
                                    <td>{rowData.receiver}</td>
                                    <td>{rowData.receiverContact1}</td>
                                    <td>{rowData.receiverContact2}</td>
                                    <td>{rowData.destination}</td>
                                    <td>{rowData.salesChannel}</td>
                                    <td>{rowData.orderNumber1}</td>
                                    <td>{rowData.orderNumber2}</td>
                                    <td>{rowData.channelProdCode}</td>
                                    <td>{rowData.channelOptionCode}</td>
                                    <td>{rowData.zipCode}</td>
                                    <td>{rowData.courier}</td>
                                    <td>{rowData.transportType}</td>
                                    <td>{rowData.deliveryMessage}</td>
                                    <td>{rowData.waybillNumber}</td>
                                    <td>{rowData.price}</td>
                                    <td>{rowData.deliveryCharge}</td>
                                    <td>{rowData.barcode}</td>
                                    <td>{rowData.prodCode}</td>
                                    <td>{rowData.optionCode}</td>
                                    <td>{rowData.releaseOptionCode}</td>
                                    <td>{rowData.managementMemo1}</td>
                                    <td>{rowData.managementMemo2}</td>
                                    <td>{rowData.managementMemo3}</td>
                                    <td>{rowData.managementMemo4}</td>
                                    <td>{rowData.managementMemo5}</td>
                                    <td>{rowData.managementMemo6}</td>
                                    <td>{rowData.managementMemo7}</td>
                                    <td>{rowData.managementMemo8}</td>
                                    <td>{rowData.managementMemo9}</td>
                                    <td>{rowData.managementMemo10}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    );
}