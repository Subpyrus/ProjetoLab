const customStyles = {
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition, color: '#ebebd3' };
    },
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#f24643' : '#ffe066',
        backgroundColor: state.isSelected ? '#ffe066' : '#f24643',
        "&:hover": {
            backgroundColor: "#1688b9",
            fontWeight: 'bold',
            color: "#ebebd3"
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: 0,
        marginTop: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        backgroundColor: '#f24643',
        color: '#ffe066',
        padding: 0
    }),
    control: (provided, state) => ({
        ...provided,
        color: '#ffe066',
        border: '1px solid #ffe066',
        borderRadius: 3,
        backgroundColor: state.isFocused ? '#f24643' : '#1688b9',
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            borderColor: "ffe066"
        }
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#ffe066'
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isFocused ? '#ffe066' : '#ebebd3',
        fontWeight: state.isFocused ? 'bold' : 'normal',
    }),
}

export default customStyles