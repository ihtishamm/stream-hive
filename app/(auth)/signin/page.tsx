'use client'

import { SignIn } from '@/gqlClient/user'
import { setToken } from '@/lib/token'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from 'urql'

const SigninPage = () => {
    const [signupResult, signup] = useMutation(SignIn)
    const [state, setState] = useState({ email: '', password: '' })
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!state.email || !state.password) {
            setError('All fields are required')
            return
        }

        const result = await signup({ input: state })

        if (result.error) {
            setError("An error occurred. Please try again.")
        } else if (result.data.createUser) {
            setToken(result.data.createUser.token)
            router.push('/')
        }
    }

    return (
        <div className="bg-white rounded-md border p-6 w-full max-w-md shadow-md mx-auto">
            <div className="text-2xl font-semibold text-gray-800">Sign In</div>

            {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded-md mt-2">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4">

                <Input
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <Input
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                    type="password"
                    placeholder="Enter your password"
                    required
                />

                <div className="text-end mt-4">
                    <Button type="submit" variant="default" className="w-full">
                        {signupResult.fetching ? 'Signing in...' : 'Sign In'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SigninPage
