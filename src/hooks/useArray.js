import React from 'react';

const useArray = (defaultValue = []) => {
    const [value, setValue] = React.useState([]);

    React.useEffect(() => setValue(defaultValue), [defaultValue]);

    const has = React.useCallback(
        (hasValue) => value.indexOf(hasValue) !== -1,
        [value]
    );

    const push = React.useCallback(
        (addedValue) => setValue([...value, addedValue]),
        [value, setValue]
    );

    const removeIndex = React.useCallback(
        (index) => setValue([...value].filter((x, i) => i !== index)),
        [value, setValue]
    );

    const toggle = React.useCallback(
        (valueToToggle) => {
            let newValue = [...value];

            if (has(valueToToggle)) {
                newValue = newValue.filter(
                    (itemValue) => itemValue !== valueToToggle
                );
            } else {
                newValue.push(valueToToggle);
            }

            setValue(newValue);
        },
        [value, has]
    );

    return React.useMemo(
        () => ({
            setValue,
            toggle,
            has,
            push,
            removeIndex,
            value,
        }),
        [has, toggle, push, removeIndex, value]
    );
};

export default useArray;
