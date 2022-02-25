import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { erpOrderHeaderDataConnect } from '../../../../data_connect/erpOrderHeaderDataConnect';
import { erpOrderItemDataConnect } from '../../../../data_connect/erpOrderItemDataConnect';
import ItemTableComponent from './ItemTableComponent';
import TopOperatorComponent from './TopOperatorComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialHeaderState = null;
const initialOrderItemListState = null;
const headerStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}
const orderItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const MainComponent = (props) => {
    const [headerState, dispatchHeaderState] = useReducer(headerStateReducer, initialHeaderState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);

    const __reqSearchOrderHeaderOne = async () => {
        await erpOrderHeaderDataConnect().searchOne()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchHeaderState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const __reqSearchOrderItemList = async () => {
        await erpOrderItemDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchOrderItemListState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    }

    const __reqCreateOrderHeaderOne = async (params) => {
        await erpOrderHeaderDataConnect().createOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOrderHeaderOne = async (params) => {
        await erpOrderHeaderDataConnect().updateOne(params)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    useEffect(() => {
        __reqSearchOrderHeaderOne();
        __reqSearchOrderItemList();
    }, [])

    const _onSubmitModifiedHeader = async (headerDetails) => {
        let params = null;
        if (!headerState) {
            params = {
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqCreateOrderHeaderOne(params);
        } else {
            params = {
                ...headerState,
                headerDetail: {
                    details: headerDetails
                }
            }
            await __reqUpdateOrderHeaderOne(params);
        }

        await __reqSearchOrderHeaderOne();
    }

    return (
        <>
            <Container>
                <TopOperatorComponent
                    headerState={headerState}

                    _onSubmitModifiedHeader={_onSubmitModifiedHeader}
                ></TopOperatorComponent>
                <ItemTableComponent
                    headerState={headerState}
                    orderItemListState={orderItemListState}
                ></ItemTableComponent>
            </Container>
        </>
    );
}
export default MainComponent;