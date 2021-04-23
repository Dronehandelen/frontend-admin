const getDiffInPresent = (now, before) => {
    if (now === 0 && before === 0) {
        return 0;
    }

    if (now === 0) {
        return -1;
    }

    if (before === 0) {
        return 1;
    }

    return now / before - 1;
};

export default getDiffInPresent;
