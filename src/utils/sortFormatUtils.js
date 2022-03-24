const sortDirections = ['desc', 'asc']
const sortFormatUtils = () => {
    return {
        getSortWithSortElements: function (sortElements, sortBy, sortDirection) {
            if (!sortElements.includes(sortBy)) {
                return null;
            }

            if (!sortDirections.includes(sortDirection)) {
                return null;
            }

            return [sortBy, sortDirection].join();
        }
    }
}

export {
    sortFormatUtils
}