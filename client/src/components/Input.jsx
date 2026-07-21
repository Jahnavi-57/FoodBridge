function Input({

    label,

    name,

    type = "text",

    placeholder,

    value,

    onChange,

    autoComplete,

    required = false,

    disabled = false

}) {

    return (

        <div className="mb-5">

            <label
                htmlFor={name}
                className="
                    block
                    mb-2
                    text-stone-700
                    font-medium
                "
            >

                {label}

            </label>

            <input

                id={name}

                name={name}

                type={type}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                autoComplete={autoComplete}

                required={required}

                disabled={disabled}

                className="
                    w-full
                    rounded-xl
                    border
                    border-amber-200
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    duration-200

                    focus:border-amber-500
                    focus:ring-2
                    focus:ring-amber-300

                    disabled:bg-stone-100
                "

            />

        </div>

    );

}

export default Input;