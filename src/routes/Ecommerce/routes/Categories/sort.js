const sortByOrder = (items) =>
    [...items].sort((a, b) => {
        if (a.order == null && b.order != null) return 1;
        if (b.order == null && a.order != null) return -1;
        if (b.order === a.order) return 0;

        return a.order - b.order;
    });

export default sortByOrder;
