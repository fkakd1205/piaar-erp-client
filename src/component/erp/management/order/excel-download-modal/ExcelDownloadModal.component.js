import { useEffect, useReducer, useState } from "react";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import CombineOperators from "./CombineOperators.view";
import DownloadButtonFieldView from "./DownloadButtonField.view";
import { Container } from "./ExcelDownloadModal.styled";
import ExcelHeaderDisplayView from "./ExcelHeaderDisplay.view";
import ExcelHeaderSelectorView from "./ExcelHeaderSelector.view";
import PreviewTableView from "./PreviewTable.view";
import TitleView from "./Title.view";

const defaultHeaderDetails = getDefaultHeaderDetails();

// collections를 가지고 downloadOrderItem 폼으로 변환, collection = [...orderItem]
const getDownloadOrderItem = (collections) => {
    return {
        receiver: collections[0].receiver,
        destination: collections[0].destination,
        combinedUniqueCode: collections.map(r => r.uniqueCode).join(),
        combinedFreightCode: collections.map(r => r.freightCode).join(),
        collections: collections
    }
}

const ExcelDownloadModalComponent = (props) => {
    const [downloadOrderItemList, dispatchDownloadOrderItemList] = useReducer(downloadOrderItemListReducer, initialDownloadOrderItemList);
    const [checkedItemList, dispatchCheckedItemList] = useReducer(checkedItemListReducer, initialCheckedItemList);
    const [selectedExcelHeader, dispatchSelectedExcelHeader] = useReducer(selectedExcelHeaderReducer, initialSelectedExcelHeader);

    useEffect(() => {
        if (!props.checkedOrderItemList || props.checkedOrderItemList?.length <= 0) {
            return;
        }

        // downloadOrderItem 폼으로 List 변환
        let dataList = props.checkedOrderItemList.map(r => {
            let collections = [r];
            return getDownloadOrderItem(collections);
        })

        // 수취인명 + 주소 기준으로 정렬
        dataList.sort((a, b) => {
            let str1 = a.receiver + a.destination;
            let str2 = b.receiver + b.destination;
            return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
        })

        _onSet_downloadOrderItemList(dataList);

    }, [props.checkedOrderItemList]);

    const _onSet_downloadOrderItemList = (data) => {
        dispatchDownloadOrderItemList({
            type: 'SET_DATA',
            payload: data
        })
    }

    // 전체 주문건 합치기
    const _onAction_combineDownloadOrderItemList = () => {
        let orderItemList = [];
        // 일반 orderItem 폼으로 list 변환
        downloadOrderItemList.forEach(r => {
            orderItemList.push(...r.collections)
        })

        let s = new Set(); // 수취인명 + 주소 중복 체크를 위한 Set
        let stack = []; // 수취인명 + 주소 중복인 경우 데이터를 담아둘 임시 스텍
        let dataList = []; // 최종 결과물을 저장할 공간

        // 수취인명 + 주소 기준으로 정렬
        orderItemList.sort((a, b) => {
            let str1 = a.receiver + a.destination;
            let str2 = b.receiver + b.destination;
            return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
        })

        orderItemList.forEach((r, index) => {
            let str = r.receiver + r.destination;

            if (!s.has(str)) {
                s.add(str);

                // 기존에 담겨 있던 스텍 모두 비우기
                if (stack.length > 0) {
                    dataList.push(getDownloadOrderItem([...stack]));
                    stack = [];
                }
            }
            stack.push(r);
        })

        // 남은 스택들 모두 비우기
        if (stack.length > 0) {
            dataList.push(getDownloadOrderItem([...stack]));
            stack = [];
        }

        _onSet_downloadOrderItemList(dataList);
    }

    // 전체 주문건 분리
    const _onAction_insulateDownloadOrderItemList = () => {
        let orderItemList = [];
        downloadOrderItemList.forEach(r => {
            orderItemList.push(...r.collections)
        });

        let dataList = orderItemList.map(r => {
            return getDownloadOrderItem([r]);
        })

        _onSet_downloadOrderItemList(dataList);
    }

    // 선택된 주문건 분리
    const _onAction_insulateDownloadOrderItemListSelectOnly = () => {
        if (checkedItemList.length <= 0) {
            return;
        }

        let dataList = [];

        downloadOrderItemList.forEach(orderItem => {
            let collections = []; // 선택되지 않은 데이터들 유지하기위한 공간
            let insulateCollections = []; // 분리된 데이터들 담는 공간

            orderItem.collections.forEach(collection => {
                // 체크 리스트에 포함되면 insulateCollections에 담는다.
                if (checkedItemList.some(s => s.id === collection.id)) {
                    insulateCollections.push(collection)
                } else {
                    collections.push(collection)
                }
            });

            if (insulateCollections.length > 0) {
                insulateCollections.forEach(r => {
                    dataList.push(getDownloadOrderItem([r]))
                })
            }

            if (collections.length > 0) {
                dataList.push(getDownloadOrderItem(collections))
            }
        })

        dispatchCheckedItemList({
            type: 'CLEAR'
        });
        _onSet_downloadOrderItemList(dataList);
    }

    const _onAction_checkItem = (item) => {
        let checked = isCheckedItem(item);
        let data = [...checkedItemList];

        if (checked) {
            data = data.filter(r => r.id !== item.id);
        } else {
            data.push(item);
        }

        dispatchCheckedItemList({
            type: 'SET_DATA',
            payload: data
        });
    }

    const isCheckedItem = (item) => {
        return checkedItemList.some(r => r.id === item.id);
    }

    const onActionSelectExcelFormHeader = (e) => {
        let id = e.target.value;
        let header = props.downloadExcelList.filter(r => r.id === id)[0];

        if (!id) {
            dispatchSelectedExcelHeader({
                type: 'CLEAR'
            })
        }
        dispatchSelectedExcelHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const onActionDownloadExcel = () => {
        props.onActionDownloadExcel(selectedExcelHeader, downloadOrderItemList)
    }

    return (
        <>
            <Container>
                <TitleView
                    title={'엑셀 다운로드'}
                ></TitleView>
                <CombineOperators
                    _onAction_combineDownloadOrderItemList={_onAction_combineDownloadOrderItemList}
                    _onAction_insulateDownloadOrderItemList={_onAction_insulateDownloadOrderItemList}
                    _onAction_insulateDownloadOrderItemListSelectOnly={_onAction_insulateDownloadOrderItemListSelectOnly}
                ></CombineOperators>
                {(downloadOrderItemList && props.viewHeader) &&
                    <PreviewTableView
                        viewHeader={props.viewHeader}
                        downloadOrderItemList={downloadOrderItemList}
                        checkedItemList={checkedItemList}
                        isCheckedItem={isCheckedItem}

                        _onAction_checkItem={_onAction_checkItem}
                    ></PreviewTableView>
                }
                {props.downloadExcelList &&
                    <ExcelHeaderSelectorView
                        downloadExcelList={props.downloadExcelList}
                        selectedExcelHeader={selectedExcelHeader}

                        onActionSelectExcelFormHeader={onActionSelectExcelFormHeader}
                    ></ExcelHeaderSelectorView>
                }
                {selectedExcelHeader &&
                    <>
                        <ExcelHeaderDisplayView
                            defaultHeaderDetails={defaultHeaderDetails}
                            selectedExcelHeader={selectedExcelHeader}
                        ></ExcelHeaderDisplayView>
                        <DownloadButtonFieldView
                            onActionDownloadExcel={onActionDownloadExcel}
                        ></DownloadButtonFieldView>
                    </>
                }
            </Container>
        </>
    );
}
export default ExcelDownloadModalComponent;

const initialDownloadOrderItemList = null;
const initialCheckedItemList = [];
const initialSelectedExcelHeader = null;

const downloadOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return null;
    }
}

const checkedItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const selectedExcelHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedExcelHeader;
        default: return initialSelectedExcelHeader;
    }
}