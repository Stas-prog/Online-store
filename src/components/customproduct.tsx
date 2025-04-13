'use client'

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Add from "./add";


const CustomProduct = ({ productId, variants, productOptions }:
    { productId: string; variants: products.Variant[]; productOptions: products.ProductOption[] }) => {

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
    const [selectedVariant, setSelectedVariant] = useState<products.Variant>()

    useEffect(() => {
        const variant = variants.find((v) => {
            const variantChoices = v.choices
            if (!variantChoices) return false
            return Object.entries(selectedOptions).every(([key, value]) => variantChoices[key] === value)
        })
        setSelectedVariant(variant)
    }, [selectedOptions, variants])

    const handleOptionSelect: any = (optionType: string, choice: string) => {
        setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }))
    }

    const isVariantInStock = (choices: { [key: string]: string }) => {
        return variants.some((variant) => {
            const variantChoices = variant.choices
            if (!variantChoices) return false
            return (
                Object.entries(choices).every(([key, value]) => variantChoices[key] === value) &&
                variant.stock?.inStock && variant.stock?.quantity && variant.stock?.quantity > 0
            )
        })
    }
    console.log(variants)
    return (
        <div className="flex flex-col gap-6">
            {productOptions.map((option) => (
                <div key={option.name} className="flex flex-col gap-4">
                    <h4 className="font-medium">Вибрати {option.name}</h4>
                    <ul className="flex items-center gap-3">

                        {option.choices?.map((choice: any) => {
                            const disabled = !isVariantInStock({ ...selectedOptions, [option.name!]: choice.description! })
                            const selected = selectedOptions[option.name!] === choice.description
                            console.log(choice.description)
                            console.log(choice.value)
                            console.log(selectedOptions[option.name!])
                            const clickHandler = disabled ? undefined : () => handleOptionSelect(option.name!, choice.description!)

                            return option.name === "Колір" ? (
                                <li key={choice.description}
                                    onClick={clickHandler}
                                    className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                                    style={{
                                        backgroundColor: choice.value,
                                        cursor: disabled ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {selected &&
                                        <div className="absolute w-10 h-10  rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                    }
                                    {disabled &&
                                        <div className="absolute w-10 h-[3px] bg-red-400  rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                    }
                                </li>
                            ) : (
                                <li key={choice.description}
                                    className="ring-1 ring-z text-z rounded-md px-4 py-1 text-sm"
                                    style={{
                                        cursor: disabled ? "not-allowed" : "pointer",
                                        backgroundColor: selected ? "#f35c7a" : disabled ? "#FBCFE8" : "white",
                                        color: selected || disabled ? "white" : "#f35c7a",
                                        boxShadow: disabled ? "none" : ""
                                    }}
                                    onClick={clickHandler}>
                                    {choice.description}
                                </li>
                            )


                        })
                        }
                    </ul>
                </div>))}
            <Add productId={productId}
                variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"}
                stockNumber={selectedVariant?.stock?.quantity || 0} />
            {/* 
            <ul className="flex items-center gap-3">

                <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
                <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
                    <div className="absolute w-10 h-[3px] bg-z  rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </li>
            </ul> */}
            {/* // <h4 className="font-medium">Вибрати розмір</h4>
            // <ul className="flex items-center gap-3">
            //     <li className="ring-1 ring-z text-z rounded-md px-4 py-1 cursor-pointer text-sm">Малий</li>
            //     <li className="ring-1 ring-z text-white bg-z rounded-md px-4 py-1 cursor-pointer text-sm">Середній</li>
            //     <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md px-4 py-1 cursor-not-allowed text-sm">Великий</li>
            // </ul> */}

        </div>
    )
}


export default CustomProduct