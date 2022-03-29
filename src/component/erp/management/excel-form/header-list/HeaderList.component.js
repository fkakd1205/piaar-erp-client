import { useReducer, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import AddModalView from "./AddModal.view";
import HeaderFieldView from "./HeaderField.view";
import { Container, Wrapper, TitleFieldWrapper } from "./HeaderList.styled";
import ItemListView from './ItemList.view';

function Title({ element }) {
    return (
        <TitleFieldWrapper>
            {element}
        </TitleFieldWrapper>
    );
}

export default function HeaderListComponent(props) {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [createHeader, dispatchCreateHeader] = useReducer(createHeaderReducer, initialCreateHeader);
    const [disabledBtn, setDisabledBtn] = useState(false);


    const isSelected = (data) => {
        return props.selectedHeader?.id === data.id;
    }

    const onActionHeaderSelect = (data) => {
        props._onSet_selectedHeader(data);
    }


    const onActionAddModalOpen = () => {
        setAddModalOpen(true);
        setDisabledBtn(false);
    }

    const onActionAddModalClose = () => {
        setAddModalOpen(false);
        dispatchCreateHeader({
            type: 'CLEAR'
        })
    }

    const onActionHeaderCreate = () => {
        if (!createHeader.title) {
            alert('양식의 이름을 지정해 주세요.')
            return;
        }

        setDisabledBtn(true);
        props._onSubmit_create(createHeader);
        onActionAddModalClose();
    }

    const onChangeCreateHeaderValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchCreateHeader({
            type: 'CHANGE_VALUE',
            payload: {
                name: name,
                value: value
            }
        })
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderFieldView
                        onActionAddModalOpen={onActionAddModalOpen}
                    ></HeaderFieldView>
                    <ItemListView
                        headerList={props.headerList}
                        isSelected={isSelected}

                        onActionHeaderSelect={onActionHeaderSelect}
                    ></ItemListView>
                </Wrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={addModalOpen}

                onClose={onActionAddModalClose}
            >
                {createHeader &&
                    <AddModalView
                        createHeader={createHeader}
                        disabledBtn={disabledBtn}

                        onChangeCreateHeaderValue={onChangeCreateHeaderValue}
                        onClose={onActionAddModalClose}
                        onCreate={onActionHeaderCreate}
                    ></AddModalView>
                }
            </CommonModalComponent>
        </>
    );
}

const initialCreateHeader = {
    cid: null,
    id: null,
    title: '',
    headerDetail: {
        details: []
    },
    createdAt: null,
    createdBy: null,
    updatedAt: null,
};

const createHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_VALUE':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialCreateHeader;
        default: return initialCreateHeader;
    }
}