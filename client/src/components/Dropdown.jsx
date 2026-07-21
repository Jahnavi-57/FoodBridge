function Dropdown({

    label,

    value,

    onChange,

    options

}) {

    return (

        <div className="mb-5">

            <label
                className="
                    block
                    mb-2
                    text-stone-700
                    font-medium
                "
            >

                {label}

            </label>

            <select

                value={value}

                onChange={onChange}

                className="
                    w-full
                    rounded-xl
                    border
                    border-amber-200
                    px-4
                    py-3
                    bg-white
                    outline-none
                    focus:ring-2
                    focus:ring-amber-400
                "

            >

                <option value="">
                    Select
                </option>

                {

                    options.map(option => (

                        <option
                            key={option.value}
                            value={option.value}
                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}

export default Dropdown;