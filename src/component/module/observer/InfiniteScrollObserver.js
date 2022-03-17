import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`

`;

const ContainerTr = styled.tr`

`;

const InfiniteScrollObserver = ({ elementTagType, totalSize, startOffset, endOffset, fetchData, loadingElementTag, endElementTag }) => {
    const [target, setTarget] = useState(null);

    const onIntersect = useCallback(async (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchData();
            }
        });

    }, [fetchData]);

    useEffect(() => {
        let observer;

        if (endOffset >= totalSize) {
            return () => observer && observer.disconnect();
        }

        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [onIntersect, target]);

    if (elementTagType === 'tr') {
        return (
            <ContainerTr ref={setTarget}>
                {endOffset >= totalSize &&
                    (
                        <>
                            {endElementTag}
                        </>
                    )
                }
                {endOffset < totalSize &&
                    (
                        <>
                            {loadingElementTag}
                        </>
                    )
                }
            </ContainerTr>
        );
    } else {
        return (
            <ContainerDiv ref={setTarget}>
                {endOffset >= totalSize &&
                    (
                        <>
                            {endElementTag || 'end of data'}
                        </>
                    )
                }
                {endOffset < totalSize &&
                    (
                        <>
                            {loadingElementTag || 'loading...'}
                        </>
                    )
                }
            </ContainerDiv>
        );
    }
}
export default InfiniteScrollObserver;