"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef } from "react"


const SearchBar = () => {
    const ref = useRef<any>("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string

        if (name) {
            router.push(`/list?name=${name}`)
            ref.current.value = ''
        }

    }


    return (<form className="flex items-center justify-between gap-4 bg-gray-300 p-2 rounded-md flex-1" onSubmit={handleSearch}>
        <input ref={ref} type="text" name="name" placeholder="Пошук" className="flex-1 bg-transparent outline-none" />
        <button className="cursor-pointer">
            <Image src="/search.png" alt="" width={16} height={16} />
        </button>
    </form>)

}

export default SearchBar