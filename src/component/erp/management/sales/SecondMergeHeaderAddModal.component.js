import { useReducer, useState } from 'react';
import Ripple from '../../../template/button/Ripple';
import CustomCheckbox from '../../../template/checkbox/CustomCheckbox';
import CommonModalComponent from '../../../template/modal/CommonModalComponent';
import { Container, CreateHeaderTableBox, CreateHeaderTableWrapper, DefaultHeaderTableBox, DefaultHeaderTableWrapper, DefaultHeaderTh, HeaderControlBox, HeaderTitleBox, HeaderWrapper, InfoText, InputBox, OperatorWrapper, ViewDetailSelectBox } from './SecondMergeHeaderAddModal.styled';

const SecondMergeHeaderAddModalComponent = (props) => {
    const [createHeaderTitleState, dispatchCreateHeaderTitleState] = useReducer(createHeaderTitleStateReducer, initialCreateHeaderTitleState);
    const [createHeaderValueState, dispatchCreateHeaderValueState] = useReducer(createHeaderValueStateReducer, initialCreateHeaderValueState);

    const [addViewDetailModalOpen, setAddViewDetailModalOpen] = useState(false);
    const [selectedHeaderValue, setSelectedHeaderValue] = useState(null);

    const _onChangeCreateHeaderTitleState = (e) => {
        dispatchCreateHeaderTitleState({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const _isCheckedAll = () => {
        if (!createHeaderValueState || createHeaderValueState?.length <= 0) {
            return false;
        }

        return defaultHeaderList.length === createHeaderValueState.length;
    }

    const _isCheckedOne = (matchedColumnName) => {
        return createHeaderValueState.some(r => r.matchedColumnName === matchedColumnName);
    }

    const _onCheckAll = () => {
        if (_isCheckedAll()) {
            dispatchCreateHeaderValueState({
                type: 'CLEAR'
            })
        } else {
            let data = [...defaultHeaderList];
            dispatchCreateHeaderValueState({
                type: 'SET_DATA',
                payload: data
            })
        }

    }

    const _onChangeCheckedListState = (selectedData) => {
        let data = [...createHeaderValueState];
        let selectedMatchedColumnName = selectedData.matchedColumnName;

        if (_isCheckedOne(selectedMatchedColumnName)) {
            data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
        } else {
            data.push(selectedData);
        }

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onSortByDefault = () => {
        let data = [...createHeaderValueState];
        data.sort(function (a, b) {
            return a.cellNumber - b.cellNumber;
        });

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeOrderToLeft = (index) => {
        let data = [...createHeaderValueState];

        if (index <= 0) {
            return;
        }

        let prevData = data[index - 1];
        let targetData = data[index];

        data[index - 1] = targetData;
        data[index] = prevData;


        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeOrderToRight = (index) => {
        let data = [...createHeaderValueState];

        if (index >= data.length - 1) {
            return;
        }

        let nextData = data[index + 1];
        let targetData = data[index];

        data[index + 1] = targetData;
        data[index] = nextData;

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onChangeCreateHeaderValue = (e, index) => {
        let data = [...createHeaderValueState]
        let name = e.target.name;

        if (name === 'mergeYn') {
            data = data.map(r => {
                if (data.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.checked ? 'y' : 'n',
                        splitter: e.target.checked === false ? '-' : r.splitter,
                        viewDetails: e.target.checked === false ? [{ matchedColumnName: r.matchedColumnName }] : [...r.viewDetails]
                    }
                } else {
                    return r;
                }
            })
        } else {
            data = data.map(r => {
                if (data.indexOf(r) === index) {
                    return {
                        ...r,
                        [name]: e.target.value
                    }
                } else {
                    return r;
                }
            })
        }

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onAddViewDetailModalOpen = (headerValue) => {
        setSelectedHeaderValue(headerValue);
        setAddViewDetailModalOpen(true);
    }

    const _onAddViewDetailModalClose = () => {
        setSelectedHeaderValue(null);
        setAddViewDetailModalOpen(false);
    }

    const _onAddViewDetail = (matchedColumnName) => {
        let headerValue = { ...selectedHeaderValue };
        let viewDetails = [...headerValue.viewDetails];

        if (viewDetails.some(r => r.matchedColumnName === matchedColumnName)) {
            alert('동일한 데이터를 두번 이상 나열 할 수 없습니다.')
            return;
        }

        viewDetails.push({
            matchedColumnName: matchedColumnName
        })

        headerValue = {
            ...headerValue,
            viewDetails: viewDetails
        }
        let newData = createHeaderValueState.map(r => {
            if (r.matchedColumnName === headerValue.matchedColumnName) {
                return headerValue
            } else {
                return r;
            }
        })

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: newData
        });

        _onAddViewDetailModalClose();
    }

    const _onDeleteViewDetail = (selectedHeader, matchedColumnName) => {
        let header = createHeaderValueState.filter(r => r.matchedColumnName === selectedHeader.matchedColumnName)[0];

        if (header.viewDetails.length <= 1) {
            alert('뷰 데이터는 하나 이상이어야 합니다.');
            return;
        }

        let newViewDetails = [...header.viewDetails].filter(r => r.matchedColumnName !== matchedColumnName);

        let newHeader = {
            ...header,
            viewDetails: newViewDetails
        }

        let newData = createHeaderValueState.map(r => {
            if (r.matchedColumnName === newHeader.matchedColumnName) {
                return newHeader;
            } else {
                return r;
            }
        })

        dispatchCreateHeaderValueState({
            type: 'SET_DATA',
            payload: newData
        })
    }

    const _onSubmit = () => {
        let body = {
            cid: null,
            id: null,
            title: createHeaderTitleState,
            headerDetail: {
                details: createHeaderValueState
            },
            createdAt: null,
            createdBy: null,
            updatedAt: null
        }

        props._onSubmit_createSecondMergeHeader(body)
    }

    return (
        <>
            <Container>
                <HeaderWrapper>
                    <HeaderControlBox>
                        <button
                            type='button'
                            className='button-item'
                            onClick={props._onAddModeClose}
                        >
                            <div className='icon-item'>
                                <img src='/assets/icon/left_arrow_icon.png' alt=''></img>
                            </div>
                        </button>
                    </HeaderControlBox>
                    <HeaderTitleBox>2차 병합 헤더 생성</HeaderTitleBox>
                    <HeaderControlBox>
                        <button
                            type='button'
                            className='button-item'
                            onClick={() => _onSubmit()}
                        >
                            <div className='icon-item'>
                                <img src='/assets/icon/add_icon.png' alt=''></img>
                            </div>
                            <Ripple color={'2C73D2'} duration={1000}></Ripple>
                        </button>
                    </HeaderControlBox>
                </HeaderWrapper>
                <InputBox>
                    <div className='input-label'>헤더 타이틀</div>
                    <input
                        type='text'
                        className='input-item'
                        value={createHeaderTitleState || ''}
                        onChange={(e) => _onChangeCreateHeaderTitleState(e)}
                    ></input>
                </InputBox>
                <InfoText>* 병합 테이블에서 확인할 데이터 항목을 선택해주세요.</InfoText>
                <OperatorWrapper>
                    <CustomCheckbox
                        checked={_isCheckedAll()}
                        size={'20px'}
                        label={'전체 선택'}
                        labelSize={'16px'}

                        onChange={() => _onCheckAll()}
                    ></CustomCheckbox>
                </OperatorWrapper>
                <DefaultHeaderTableWrapper>
                    <DefaultHeaderTableBox>
                        <table
                            cellSpacing="0"
                        >
                            <colgroup>
                                {defaultHeaderList.map((r, index) => {
                                    return (
                                        <col key={index} width={'120px'}></col>
                                    );
                                })}

                            </colgroup>
                            <thead>
                                <tr>
                                    {defaultHeaderList.map((r, index) => {
                                        let isChecked = _isCheckedOne(r.matchedColumnName);
                                        return (
                                            <DefaultHeaderTh
                                                key={index}
                                                scope="col"
                                                checked={isChecked}
                                            >
                                                <CustomCheckbox
                                                    checked={isChecked}
                                                    size={'20px'}
                                                    labelSize={'16px'}

                                                    onChange={() => _onChangeCheckedListState(r)}
                                                ></CustomCheckbox>
                                            </DefaultHeaderTh>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {defaultHeaderList.map((r, index) => {
                                        let isChecked = _isCheckedOne(r.matchedColumnName);
                                        return (
                                            <DefaultHeaderTh
                                                key={index}
                                                scope="col"
                                                checked={isChecked}
                                                onClick={() => _onChangeCheckedListState(r)}
                                                style={{ cursor: 'pointer' }}
                                            >{r.originCellName}</DefaultHeaderTh>
                                        )
                                    })}
                                </tr>
                            </thead>
                        </table>
                    </DefaultHeaderTableBox>
                </DefaultHeaderTableWrapper>
                <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>
                    <img src='/assets/icon/down_arrow_icon.png' width={32}></img>
                </div>
                <InfoText>
                    <div>* 선택한 양식의 헤더 데이터와 순서를 변경할 수 있습니다.</div>
                    <div>* 새롭게 체크 된 항목은 뒤에서 부터 추가 됩니다.</div>
                </InfoText>
                {createHeaderValueState && createHeaderValueState.length > 0 &&
                    <>
                        <OperatorWrapper>
                            <button
                                type='button'
                                style={{ padding: '5px 10px', background: '#309FFF', border: '1px solid #309FFF', borderRadius: '5px', color: 'white', fontWeight: '600', cursor: 'pointer' }}
                                onClick={() => _onSortByDefault()}
                            >기준 양식으로 순서 정렬</button>
                        </OperatorWrapper>
                        <CreateHeaderTableWrapper>
                            <CreateHeaderTableBox>
                                <table
                                    cellSpacing="0"
                                >
                                    <colgroup>
                                        {createHeaderValueState.map((r, index) => {
                                            return (
                                                <col key={index} width={'300px'}></col>
                                            );
                                        })}

                                    </colgroup>
                                    <thead>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
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
                                    <tbody>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
                                                return (
                                                    <td
                                                        key={index}
                                                        scope="col"
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div>
                                                                <button className='button-item' onClick={() => _onChangeOrderToLeft(index)}>
                                                                    <div className='icon-item'>
                                                                        <img className='icon-img' src='/assets/icon/left_arrow_icon.png'></img>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <input type='text' className='input-item' name='customCellName' value={r.customCellName} onChange={(e) => _onChangeCreateHeaderValue(e, index)}></input>
                                                            </div>
                                                            <div>
                                                                <button className='button-item' onClick={() => _onChangeOrderToRight(index)}>
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
                                            {createHeaderValueState.map((r, index) => {
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
                                                            <input type='text' className='input-item' name='fixedValue' value={r.fixedValue} onChange={(e) => _onChangeCreateHeaderValue(e, index)}></input>
                                                        </div>
                                                        <div style={{ marginTop: '15px' }}>
                                                            <div className='td-label'>병합 여부</div>
                                                            <CustomCheckbox
                                                                checked={r.mergeYn === 'y'}
                                                                name={'mergeYn'}
                                                                size={'20px'}
                                                                labelSize={'16px'}

                                                                onChange={(e) => _onChangeCreateHeaderValue(e, index)}
                                                            ></CustomCheckbox>
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                            {createHeaderValueState.map((r, index) => {
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
                                                                    <input type='text' className='input-item' name='splitter' value={r.splitter} onChange={(e) => _onChangeCreateHeaderValue(e, index)}></input>
                                                                </div>
                                                                <div style={{ marginTop: '15px' }}>
                                                                    <div className='td-label'>뷰 데이터</div>
                                                                    {r.viewDetails.map(viewDetail => {
                                                                        let originCellName = defaultHeaderList.filter(f => f.matchedColumnName === viewDetail.matchedColumnName)[0].originCellName;

                                                                        return (
                                                                            <div className='flex-box' style={{ justifyContent: 'space-between', padding: '5px 10px', marginTop: '10px', border: '1px solid #e9e9e9' }}>
                                                                                <div style={{ fontWeight: '600' }}>{originCellName}</div>
                                                                                <div>
                                                                                    <button
                                                                                        style={{ padding: '3px 8px', background: '#fb5858', border: '1px solid #fb5858', borderRadius: '3px', color: 'white', cursor: 'pointer' }}
                                                                                        onClick={() => _onDeleteViewDetail(r, viewDetail.matchedColumnName)}
                                                                                    >삭제</button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    <div>
                                                                        <button
                                                                            style={{ padding: '3px 8px', background: '#2C73D2', border: '1px solid #2C73D2', borderRadius: '3px', color: 'white', cursor: 'pointer', marginTop: '10px' }}
                                                                            onClick={() => _onAddViewDetailModalOpen(r)}
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
                                </table>
                            </CreateHeaderTableBox>
                        </CreateHeaderTableWrapper>
                    </>
                }
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={addViewDetailModalOpen}

                onClose={_onAddViewDetailModalClose}
            >
                <div>
                    {defaultHeaderList.map(r => {
                        return (
                            <ViewDetailSelectBox
                                onClick={() => _onAddViewDetail(r.matchedColumnName)}
                            >
                                {r.originCellName}
                                <Ripple color={'#e1e1e1'} duration={1000} />
                            </ViewDetailSelectBox>
                        )
                    })}
                </div>
            </CommonModalComponent>
        </>
    );
}
export default SecondMergeHeaderAddModalComponent;

const initialCreateHeaderValueState = [];
const initialCreateHeaderTitleState = '';

const createHeaderValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const createHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return '';
    }
}

const defaultHeaderList = [
    {
        "cellNumber": 0,
        "originCellName": "피아르 고유번호",
        "customCellName": "피아르 고유번호",
        "matchedColumnName": "uniqueCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "uniqueCode"
            }
        ]
    },
    {
        "cellNumber": 1,
        "originCellName": "주문번호1",
        "customCellName": "주문번호1",
        "matchedColumnName": "orderNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber1"
            }
        ]
    },
    {
        "cellNumber": 2,
        "originCellName": "주문번호2",
        "customCellName": "주문번호2",
        "matchedColumnName": "orderNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber2"
            }
        ]
    },
    {
        "cellNumber": 3,
        "originCellName": "주문번호3",
        "customCellName": "주문번호3",
        "matchedColumnName": "orderNumber3",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "orderNumber3"
            }
        ]
    },
    {
        "cellNumber": 4,
        "originCellName": "상품명",
        "customCellName": "상품명",
        "matchedColumnName": "prodName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodName"
            }
        ]
    },
    {
        "cellNumber": 5,
        "originCellName": "옵션명",
        "customCellName": "옵션명",
        "matchedColumnName": "optionName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionName"
            }
        ]
    },
    {
        "cellNumber": 6,
        "originCellName": "수량",
        "customCellName": "수량",
        "matchedColumnName": "unit",
        "fixedValue": '',
        "mergeYn": "y",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "unit"
            }
        ]
    },
    {
        "cellNumber": 7,
        "originCellName": "수취인명",
        "customCellName": "수취인명",
        "matchedColumnName": "receiver",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiver"
            }
        ]
    },
    {
        "cellNumber": 8,
        "originCellName": "전화번호1",
        "customCellName": "전화번호1",
        "matchedColumnName": "receiverContact1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiverContact1"
            }
        ]
    },
    {
        "cellNumber": 9,
        "originCellName": "전화번호2",
        "customCellName": "전화번호2",
        "matchedColumnName": "receiverContact2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "receiverContact2"
            }
        ]
    },
    {
        "cellNumber": 10,
        "originCellName": "주소",
        "customCellName": "주소",
        "matchedColumnName": "destination",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "destination"
            }
        ]
    },
    {
        "cellNumber": 11,
        "originCellName": "우편번호",
        "customCellName": "우편번호",
        "matchedColumnName": "zipCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "zipCode"
            }
        ]
    },
    {
        "cellNumber": 12,
        "originCellName": "배송방식",
        "customCellName": "배송방식",
        "matchedColumnName": "transportType",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "transportType"
            }
        ]
    },
    {
        "cellNumber": 13,
        "originCellName": "배송메세지",
        "customCellName": "배송메세지",
        "matchedColumnName": "deliveryMessage",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "deliveryMessage"
            }
        ]
    },
    {
        "cellNumber": 14,
        "originCellName": "상품고유번호1",
        "customCellName": "상품고유번호1",
        "matchedColumnName": "prodUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodUniqueNumber1"
            }
        ]
    },
    {
        "cellNumber": 15,
        "originCellName": "상품고유번호2",
        "customCellName": "상품고유번호2",
        "matchedColumnName": "prodUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodUniqueNumber2"
            }
        ]
    },
    {
        "cellNumber": 16,
        "originCellName": "옵션고유번호1",
        "customCellName": "옵션고유번호1",
        "matchedColumnName": "optionUniqueNumber1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionUniqueNumber1"
            }
        ]
    },
    {
        "cellNumber": 17,
        "originCellName": "옵션고유번호2",
        "customCellName": "옵션고유번호2",
        "matchedColumnName": "optionUniqueNumber2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionUniqueNumber2"
            }
        ]
    },
    {
        "cellNumber": 18,
        "originCellName": "피아르 상품코드",
        "customCellName": "피아르 상품코드",
        "matchedColumnName": "prodCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodCode"
            }
        ]
    },
    {
        "cellNumber": 19,
        "originCellName": "피아르 옵션코드",
        "customCellName": "피아르 옵션코드",
        "matchedColumnName": "optionCode",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionCode"
            }
        ]
    },
    {
        "cellNumber": 20,
        "originCellName": "관리메모1",
        "customCellName": "관리메모1",
        "matchedColumnName": "managementMemo1",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo1"
            }
        ]
    },
    {
        "cellNumber": 21,
        "originCellName": "관리메모2",
        "customCellName": "관리메모2",
        "matchedColumnName": "managementMemo2",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo2"
            }
        ]
    },
    {
        "cellNumber": 22,
        "originCellName": "관리메모3",
        "customCellName": "관리메모3",
        "matchedColumnName": "managementMemo3",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo3"
            }
        ]
    },
    {
        "cellNumber": 23,
        "originCellName": "관리메모4",
        "customCellName": "관리메모4",
        "matchedColumnName": "managementMemo4",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo4"
            }
        ]
    },
    {
        "cellNumber": 24,
        "originCellName": "관리메모5",
        "customCellName": "관리메모5",
        "matchedColumnName": "managementMemo5",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo5"
            }
        ]
    },
    {
        "cellNumber": 25,
        "originCellName": "관리메모6",
        "customCellName": "관리메모6",
        "matchedColumnName": "managementMemo6",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo6"
            }
        ]
    },
    {
        "cellNumber": 26,
        "originCellName": "관리메모7",
        "customCellName": "관리메모7",
        "matchedColumnName": "managementMemo7",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo7"
            }
        ]
    },
    {
        "cellNumber": 27,
        "originCellName": "관리메모8",
        "customCellName": "관리메모8",
        "matchedColumnName": "managementMemo8",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo8"
            }
        ]
    },
    {
        "cellNumber": 28,
        "originCellName": "관리메모9",
        "customCellName": "관리메모9",
        "matchedColumnName": "managementMemo9",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo9"
            }
        ]
    },
    {
        "cellNumber": 29,
        "originCellName": "관리메모10",
        "customCellName": "관리메모10",
        "matchedColumnName": "managementMemo10",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo10"
            }
        ]
    },
    {
        "cellNumber": 30,
        "originCellName": "관리메모11",
        "customCellName": "관리메모11",
        "matchedColumnName": "managementMemo11",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo11"
            }
        ]
    },
    {
        "cellNumber": 31,
        "originCellName": "관리메모12",
        "customCellName": "관리메모12",
        "matchedColumnName": "managementMemo12",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo12"
            }
        ]
    },
    {
        "cellNumber": 32,
        "originCellName": "관리메모13",
        "customCellName": "관리메모13",
        "matchedColumnName": "managementMemo13",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo13"
            }
        ]
    },
    {
        "cellNumber": 33,
        "originCellName": "관리메모14",
        "customCellName": "관리메모14",
        "matchedColumnName": "managementMemo14",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo14"
            }
        ]
    },
    {
        "cellNumber": 34,
        "originCellName": "관리메모15",
        "customCellName": "관리메모15",
        "matchedColumnName": "managementMemo15",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo15"
            }
        ]
    },
    {
        "cellNumber": 35,
        "originCellName": "관리메모16",
        "customCellName": "관리메모16",
        "matchedColumnName": "managementMemo16",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo16"
            }
        ]
    },
    {
        "cellNumber": 36,
        "originCellName": "관리메모17",
        "customCellName": "관리메모17",
        "matchedColumnName": "managementMemo17",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo17"
            }
        ]
    },
    {
        "cellNumber": 37,
        "originCellName": "관리메모18",
        "customCellName": "관리메모18",
        "matchedColumnName": "managementMemo18",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo18"
            }
        ]
    },
    {
        "cellNumber": 38,
        "originCellName": "관리메모19",
        "customCellName": "관리메모19",
        "matchedColumnName": "managementMemo19",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo19"
            }
        ]
    },
    {
        "cellNumber": 39,
        "originCellName": "관리메모20",
        "customCellName": "관리메모20",
        "matchedColumnName": "managementMemo20",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "managementMemo20"
            }
        ]
    },
    {
        "cellNumber": 40,
        "originCellName": "*카테고리명",
        "customCellName": "*카테고리명",
        "matchedColumnName": "categoryName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "categoryName"
            }
        ]
    },
    {
        "cellNumber": 41,
        "originCellName": "*상품명",
        "customCellName": "*상품명",
        "matchedColumnName": "prodDefaultName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodDefaultName"
            }
        ]
    },
    {
        "cellNumber": 42,
        "originCellName": "*상품관리명",
        "customCellName": "*상품관리명",
        "matchedColumnName": "prodManagementName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "prodManagementName"
            }
        ]
    },
    {
        "cellNumber": 43,
        "originCellName": "*옵션명",
        "customCellName": "*옵션명",
        "matchedColumnName": "optionDefaultName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionDefaultName"
            }
        ]
    },
    {
        "cellNumber": 44,
        "originCellName": "*옵션관리명",
        "customCellName": "*옵션관리명",
        "matchedColumnName": "optionManagementName",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionManagementName"
            }
        ]
    },
    {
        "cellNumber": 45,
        "originCellName": "*재고수량",
        "customCellName": "*재고수량",
        "matchedColumnName": "optionStockUnit",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "optionStockUnit"
            }
        ]
    },
    {
        "cellNumber": 46,
        "originCellName": "*주문등록일",
        "customCellName": "*주문등록일",
        "matchedColumnName": "createdAt",
        "fixedValue": '',
        "mergeYn": "n",
        "splitter": '-',
        "viewDetails": [
            {
                "matchedColumnName": "createdAt"
            }
        ]
    }
];