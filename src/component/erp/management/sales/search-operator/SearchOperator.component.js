import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./SearchOperator.styled";
import qs from 'query-string';
import { useEffect, useReducer } from "react";
import DateSelectorFieldView from './DateSelectorField.view';
import DetailSearchFieldView from "./DetailSearchField.view";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import ButtonFieldView from "./ButtonField.view";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";

const defaultHeaderDetails = getDefaultHeaderDetails();

const SearchOperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [periodType, dispatchPeriodType] = useReducer(periodTypeReducer, initialPeriodType);
    const [startDate, dispatchStartDate] = useReducer(startDateReducer, initialStartDate);
    const [endDate, dispatchEndDate] = useReducer(endDateReducer, initialEndDate);
    const [searchColumnName, dispatchSearchColumnName] = useReducer(searchColumnNameReducer, initialSearchColumnName);
    const [searchQuery, dispatchSearchQuery] = useReducer(searchQueryReducer, initialSearchQuery);

    useEffect(() => {
        let periodType = query.periodType;
        let startDate = query.startDate;
        let endDate = query.endDate;

        dispatchPeriodType({
            type: 'SET_DATA',
            payload: periodType
        })

        if (startDate) {
            dispatchStartDate({
                type: 'SET_DATA',
                payload: new Date(startDate)
            })
        }

        if (endDate) {
            dispatchEndDate({
                type: 'SET_DATA',
                payload: new Date(endDate)
            })
        }
    }, [query.startDate, query.endDate, query.periodType])

    useEffect(() => {
        let searchColumnName = query.searchColumnName;
        let searchQuery = query.searchQuery;

        if (searchColumnName) {
            dispatchSearchColumnName({
                type: 'SET_DATA',
                payload: searchColumnName
            })
        }

        if (searchQuery) {
            dispatchSearchQuery({
                type: 'SET_DATA',
                payload: searchQuery
            })
        }
    }, [query.searchColumnName, query.searchQuery])

    const onChangePeriodType = (e) => {
        let value = e.target.value;

        if (!value) {
            dispatchStartDate({
                type: 'CLEAR'
            })
            dispatchEndDate({
                type: 'CLEAR'
            })
        }
        dispatchPeriodType({
            type: 'SET_DATA',
            payload: value
        })
    }

    const onChangeStartDateValue = (value) => {
        dispatchStartDate({
            type: 'SET_DATA',
            payload: value
        })
    }
    const onChangeEndDateValue = (value) => {
        dispatchEndDate({
            type: 'SET_DATA',
            payload: value
        })
    }

    const onChangeSearchColumnNameValue = (e) => {
        dispatchSearchColumnName({
            type: 'SET_DATA',
            payload: e.target.value
        });
        dispatchSearchQuery({
            type: 'CLEAR'
        })
    }

    const onChangeSearchQueryValue = (e) => {
        dispatchSearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const onActionRouteToSearch = (e) => {
        e.preventDefault();

        if (startDate && !endDate) {
            alert('종료일 날짜를 선택해 주세요.')
            return;
        }

        if (!startDate && endDate) {
            alert('시작일 날짜를 선택해 주세요.')
            return;
        }

        if ((endDate - startDate < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        if (periodType && startDate && endDate) {
            query.startDate = dateToYYYYMMDD(startDate);
            query.endDate = dateToYYYYMMDD(endDate);
            query.periodType = periodType
        } else {
            delete query.startDate;
            delete query.endDate;
            delete query.periodType;

        }

        if (searchColumnName) {
            query.searchColumnName = searchColumnName;
        } else {
            delete query.searchColumnName;
            delete query.searchQuery;
        }

        if (searchColumnName && searchQuery) {
            query.searchQuery = searchQuery;
        }
        
        delete query.page;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    const onActionClearRoute = () => {
        dispatchStartDate({
            type: 'CLEAR'
        })
        dispatchEndDate({
            type: 'CLEAR'
        })
        dispatchSearchColumnName({
            type: 'CLEAR'
        })
        dispatchSearchQuery({
            type: 'CLEAR'
        })
        navigate(location.pathname, {
            replace: true
        })
    }

    return (
        <>
            <Container>
                <DateSelectorFieldView
                    periodType={periodType}
                    startDate={startDate}
                    endDate={endDate}

                    onChangePeriodType={onChangePeriodType}
                    onChangeStartDateValue={onChangeStartDateValue}
                    onChangeEndDateValue={onChangeEndDateValue}
                ></DateSelectorFieldView>
                <form onSubmit={(e) => onActionRouteToSearch(e)}>
                    <DetailSearchFieldView
                        viewHeader={props.viewHeader}
                        defaultHeaderDetails={defaultHeaderDetails}
                        searchColumnName={searchColumnName}
                        searchQuery={searchQuery}

                        onChangeSearchColumnNameValue={onChangeSearchColumnNameValue}
                        onChangeSearchQueryValue={onChangeSearchQueryValue}
                    ></DetailSearchFieldView>
                    <ButtonFieldView
                        onActionRouteToSearch={onActionRouteToSearch}
                        onActionClearRoute={onActionClearRoute}
                    ></ButtonFieldView>
                </form>
            </Container>
        </>
    );
}
export default SearchOperatorComponent;

const initialPeriodType = '';
const initialStartDate = null;
const initialEndDate = null;
const initialSearchColumnName = null;
const initialSearchQuery = '';

const periodTypeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialPeriodType;
        default: return initialPeriodType;
    }
}

const startDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const endDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const searchColumnNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const searchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return '';
        default: return '';
    }
}