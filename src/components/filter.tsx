'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React from "react"


const Filter = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="mt-12 flex justify-between flex-wrap">
            <div className="flex gap-6 flex-wrap mb-6">
                <select name="type" id="" className="px-4 py-2 text-xs rounded-2xl font-medium bg-[#EBEDED]"
                    onChange={handleFilterChange}>
                    <option>Тип</option>
                    <option value="physical">Фізичний</option>
                    <option value="digital">Цифровий</option>
                </select>
                <input type="text" name="min" placeholder="ціна min" className="w-24 pl-2 rounded-2xl text-xs ring-1 ring-gray-400"
                    onChange={handleFilterChange} />
                <input type="text" name="max" placeholder="ціна max" className="w-24 pl-2 rounded-2xl text-xs ring-1 ring-gray-400"
                    onChange={handleFilterChange} />
                <select name="cat" id="" className="px-4 py-2 text-xs rounded-2xl font-medium bg-[#EBEDED]"
                    onChange={handleFilterChange}>
                    <option disabled={true}>Категорія</option>
                    <option value="all-products">Всі товари</option>
                    <option value="аксесуари">Аксесуари</option>
                    <option value="вибране">Вибране</option>
                    <option value="категорія-№1">Дім</option>
                    <option value="нові-товари">Нові товари</option>
                    <option value="сорочки">Футболки</option>
                    <option value="черевики">Черевики</option>
                </select>
            </div>
            <div className="gap-6">
                <select name="sort" id="" className="px-4 py-2 text-xs rounded-2xl font-medium bg-white ring-1 ring-gray-400"
                    onChange={handleFilterChange}>
                    <option>Сортувати по</option>
                    <option value="asc price">Ціна (з min до max)</option>
                    <option value="desc price">Ціна (з max до min)</option>
                    <option value="asc lastUpdated">Новіші</option>
                    <option value="desc lastUpdated">Старіші</option>
                </select>
            </div>
        </div>
    )
}

export default Filter 