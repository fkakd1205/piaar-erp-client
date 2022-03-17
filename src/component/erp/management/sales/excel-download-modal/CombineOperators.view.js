import styled from 'styled-components';
import Ripple from '../../../../module/button/Ripple';
import { CombineOperatorsWrapper, Container } from './ExcelDownloadModal.styled';

const CombineOperatorBox = (props) => {
    return (
        <>
            <Container>
                <CombineOperatorsWrapper>
                    <div className='flex-box'>
                        <div>
                            <button
                                type='button'
                                className='button-item'
                                onClick={props._onAction_combineDownloadOrderItemList}
                            >
                                전체 주문건 합치기
                                <Ripple
                                    color={'#fff'}
                                    duration={1000}
                                ></Ripple>
                            </button>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='button-item'
                                onClick={props._onAction_insulateDownloadOrderItemList}
                            >
                                전체 주문건 분리
                                <Ripple
                                    color={'#fff'}
                                    duration={1000}
                                ></Ripple>
                            </button>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='button-item'
                                onClick={props._onAction_insulateDownloadOrderItemListSelectOnly}
                            >
                                선택된 주문건 분리
                                <Ripple
                                    color={'#fff'}
                                    duration={1000}
                                ></Ripple>
                            </button>
                        </div>
                    </div>
                </CombineOperatorsWrapper>
            </Container>
        </>
    );
}
export default CombineOperatorBox;