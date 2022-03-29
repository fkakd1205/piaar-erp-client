import styled from 'styled-components';
import { Container as HeaderListContainer } from '../header-list/HeaderList.styled';

const Container = styled.div`
    padding: 0 30px;
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;

    ${HeaderListContainer}:nth-of-type(1){
        margin-right: 20px;
    }

    @media all and (max-width: 992px){
        padding: 0 10px;
        flex-direction: column;
    }
`;

const MainLayout = (props) => {
    return (
        <>
            <Container>
                {props.children}
            </Container>
        </>
    );
}
export default MainLayout;