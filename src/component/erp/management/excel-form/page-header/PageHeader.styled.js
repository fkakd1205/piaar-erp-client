import styled from 'styled-components';

const Container = styled.div`
    margin-top: 20px;
`;

const HeaderTitleFieldWrapper = styled.div`
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
    
    .title-el{
        font-size: 25px;
        font-weight: 700;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }
`;

export {
    Container,
    HeaderTitleFieldWrapper
}