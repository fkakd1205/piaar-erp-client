import styled from 'styled-components';

const Container = styled.div`
    padding: ${props => props.padding ? `${props.padding}px 0` : `50px 0`};
    text-align: center;
    font-size: 14px;
    font-weight: 600;
`;

/**
 * 
 * @param {Object} param0 
 * @param {JSX.Element} param0.element
 * @param {Number} param0.padding
 */
const ModalErrorMessageComponent = ({ element, padding }) => {
    return (
        <>
            <Container
                padding={padding || 50}
            >
                {element || ''}
            </Container>
        </>
    );
}
export default ModalErrorMessageComponent;