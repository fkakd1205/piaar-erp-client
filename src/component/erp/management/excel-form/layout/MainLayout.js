import styled from 'styled-components';

const Container = styled.div`
    padding: 0 30px;
    margin-top: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
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