import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { dateToYYYYMMDD, getStartDate } from '../../../../utils/dateFormatUtils';
import CustomDatePicker from '../../../module/date-picker/CustomDatePicker';

const Container = styled.div`
    margin-top: 20px;
`;

const DateSelectorWrapper = styled.div`
    padding: 0 30px;

    .label-item{
        font-size: 14px;
        font-weight: 600;
        color: #444;
    }

    .flex-box{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }

    .select-item{
        width: 300px;
        height: 43px;
        padding: 5px 0;
        border: 1px solid #e1e1e1;
        font-size: 14px;
        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
        }
    }

    .date-selector-box{
        width: 300px;
    }

    @media all and (max-width:992px) {
        padding: 0 10px;

        .date-selector-box{
            width: 100%;
        }
    }
`;

const DetailSearchWrapper = styled.div`
    padding: 0 30px;
    margin-top: 20px;

    
    .label-item{
        font-size: 14px;
        font-weight: 600;
        color: #444;
    }

    .flex-box{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }

    .select-item{
        width: 300px;
        height: 43px;
        padding: 5px 0;
        border: 1px solid #e1e1e1;
        font-size: 14px;
        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
        }
    }

    .input-item{
        width: 300px;
        height: 43px;
        border: 1px solid #e1e1e1;
        padding: 0 5px;
        font-size: 14px;
        box-sizing: border-box;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
        }
    }

    @media all and (max-width:992px) {
        padding: 0 10px;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    padding: 0 30px;
    

    .flex-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        gap:10px;

        @media all and (max-width:992px) {
            flex-wrap: nowrap;
        }
    }

    .button-item{
        padding: 5px 0;
        width: 150px;
        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        @media all and (max-width:992px) {
            width: 100%;
        }
    }

    @media all and (max-width:992px) {
        padding: 0 10px;
    }
`;

const initialPeriodTypeState = '';
const initialStartDateState = null;
const initialEndDateState = null;
const initialSearchColumnNameState = null;
const initialSearchValueState = '';

const periodTypeStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return '';
        default: return '';
    }
}

const startDateStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const endDateStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const searchColumnNameStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const searchValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return '';
        default: return '';
    }
}
const SearchOperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [periodTypeState, dispatchPeriodTypeState] = useReducer(periodTypeStateReducer, initialPeriodTypeState);
    const [startDateState, dispatchStartDateState] = useReducer(startDateStateReducer, initialStartDateState);
    const [endDateState, dispatchEndDateState] = useReducer(endDateStateReducer, initialEndDateState);
    const [searchColumnNameState, dispatchSearchColumnNameState] = useReducer(searchColumnNameStateReducer, initialSearchColumnNameState);
    const [searchValueState, dispatchSearchValueState] = useReducer(searchValueStateReducer, initialSearchValueState);

    useEffect(() => {
        let startDate = query.startDate;
        let endDate = query.endDate;

        if (startDate) {
            dispatchStartDateState({
                type: 'SET_DATA',
                payload: new Date(startDate)
            })
        }

        if (endDate) {
            dispatchEndDateState({
                type: 'SET_DATA',
                payload: new Date(endDate)
            })
        }
    }, [query.startDate, query.endDate])

    useEffect(() => {
        let searchColumnName = query.searchColumnName;
        let searchValue = query.searchValue;

        if (searchColumnName) {
            dispatchSearchColumnNameState({
                type: 'SET_DATA',
                payload: searchColumnName
            })
        }

        if (searchValue) {
            dispatchSearchValueState({
                type: 'SET_DATA',
                payload: searchValue
            })
        }
    }, [query.searchColumnName, query.searchValue]);

    const _onChangePeriodTypeState = (e) => {
        dispatchPeriodTypeState({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const _onChangeStartDateState = (value) => {
        dispatchStartDateState({
            type: 'SET_DATA',
            payload: value
        })
    }
    const _onChangeEndDateState = (value) => {
        dispatchEndDateState({
            type: 'SET_DATA',
            payload: value
        })
    }

    const _onRouteToSearch = () => {
        if (startDateState && !endDateState) {
            alert('종료일 날짜를 선택해 주세요.')
            return;
        }

        if (!startDateState && endDateState) {
            alert('시작일 날짜를 선택해 주세요.')
            return;
        }

        if ((endDateState - startDateState < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        if (periodTypeState && startDateState && endDateState) {
            query.startDate = dateToYYYYMMDD(startDateState);
            query.endDate = dateToYYYYMMDD(endDateState);
            query.periodType = periodTypeState
        }

        if (searchColumnNameState) {
            query.searchColumnName = searchColumnNameState;
        } else {
            delete query.searchColumnName;
            delete query.searchValue;
        }

        if (searchColumnNameState && searchValueState) {
            query.searchValue = searchValueState;
        }

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    const _onClearRoute = () => {
        dispatchStartDateState({
            type: 'CLEAR'
        })
        dispatchEndDateState({
            type: 'CLEAR'
        })
        dispatchSearchColumnNameState({
            type: 'CLEAR'
        })
        dispatchSearchValueState({
            type: 'CLEAR'
        })
        navigate(location.pathname, {
            replace: true
        })
    }

    const _onChangeSearchColumnNameState = (e) => {
        dispatchSearchColumnNameState({
            type: 'SET_DATA',
            payload: e.target.value
        });
        dispatchSearchValueState({
            type: 'CLEAR'
        })
    }

    const _onChangeSearchValueState = (e) => {
        dispatchSearchValueState({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }
    return (
        <>
            <Container>
                <DateSelectorWrapper>
                    <div className='label-item'>조회기간</div>
                    <div className='flex-box'>
                        <select
                            className='select-item'
                            value={periodTypeState || ''}
                            onChange={(e) => _onChangePeriodTypeState(e)}
                        >
                            <option value=''>선택</option>
                            <option value='registration'>주문등록일</option>
                            <option value='sales'>판매등록일</option>
                        </select>
                        {periodTypeState &&
                            <div className='date-selector-box'>
                                <CustomDatePicker
                                    valueSize={14}
                                    labelSize={12}
                                    label={'시작일'}
                                    selected={startDateState}
                                    onChange={value => _onChangeStartDateState(value)}
                                ></CustomDatePicker>
                            </div>
                        }
                        {periodTypeState &&
                            <div className='date-selector-box'>
                                <CustomDatePicker
                                    valueSize={14}
                                    labelSize={12}
                                    label={'종료일'}
                                    selected={endDateState}
                                    onChange={value => _onChangeEndDateState(value)}
                                ></CustomDatePicker>
                            </div>
                        }

                    </div>
                </DateSelectorWrapper>
                <DetailSearchWrapper>
                    <div className='label-item'>상세조건</div>
                    <div className='flex-box'>

                        <select
                            className='select-item'
                            value={searchColumnNameState || ''}
                            onChange={_onChangeSearchColumnNameState}
                        >
                            <option value=''>전체</option>
                            {props.headerState?.headerDetail?.details?.map(r => {
                                let bool = searchConditions.map(r2 => r2.matchedColumnName).includes(r.matchedColumnName);
                                if (bool) {
                                    return (
                                        <option key={r.matchedColumnName} value={r.matchedColumnName}>{r.customCellName}({r.originCellName})</option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                        {searchColumnNameState &&
                            <input
                                type='text'
                                className='input-item'
                                value={searchValueState || ''}
                                onChange={_onChangeSearchValueState}
                                placeholder='입력해주세요.'
                            ></input>
                        }
                    </div>
                </DetailSearchWrapper>
                <ButtonWrapper>
                    <div className='flex-box'>
                        <button type='button' className='button-item' onClick={() => _onClearRoute()}>초기화</button>
                        <button type='button' className='button-item' onClick={() => _onRouteToSearch()}>조회</button>
                    </div>
                </ButtonWrapper>
            </Container>
        </>
    );
}

const searchConditions = [
    {
        "cellNumber": 1,
        "originCellName": "주문번호1",
        "customCellName": "주문번호1",
        "matchedColumnName": "orderNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber": 2,
        "originCellName": "주문번호2",
        "customCellName": "주문번호2",
        "matchedColumnName": "orderNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber": 3,
        "originCellName": "주문번호3",
        "customCellName": "주문번호3",
        "matchedColumnName": "orderNumber3",
        "mergeYn": "n"
    },
    {
        "cellNumber": 4,
        "originCellName": "상품명",
        "customCellName": "상품명",
        "matchedColumnName": "prodName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 5,
        "originCellName": "옵션명",
        "customCellName": "옵션명",
        "matchedColumnName": "optionName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 7,
        "originCellName": "수취인명",
        "customCellName": "수취인명",
        "matchedColumnName": "receiver",
        "mergeYn": "n"
    },
    {
        "cellNumber": 8,
        "originCellName": "전화번호1",
        "customCellName": "전화번호1",
        "matchedColumnName": "receiverContact1",
        "mergeYn": "n"
    },
    {
        "cellNumber": 9,
        "originCellName": "전화번호2",
        "customCellName": "전화번호2",
        "matchedColumnName": "receiverContact2",
        "mergeYn": "n"
    },
    {
        "cellNumber": 10,
        "originCellName": "주소",
        "customCellName": "주소",
        "matchedColumnName": "destination",
        "mergeYn": "n"
    },
    {
        "cellNumber": 11,
        "originCellName": "우편번호",
        "customCellName": "우편번호",
        "matchedColumnName": "zipCode",
        "mergeYn": "n"
    },
    {
        "cellNumber": 12,
        "originCellName": "배송방식",
        "customCellName": "배송방식",
        "matchedColumnName": "transportType",
        "mergeYn": "n"
    },
    {
        "cellNumber": 13,
        "originCellName": "배송메세지",
        "customCellName": "배송메세지",
        "matchedColumnName": "deliveryMessage",
        "mergeYn": "n"
    },
    {
        "cellNumber": 14,
        "originCellName": "상품고유번호1",
        "customCellName": "상품고유번호1",
        "matchedColumnName": "prodUniqueNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber": 15,
        "originCellName": "상품고유번호2",
        "customCellName": "상품고유번호2",
        "matchedColumnName": "prodUniqueNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber": 16,
        "originCellName": "옵션고유번호1",
        "customCellName": "옵션고유번호1",
        "matchedColumnName": "optionUniqueNumber1",
        "mergeYn": "n"
    },
    {
        "cellNumber": 17,
        "originCellName": "옵션고유번호2",
        "customCellName": "옵션고유번호2",
        "matchedColumnName": "optionUniqueNumber2",
        "mergeYn": "n"
    },
    {
        "cellNumber": 18,
        "originCellName": "피아르 상품코드",
        "customCellName": "피아르 상품코드",
        "matchedColumnName": "prodCode",
        "mergeYn": "n"
    },
    {
        "cellNumber": 19,
        "originCellName": "피아르 옵션코드",
        "customCellName": "피아르 옵션코드",
        "matchedColumnName": "optionCode",
        "mergeYn": "n"
    },
    {
        "cellNumber": 20,
        "originCellName": "관리메모1",
        "customCellName": "관리메모1",
        "matchedColumnName": "managementMemo1",
        "mergeYn": "n"
    },
    {
        "cellNumber": 21,
        "originCellName": "관리메모2",
        "customCellName": "관리메모2",
        "matchedColumnName": "managementMemo2",
        "mergeYn": "n"
    },
    {
        "cellNumber": 22,
        "originCellName": "관리메모3",
        "customCellName": "관리메모3",
        "matchedColumnName": "managementMemo3",
        "mergeYn": "n"
    },
    {
        "cellNumber": 23,
        "originCellName": "관리메모4",
        "customCellName": "관리메모4",
        "matchedColumnName": "managementMemo4",
        "mergeYn": "n"
    },
    {
        "cellNumber": 24,
        "originCellName": "관리메모5",
        "customCellName": "관리메모5",
        "matchedColumnName": "managementMemo5",
        "mergeYn": "n"
    },
    {
        "cellNumber": 25,
        "originCellName": "관리메모6",
        "customCellName": "관리메모6",
        "matchedColumnName": "managementMemo6",
        "mergeYn": "n"
    },
    {
        "cellNumber": 26,
        "originCellName": "관리메모7",
        "customCellName": "관리메모7",
        "matchedColumnName": "managementMemo7",
        "mergeYn": "n"
    },
    {
        "cellNumber": 27,
        "originCellName": "관리메모8",
        "customCellName": "관리메모8",
        "matchedColumnName": "managementMemo8",
        "mergeYn": "n"
    },
    {
        "cellNumber": 28,
        "originCellName": "관리메모9",
        "customCellName": "관리메모9",
        "matchedColumnName": "managementMemo9",
        "mergeYn": "n"
    },
    {
        "cellNumber": 29,
        "originCellName": "관리메모10",
        "customCellName": "관리메모10",
        "matchedColumnName": "managementMemo10",
        "mergeYn": "n"
    },
    {
        "cellNumber": 30,
        "originCellName": "관리메모11",
        "customCellName": "관리메모11",
        "matchedColumnName": "managementMemo11",
        "mergeYn": "n"
    },
    {
        "cellNumber": 31,
        "originCellName": "관리메모12",
        "customCellName": "관리메모12",
        "matchedColumnName": "managementMemo12",
        "mergeYn": "n"
    },
    {
        "cellNumber": 32,
        "originCellName": "관리메모13",
        "customCellName": "관리메모13",
        "matchedColumnName": "managementMemo13",
        "mergeYn": "n"
    },
    {
        "cellNumber": 33,
        "originCellName": "관리메모14",
        "customCellName": "관리메모14",
        "matchedColumnName": "managementMemo14",
        "mergeYn": "n"
    },
    {
        "cellNumber": 34,
        "originCellName": "관리메모15",
        "customCellName": "관리메모15",
        "matchedColumnName": "managementMemo15",
        "mergeYn": "n"
    },
    {
        "cellNumber": 35,
        "originCellName": "관리메모16",
        "customCellName": "관리메모16",
        "matchedColumnName": "managementMemo16",
        "mergeYn": "n"
    },
    {
        "cellNumber": 36,
        "originCellName": "관리메모17",
        "customCellName": "관리메모17",
        "matchedColumnName": "managementMemo17",
        "mergeYn": "n"
    },
    {
        "cellNumber": 37,
        "originCellName": "관리메모18",
        "customCellName": "관리메모18",
        "matchedColumnName": "managementMemo18",
        "mergeYn": "n"
    },
    {
        "cellNumber": 38,
        "originCellName": "관리메모19",
        "customCellName": "관리메모19",
        "matchedColumnName": "managementMemo19",
        "mergeYn": "n"
    },
    {
        "cellNumber": 39,
        "originCellName": "관리메모20",
        "customCellName": "관리메모20",
        "matchedColumnName": "managementMemo20",
        "mergeYn": "n"
    },
    {
        "cellNumber": 40,
        "originCellName": "*카테고리명",
        "customCellName": "*카테고리명",
        "matchedColumnName": "categoryName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 41,
        "originCellName": "*상품명",
        "customCellName": "*상품명",
        "matchedColumnName": "prodDefaultName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 42,
        "originCellName": "*상품관리명",
        "customCellName": "*상품관리명",
        "matchedColumnName": "prodManagementName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 43,
        "originCellName": "*옵션명",
        "customCellName": "*옵션명",
        "matchedColumnName": "optionDefaultName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 44,
        "originCellName": "*옵션관리명",
        "customCellName": "*옵션관리명",
        "matchedColumnName": "optionManagementName",
        "mergeYn": "n"
    },
    {
        "cellNumber": 45,
        "originCellName": "*재고수량",
        "customCellName": "*재고수량",
        "matchedColumnName": "optionStockUnit",
        "mergeYn": "n"
    }
]
export default SearchOperatorComponent;