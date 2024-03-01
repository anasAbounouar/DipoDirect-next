'use client'
import { useParams } from 'next/navigation'

export default function Library() {
    const params = useParams()
    console.log(params)
    return <div>this is your library {params.library} </div>
}
