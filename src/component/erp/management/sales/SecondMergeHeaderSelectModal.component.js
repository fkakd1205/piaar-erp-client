import { useState } from 'react';
import styled from 'styled-components';
import Ripple from '../../../template/button/Ripple';
import { ButtonBox, Container, HeaderTitleBox, HeaderWrapper, ListBox, ListWrapper } from './SecondMergeHeaderSelectModal.styled';

const SecondMergeHeaderSelectModalComponent = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(false);

    const _onDelete = (e, data) => {
        e.stopPropagation();
        setDisabledBtn(true)
        if (window.confirm('정말로 삭제 하시겠습니까?')) {
            // props._onSubmit_deleteFirstMergeHeader(data.id);
        }
        setDisabledBtn(false);
    }

    const _onSelect = (data) => {
        props._onSelectHeader(data)
    }

    const _onEdit = (e, data) => {
        e.stopPropagation();
        props._onEditModalOpen(data);
    }
    return (
        <>
            <Container>
                <HeaderWrapper>
                    <div></div>
                    <HeaderTitleBox>2차 병합 헤더 선택</HeaderTitleBox>
                    <div></div>
                </HeaderWrapper>
                {(props.secondMergeHeaderListState && props.secondMergeHeaderListState?.length > 0) &&
                    <ListWrapper>
                        {props.secondMergeHeaderListState?.map(r => {
                            return (
                                <ListBox key={r.id} onClick={() => _onSelect(r)}>
                                    <Ripple color='#d1d1d1' duration={1000} scale={2}></Ripple>
                                    <div className='flex-box justify-between'>
                                        <div>
                                            {r.title}
                                        </div>
                                        <div className='flex-box flex-gap'>
                                            <button
                                                className='button-item'
                                                style={{ background: '#2C73D2', border: '1px solid #2C73D2', color: 'white' }}
                                                onClick={e => _onEdit(e, r)}
                                                disabled={disabledBtn}
                                            >
                                                수정
                                                <Ripple color='#fff' duration={1000} scale={2}></Ripple>
                                            </button>
                                            <button
                                                className='button-item'
                                                style={{ background: '#ff3060', border: '1px solid #ff3060', color: 'white' }}
                                                onClick={(e) => _onDelete(e, r)}
                                                disabled={disabledBtn}
                                            >
                                                삭제
                                                <Ripple color='#fff' duration={1000} scale={2}></Ripple>
                                            </button>
                                        </div>
                                    </div>
                                </ListBox>
                            );
                        })}
                    </ListWrapper>
                }
                {(!props.secondMergeHeaderListState || props.secondMergeHeaderListState?.length <= 0) &&
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>선택 가능한 헤더가 없습니다.</div>
                }
            </Container>
            <ButtonBox>
                <button
                    className='button-item'
                    onClick={props._onAddModeOpen}
                >
                    NEW
                    <Ripple color={"#d1d1d1"} duration={1000} />
                </button>
            </ButtonBox>
        </>
    );
}
export default SecondMergeHeaderSelectModalComponent;